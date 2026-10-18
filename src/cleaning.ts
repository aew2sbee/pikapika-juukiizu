// The cleaning screen: a dirty vehicle (SVG) under a canvas of dirt, washed off by a pressure washer
// that sprays wherever the finger is.

import { clearScaled, fillCircles, fitCanvas } from './canvas';
import { type Cell, type DirtField, dirtiness, generateDirt, type Mask } from './dirt';
import { distanceToSegment, type Point } from './geometry';
import { playFanfare, playFuss } from './sound';
import { vehicleSvg } from './vehicles';
import type { Vehicle } from './vehicles/types';
import { Washer } from './washer';

/** Dirt grid cell size, in viewBox units. */
const CELL = 6;
/** Radius the water jet washes, in viewBox units. */
const JET = 18;
/** The jet is never smaller than this on screen (CSS px), so a finger on a phone still washes a finger-sized patch. */
const MIN_JET_PX = 27;
/** Finish automatically once this little dirt is left, so nobody has to hunt for specks. */
const CLEAR_AT = 0.03;
/** Mud is drawn in this many opacity steps as it thins. */
const MUD_SHADES = 8;
const SPARKLES = 14;
/** Seconds of water on the face before the vehicle starts to fuss. */
const FUSS_AFTER = 0.6;
/** Milliseconds after the water leaves the face before the vehicle calms down. */
const CALM_AFTER = 400;
/** Delay before the buttons appear after a clean, so a finger still spraying doesn't hit them straight away. */
const ACTIONS_DELAY = 1500;

const COLORS = { dust: '#d7b98a', mud: '#5d4037' } as const;

export interface CleaningOptions {
  /** Aborted when the screen is left: everything the screen started stops. */
  signal: AbortSignal;
  /** Goes back to the select screen. */
  onBack(): void;
  /** Asked at each clean: show the usual buttons, ask about one more wash, or go to sleep. */
  bedtime(): 'play' | 'ask' | 'lock';
  /** "あと いっかい" was chosen. */
  onOneMore(): void;
  /** Goes to the lock screen. */
  onSleep(): void;
}

