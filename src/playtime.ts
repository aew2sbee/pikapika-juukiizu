// Too-much-play guard: once 25 minutes of play are up, the next clean asks about one more wash, and
// after that the game sleeps until an adult unlocks it.

/** Total play time before the next clean asks about one more wash. */
export const PLAY_LIMIT_MS = 25 * 60_000;

export interface PlayState {
  /** Play time counted so far, only while the screen was showing and the game was awake. */
  elapsedMs: number;
  locked: boolean;
  /** "あと いっかい" was chosen: the next clean goes to sleep without asking. */
  oneMore: boolean;
  /** Name of the vehicle washed last, which sleeps on the lock screen. */
  vehicle: string | null;
}

export const FRESH: Readonly<PlayState> = Object.freeze({ elapsedMs: 0, locked: false, oneMore: false, vehicle: null });

/**
 * What a clean leads to: the usual buttons, the question about one more wash, or sleep.
 * Time running out never interrupts a wash; it only counts at the next clean.
 */
export function bedtime({ elapsedMs, oneMore }: Pick<PlayState, 'elapsedMs' | 'oneMore'>, limitMs = PLAY_LIMIT_MS): 'play' | 'ask' | 'lock' {
  if (elapsedMs < limitMs) return 'play';
  return oneMore ? 'lock' : 'ask';
}

/** The storage key; the prefix keeps production and each PR preview apart on the shared origin. */
export function playStateKey(prefix: string): string {
  return prefix + 'playtime';
}

/** Reads the state saved in storage. */
export function loadPlayState(storage: Pick<Storage, 'getItem'> | undefined, prefix: string): PlayState {
  try {
    return parsePlayState(storage?.getItem(playStateKey(prefix)) ?? null);
  } catch {
    return { ...FRESH };
  }
}

/** Reads a saved state; anything missing or damaged counts as a fresh start. */
export function parsePlayState(saved: string | null): PlayState {
  try {
    const state = JSON.parse(saved ?? 'null') as Partial<PlayState> | null;
    const elapsedMs = Number(state?.elapsedMs);
    return {
      elapsedMs: Number.isFinite(elapsedMs) && elapsedMs > 0 ? elapsedMs : 0,
      locked: state?.locked === true,
      oneMore: state?.oneMore === true,
      vehicle: typeof state?.vehicle === 'string' ? state.vehicle : null,
    };
  } catch {
    return { ...FRESH };
  }
}

/** Saves the state; where storage is missing or full (private mode), the count lives on in memory. */
export function savePlayState(storage: Pick<Storage, 'setItem'> | undefined, prefix: string, state: PlayState): void {
  try {
    storage?.setItem(playStateKey(prefix), JSON.stringify(state));
  } catch {
    // Keep counting in memory.
  }
}

export interface Problem {
  a: number;
  b: number;
  answer: number;
}

/** A multiplication an adult can do at a glance but a three-year-old cannot. */
export function makeProblem(random: () => number = Math.random, previous?: Problem): Problem {
  for (;;) {
    const a = 3 + Math.floor(random() * 7);
    const b = 3 + Math.floor(random() * 7);
    if (!previous || a !== previous.a || b !== previous.b) return { a, b, answer: a * b };
  }
}

/**
 * PR previews and the dev server accept `?limit=<minutes>` so the lock can be tried without
 * waiting 25 minutes. Production always uses the real limit.
 */
export function limitFromQuery(search: string, allowOverride: boolean): number {
  if (!allowOverride) return PLAY_LIMIT_MS;
  const minutes = Number(new URLSearchParams(search).get('limit'));
  return Number.isFinite(minutes) && minutes > 0 ? minutes * 60_000 : PLAY_LIMIT_MS;
}
