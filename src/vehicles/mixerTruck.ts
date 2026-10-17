import { face, wheels } from './parts';
import type { Vehicle } from './types';

export const mixerTruck: Vehicle = {
  name: 'ミキサー車',
  width: 420,
  height: 260,
  shapes: `
  <g stroke-linecap="round" stroke-linejoin="round">
    <rect x="30" y="172" width="360" height="22" rx="4" fill="#424242"/>
    <path d="M40 118 L14 150 L24 158 L52 128 Z" fill="#9e9e9e"/>
    <g fill="#616161"><rect x="70" y="150" width="14" height="26"/><rect x="226" y="140" width="14" height="36"/></g>
    <g transform="rotate(-12 150 112)">
      <ellipse cx="150" cy="112" rx="120" ry="58" fill="#eceff1" stroke="#b0bec5" stroke-width="4"/>
      <g fill="#ff7043">
        <ellipse cx="96" cy="112" rx="11" ry="48"/><ellipse cx="156" cy="112" rx="11" ry="54"/><ellipse cx="216" cy="112" rx="11" ry="44"/>
      </g>
    </g>
    <rect x="282" y="74" width="110" height="108" rx="16" fill="#1e88e5"/>
    <rect x="296" y="86" width="82" height="62" rx="10" fill="#b3e5fc"/>
    ${face(337, 117)}
    <rect x="378" y="164" width="22" height="16" rx="4" fill="#757575"/>
    <circle cx="388" cy="156" r="6" fill="#fff59d"/>
    ${wheels([82, 150, 334], 204, 30)}
  </g>`,
};
