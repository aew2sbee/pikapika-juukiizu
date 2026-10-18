import './style.css';
import { mountCleaning } from './cleaning';
import { isPreview } from './env';
import { garage } from './garage';
import { mountLock } from './lock';
import { bedtime, FRESH, limitFromQuery, loadPlayState, playStateKey, savePlayState } from './playtime';
import { mountSelect } from './select';
import { vehicles } from './vehicles';
import type { Vehicle } from './vehicles/types';

/** How often the play time is written to storage while counting. */
const SAVE_EVERY = 5000;

document.body.insertAdjacentHTML('afterbegin', `<div class="garage">${garage}</div>`);
if (isPreview) document.body.insertAdjacentHTML('beforeend', '<div class="badge">ぷれびゅー</div>');

const app = document.querySelector<HTMLDivElement>('#app')!;
let screen: AbortController | undefined;

// Production and each PR preview share the github.io origin; the base path keeps their counts apart.
const storagePrefix = `${import.meta.env.BASE_URL}:`;
const storage = (() => {
  try {
    return localStorage;
  } catch {
    return undefined;
  }
})();
const limitMs = limitFromQuery(location.search, isPreview || import.meta.env.DEV);
const play = loadPlayState(storage, storagePrefix);
/** When the time since then last went into play.elapsedMs; unset while not counting. */
let countedTo: number | undefined;

/** Adds the time since the last count, then counts on only while the screen shows and the game is awake. */
function count() {
  const now = performance.now();
  if (countedTo !== undefined) play.elapsedMs += now - countedTo;
  countedTo = document.visibilityState === 'visible' && !play.locked ? now : undefined;
}

function save() {
  count();
  savePlayState(storage, storagePrefix, play);
}

/**
 * Takes on the state another tab saved, so a stale tab can't write an old, unlocked state over a
 * lock (or keep a lock an adult has just lifted).
 */
function adopt() {
  const wasLocked = play.locked;
  Object.assign(play, loadPlayState(storage, storagePrefix));
  countedTo = undefined;
  count();
  if (play.locked && !wasLocked) sleep();
  else if (!play.locked && wasLocked) showSelect();
}

setInterval(save, SAVE_EVERY);
document.addEventListener('visibilitychange', save);
window.addEventListener('pagehide', save);
window.addEventListener('storage', (e) => {
  if (e.key === playStateKey(storagePrefix)) adopt();
});
// A page brought back from the back-forward cache missed whatever other tabs saved meanwhile.
window.addEventListener('pageshow', (e) => {
  if (e.persisted) adopt();
});

/**
 * Swaps in a fresh container for the next screen. Its DOM listeners leave with the old container;
 * the signal stops what outlives it (animation, sound, observers, timers).
 */
function show(mount: (root: HTMLElement, signal: AbortSignal) => void) {
  screen?.abort();
  screen = new AbortController();
  const root = document.createElement('div');
  root.className = 'screen';
  app.replaceChildren(root);
  mount(root, screen.signal);
}

function showSelect() {
  show((root) => mountSelect(root, vehicles, showCleaning));
}

function showCleaning(vehicle: Vehicle) {
  play.vehicle = vehicle.name;
  show((root, signal) => {
    mountCleaning(root, vehicle, {
      signal,
      onBack: showSelect,
      onClean() {
        count();
        const next = bedtime(play, limitMs);
        // Saved now, not when the lock screen shows: a reload during the cheer must not dodge it.
        if (next === 'lock') {
          play.locked = true;
          save();
        }
        return next;
      },
      onOneMore() {
        play.oneMore = true;
        save();
      },
      onSleep: sleep,
    }).catch((error: unknown) => {
      // A vehicle that failed to load would leave a screen with nothing to do: go back to choose again.
      console.error(error);
      if (!signal.aborted) showSelect();
    });
  });
}

function sleep() {
  count();
  play.locked = true;
  save();
  const vehicle = vehicles.find((v) => v.name === play.vehicle) ?? vehicles[0];
  show((root) => mountLock(root, vehicle, wake));
}

/** An adult unlocked the game: back to zero, and another 25 minutes of play. */
function wake() {
  Object.assign(play, { ...FRESH, vehicle: play.vehicle });
  save();
  showSelect();
}

if (play.locked) sleep();
else {
  count();
  showSelect();
}
