// The pressure washer: a spray gun in the bottom-left corner. While a finger is down it turns to the
// finger, shoots water there with sound, and reports each frame's spray so the screen can wash dirt.

import { clearScaled, fitCanvas } from './canvas';
import type { Point } from './geometry';
import { setSprayHitting, startSpray, stopSpray, unlockAudio } from './sound';

/** The gun is drawn around its grip at (0, 0), with the lance pointing along +x. */
const VIEW = { x: -50, y: -45, width: 240, height: 110 };
/** The grip as a fraction of the gun's box. */
const GRIP = { x: -VIEW.x / VIEW.width, y: -VIEW.y / VIEW.height };
const NOZZLE_TIP = 184;
const GUN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}">
  <g stroke-linejoin="round" stroke-linecap="round">
    <rect x="40" y="-5" width="130" height="10" rx="4" fill="#b0bec5" stroke="#78909c" stroke-width="2"/>
    <rect x="160" y="-9" width="24" height="18" rx="5" fill="#ffb300"/>
    <path d="M-12 -2 L-26 50 Q-28 58 -18 60 L-2 60 Q6 60 6 52 L14 8 Z" fill="#263238"/>
    <path d="M10 8 q10 16 -2 26" fill="none" stroke="#263238" stroke-width="5"/>
    <rect x="-40" y="-18" width="90" height="30" rx="12" fill="#1e88e5" stroke="#1565c0" stroke-width="3"/>
    <circle cx="-24" cy="-3" r="5" fill="#90caf9"/>
  </g>
