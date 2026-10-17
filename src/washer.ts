// The pressure washer: a spray gun in the bottom-left corner that turns to the finger, and the water it shoots.

/** The gun is drawn around its grip at (0, 0), with the lance pointing along +x. */
const VIEW = { x: -50, y: -45, width: 240, height: 110 };
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
const GRAVITY = 900;
const DROPS_PER_SECOND = 240;
/** Jet layers from the outer spray to the solid core, as fractions of the splash radius. */
const JET_LAYERS = [
  [0.7, 'rgb(129 212 250 / 0.35)'],
  [0.35, 'rgb(179 229 252 / 0.85)'],
  [0.12, 'rgb(255 255 255 / 0.95)'],
] as const;

export interface Point {
  x: number;
  y: number;
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
  private readonly canvas: HTMLCanvasElement;
  private readonly g: CanvasRenderingContext2D;
  private drops: Drop[] = [];
  private density = 1;

  constructor(root: HTMLElement) {
    root.insertAdjacentHTML('beforeend', `<canvas class="water"></canvas><div class="gun">${GUN}</div>`);
    this.canvas = root.querySelector('.water')!;
    this.gun = root.querySelector('.gun')!;
    this.g = this.canvas.getContext('2d')!;
    this.gun.style.aspectRatio = `${VIEW.width} / ${VIEW.height}`;
    this.gun.querySelector('svg')!.style.transformOrigin =
      `${(-VIEW.x / VIEW.width) * 100}% ${(-VIEW.y / VIEW.height) * 100}%`;
    this.aim(REST_ANGLE);
    this.resize();
    addEventListener('resize', () => this.resize());
  }

  /**
   * Draws one frame: the jet from the nozzle to `target` (screen coordinates) while spraying, and the
   * drops still flying. Returns whether drops are still in the air.
   */
  update(seconds: number, target: Point | undefined, splashRadius: number): boolean {
    const { g, canvas, density } = this;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, canvas.width, canvas.height);
    g.setTransform(density, 0, 0, density, 0, 0);

    if (target) {
      const rect = this.gun.getBoundingClientRect();
      const grip = {
        x: rect.left + (-VIEW.x / VIEW.width) * rect.width,
        y: rect.top + (-VIEW.y / VIEW.height) * rect.height,
      };
      const angle = Math.atan2(target.y - grip.y, target.x - grip.x);
      this.aim(angle);
      const reach = (NOZZLE_TIP / VIEW.width) * rect.width;
      this.drawJet({ x: grip.x + Math.cos(angle) * reach, y: grip.y + Math.sin(angle) * reach }, target, splashRadius);
      this.splash(target, splashRadius, seconds);
    }

    this.drops = this.drops.filter((d) => (d.age += seconds) < d.life);
    g.fillStyle = 'rgb(179 229 252)';
    for (const d of this.drops) {
      d.vy += GRAVITY * seconds;
      d.x += d.vx * seconds;
      d.y += d.vy * seconds;
      g.globalAlpha = 1 - d.age / d.life;
      g.beginPath();
      g.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      g.fill();
    }
    g.globalAlpha = 1;
    return this.drops.length > 0;
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

  /** Mist where the jet lands, and drops bouncing off. */
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

  private resize(): void {
    this.density = Math.min(devicePixelRatio, 2);
    this.canvas.width = Math.round(innerWidth * this.density);
    this.canvas.height = Math.round(innerHeight * this.density);
  }
}
