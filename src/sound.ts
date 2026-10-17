// Sound effects synthesized with Web Audio, so no audio files are needed.
// Sound is a bonus: where Web Audio is missing or too old, everything stays silent instead of failing.

let ctx: AudioContext | undefined;
let noise: AudioBuffer | undefined;
let spray: { source: AudioBufferSourceNode; filter: BiquadFilterNode; gain: GainNode } | undefined;

/** Centre frequency of the water hiss, in Hz. */
const SPRAY_PITCH = { air: 1300, dirt: 2600 };

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

/** Starts the hiss of running water. */
export function startSpray(): void {
  safely((ctx) => {
    if (spray) return;
    noise ??= whiteNoise(ctx, 1);
    const source = new AudioBufferSourceNode(ctx, { buffer: noise, loop: true });
    const filter = new BiquadFilterNode(ctx, { type: 'bandpass', frequency: SPRAY_PITCH.air, Q: 0.7 });
    const gain = new GainNode(ctx);
    const t = ctx.currentTime;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.12, t + 0.05);
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start(t);
    spray = { source, filter, gain };
  });
}

/** Fades the water out. */
export function stopSpray(): void {
  const running = spray;
  spray = undefined;
  if (!running) return;
  safely((ctx) => {
    const t = ctx.currentTime;
    running.gain.gain.cancelScheduledValues(t);
    running.gain.gain.setTargetAtTime(0, t, 0.04);
    running.source.stop(t + 0.3);
  });
}

/** The water sounds a little brighter while it is washing dirt off. */
export function setSprayHitting(hitting: boolean): void {
  safely((ctx) => {
    spray?.filter.frequency.setTargetAtTime(hitting ? SPRAY_PITCH.dirt : SPRAY_PITCH.air, ctx.currentTime, 0.05);
  });
}

/** Do-mi-so-do. */
export function playFanfare(): void {
  safely((ctx) => {
    const t = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => tone(ctx, freq, t + i * 0.13, i === 3 ? 0.7 : 0.18));
  });
}

/** A whiny "ya-ya-ya" when water keeps hitting the face. */
export function playFuss(): void {
  safely((ctx) => {
    const t = ctx.currentTime;
    [660, 520, 440].forEach((freq, i) => tone(ctx, freq, t + i * 0.09, 0.12));
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
