// The select screen: a big card for each vehicle; tapping one opens its wash.

import { unlockAudio } from './sound';
import { vehicleSvg } from './vehicles';
import type { Vehicle } from './vehicles/types';

export function mountSelect(root: HTMLElement, vehicles: Vehicle[], onPick: (vehicle: Vehicle) => void): void {
  root.classList.add('pick');
  root.innerHTML = `
    <div class="select">
      <h1 class="title">どの くるまを あらう？</h1>
      <div class="cards">
        ${vehicles
          .map(
            (vehicle) => `
          <button class="card" type="button" data-mood="normal">
            ${vehicleSvg(vehicle)}
            <span>${vehicle.name}</span>
          </button>`,
          )
          .join('')}
      </div>
    </div>`;
  root.querySelectorAll('.card').forEach((card, i) => {
    card.addEventListener('click', () => {
      // A tap is a user gesture: a good moment to let sound play on the next screen.
      unlockAudio();
      onPick(vehicles[i]);
    });
  });
}
