import { bulldozer } from './bulldozer';
import { crane } from './crane';
import { dumpTruck } from './dumpTruck';
import { excavator } from './excavator';
import { mixerTruck } from './mixerTruck';
import { pileDriver } from './pileDriver';
import type { Vehicle } from './types';

/** The vehicles that can be washed, in the order the select screen shows them. */
export const vehicles: Vehicle[] = [excavator, bulldozer, dumpTruck, mixerTruck, crane, pileDriver];

/** A standalone SVG of the vehicle (it is also loaded as an image, so it needs xmlns and a size). */
export function vehicleSvg({ width, height, shapes }: Vehicle): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${shapes}</svg>`;
}
