// The cleaning screen: a dirty vehicle (SVG) under a canvas of dirt, washed off by a pressure washer
// that sprays wherever the finger is.

import { clearScaled, fitCanvas } from './canvas';
import { type Cell, type DirtField, dirtiness, generateDirt, type Mask } from './dirt';
import type { Point } from './geometry';
import { playFanfare } from './sound';
import type { Vehicle } from './vehicles/types';
import { Washer } from './washer';

/** Dirt grid cell size, in viewBox units. */
const CELL = 6;
/** Radius the water jet washes, in viewBox units. */
const JET = 18;
/** Finish automatically once this little dirt is left, so nobody has to hunt for specks. */
const CLEAR_AT = 0.03;
/** Mud is drawn in this many opacity steps as it thins. */
const MUD_SHADES = 8;
const SPARKLES = 14;
/** Delay before "again" appears, so a finger still spraying doesn't hit it straight away. */
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
    clearScaled(g, width);
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

  /** Converts a screen point to viewBox units. */
  function toVehicle(p: Point, rect: DOMRect): Point {
    return { x: ((p.x - rect.left) / rect.width) * width, y: ((p.y - rect.top) / rect.height) * height };
  }

  new Washer(root, {
    onSpray(from, to, seconds) {
      const rect = canvas.getBoundingClientRect();
      const hit = dirt.spray(toVehicle(from, rect), toVehicle(to, rect), JET, seconds);
      if (hit && dirt.remaining <= CLEAR_AT) finish();
      else if (hit) draw();
      return hit;
    },
    splashRadius: () => (JET * canvas.getBoundingClientRect().width) / width,
  });
  again.addEventListener('click', reset);

  fitCanvas(canvas, 2, draw);

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
