import { BLUE, truck, WHITE } from './parts';
import type { Vehicle } from './types';

/** The white band along the cab. */
const STRIPE = '#fff';
const rungs = [72, 88, 104, 120, 136, 152, 168, 184].map((y) => `<line x1="26" y1="${y}" x2="38" y2="${y}"/>`).join('');

export const mixerTruck: Vehicle = {
  name: 'みきさーしゃ',
  width: 420,
  height: 260,
  shapes: truck(
    BLUE,
    `
    <g stroke="#757575" stroke-width="3"><line x1="26" y1="60" x2="26" y2="190"/><line x1="38" y1="60" x2="38" y2="190"/>${rungs}</g>
    <g fill="#616161"><rect x="70" y="120" width="20" height="70"/><rect x="250" y="130" width="20" height="60"/></g>
    <rect x="282" y="64" width="16" height="124" rx="6" fill="#cfd8dc"/>
    <rect x="284" y="68" width="4" height="116" rx="2" fill="#fff"/>
    <path d="M55 50 Q140 38 210 40 L249 48 C283 55 292 98 284 112 C276 138 254 160 227 157 L188 149 Q110 120 49 78 Z" fill="${WHITE.dark}"/>
    <path d="M55 50 Q140 38 210 40 L249 48 C281 55 290 96 280 110 C262 134 230 140 200 134 Q120 110 52 70 Z" fill="${WHITE.base}"/>
    <path d="M60 52 Q140 41 210 43 L246 51" fill="none" stroke="${WHITE.light}" stroke-width="5"/>
    <g fill="#ff7043">
      <path d="M100 45 L122 43 Q132 92 152 133 L132 124 Q110 92 100 45 Z"/>
      <path d="M160 40 L184 40 Q190 100 214 152 L190 147 Q168 100 160 40 Z"/>
      <path d="M232 45 L254 51 Q258 110 262 146 L244 155 Q244 100 232 45 Z"/>
    </g>
    <path d="M47 76 L55 50" stroke="#616161" stroke-width="7"/>
    <path d="M30 20 H80 L68 44 H42 Z" fill="#90a4ae"/>
    <path d="M30 20 H80 L78 25 H32 Z" fill="#cfd8dc"/>
    <rect x="48" y="42" width="14" height="12" fill="#78909c"/>
    <path d="M46 84 L22 132" stroke="#78909c" stroke-width="10"/>
    <path d="M43 84 L19 130" stroke="#b0bec5" stroke-width="3"/>`,
    STRIPE,
  ),
};
