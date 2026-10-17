// Dirt on a vehicle: blobs of cells in SVG viewBox units that wear off as they are rubbed.

export type DirtKind = 'dust' | 'mud';

/** Rubbing distance needed to wipe a cell clean. A finger pass straight over a cell rubs about the brush diameter. */
export const STRENGTH: Record<DirtKind, number> = { dust: 8, mud: 80 };

/** A tap rubs this much, enough to wipe dust but not mud. */
const DAB = 10;

/** Distance between rub samples along a finger stroke. */
const STEP = 2;

const DUST_COVERAGE = 0.6;
const MUD_BLOBS = 6;

export interface Cell {
  x: number;
  y: number;
  /** Drawing radius; a little larger than half a cell so neighbours overlap into blobs. */
  r: number;
  kind: DirtKind;
  /** Rubbing left before the cell is clean. */
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
   * Rubs along the segment with a round brush. Returns whether any dirt came off.
   * A finger that stays put rubs nothing, even though touch screens keep reporting it.
   */
  rub(x0: number, y0: number, x1: number, y1: number, radius: number): boolean {
    const length = Math.hypot(x1 - x0, y1 - y0);
    if (!length) return false;
    const near = this.dirtyNear(x0, y0, x1, y1, radius);
    const samples = Math.ceil(length / STEP);
    let changed = false;
    for (let i = 1; i <= samples; i++) {
      const t = i / samples;
      changed = this.wipe(near, x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, radius, length / samples) || changed;
    }
    return changed;
  }

  /** A tap: wipes dust under the finger and barely touches mud. */
  dab(x: number, y: number, radius: number): boolean {
    return this.wipe(this.dirtyNear(x, y, x, y, radius), x, y, radius, DAB);
  }

  /** Dirty cells inside the box a brush covers while moving along the segment. */
  private dirtyNear(x0: number, y0: number, x1: number, y1: number, radius: number): Cell[] {
    const [left, right] = [Math.min(x0, x1) - radius, Math.max(x0, x1) + radius];
    const [top, bottom] = [Math.min(y0, y1) - radius, Math.max(y0, y1) + radius];
    return this.cells.filter((c) => c.hp > 0 && c.x >= left && c.x <= right && c.y >= top && c.y <= bottom);
  }

  private wipe(cells: Cell[], x: number, y: number, radius: number, amount: number): boolean {
    let changed = false;
    for (const cell of cells) {
      if (cell.hp <= 0 || (cell.x - x) ** 2 + (cell.y - y) ** 2 > radius ** 2) continue;
      cell.hp = Math.max(0, cell.hp - amount);
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
