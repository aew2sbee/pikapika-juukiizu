import { describe, expect, it } from 'vitest';
import { vehicles } from '.';
import { face } from './parts';

describe('face', () => {
  it.each(['normal', 'happy', 'fussy', 'sleepy'])('has parts for the %s mood', (mood) => {
    expect(face(0, 0)).toMatch(new RegExp(`data-moods="[^"]*${mood}`));
  });
});

describe('vehicles', () => {
  it.each(vehicles.map((v) => [v.name, v]))('%s has a face', (_, vehicle) => {
    expect(vehicle.shapes).toContain('class="face"');
  });

  // A slip in the worked-out coordinates would otherwise quietly drop a shape from the picture.
  it.each(vehicles.map((v) => [v.name, v]))('%s has no missing numbers', (_, vehicle) => {
    expect(vehicle.shapes).not.toMatch(/NaN|undefined/);
  });

  it('have different names', () => {
    expect(new Set(vehicles.map((v) => v.name)).size).toBe(vehicles.length);
  });
});
