import { describe, expect, it } from 'vitest';
import { bedtime, FRESH, limitFromQuery, loadPlayState, makeProblem, parsePlayState, PLAY_LIMIT_MS, playStateKey, savePlayState } from './playtime';

describe('bedtime', () => {
  it('lets play go on before the limit', () => {
    expect(bedtime({ elapsedMs: PLAY_LIMIT_MS - 1, oneMore: false })).toBe('play');
  });

  it('asks about one more wash once the limit is reached', () => {
    expect(bedtime({ elapsedMs: PLAY_LIMIT_MS, oneMore: false })).toBe('ask');
    expect(bedtime({ elapsedMs: PLAY_LIMIT_MS * 3, oneMore: false })).toBe('ask');
  });

  it('sleeps after the one more wash', () => {
    expect(bedtime({ elapsedMs: PLAY_LIMIT_MS, oneMore: true })).toBe('lock');
  });

  it('uses the given limit', () => {
    expect(bedtime({ elapsedMs: 60_000, oneMore: false }, 60_000)).toBe('ask');
  });
});

describe('parsePlayState', () => {
  it('reads a saved state', () => {
    const state = { elapsedMs: 1234, locked: true, oneMore: true, vehicle: 'しょべるかー' };
    expect(parsePlayState(JSON.stringify(state))).toEqual(state);
  });

  it.each([null, '', '{', 'null', '42', '"x"', '[]'])('starts fresh from %j', (saved) => {
    expect(parsePlayState(saved)).toEqual(FRESH);
  });

  it('drops damaged fields', () => {
    expect(parsePlayState('{"elapsedMs":-5,"locked":"yes","oneMore":1,"vehicle":3}')).toEqual(FRESH);
    expect(parsePlayState('{"elapsedMs":"NaN"}').elapsedMs).toBe(0);
  });
});

describe('storage', () => {
  function memory(): Storage {
    const items = new Map<string, string>();
    return {
      getItem: (key: string) => items.get(key) ?? null,
      setItem: (key: string, value: string) => void items.set(key, value),
    } as Storage;
  }

  it('saves and loads under the prefix', () => {
    const storage = memory();
    const state = { elapsedMs: 5000, locked: false, oneMore: true, vehicle: null };
    savePlayState(storage, 'a:', state);
    expect(loadPlayState(storage, 'a:')).toEqual(state);
    expect(loadPlayState(storage, 'b:')).toEqual(FRESH);
    expect(storage.getItem(playStateKey('a:'))).not.toBeNull();
  });

  it('survives storage that is missing or throws', () => {
    const broken = {
      getItem: () => {
        throw new Error('denied');
      },
      setItem: () => {
        throw new Error('full');
      },
    };
    expect(() => savePlayState(broken, 'a:', FRESH)).not.toThrow();
    expect(() => savePlayState(undefined, 'a:', FRESH)).not.toThrow();
    expect(loadPlayState(broken, 'a:')).toEqual(FRESH);
    expect(loadPlayState(undefined, 'a:')).toEqual(FRESH);
  });
});

describe('makeProblem', () => {
  it('multiplies two numbers from 3 to 9', () => {
    for (const r of [0, 0.5, 0.999]) {
      const { a, b, answer } = makeProblem(() => r);
      expect(a).toBeGreaterThanOrEqual(3);
      expect(a).toBeLessThanOrEqual(9);
      expect(b).toBeGreaterThanOrEqual(3);
      expect(b).toBeLessThanOrEqual(9);
      expect(answer).toBe(a * b);
    }
  });

  it('differs from the previous problem', () => {
    const rolls = [0, 0, 0, 0, 0.5, 0.5];
    const random = () => rolls.shift()!;
    const first = makeProblem(random);
    const second = makeProblem(random, first);
    expect([second.a, second.b]).not.toEqual([first.a, first.b]);
  });
});

describe('limitFromQuery', () => {
  it('reads minutes where allowed', () => {
    expect(limitFromQuery('?limit=1', true)).toBe(60_000);
    expect(limitFromQuery('?limit=0.5', true)).toBe(30_000);
  });

  it.each(['', '?limit=', '?limit=0', '?limit=-1', '?limit=abc'])('falls back to the real limit for %j', (search) => {
    expect(limitFromQuery(search, true)).toBe(PLAY_LIMIT_MS);
  });

  it('is ignored in production', () => {
    expect(limitFromQuery('?limit=1', false)).toBe(PLAY_LIMIT_MS);
  });
});