</svg>`;

/** Where the gun points while nobody is spraying: up and to the right. */
const REST_ANGLE = -0.45;
/** Longest frame counted, so a stalled tab doesn't spray a big patch at once. */
const MAX_FRAME = 0.05;
const GRAVITY = 900;
const DROPS_PER_SECOND = 240;
/** Drops fade out in this many opacity steps, one fill each. */
const DROP_SHADES = 4;
/** Jet layers from the outer spray to the solid core, as fractions of the splash radius. */
const JET_LAYERS = [
  [0.7, 'rgb(129 212 250 / 0.35)'],
  [0.35, 'rgb(179 229 252 / 0.85)'],
  [0.12, 'rgb(255 255 255 / 0.95)'],
] as const;

export interface WasherOptions {
  /**
   * Called every frame the trigger is held, with the path the jet swept in screen coordinates.
   * Returns whether it washed any dirt off.
   */
  onSpray(from: Point, to: Point, seconds: number): boolean;
  /** Radius of the splash, in screen pixels. */
  splashRadius(): number;
}

interface Drop extends Point {
  vx: number;
  vy: number;
  r: number;
  age: number;
  life: number;
}

export class Washer {
  private readonly gun: HTMLDivElement;
  private readonly g: CanvasRenderingContext2D;
  private readonly drops: Drop[] = [];
  /** The finger holding the trigger, and where it was last frame. The washer has one nozzle, so one finger. */
  private nozzle: { id: number; at: Point; last: Point } | undefined;
  private hitting = false;
  private animating = false;
  private lastFrame = 0;

  constructor(
    root: HTMLElement,
    private readonly options: WasherOptions,
  ) {
    root.insertAdjacentHTML('beforeend', `<canvas class="water"></canvas><div class="gun">${GUN}</div>`);
    const canvas = root.querySelector<HTMLCanvasElement>('.water')!;
    this.g = canvas.getContext('2d')!;
    this.gun = root.querySelector('.gun')!;
    this.gun.style.aspectRatio = `${VIEW.width} / ${VIEW.height}`;
    this.gun.querySelector('svg')!.style.transformOrigin = `${GRIP.x * 100}% ${GRIP.y * 100}%`;
    this.aim(REST_ANGLE);
    fitCanvas(canvas, 1);

    root.addEventListener('pointerdown', (e) => {
      unlockAudio();
      if (this.nozzle || (e.target as Element).closest('button')) return;
      root.setPointerCapture(e.pointerId);
      const at = { x: e.clientX, y: e.clientY };
      this.nozzle = { id: e.pointerId, at, last: at };
      startSpray();
      this.animate();
    });
    root.addEventListener('pointermove', (e) => {
      if (this.nozzle?.id === e.pointerId) this.nozzle.at = { x: e.clientX, y: e.clientY };
    });
    // iOS may not count a touch's pointerdown as permission to play sound, but it does count its end.
    root.addEventListener('pointerup', (e) => {
      unlockAudio();
      this.release(e);
    });
    root.addEventListener('pointercancel', (e) => this.release(e));
  }

  private release(e: PointerEvent): void {
    if (this.nozzle?.id !== e.pointerId) return;
    this.nozzle = undefined;
    this.hitting = false;
    stopSpray();
  }

  private animate(): void {
    if (this.animating) return;
    this.animating = true;
    this.lastFrame = performance.now();
    requestAnimationFrame(this.frame);
  }

  /** Sprays and draws one frame: the jet while the trigger is held, and the drops still flying. */
  private readonly frame = (now: number) => {
    const seconds = Math.min((now - this.lastFrame) / 1000, MAX_FRAME);
    this.lastFrame = now;
    const { g, nozzle } = this;
    clearScaled(g, g.canvas.clientWidth);

    if (nozzle) {
      const hit = this.options.onSpray(nozzle.last, nozzle.at, seconds);
      nozzle.last = nozzle.at;
      if (hit !== this.hitting) setSprayHitting((this.hitting = hit));
      const radius = this.options.splashRadius();
      this.drawJet(this.aimAt(nozzle.at), nozzle.at, radius);
      this.splash(nozzle.at, radius, seconds);
    }
    this.drawDrops(seconds);

    this.animating = Boolean(this.nozzle) || this.drops.length > 0;
    if (this.animating) requestAnimationFrame(this.frame);
  };

  /** Turns the gun toward the target and returns where its nozzle tip ends up. */
  private aimAt(target: Point): Point {
    const rect = this.gun.getBoundingClientRect();
    const grip = { x: rect.left + GRIP.x * rect.width, y: rect.top + GRIP.y * rect.height };
    const angle = Math.atan2(target.y - grip.y, target.x - grip.x);
    this.aim(angle);
    const reach = (NOZZLE_TIP / VIEW.width) * rect.width;
    return { x: grip.x + Math.cos(angle) * reach, y: grip.y + Math.sin(angle) * reach };
  }

  private aim(angle: number): void {
    this.gun.style.setProperty('--angle', `${angle}rad`);
  }

  /** A slightly arched, flickering stream. */
  private drawJet(from: Point, to: Point, radius: number): void {
    const { g } = this;
    const length = Math.hypot(to.x - from.x, to.y - from.y);
    const bendX = (from.x + to.x) / 2 + (Math.random() - 0.5) * 4;
    const bendY = (from.y + to.y) / 2 - length * 0.05 + (Math.random() - 0.5) * 4;
    g.lineCap = 'round';
    for (const [width, color] of JET_LAYERS) {
      g.lineWidth = radius * width;
      g.strokeStyle = color;
      g.beginPath();
      g.moveTo(from.x, from.y);
      g.quadraticCurveTo(bendX, bendY, to.x, to.y);
      g.stroke();
    }
  }

  /** Mist where the jet lands, and new drops bouncing off. */
  private splash(at: Point, radius: number, seconds: number): void {
    const { g } = this;
    const mist = g.createRadialGradient(at.x, at.y, 0, at.x, at.y, radius);
    mist.addColorStop(0, 'rgb(225 245 254 / 0.8)');
    mist.addColorStop(1, 'rgb(225 245 254 / 0)');
    g.fillStyle = mist;
    g.beginPath();
    g.arc(at.x, at.y, radius, 0, Math.PI * 2);
    g.fill();

    for (let n = Math.round(DROPS_PER_SECOND * seconds * Math.random() * 2); n > 0; n--) {
      const angle = -Math.PI * Math.random();
      const speed = 120 + Math.random() * 200;
      this.drops.push({
        x: at.x,
        y: at.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: radius * (0.05 + Math.random() * 0.08),
        age: 0,
        life: 0.3 + Math.random() * 0.3,
      });
    }
  }

  /** Moves the drops, drops the ones that have faded, and draws the rest. */
  private drawDrops(seconds: number): void {
    const { g, drops } = this;
    let alive = 0;
    for (const d of drops) {
      d.age += seconds;
      if (d.age >= d.life) continue;
      d.vy += GRAVITY * seconds;
      d.x += d.vx * seconds;
      d.y += d.vy * seconds;
      drops[alive++] = d;
    }
    drops.length = alive;

    g.fillStyle = 'rgb(179 229 252)';
    for (let shade = 1; shade <= DROP_SHADES; shade++) {
      g.globalAlpha = shade / DROP_SHADES;
      g.beginPath();
      for (const d of drops) {
        if (Math.ceil((1 - d.age / d.life) * DROP_SHADES) !== shade) continue;
        g.moveTo(d.x + d.r, d.y);
        g.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      }
      g.fill();
    }
    g.globalAlpha = 1;
  }
}
