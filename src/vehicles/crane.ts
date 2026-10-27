import { beacon, cabWindow, cylinder, round, WHITE, wheels } from './parts';
import type { Vehicle } from './types';

const { light, base, dark, deep } = WHITE;
const RED = '#e53935';

// A rough-terrain crane: one cab, four big tyres, outriggers down, and a telescopic boom raised
// from its foot at the back of the turning body.
const [FOOT_X, FOOT_Y] = [140, 124];
const ANGLE = (24 * Math.PI) / 180;
const [UX, UY] = [Math.cos(ANGLE), -Math.sin(ANGLE)];

/** The point s along the boom from its foot, pushed d square to it (downwards). */
function along(s: number, d = 0): string {
  return `${round(FOOT_X + UX * s - UY * d)} ${round(FOOT_Y + UY * s + UX * d)}`;
}

/** One telescopic section of the boom, from s0 to s1 along it and `width` thick, with a collar at its mouth. */
function section(s0: number, s1: number, width: number): string {
  const strip = (d: number, color: string, w: number, from = s0) =>
    `<path d="M${along(from, d)} L${along(s1, d)}" stroke="${color}" stroke-width="${w}" stroke-linecap="butt"/>`;
  return `${strip(0, base, width)}${strip(-width / 2 + 1.5, light, 3)}${strip(width / 2 - 2.5, dark, 5)}${strip(0, deep, width + 2, s1 - 5)}`;
}

/** An outrigger at x: its red box on the carrier, and the jack pushed down onto a pad. */
function outrigger(x: number): string {
  return `${cylinder(x, 186, x, 236, 14)}
  <rect x="${x - 16}" y="236" width="32" height="10" rx="2" fill="#757575"/>
  <rect x="${x - 16}" y="236" width="32" height="3" rx="1.5" fill="#bdbdbd"/>
  <rect x="${x - 12}" y="170" width="24" height="20" rx="3" fill="${RED}"/>
  <rect x="${x - 12}" y="170" width="24" height="5" rx="2" fill="#ef9a9a"/>`;
}

export const crane: Vehicle = {
  name: 'くれーんしゃ',
  width: 420,
  height: 260,
  shapes: `
  <path d="M40 172 Q40 164 48 164 H362 Q370 164 370 172 V202 H334 A38 38 0 0 0 258 202 H138 A38 38 0 0 0 62 202 H40 Z" fill="${base}"/>
  <path d="M43 200 V172 Q43 167 48 167 H362" fill="none" stroke="${light}" stroke-width="4"/>
  <path d="M40 199 H62 M138 199 H258 M334 199 H370" stroke="${dark}" stroke-width="6" stroke-linecap="butt"/>
  <rect x="40" y="180" width="330" height="7" fill="${RED}"/>
  <g fill="#212121"><path d="M62 202 A38 38 0 0 1 138 202 Z"/><path d="M258 202 A38 38 0 0 1 334 202 Z"/></g>
  <rect x="364" y="170" width="8" height="10" rx="2" fill="#fff59d"/>
  <rect x="130" y="156" width="120" height="10" fill="#424242"/>
  <rect x="112" y="132" width="140" height="30" rx="6" fill="${base}"/>
  <path d="M115 159 V138 Q115 135 118 135 H248" fill="none" stroke="${light}" stroke-width="4"/>
  <rect x="112" y="154" width="140" height="8" fill="${dark}"/>
  <path d="M152 118 V164 H120 Q100 164 100 144 V138 Q100 118 120 118 Z" fill="${RED}"/>
  <path d="M104 146 V138 Q104 122 120 122 H150" fill="none" stroke="#ef9a9a" stroke-width="4"/>
  <path d="M104 150 Q106 160 120 160 H150" fill="none" stroke="#c62828" stroke-width="6"/>
  ${cylinder(204, 160, 234, 99, 16)}
  ${section(214, 262, 15)}
  ${section(170, 224, 19)}
  ${section(110, 180, 24)}
  ${section(-6, 120, 30)}
  <circle cx="${FOOT_X}" cy="${FOOT_Y}" r="8" fill="#424242"/>
  <path d="M${along(258, -12)} L${along(272, -12)} L${along(272, 12)} L${along(258, 12)} Z" fill="${RED}"/>
  <line x1="393" y1="16" x2="393" y2="100" stroke="#424242" stroke-width="2"/>
  <circle cx="383" cy="15.8" r="10" fill="#616161"/>
  <circle cx="381.5" cy="14.3" r="6" fill="#9e9e9e"/>
  <circle cx="383" cy="15.8" r="3" fill="#424242"/>
  <rect x="382" y="98" width="22" height="30" rx="4" fill="#fbc02d"/>
  <path d="M382 110 L394 98 H400 L382 116 Z M386 128 L404 110 V116 L392 128 Z" fill="#424242"/>
  <rect x="382" y="98" width="22" height="4" rx="2" fill="#ffe082"/>
  <path d="M393 128 V136 Q393 148 383 148 Q375 148 375 140" fill="none" stroke="#616161" stroke-width="5"/>
  <path d="M236 170 V104 Q236 92 248 92 H290 Q298 92 302 100 L314 158 V170 Z" fill="${base}"/>
  <path d="M239 166 V104 Q239 95 248 95 H288" fill="none" stroke="${light}" stroke-width="4"/>
  <path d="M236 167 H314" stroke="${dark}" stroke-width="6"/>
  ${cabWindow(244, 102, 56, 56)}
  <path d="M302 100 L314 158 H306 L298 108 Z" fill="#81d4fa"/>
  ${beacon(258, 92)}
  ${outrigger(50)}
  ${outrigger(360)}
  ${wheels([100, 296], 214, 34)}`,
};
