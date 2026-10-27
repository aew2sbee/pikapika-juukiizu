import { describe, expect, it } from 'vitest';
import { garage } from './garage';

describe('garage', () => {
  // A slip in the worked-out coordinates would otherwise quietly drop a shape from the picture.
  it('has no missing numbers', () => {
    expect(garage).not.toMatch(/NaN|undefined/);
  });
});
