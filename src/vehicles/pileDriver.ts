import { face, track } from './parts';
import type { Vehicle } from './types';

export const pileDriver: Vehicle = {
  name: 'ぱいるどらいばー',
  width: 420,
  height: 260,
  shapes: `
  <g stroke-linecap="round" stroke-linejoin="round">
    <rect x="324" y="88" width="14" height="164" fill="#a1887f"/>
    ${track(40, 196, 250, 52, [68, 114, 165, 216, 262])}
    <rect x="120" y="184" width="90" height="14" fill="#616161"/>
    <rect x="40" y="140" width="34" height="46" rx="12" fill="#f9a825"/>
    <rect x="54" y="130" width="230" height="60" rx="12" fill="#fbc02d"/>
    <line x1="262" y1="140" x2="320" y2="56" stroke="#9e9e9e" stroke-width="8"/>
    <line x1="276" y1="180" x2="318" y2="196" stroke="#9e9e9e" stroke-width="8"/>
    <rect x="316" y="8" width="30" height="232" rx="4" fill="#fbc02d"/>
    <g stroke="#f9a825" stroke-width="4">
      <line x1="316" y1="40" x2="346" y2="70"/><line x1="346" y1="100" x2="316" y2="130"/>
      <line x1="316" y1="160" x2="346" y2="190"/><line x1="346" y1="210" x2="316" y2="236"/>
    </g>
    <rect x="308" y="44" width="46" height="46" rx="6" fill="#616161"/>
    <circle cx="331" cy="10" r="9" fill="#616161"/>
    <rect x="150" y="58" width="84" height="84" rx="14" fill="#fbc02d"/>
    <rect x="162" y="70" width="60" height="56" rx="10" fill="#b3e5fc"/>
    ${face(192, 98)}
  </g>`,
};
