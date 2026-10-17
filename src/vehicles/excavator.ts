import { face, track } from './parts';
import type { Vehicle } from './types';

export const excavator: Vehicle = {
  name: 'しょべるかー',
  width: 420,
  height: 260,
  shapes: `
  <g stroke-linecap="round" stroke-linejoin="round">
    ${track(40, 196, 250, 52, [68, 114, 165, 216, 262])}
    <rect x="120" y="184" width="90" height="14" fill="#616161"/>
    <rect x="80" y="110" width="9" height="24" rx="3" fill="#616161"/>
    <rect x="40" y="140" width="34" height="46" rx="12" fill="#f9a825"/>
    <rect x="54" y="130" width="200" height="60" rx="12" fill="#fbc02d"/>
    <line x1="215" y1="140" x2="300" y2="84" stroke="#9e9e9e" stroke-width="8"/>
    <line x1="245" y1="146" x2="335" y2="50" stroke="#fbc02d" stroke-width="26"/>
    <line x1="335" y1="50" x2="370" y2="148" stroke="#f9a825" stroke-width="18"/>
    <circle cx="245" cy="146" r="8" fill="#616161"/>
    <circle cx="335" cy="50" r="8" fill="#616161"/>
    <path d="M356 142 L396 150 L392 190 L372 204 L350 196 Q362 172 356 142 Z" fill="#616161"/>
    <path d="M350 196 l-6 9 l11 -3 Z M362 201 l-4 10 l10 -6 Z M374 203 l1 10 l7 -9 Z" fill="#9e9e9e"/>
    <rect x="158" y="58" width="84" height="84" rx="14" fill="#fbc02d"/>
    <rect x="170" y="70" width="60" height="56" rx="10" fill="#b3e5fc"/>
    ${face(200, 98)}
  </g>`,
};
