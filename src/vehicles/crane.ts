import { face, wheels } from './parts';
import type { Vehicle } from './types';

export const crane: Vehicle = {
  name: 'くれーんしゃ',
  width: 420,
  height: 260,
  shapes: `
  <g stroke-linecap="round" stroke-linejoin="round">
    <g fill="#757575"><rect x="36" y="176" width="14" height="46"/><rect x="372" y="176" width="14" height="46"/></g>
    <g fill="#9e9e9e"><rect x="28" y="218" width="30" height="8" rx="2"/><rect x="364" y="218" width="30" height="8" rx="2"/></g>
    <line x1="60" y1="16" x2="60" y2="100" stroke="#424242" stroke-width="3"/>
    <rect x="48" y="98" width="24" height="20" rx="4" fill="#ffb300"/>
    <path d="M60 118 l0 8 q0 10 -9 10 q-8 0 -8 -8" fill="none" stroke="#616161" stroke-width="5"/>
    <line x1="194" y1="150" x2="122" y2="92" stroke="#9e9e9e" stroke-width="10"/>
    <line x1="150" y1="140" x2="94" y2="60" stroke="#fbc02d" stroke-width="26"/>
    <line x1="100" y1="68" x2="62" y2="14" stroke="#fdd835" stroke-width="16"/>
    <circle cx="60" cy="12" r="8" fill="#616161"/>
    <rect x="22" y="158" width="370" height="36" rx="8" fill="#fbc02d"/>
    <rect x="118" y="128" width="136" height="34" rx="8" fill="#f9a825"/>
    <rect x="212" y="96" width="42" height="36" rx="6" fill="#f9a825"/>
    <rect x="220" y="104" width="26" height="20" rx="4" fill="#b3e5fc"/>
    <circle cx="150" cy="140" r="10" fill="#616161"/>
    <rect x="294" y="78" width="100" height="90" rx="16" fill="#fbc02d"/>
    <rect x="306" y="90" width="76" height="58" rx="10" fill="#b3e5fc"/>
    ${face(344, 120)}
    <circle cx="390" cy="156" r="6" fill="#fff59d"/>
    ${wheels([80, 140, 280, 340], 206, 26)}
  </g>`,
};
