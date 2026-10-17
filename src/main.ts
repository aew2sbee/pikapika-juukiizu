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

/** Swaps the screen in #app, taking down the one before (its listeners, timers, water and sound). */
function show(mount: (signal: AbortSignal) => void) {
  screen?.abort();
  screen = new AbortController();
  app.replaceChildren();
  mount(screen.signal);
}

function showSelect() {
  show(() => mountSelect(app, vehicles, showCleaning));
}

function showCleaning(vehicle: Vehicle) {
  show((signal) => void mountCleaning(app, vehicle, { signal, onBack: showSelect }));
}

showSelect();
