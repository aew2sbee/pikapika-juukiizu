import { face, wheels } from './parts';
import type { Vehicle } from './types';

export const crane: Vehicle = {
  name: 'クレーン車',
  width: 420,
  height: 260,
  shapes: `
  <g stroke-linecap="round" stroke-linejoin="round">
    <g fill="#757575"><rect x="40" y="176" width="14" height="46"/><rect x="368" y="176" width="14" height="46"/></g>
    <g fill="#9e9e9e"><rect x="32" y="218" width="30" height="8" rx="2"/><rect x="360" y="218" width="30" height="8" rx="2"/></g>
    <rect x="22" y="152" width="378" height="38" rx="8" fill="#fbc02d"/>
    <rect x="330" y="104" width="66" height="52" rx="10" fill="#fbc02d"/>
    <rect x="340" y="112" width="46" height="30" rx="6" fill="#b3e5fc"/>
    <line x1="392" y1="20" x2="392" y2="92" stroke="#424242" stroke-width="3"/>
    <path d="M392 92 l0 10 q0 10 -9 10 q-8 0 -8 -8" fill="none" stroke="#616161" stroke-width="5"/>
    <rect x="140" y="128" width="140" height="28" rx="8" fill="#f9a825"/>
    <line x1="230" y1="134" x2="300" y2="84" stroke="#9e9e9e" stroke-width="9"/>
    <line x1="246" y1="126" x2="392" y2="20" stroke="#fbc02d" stroke-width="22"/>
    <line x1="262" y1="114" x2="380" y2="29" stroke="#f9a825" stroke-width="6"/>
    <circle cx="246" cy="126" r="9" fill="#616161"/>
    <circle cx="392" cy="20" r="8" fill="#616161"/>
    <rect x="150" y="54" width="86" height="80" rx="14" fill="#fbc02d"/>
    <rect x="162" y="66" width="62" height="56" rx="10" fill="#b3e5fc"/>
    ${face(193, 94)}
    ${wheels([84, 146, 284, 346], 204, 26)}
  </g>`,
};
