// Sound effects synthesized with Web Audio, so no audio files are needed.
// Sound is a bonus: where Web Audio is missing or too old, everything stays silent instead of failing.

let ctx: AudioContext | undefined;
let noise: AudioBuffer | undefined;
let lastScrub = 0;

/**
 * Call from user gestures: browsers (iOS especially) keep audio muted until then, and iOS
 * suspends it again after interruptions such as a phone call.
 */
export function unlockAudio(): void {
  try {
    ctx ??= new AudioContext();
    if (ctx.state !== 'running') ctx.resume().catch(() => {});
  } catch {
    // No usable Web Audio.
  }
}

/** A short swish while dirt comes off. Throttled so a fast stroke doesn't turn into a roar. */
export function playScrub(): void {
  safely((ctx) => {
    if (ctx.currentTime - lastScrub < 0.09) return;
    const t = (lastScrub = ctx.currentTime);
    noise ??= whiteNoise(ctx, 0.1);
    const source = new AudioBufferSourceNode(ctx, { buffer: noise });
    const filter = new BiquadFilterNode(ctx, { type: 'bandpass', frequency: 1800 + Math.random() * 800, Q: 1.2 });
    const gain = new GainNode(ctx);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.08, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start(t);
    source.stop(t + 0.1);
  });
}

/** Do-mi-so-do. */
export function playFanfare(): void {
  safely((ctx) => {
    const t = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => tone(ctx, freq, t + i * 0.13, i === 3 ? 0.7 : 0.18));
  });
}

function safely(play: (ctx: AudioContext) => void): void {
  if (!ctx) return;
  try {
    play(ctx);
  } catch {
    // Older Web Audio without node constructors.
  }
}

function tone(ctx: AudioContext, frequency: number, start: number, duration: number): void {
  const osc = new OscillatorNode(ctx, { type: 'triangle', frequency });
  const gain = new GainNode(ctx);
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(0.25, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration);
}

function whiteNoise(ctx: AudioContext, seconds: number): AudioBuffer {
  const buffer = new AudioBuffer({ length: Math.ceil(ctx.sampleRate * seconds), sampleRate: ctx.sampleRate });
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}
