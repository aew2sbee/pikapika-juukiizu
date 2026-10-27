import { beacon, cabWindow, crawler, cylinder, YELLOW } from './parts';
import type { Vehicle } from './types';

const { light, base, dark, deep } = YELLOW;
const louvers = (dx: number) => [226, 240, 254, 268, 282].map((x) => `<line x1="${x + dx}" y1="144" x2="${x + dx}" y2="172"/>`).join('');

export const bulldozer: Vehicle = {
  name: 'ぶるどーざー',
  width: 420,
  height: 260,
  shapes: `
  <rect x="52" y="148" width="16" height="42" rx="3" fill="#616161"/>
  <g stroke="#757575" stroke-width="7"><line x1="58" y1="154" x2="38" y2="148"/><line x1="58" y1="184" x2="36" y2="176"/></g>
  <path d="M44 140 L28 140 L18 222 L26 238 L34 230 L36 170 L44 170 Z" fill="#616161"/>
  <path d="M28 146 L20 220" stroke="#9e9e9e" stroke-width="3"/>
  <path d="M18 222 L26 238 L30 228 Z" fill="#bdbdbd"/>
  ${crawler(50, 196, 272, 54)}
  <rect x="62" y="140" width="146" height="56" rx="8" fill="${base}"/>
  <path d="M62 186 H208 V188 Q208 196 200 196 H70 Q62 196 62 188 Z" fill="${dark}"/>
  <rect x="276" y="88" width="10" height="34" rx="2" fill="#616161"/>
  <line x1="278.5" y1="92" x2="278.5" y2="118" stroke="#9e9e9e" stroke-width="2"/>
  <path d="M274 90 L276 82 H292 L290 90 Z" fill="#424242"/>
  <rect x="234" y="100" width="16" height="22" rx="3" fill="#424242"/>
  <rect x="231" y="96" width="22" height="7" rx="3" fill="#616161"/>
  <rect x="202" y="116" width="132" height="16" rx="5" fill="${light}"/>
  <rect x="202" y="124" width="132" height="72" rx="4" fill="${base}"/>
  <rect x="202" y="184" width="132" height="12" fill="${dark}"/>
  <g stroke="${deep}" stroke-width="3">${louvers(0)}</g>
  <g stroke="${light}" stroke-width="2">${louvers(3)}</g>
  <rect x="326" y="120" width="16" height="76" rx="3" fill="#424242"/>
  <g stroke="#757575" stroke-width="3"><line x1="329" y1="132" x2="339" y2="132"/><line x1="329" y1="144" x2="339" y2="144"/><line x1="329" y1="156" x2="339" y2="156"/><line x1="329" y1="168" x2="339" y2="168"/><line x1="329" y1="180" x2="339" y2="180"/></g>
  <path d="M96 146 V62 Q96 50 108 50 H186 Q198 50 198 62 V146 Z" fill="${base}"/>
  <path d="M195 62 V142" stroke="${dark}" stroke-width="6"/>
  <path d="M99 142 V64 Q99 53 110 53 H184" fill="none" stroke="${light}" stroke-width="5"/>
  ${cabWindow(108, 62, 78, 66)}
  ${beacon(178, 50)}
  <line x1="196" y1="224" x2="360" y2="238" stroke="${base}" stroke-width="14"/>
  <line x1="196" y1="219" x2="360" y2="233" stroke="${light}" stroke-width="3"/>
  <line x1="196" y1="229" x2="360" y2="243" stroke="${dark}" stroke-width="4"/>
  <circle cx="196" cy="224" r="6" fill="#424242"/>
  <line x1="330" y1="234" x2="356" y2="192" stroke="#757575" stroke-width="6"/>
  ${cylinder(306, 132, 360, 158)}
  <path d="M354 116 L384 106 Q394 106 390 116 Q370 176 394 242 L394 250 L358 250 Z" fill="${base}"/>
  <path d="M358 118 L361 240" stroke="${light}" stroke-width="4"/>
  <path d="M385 118 Q366 176 388 238" fill="none" stroke="${dark}" stroke-width="8"/>
  <path d="M356 240 H394 V250 H358 Z" fill="#616161"/>
  <line x1="358" y1="242" x2="392" y2="242" stroke="#9e9e9e" stroke-width="2"/>`,
};
