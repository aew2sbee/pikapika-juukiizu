import { cabWindow, wheels } from './parts';
import type { Vehicle } from './types';

export const crane: Vehicle = {
  name: 'くれーんしゃ',
  width: 420,
  height: 260,
  shapes: `
  <g fill="#757575"><rect x="36" y="176" width="14" height="46"/><rect x="372" y="176" width="14" height="46"/></g>
  <g fill="#9e9e9e"><rect x="28" y="218" width="30" height="8" rx="2"/><rect x="364" y="218" width="30" height="8" rx="2"/></g>
  <rect x="22" y="158" width="370" height="36" rx="8" fill="#fbc02d"/>
  <rect x="86" y="124" width="124" height="38" rx="8" fill="#f9a825"/>
  <rect x="92" y="90" width="44" height="38" rx="6" fill="#f9a825"/>
  <rect x="100" y="98" width="28" height="20" rx="4" fill="#b3e5fc"/>
  <rect x="294" y="78" width="100" height="90" rx="16" fill="#fbc02d"/>
  ${cabWindow(306, 90, 76, 58)}
  <circle cx="390" cy="156" r="6" fill="#fff59d"/>
  <line x1="404" y1="16" x2="404" y2="44" stroke="#424242" stroke-width="3"/>
  <rect x="392" y="42" width="24" height="20" rx="4" fill="#ffb300"/>
  <path d="M404 62 l0 8 q0 10 -9 10 q-8 0 -8 -8" fill="none" stroke="#616161" stroke-width="5"/>
  <line x1="196" y1="150" x2="250" y2="96" stroke="#9e9e9e" stroke-width="10"/>
  <line x1="160" y1="132" x2="290" y2="68" stroke="#fbc02d" stroke-width="26"/>
  <line x1="284" y1="71" x2="404" y2="12" stroke="#fdd835" stroke-width="16"/>
  <circle cx="160" cy="132" r="10" fill="#616161"/>
  <circle cx="404" cy="12" r="8" fill="#616161"/>
  ${wheels([80, 140, 280, 340], 206, 26)}`,
};
