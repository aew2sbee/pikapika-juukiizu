// The cleaning screen: a dirty vehicle (SVG) under a canvas of dirt, washed off by a pressure washer
// that sprays wherever the finger is.

import { clearScaled, fillCircles, fitCanvas } from './canvas';
import { type Cell, type DirtField, dirtiness, generateDirt, type Mask } from './dirt';
import { distanceToSegment, type Point } from './geometry';
import { playFanfare, playFuss } from './sound';
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
/** Seconds of water on the face before the vehicle starts to fuss. */
const FUSS_AFTER = 0.6;
/** Milliseconds after the water leaves the face before the vehicle calms down. */
const CALM_AFTER = 400;
/** Delay before "again" appears, so a finger still spraying doesn't hit it straight away. */
const AGAIN_DELAY = 1500;

const COLORS = { dust: '#d7b98a', mud: '#5d4037' } as const;

export async function mountCleaning(root: HTMLElement, vehicle: Vehicle): Promise<void> {
  const { width, height } = vehicle;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${vehicle.shapes}</svg>`;
  const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  root.innerHTML = `
    <div class="stage" data-mood="normal" style="--aspect: ${width} / ${height}">
      <div class="vehicle" aria-label="${vehicle.name}">${svg}<canvas></canvas></div>
      <p class="cheer" hidden>ぴかぴか！</p>
      <button class="again" type="button" hidden>もういっかい</button>
    </div>`;
  const stage = root.querySelector<HTMLDivElement>('.stage')!;
  const canvas = stage.querySelector('canvas')!;
  const cheer = stage.querySelector<HTMLParagraphElement>('.cheer')!;
  const again = stage.querySelector<HTMLButtonElement>('.again')!;
  const g = canvas.getContext('2d')!;
  const face = faceCircle(stage.querySelector<SVGGraphicsElement>('.face')!);
  // Trim blobs that spill past the vehicle's outline.
  for (const property of ['mask-image', '-webkit-mask-image']) canvas.style.setProperty(property, `url("${svgUrl}")`);

  const image = await loadImage(svgUrl);
  const mask = silhouette(image, Math.ceil(width / CELL), Math.ceil(height / CELL));

  let dirt: DirtField;
  let againTimer = 0;
  let clean = false;
  let fussing = false;
  /** How long water has been on the face without a break. */
  let faceWet = 0;
  let calmTimer = 0;

  function showMood() {
    stage.dataset.mood = fussing ? 'fussy' : clean ? 'happy' : 'normal';
  }

  function reset() {
    dirt = generateDirt(mask);
    clearTimeout(againTimer);
    clean = false;
    stage.querySelectorAll('.sparkle').forEach((s) => s.remove());
    cheer.hidden = again.hidden = true;
    calm();
    draw();
  }

  /** Water held on the face makes the vehicle squeeze its eyes shut and shake. */
  function wetFace(from: Point, to: Point, seconds: number) {
    if (distanceToSegment(face, from, to) > face.r) {
      faceWet = 0;
      return;
    }
    faceWet += seconds;
    clearTimeout(calmTimer);
    calmTimer = window.setTimeout(calm, CALM_AFTER);
    if (faceWet >= FUSS_AFTER && !fussing) {
      fussing = true;
      showMood();
      playFuss();
    }
  }

  function calm() {
    clearTimeout(calmTimer);
    faceWet = 0;
    fussing = false;
    showMood();
  }

  function finish() {
    dirt.clear();
    draw();
    clean = true;
    showMood();
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
    fillCircles(g, dust, COLORS.dust, 0.9);
    for (const [level, cells] of mud) fillCircles(g, cells, COLORS.mud, 0.35 + 0.65 * level);
  }

  /** Converts a screen point to viewBox units. */
  function toVehicle(p: Point, rect: DOMRect): Point {
    return { x: ((p.x - rect.left) / rect.width) * width, y: ((p.y - rect.top) / rect.height) * height };
  }

  new Washer(root, {
    onSpray(from, to, seconds) {
      const rect = canvas.getBoundingClientRect();
      const a = toVehicle(from, rect);
      const b = toVehicle(to, rect);
      wetFace(a, b, seconds);
      const hit = dirt.spray(a, b, JET, seconds);
      if (hit && dirt.remaining <= CLEAR_AT) finish();
      else if (hit) draw();
      return hit;
    },
    splashRadius: () => (JET * canvas.clientWidth) / width,
  });
  again.addEventListener('click', reset);

  fitCanvas(canvas, 2, draw);

  reset();
}

/** Water this far outside the face's parts still counts as hitting the face, in viewBox units. */
const FACE_MARGIN = 12;

/** The circle around the face as currently drawn, in viewBox units. */
function faceCircle(face: SVGGraphicsElement): Point & { r: number } {
  const box = face.getBBox();
  return {
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
    r: Math.max(box.width, box.height) / 2 + FACE_MARGIN,
  };
}

/** Waits for onload rather than decode(), which some Safari versions reject for SVG images. */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load ${src.slice(0, 40)}…`));
    image.src = src;
  });
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
