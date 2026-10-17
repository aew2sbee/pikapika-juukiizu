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
  const { width, height } = vehicle;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${vehicle.shapes}</svg>`;
  const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  root.innerHTML = `
    <div class="stage" style="--aspect: ${width} / ${height}">
      <div class="vehicle" aria-label="${vehicle.name}">${svg}<canvas></canvas></div>
      <p class="cheer" hidden>ぴかぴか！</p>
      <button class="again" type="button" hidden>もういっかい</button>
    </div>`;
  const stage = root.querySelector<HTMLDivElement>('.stage')!;
  const canvas = stage.querySelector('canvas')!;
  const cheer = stage.querySelector<HTMLParagraphElement>('.cheer')!;
  const again = stage.querySelector<HTMLButtonElement>('.again')!;
  const g = canvas.getContext('2d')!;
  // Trim blobs that spill past the vehicle's outline.
  for (const property of ['mask-image', '-webkit-mask-image']) canvas.style.setProperty(property, `url("${svgUrl}")`);

  const image = await loadImage(svgUrl);
  const mask = silhouette(image, Math.ceil(width / CELL), Math.ceil(height / CELL));

  let dirt: DirtField;
  let againTimer = 0;
  let drawQueued = false;
  const fingers = new Map<number, { x: number; y: number }>();

  function reset() {
    dirt = generateDirt(mask);
    clearTimeout(againTimer);
    stage.classList.remove('happy');
    stage.querySelectorAll('.sparkle').forEach((s) => s.remove());
    cheer.hidden = again.hidden = true;
    draw();
  }

  function finish() {
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
    const scale = canvas.width / width;
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
      x: ((e.clientX - rect.left) / rect.width) * width,
      y: ((e.clientY - rect.top) / rect.height) * height,
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
    wiped(dirt.dab(p.x, p.y, BRUSH));
  });
  canvas.addEventListener('pointermove', (e) => {
    const from = fingers.get(e.pointerId);
    if (!from) return;
    const to = toVehicle(e);
    fingers.set(e.pointerId, to);
    wiped(dirt.rub(from.x, from.y, to.x, to.y, BRUSH));
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
    // Soft blobs gain nothing from 3x screens but would cost over twice the pixels of 2x.
    const density = Math.min(devicePixelRatio, 2);
    canvas.width = Math.round(canvas.clientWidth * density);
    canvas.height = Math.round(canvas.clientHeight * density);
    draw();
  }).observe(canvas);

  reset();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  const image = new Image();
  image.src = src;
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
