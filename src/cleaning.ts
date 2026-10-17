// The cleaning screen: a dirty vehicle (SVG) under a canvas of dirt that fingers wipe off.

import { type Cell, type DirtField, dirtiness, generateDirt, type Mask } from './dirt';
import { playFanfare, playScrub, unlockAudio } from './sound';
import type { Vehicle } from './vehicles/types';

/** Dirt grid cell size, in viewBox units. */
const CELL = 6;
/** Finger radius, in viewBox units. */
const BRUSH = 18;
/** Finish automatically once this little dirt is left, so nobody has to hunt for specks. */
const CLEAR_AT = 0.03;
/** Mud is drawn in this many opacity steps as it thins. */
const MUD_SHADES = 8;
const SPARKLES = 14;
/** Delay before "again" appears, so a finger still rubbing doesn't hit it straight away. */
const AGAIN_DELAY = 1500;

const COLORS = { dust: '#d7b98a', mud: '#5d4037' } as const;

export async function mountCleaning(root: HTMLElement, vehicle: Vehicle): Promise<void> {
  root.innerHTML = `
    <div class="stage">
      <div class="vehicle" aria-label="${vehicle.name}">${vehicle.svg}<canvas></canvas></div>
      <p class="cheer" hidden>ぴかぴか！</p>
      <button class="again" type="button" hidden>もういっかい</button>
    </div>`;
  const stage = root.querySelector<HTMLDivElement>('.stage')!;
  const canvas = stage.querySelector('canvas')!;
  const cheer = stage.querySelector<HTMLParagraphElement>('.cheer')!;
  const again = stage.querySelector<HTMLButtonElement>('.again')!;
  const g = canvas.getContext('2d')!;

  const image = await loadSvg(vehicle.svg);
  const mask = silhouette(image, Math.ceil(vehicle.width / CELL), Math.ceil(vehicle.height / CELL));
  /** The vehicle rasterized at the canvas's backing size, used to trim the dirt. */
  const outline = document.createElement('canvas');

  let dirt: DirtField;
  let clean = false;
  let againTimer = 0;
  let drawQueued = false;
  const fingers = new Map<number, { x: number; y: number }>();

  function reset() {
    dirt = generateDirt(mask);
    clean = false;
    clearTimeout(againTimer);
    stage.classList.remove('happy');
    stage.querySelectorAll('.sparkle').forEach((s) => s.remove());
    cheer.hidden = again.hidden = true;
    draw();
  }

  function finish() {
    clean = true;
    dirt.clear();
    draw();
    stage.classList.add('happy');
    cheer.hidden = false;
    addSparkles(stage);
    againTimer = window.setTimeout(() => (again.hidden = false), AGAIN_DELAY);
    playFanfare();
  }

  function draw() {
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, canvas.width, canvas.height);
    const scale = canvas.width / vehicle.width;
    g.setTransform(scale, 0, 0, scale, 0, 0);
    // One fill per colour and opacity keeps a frame to a handful of draw calls.
    const dust: Cell[] = [];
    const mud = new Map<number, Cell[]>();
    for (const cell of dirt.cells) {
      if (cell.hp <= 0) continue;
      if (cell.kind === 'dust') dust.push(cell);
      else {
        const level = Math.ceil(dirtiness(cell) * MUD_SHADES) / MUD_SHADES;
        const shade = mud.get(level);
        if (shade) shade.push(cell);
        else mud.set(level, [cell]);
      }
    }
    fillBlobs(g, dust, COLORS.dust, 0.9);
    for (const [level, cells] of mud) fillBlobs(g, cells, COLORS.mud, 0.35 + 0.65 * level);
    // Trim blobs that spill past the vehicle's outline.
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.globalAlpha = 1;
    g.globalCompositeOperation = 'destination-in';
    g.drawImage(outline, 0, 0);
    g.globalCompositeOperation = 'source-over';
  }

  function queueDraw() {
    if (drawQueued) return;
    drawQueued = true;
    requestAnimationFrame(() => {
      drawQueued = false;
      draw();
    });
  }

  function toVehicle(e: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * vehicle.width,
      y: ((e.clientY - rect.top) / rect.height) * vehicle.height,
    };
  }

  function wiped(changed: boolean) {
    if (!changed) return;
    if (dirt.remaining <= CLEAR_AT) finish();
    else queueDraw();
    playScrub();
  }

  canvas.addEventListener('pointerdown', (e) => {
    unlockAudio();
    canvas.setPointerCapture(e.pointerId);
    const p = toVehicle(e);
    fingers.set(e.pointerId, p);
    if (!clean) wiped(dirt.dab(p.x, p.y, BRUSH));
  });
  canvas.addEventListener('pointermove', (e) => {
    const from = fingers.get(e.pointerId);
    if (!from) return;
    const to = toVehicle(e);
    fingers.set(e.pointerId, to);
    if (!clean) wiped(dirt.rub(from.x, from.y, to.x, to.y, BRUSH));
  });
  // iOS may not count a touch's pointerdown as permission to play sound, but it does count its end.
  canvas.addEventListener('pointerup', (e) => {
    unlockAudio();
    fingers.delete(e.pointerId);
  });
  canvas.addEventListener('pointercancel', (e) => fingers.delete(e.pointerId));
  again.addEventListener('click', () => {
    unlockAudio();
    reset();
  });

  new ResizeObserver(() => {
    canvas.width = outline.width = Math.round(canvas.clientWidth * devicePixelRatio);
    canvas.height = outline.height = Math.round(canvas.clientHeight * devicePixelRatio);
    // Rasterize the SVG once per size: redrawing it every frame is slow on some tablets.
    outline.getContext('2d')!.drawImage(image, 0, 0, outline.width, outline.height);
    draw();
  }).observe(canvas);

  reset();
}

function loadSvg(svg: string): Promise<HTMLImageElement> {
  const image = new Image();
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  return image.decode().then(() => image);
}

/** Marks the grid cells the vehicle covers by drawing it at one pixel per cell. */
function silhouette(image: HTMLImageElement, cols: number, rows: number): Mask {
  const canvas = document.createElement('canvas');
  canvas.width = cols;
  canvas.height = rows;
  const g = canvas.getContext('2d', { willReadFrequently: true })!;
  g.drawImage(image, 0, 0, cols, rows);
  const alpha = g.getImageData(0, 0, cols, rows).data.filter((_, i) => i % 4 === 3);
  return {
    cols,
    rows,
    cellSize: CELL,
    filled: Array.from(alpha, (a) => a > 128),
  };
}

function fillBlobs(g: CanvasRenderingContext2D, cells: Cell[], color: string, alpha: number): void {
  g.fillStyle = color;
  g.globalAlpha = alpha;
  g.beginPath();
  for (const cell of cells) {
    g.moveTo(cell.x + cell.r, cell.y);
    g.arc(cell.x, cell.y, cell.r, 0, Math.PI * 2);
  }
  g.fill();
}

function addSparkles(stage: HTMLElement): void {
  for (let i = 0; i < SPARKLES; i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${5 + Math.random() * 90}%`;
    sparkle.style.top = `${5 + Math.random() * 85}%`;
    sparkle.style.animationDelay = `${Math.random() * 1.2}s`;
    sparkle.style.setProperty('--size', `${18 + Math.random() * 26}px`);
    stage.append(sparkle);
  }
}
