import { cabWindow, crawler, cylinder, glass } from './parts';
import type { Vehicle } from './types';

// Lit from the top left: each part is #fbc02d, with #ffe082 along its upper edges and #f9a825 along its lower ones.
export const excavator: Vehicle = {
  name: 'しょべるかー',
  width: 420,
  height: 260,
  shapes: `
  ${crawler(24, 198, 238, 52)}
  <rect x="96" y="186" width="120" height="14" fill="#424242"/>
  <path d="M92 122 V108 H164 V122" fill="none" stroke="#616161" stroke-width="4"/>
  <rect x="106" y="102" width="8" height="26" rx="2" fill="#616161"/>
  <line x1="108.5" y1="106" x2="108.5" y2="122" stroke="#9e9e9e" stroke-width="2"/>
  <rect x="80" y="118" width="96" height="16" rx="5" fill="#ffe082"/>
  <rect x="80" y="126" width="96" height="24" rx="4" fill="#fbc02d"/>
  <rect x="40" y="142" width="222" height="50" rx="8" fill="#fbc02d"/>
  <path d="M40 182 H262 V184 Q262 192 254 192 H48 Q40 192 40 184 Z" fill="#f9a825"/>
  <g stroke="#f57f17" stroke-width="3"><line x1="100" y1="154" x2="100" y2="176"/><line x1="114" y1="154" x2="114" y2="176"/><line x1="128" y1="154" x2="128" y2="176"/><line x1="142" y1="154" x2="142" y2="176"/></g>
  <g stroke="#ffe082" stroke-width="2"><line x1="103" y1="154" x2="103" y2="176"/><line x1="117" y1="154" x2="117" y2="176"/><line x1="131" y1="154" x2="131" y2="176"/><line x1="145" y1="154" x2="145" y2="176"/></g>
  <path d="M88 134 V196 H46 Q16 196 16 165 Q16 134 46 134 Z" fill="#fbc02d"/>
  <path d="M20 168 Q22 192 46 192 H86" fill="none" stroke="#f9a825" stroke-width="8"/>
  <path d="M20 164 Q20 138 46 138 H84" fill="none" stroke="#ffe082" stroke-width="5"/>
  <line x1="88" y1="136" x2="88" y2="194" stroke="#f57f17" stroke-width="3"/>
  <path d="M226 144 L276 70 L282 50 L296 54 L341 47 A11 11 0 0 1 347 69 L306 86 L246 160 Z" fill="#fbc02d"/>
  <path d="M345 65 L304 83 L243 157" fill="none" stroke="#f9a825" stroke-width="8"/>
  <path d="M228 145 L278 71 M296 56 L340 50" fill="none" stroke="#ffe082" stroke-width="5"/>
  <rect x="254" y="111" width="12" height="10" rx="2" fill="#424242"/>
  <rect x="264" y="112" width="4" height="8" rx="1" fill="#fff59d"/>
  ${cylinder(256, 172, 290, 106)}
  ${cylinder(283, 55, 338, 36)}
  <line x1="338" y1="36" x2="378" y2="176" stroke="#fbc02d" stroke-width="18"/>
  <line x1="342.8" y1="34.6" x2="382.8" y2="174.6" stroke="#f9a825" stroke-width="8"/>
  <line x1="331.8" y1="37.8" x2="371.8" y2="177.8" stroke="#ffe082" stroke-width="4"/>
  ${cylinder(353, 44, 383, 150)}
  <g stroke="#757575" stroke-width="6"><line x1="370" y1="160" x2="383" y2="150"/><line x1="383" y1="150" x2="398" y2="172"/></g>
  <path d="M370 168 L400 168 Q418 204 390 234 L352 238 Q364 206 370 168 Z" fill="#616161"/>
  <path d="M375 173 L396 173 Q410 204 387 228 L362 232 Q371 206 375 173 Z" fill="#757575"/>
  <path d="M357 230 Q366 206 372 172" fill="none" stroke="#9e9e9e" stroke-width="3"/>
  <path d="M356 232 l-14 8 l15 1 Z M370 234 l-13 9 l15 0 Z" fill="#bdbdbd"/>
  <g fill="#424242"><circle cx="344" cy="58" r="6"/><circle cx="378" cy="176" r="6"/></g>
  <g fill="#757575"><circle cx="342.5" cy="56.5" r="2.5"/><circle cx="376.5" cy="174.5" r="2.5"/></g>
  <path d="M174 176 V80 Q174 66 188 65 L238 62 Q248 62 249 72 L254 176 Z" fill="#fbc02d"/>
  <path d="M246 72 L251 174" stroke="#f9a825" stroke-width="6"/>
  <path d="M177 172 V80 Q177 69 189 68 L238 65" fill="none" stroke="#ffe082" stroke-width="5"/>
  ${cabWindow(182, 72, 60, 62)}
  ${glass(182, 142, 50, 26, 4)}
  <rect x="236" y="150" width="10" height="4" rx="2" fill="#424242"/>
  <path d="M225 60 Q225 48 232 48 Q239 48 239 60 Z" fill="#ff9800"/>
  <ellipse cx="229.5" cy="53" rx="2" ry="3" fill="#fff" fill-opacity=".7"/>
  <rect x="222" y="58" width="20" height="6" rx="2" fill="#424242"/>`,
};
