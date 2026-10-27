import { bar, cylinder, shovel, YELLOW } from './parts';
import type { Vehicle } from './types';

const { light, base, dark } = YELLOW;

export const excavator: Vehicle = {
  name: 'しょべるかー',
  width: 420,
  height: 260,
  shapes: shovel(
    YELLOW,
    `
    <path d="M226 144 L276 70 L282 50 L296 54 L341 47 A11 11 0 0 1 347 69 L306 86 L246 160 Z" fill="${base}"/>
    <path d="M345 65 L304 83 L243 157" fill="none" stroke="${dark}" stroke-width="8"/>
    <path d="M228 145 L278 71 M296 56 L340 50" fill="none" stroke="${light}" stroke-width="5"/>
    <rect x="254" y="111" width="12" height="10" rx="2" fill="#424242"/>
    <rect x="264" y="112" width="4" height="8" rx="1" fill="#fff59d"/>
    ${cylinder(256, 172, 290, 106)}
    ${cylinder(283, 55, 338, 36)}
    ${bar(338, 36, 378, 176, 18, YELLOW)}
    ${cylinder(353, 44, 383, 150)}
    <g stroke="#757575" stroke-width="6"><line x1="370" y1="160" x2="383" y2="150"/><line x1="383" y1="150" x2="398" y2="172"/></g>
    <path d="M370 168 L400 168 Q418 204 390 234 L352 238 Q364 206 370 168 Z" fill="#616161"/>
    <path d="M375 173 L396 173 Q410 204 387 228 L362 232 Q371 206 375 173 Z" fill="#757575"/>
    <path d="M357 230 Q366 206 372 172" fill="none" stroke="#9e9e9e" stroke-width="3"/>
    <path d="M356 232 l-14 8 l15 1 Z M370 234 l-13 9 l15 0 Z" fill="#bdbdbd"/>
    <g fill="#424242"><circle cx="344" cy="58" r="6"/><circle cx="378" cy="176" r="6"/></g>
    <g fill="#757575"><circle cx="342.5" cy="56.5" r="2.5"/><circle cx="376.5" cy="174.5" r="2.5"/></g>`,
  ),
};
