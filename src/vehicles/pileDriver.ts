import { cylinder, ORANGE, shovelBody, shovelCab } from './parts';
import type { Vehicle } from './types';

const { light, base, dark, deep } = ORANGE;
const holes = [34, 70, 106, 142, 178, 214].map((y) => `<rect x="305" y="${y}" width="12" height="10" rx="2"/>`).join('');
const flights = [92, 106, 120, 134, 148, 162, 176, 190, 204, 218, 232].map((y) => `M328 ${y} L356 ${y + 8}`).join(' ');

// A pile driver: the tall leader stands in front, held by a bracket below and two stays from the back,
// with the auger's motor riding on it.
export const pileDriver: Vehicle = {
  name: 'ぱいるどらいばー',
  width: 420,
  height: 260,
  shapes: `
  ${shovelBody(ORANGE)}
  ${cylinder(112, 124, 302, 52, 10)}
  <rect x="250" y="150" width="54" height="24" rx="4" fill="${base}"/>
  <rect x="250" y="150" width="54" height="5" rx="2" fill="${light}"/>
  <rect x="250" y="168" width="54" height="6" rx="2" fill="${dark}"/>
  <rect x="300" y="10" width="24" height="232" rx="3" fill="${base}"/>
  <rect x="302" y="12" width="4" height="228" rx="2" fill="${light}"/>
  <rect x="318" y="12" width="6" height="228" fill="${dark}"/>
  <g fill="${deep}">${holes}</g>
  <rect x="324" y="10" width="5" height="232" fill="#616161"/>
  <rect x="294" y="2" width="40" height="12" rx="3" fill="#616161"/>
  <rect x="294" y="2" width="40" height="3" rx="1.5" fill="#9e9e9e"/>
  <g stroke="#424242" stroke-width="2"><line x1="330" y1="14" x2="330" y2="42"/><line x1="336" y1="14" x2="336" y2="42"/></g>
  <line x1="342" y1="86" x2="342" y2="244" stroke="#757575" stroke-width="6"/>
  <path d="${flights}" stroke="#9e9e9e" stroke-width="6"/>
  <path d="${flights}" stroke="#e0e0e0" stroke-width="2" transform="translate(0 -2)"/>
  <path d="M332 240 L352 240 L342 254 Z" fill="#9e9e9e"/>
  <rect x="318" y="40" width="48" height="46" rx="6" fill="#616161"/>
  <rect x="318" y="40" width="48" height="8" rx="4" fill="#9e9e9e"/>
  <g stroke="#424242" stroke-width="3"><line x1="328" y1="58" x2="356" y2="58"/><line x1="328" y1="66" x2="356" y2="66"/><line x1="328" y1="74" x2="356" y2="74"/></g>
  ${shovelCab(ORANGE)}`,
};
