import { face, wheels } from './parts';
import type { Vehicle } from './types';

export const dumpTruck: Vehicle = {
  name: 'ダンプトラック',
  width: 420,
  height: 260,
  shapes: `
  <g stroke-linecap="round" stroke-linejoin="round">
    <rect x="30" y="172" width="360" height="22" rx="4" fill="#424242"/>
    <path d="M24 84 L272 70 L262 176 L42 176 Z" fill="#f9a825"/>
    <g stroke="#f57f17" stroke-width="5">
      <line x1="90" y1="82" x2="94" y2="172"/><line x1="150" y1="78" x2="152" y2="172"/><line x1="210" y1="75" x2="210" y2="172"/>
    </g>
    <rect x="18" y="76" width="258" height="12" rx="4" fill="#f57f17"/>
    <rect x="282" y="74" width="110" height="108" rx="16" fill="#fbc02d"/>
    <rect x="296" y="86" width="82" height="62" rx="10" fill="#b3e5fc"/>
    ${face(337, 117)}
    <rect x="378" y="164" width="22" height="16" rx="4" fill="#757575"/>
    <circle cx="388" cy="156" r="6" fill="#fff59d"/>
    ${wheels([82, 150, 334], 204, 30)}
  </g>`,
};
