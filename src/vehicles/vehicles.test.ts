import { describe, expect, it } from 'vitest';
import { vehicles } from '.';

describe('vehicles', () => {
  it.each(vehicles.map((v) => [v.name, v]))('%s has a face for every mood', (_, vehicle) => {
    expect(vehicle.shapes).toContain('class="face"');
    for (const mood of ['normal', 'happy', 'fussy']) expect(vehicle.shapes).toMatch(new RegExp(`data-moods="[^"]*${mood}`));
  });

  it('have different names', () => {
    expect(new Set(vehicles.map((v) => v.name)).size).toBe(vehicles.length);
  });
});
