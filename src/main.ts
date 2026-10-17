import './style.css';
import { mountCleaning } from './cleaning';
import { isPreview } from './env';
import { garage } from './garage';
import { mountSelect } from './select';
import { vehicles } from './vehicles';
import type { Vehicle } from './vehicles/types';

document.body.insertAdjacentHTML('afterbegin', `<div class="garage">${garage}</div>`);
if (isPreview) document.body.insertAdjacentHTML('beforeend', '<div class="badge">プレビュー</div>');

const app = document.querySelector<HTMLDivElement>('#app')!;
let screen: AbortController | undefined;

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
  show((root, signal) => {
    mountCleaning(root, vehicle, { signal, onBack: showSelect }).catch((error: unknown) => {
      // A vehicle that failed to load would leave a screen with nothing to do: go back to choose again.
      console.error(error);
      if (!signal.aborted) showSelect();
    });
  });
}

showSelect();
