import { describe, expect, it } from 'vitest';
import { type Cell, DirtField, dirtiness, generateDirt, type Mask, STRENGTH } from './dirt';

const BRUSH = 18;

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

describe('DirtField.rub', () => {
  const pass = (dirt: DirtField) => dirt.rub(0, 50, 100, 50, BRUSH);

  it('wipes dust in one pass', () => {
    const dirt = new DirtField([cell('dust')]);
    expect(pass(dirt)).toBe(true);
    expect(dirt.remaining).toBe(0);
  });

  it('thins mud with each pass and wipes it after about three', () => {
    const mud = cell('mud');
    const dirt = new DirtField([mud]);
    pass(dirt);
    const afterOne = dirtiness(mud);
    expect(afterOne).toBeGreaterThan(0);
    expect(afterOne).toBeLessThan(1);
    pass(dirt);
    expect(dirtiness(mud)).toBeLessThan(afterOne);
    expect(dirt.remaining).toBe(1);
    pass(dirt);
    expect(dirt.remaining).toBe(0);
  });

  it('wipes dust with a tap but not mud', () => {
    const dirt = new DirtField([cell('dust'), cell('mud')]);
    dirt.dab(50, 50, BRUSH);
    expect(dirt.remaining).toBe(0.5);
  });

  it('rubs nothing while the finger stays put', () => {
    const mud = cell('mud');
    const dirt = new DirtField([cell('dust'), mud]);
    for (let i = 0; i < 100; i++) expect(dirt.rub(50, 50, 50, 50, BRUSH)).toBe(false);
    expect(dirt.remaining).toBe(1);
    expect(dirtiness(mud)).toBe(1);
  });

  it('leaves dirt outside the brush alone', () => {
    const dirt = new DirtField([cell('dust')]);
    expect(dirt.rub(0, 0, 100, 0, BRUSH)).toBe(false);
    expect(dirt.remaining).toBe(1);
  });

  it('clear wipes everything', () => {
    const dirt = new DirtField([cell('dust'), cell('mud')]);
    dirt.clear();
    expect(dirt.remaining).toBe(0);
  });
});
