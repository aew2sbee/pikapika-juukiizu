// Dirt on a vehicle: blobs of cells in SVG viewBox units that wash off under a water jet.

import { distanceToSegment, type Point } from './geometry';

export type DirtKind = 'dust' | 'mud';

/**
 * Seconds of water needed to wash a cell clean: dust goes as soon as the jet sweeps over it,
 * mud needs the jet held on it.
 */
export const STRENGTH: Record<DirtKind, number> = { dust: 0.04, mud: 0.3 };

const DUST_COVERAGE = 0.6;
const MUD_BLOBS = 6;

export interface Cell extends Point {
  /** Drawing radius; a little larger than half a cell so neighbours overlap into blobs. */
  r: number;
  kind: DirtKind;
  /** Seconds of water left before the cell is clean. */
  hp: number;
}

/** Which grid cells belong to the vehicle's silhouette. */
export interface Mask {
  cols: number;
  rows: number;
  cellSize: number;
  /** Row-major, cols * rows entries. */
  filled: boolean[];
}

export class DirtField {
  private left: number;

  constructor(readonly cells: Cell[]) {
    this.left = cells.filter((c) => c.hp > 0).length;
  }

  /** Fraction of dirty cells still left, from 1 (untouched) to 0 (clean). */
  get remaining(): number {
    return this.cells.length ? this.left / this.cells.length : 0;
  }

  /**
   * Sprays water for `seconds` over the path the jet swept in that time (a point if it stayed put).
   * Every dirty cell the jet covers soaks up the whole time. Returns whether any dirt came off.
   */
  spray(from: Point, to: Point, radius: number, seconds: number): boolean {
    let changed = false;
    for (const cell of this.cells) {
      if (cell.hp <= 0 || distanceToSegment(cell, from, to) > radius) continue;
      cell.hp = Math.max(0, cell.hp - seconds);
      if (cell.hp === 0) this.left--;
      changed = true;
    }
    return changed;
  }

  clear(): void {
    for (const cell of this.cells) cell.hp = 0;
    this.left = 0;
  }
}

/** How much dirt a cell still has, from 1 (fresh) to 0 (clean). */
export function dirtiness(cell: Cell): number {
  return cell.hp / STRENGTH[cell.kind];
}

/** Splashes dust over most of the silhouette, then a few patches of mud on top. */
export function generateDirt(mask: Mask, random: () => number = Math.random): DirtField {
  const { cols, cellSize } = mask;
  const inside = mask.filled.flatMap((filled, i) => (filled ? [{ col: i % cols, row: Math.floor(i / cols) }] : []));
  const kinds = new Map<(typeof inside)[number], DirtKind>();

  const splash = (kind: DirtKind, minRadius: number, maxRadius: number) => {
    const center = inside[Math.floor(random() * inside.length)];
    const radius = (minRadius + random() * (maxRadius - minRadius)) / cellSize;
    for (const spot of inside) {
      if ((spot.col - center.col) ** 2 + (spot.row - center.row) ** 2 <= radius ** 2) kinds.set(spot, kind);
    }
  };

  if (inside.length) {
    for (let i = 0; i < 50 && kinds.size < inside.length * DUST_COVERAGE; i++) splash('dust', 20, 40);
    for (let i = 0; i < MUD_BLOBS; i++) splash('mud', 10, 20);
  }

  return new DirtField(
    [...kinds].map(([{ col, row }, kind]) => ({
      x: (col + 0.5 + (random() - 0.5) * 0.6) * cellSize,
      y: (row + 0.5 + (random() - 0.5) * 0.6) * cellSize,
      r: cellSize * (0.75 + random() * 0.35),
      kind,
      hp: STRENGTH[kind],
    })),
  );
}
