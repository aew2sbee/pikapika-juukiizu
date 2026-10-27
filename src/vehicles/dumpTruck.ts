import { truck, WHITE } from './parts';
import type { Vehicle } from './types';

/** Upright ribs along the side of the bed, `width` wide: the whole rib, or the lit strip down its left edge. */
const ribs = (width: number) => [70, 118, 166, 214].map((x) => `<rect x="${x}" y="108" width="${width}" height="68"/>`).join('');

export const dumpTruck: Vehicle = {
  name: 'だんぷとらっく',
  width: 420,
  height: 260,
  shapes: truck(
    WHITE,
    `
    <path d="M272 56 H318 V64 H292 V190 H272 Z" fill="#90a4ae"/>
    <path d="M275 59.5 H316 M275.5 60 V188" fill="none" stroke="#cfd8dc" stroke-width="3"/>
    <rect x="36" y="98" width="240" height="90" rx="4" fill="#b0bec5"/>
    <rect x="36" y="98" width="240" height="10" rx="3" fill="#cfd8dc"/>
    <rect x="36" y="176" width="240" height="12" fill="#90a4ae"/>
    <g fill="#90a4ae">${ribs(8)}</g>
    <g fill="#cfd8dc">${ribs(2)}</g>
    <rect x="30" y="96" width="10" height="94" rx="3" fill="#78909c"/>
    <rect x="40" y="188" width="236" height="6" fill="#607d8b"/>`,
    '#43a047',
  ),
};