export async function mountCleaning(root: HTMLElement, vehicle: Vehicle, { signal, onBack, bedtime, onOneMore, onSleep }: CleaningOptions): Promise<void> {
  const { width, height } = vehicle;
  const svg = vehicleSvg(vehicle);
  root.classList.add('wash');
  root.innerHTML = `
    <button class="back pill" type="button">◀ もどる</button>
    <button class="sleep-now pill" type="button">☾ おやすみ</button>
    <div class="stage" data-mood="normal" style="--aspect: ${width} / ${height}">
      <div class="vehicle" aria-label="${vehicle.name}">${svg}<canvas></canvas></div>
      <p class="cheer" hidden>ぴかぴか！</p>
      <div class="actions" hidden>
        <button class="again pill" type="button">もういっかい</button>
        <button class="others pill" type="button">ほかの くるま</button>
      </div>
      <p class="question" hidden><span>くるまたちが ねむそう。</span><span>あと いっかい あらう？</span></p>
      <div class="ask actions" hidden>
        <button class="one-more pill" type="button">あと いっかい</button>
        <button class="goodnight-now pill" type="button">おやすみ</button>
      </div>
    </div>`;
  const stage = root.querySelector<HTMLDivElement>('.stage')!;
  const canvas = stage.querySelector('canvas')!;
  const cheer = stage.querySelector<HTMLParagraphElement>('.cheer')!;
  const actions = stage.querySelector<HTMLDivElement>('.actions')!;
  const question = stage.querySelector<HTMLParagraphElement>('.question')!;
  const ask = stage.querySelector<HTMLDivElement>('.ask')!;
  const sleepNow = root.querySelector<HTMLButtonElement>('.sleep-now')!;
  const g = canvas.getContext('2d')!;
  const face = faceCircle(stage.querySelector<SVGGraphicsElement>('.face')!);
  // Trim blobs that spill past the vehicle's outline.
  for (const property of ['mask-image', '-webkit-mask-image']) canvas.style.setProperty(property, `url("${svgDataUrl(svg)}")`);

  // Wired before the wait, so the way back works while the vehicle loads (or if it never does).
  root.querySelector('.back')!.addEventListener('click', onBack);
  sleepNow.addEventListener('click', onSleep);

  const mask = await silhouette(vehicle);
  if (signal.aborted) return;

  let dirt: DirtField;
  let actionsTimer = 0;
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
    clearTimeout(actionsTimer);
    clean = false;
    stage.querySelectorAll('.sparkle').forEach((s) => s.remove());
    cheer.hidden = actions.hidden = question.hidden = ask.hidden = true;
    sleepNow.hidden = false;
    calm();
    draw();
  }

  /** Water held on the face makes the vehicle squeeze its eyes shut and shake. */
  function wetFace(from: Point, to: Point, radius: number, seconds: number) {
    // face.r is sized for the usual jet; a wider jet (small screens) reaches the face from further out.
    if (distanceToSegment(face, from, to) > face.r + radius - JET) {
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
    // The washing is over, so a finger still spraying shouldn't land on "おやすみ" either.
    sleepNow.hidden = true;
    addSparkles(stage);
    // Time running out never cuts a wash short: it only counts once the vehicle is clean.
    const next = bedtime();
    actionsTimer = window.setTimeout(() => {
      if (next === 'lock') onSleep();
      else if (next === 'ask') {
        // The question takes the cheer's place, and its two answers the usual buttons' place.
        cheer.hidden = true;
        question.hidden = ask.hidden = false;
      } else actions.hidden = false;
    }, ACTIONS_DELAY);
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

  /** The jet's radius in viewBox units: JET, or more where the vehicle is drawn small. */
  function jetRadius() {
    // A canvas with no width yet (mid-layout) would make the jet infinitely wide.
    const shown = canvas.clientWidth;
    return shown ? Math.max(JET, (MIN_JET_PX * width) / shown) : JET;
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
      const radius = jetRadius();
      wetFace(a, b, radius, seconds);
      const hit = dirt.spray(a, b, radius, seconds);
      if (hit && dirt.remaining <= CLEAR_AT) finish();
      else if (hit) draw();
      return hit;
    },
    splashRadius: () => (jetRadius() * canvas.clientWidth) / width,
    signal,
  });
  stage.querySelector('.again')!.addEventListener('click', reset);
  stage.querySelector('.others')!.addEventListener('click', onBack);
  stage.querySelector('.one-more')!.addEventListener('click', () => {
    onOneMore();
    question.hidden = ask.hidden = true;
    cheer.hidden = actions.hidden = false;
  });
  stage.querySelector('.goodnight-now')!.addEventListener('click', onSleep);
  signal.addEventListener('abort', () => {
    clearTimeout(actionsTimer);
    clearTimeout(calmTimer);
  });

  fitCanvas(canvas, { maxDensity: 2, signal, onResize: draw });

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

function svgDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Silhouettes already worked out, so opening a vehicle again starts straight away. */
const silhouettes = new Map<Vehicle, Promise<Mask>>();

function silhouette(vehicle: Vehicle): Promise<Mask> {
  let mask = silhouettes.get(vehicle);
  if (!mask) {
    const cols = Math.ceil(vehicle.width / CELL);
    const rows = Math.ceil(vehicle.height / CELL);
    mask = loadImage(svgDataUrl(vehicleSvg(vehicle))).then(
      (image) => rasterize(image, cols, rows),
      (error: unknown) => {
        // Forget the failure, so opening the vehicle again tries again.
        silhouettes.delete(vehicle);
        throw error;
      },
    );
    silhouettes.set(vehicle, mask);
  }
  return mask;
}

/** Marks the grid cells the vehicle covers by drawing it at one pixel per cell. */
function rasterize(image: HTMLImageElement, cols: number, rows: number): Mask {
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
