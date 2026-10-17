import { truck } from './parts';
import type { Vehicle } from './types';

export const dumpTruck: Vehicle = {
  name: 'だんぷとらっく',
  width: 420,
  height: 260,
  shapes: truck(
    '#fbc02d',
    `
    <path d="M24 84 L272 70 L262 176 L42 176 Z" fill="#f9a825"/>
    <g stroke="#f57f17" stroke-width="5">
      <line x1="90" y1="82" x2="94" y2="172"/><line x1="150" y1="78" x2="152" y2="172"/><line x1="210" y1="75" x2="210" y2="172"/>
    </g>
    <rect x="18" y="76" width="258" height="12" rx="4" fill="#f57f17"/>`,
  ),
};
