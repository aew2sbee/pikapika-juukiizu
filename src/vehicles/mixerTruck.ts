import { face, wheels } from './parts';
import type { Vehicle } from './types';

export const mixerTruck: Vehicle = {
  name: 'みきさーしゃ',
  width: 420,
  height: 260,
  shapes: `
  <g stroke-linecap="round" stroke-linejoin="round">
    <rect x="30" y="172" width="360" height="22" rx="4" fill="#424242"/>
    <g fill="#616161"><rect x="58" y="110" width="16" height="64" rx="3"/><rect x="196" y="156" width="20" height="18" rx="3"/></g>
    <path d="M58 114 L22 150 L30 158 L68 122 Z" fill="#9e9e9e"/>
    <path d="M68 57 L202 56 Q262 70 262 128 Q250 172 178 170 L56 115 Q44 86 68 57 Z" fill="#eceff1" stroke="#b0bec5" stroke-width="4"/>
    <g fill="#ff7043">
      <path d="M100 57 L118 57 L98 134 L80 126 Z"/><path d="M150 56 L168 56 L148 156 L130 148 Z"/><path d="M204 57 L220 60 L196 170 L182 170 Z"/>
    </g>
    <path d="M42 34 L86 34 L76 60 L56 60 Z" fill="#90a4ae" stroke="#78909c" stroke-width="3"/>
    <rect x="282" y="74" width="110" height="108" rx="16" fill="#1e88e5"/>
    <rect x="296" y="86" width="82" height="62" rx="10" fill="#b3e5fc"/>
    ${face(337, 117)}
    <rect x="378" y="164" width="22" height="16" rx="4" fill="#757575"/>
    <circle cx="388" cy="156" r="6" fill="#fff59d"/>
    ${wheels([82, 150, 334], 204, 30)}
  </g>`,
};
