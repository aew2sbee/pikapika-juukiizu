import { describe, expect, it } from 'vitest';
import { type Cell, DirtField, dirtiness, generateDirt, type Mask, STRENGTH } from './dirt';

const JET = 18;

/** Deterministic random numbers (mulberry32). */
function seeded(seed: number): () => number {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const cell = (kind: Cell['kind']): Cell => ({ x: 50, y: 50, r: 4, kind, hp: STRENGTH[kind] });

describe('generateDirt', () => {
  const mask: Mask = {
    cols: 20,
    rows: 10,
    cellSize: 6,
    // Left half of the grid is the vehicle.
    filled: Array.from({ length: 200 }, (_, i) => i % 20 < 10),
  };

  it('only puts dirt on the silhouette', () => {
    const dirt = generateDirt(mask, seeded(1));
    expect(dirt.cells.length).toBeGreaterThan(0);
    for (const c of dirt.cells) expect(c.x).toBeLessThan(10 * 6);
  });

  it('covers most of the silhouette with both kinds of dirt', () => {
    const dirt = generateDirt(mask, seeded(2));
    const filled = mask.filled.filter(Boolean).length;
    expect(dirt.cells.length).toBeGreaterThan(filled / 2);
    expect(new Set(dirt.cells.map((c) => c.kind))).toEqual(new Set(['dust', 'mud']));
    expect(dirt.remaining).toBe(1);
  });

  it('returns a clean field for an empty mask', () => {
    const dirt = generateDirt({ ...mask, filled: mask.filled.map(() => false) });
    expect(dirt.cells).toEqual([]);
    expect(dirt.remaining).toBe(0);
  });
});

describe('DirtField.spray', () => {
  const FRAME = 1 / 60;
  /** Holds the jet on (50, 50) for the given time, one frame at a time. */
  const hold = (dirt: DirtField, seconds: number) => {
    for (let t = 0; t < seconds - 1e-9; t += FRAME) dirt.spray({ x: 50, y: 50 }, { x: 50, y: 50 }, JET, FRAME);
  };

  it('washes dust off with a quick swipe but barely touches mud', () => {
    const mud = cell('mud');
    const dirt = new DirtField([cell('dust'), mud]);
    // The cells sit under the jet for about three frames.
    for (const x of [20, 35, 50, 65, 80]) dirt.spray({ x: x - 15, y: 50 }, { x, y: 50 }, JET, FRAME);
    expect(dirt.remaining).toBe(0.5);
    expect(dirtiness(mud)).toBeGreaterThan(0.5);
  });

  it('thins mud while the jet is held on it and washes it off in under a second', () => {
    const mud = cell('mud');
    const dirt = new DirtField([mud]);
    hold(dirt, STRENGTH.mud * 0.4);
    const thinned = dirtiness(mud);
    expect(thinned).toBeGreaterThan(0);
    expect(thinned).toBeLessThan(1);
    hold(dirt, STRENGTH.mud * 0.4);
    expect(dirtiness(mud)).toBeLessThan(thinned);
    hold(dirt, STRENGTH.mud * 0.3);
    expect(dirt.remaining).toBe(0);
    expect(STRENGTH.mud).toBeLessThan(1);
  });

  it('washes everything the jet swept past in one frame, not just its end', () => {
    const dirt = new DirtField([cell('dust')]);
    expect(dirt.spray({ x: 0, y: 50 }, { x: 100, y: 50 }, JET, STRENGTH.dust)).toBe(true);
    expect(dirt.remaining).toBe(0);
  });

  it('leaves dirt outside the jet alone', () => {
    const dirt = new DirtField([cell('dust')]);
    expect(dirt.spray({ x: 0, y: 0 }, { x: 100, y: 0 }, JET, 1)).toBe(false);
    expect(dirt.remaining).toBe(1);
  });

  it('clear washes everything', () => {
    const dirt = new DirtField([cell('dust'), cell('mud')]);
    dirt.clear();
    expect(dirt.remaining).toBe(0);
  });
});
