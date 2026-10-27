import { cabWindow, crawler, cylinder } from './parts';
import type { Vehicle } from './types';

export const excavator: Vehicle = {
  name: 'しょべるかー',
  width: 420,
  height: 260,
  shapes: `
  ${crawler(24, 198, 238, 52)}
  <rect x="96" y="186" width="120" height="14" fill="#424242"/>
  <path d="M92 122 V108 H164 V122" fill="none" stroke="#616161" stroke-width="4"/>
  <rect x="106" y="104" width="8" height="26" rx="2" fill="#616161"/>
  <rect x="80" y="124" width="96" height="24" rx="6" fill="#fbc02d"/>
  <rect x="40" y="142" width="222" height="50" rx="8" fill="#fbc02d"/>
  <g stroke="#f9a825" stroke-width="4"><line x1="100" y1="154" x2="100" y2="180"/><line x1="114" y1="154" x2="114" y2="180"/><line x1="128" y1="154" x2="128" y2="180"/><line x1="142" y1="154" x2="142" y2="180"/></g>
  <path d="M88 134 V196 H46 Q16 196 16 165 Q16 134 46 134 Z" fill="#f9a825"/>
  <path d="M226 144 L276 70 L282 50 L296 54 L341 47 A11 11 0 0 1 347 69 L306 86 L246 160 Z" fill="#fbc02d"/>
  <rect x="254" y="111" width="12" height="10" rx="2" fill="#424242"/>
  <rect x="264" y="112" width="4" height="8" rx="1" fill="#fff59d"/>
  ${cylinder(256, 172, 290, 106)}
  ${cylinder(283, 55, 338, 36)}
  <line x1="338" y1="36" x2="378" y2="176" stroke="#f9a825" stroke-width="18"/>
  ${cylinder(353, 44, 383, 150)}
  <g stroke="#757575" stroke-width="6"><line x1="370" y1="160" x2="383" y2="150"/><line x1="383" y1="150" x2="398" y2="172"/></g>
  <path d="M370 168 L400 168 Q418 204 390 234 L352 238 Q364 206 370 168 Z" fill="#616161"/>
  <path d="M356 232 l-14 8 l15 1 Z M370 234 l-13 9 l15 0 Z" fill="#9e9e9e"/>
  <g fill="#424242"><circle cx="344" cy="58" r="6"/><circle cx="378" cy="176" r="6"/></g>
  <path d="M174 176 V80 Q174 66 188 65 L238 62 Q248 62 249 72 L254 176 Z" fill="#fbc02d"/>
  ${cabWindow(182, 72, 60, 62)}
  <rect x="182" y="142" width="50" height="26" rx="4" fill="#b3e5fc"/>
  <rect x="236" y="150" width="10" height="4" rx="2" fill="#424242"/>
  <path d="M225 60 Q225 48 232 48 Q239 48 239 60 Z" fill="#ff9800"/>
  <rect x="222" y="58" width="20" height="6" rx="2" fill="#424242"/>`,
};
