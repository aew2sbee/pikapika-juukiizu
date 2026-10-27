/**
 * The face every vehicle wears in its cab window, centred on (x, y) in viewBox units. Each part lists
 * the moods it shows in: "normal", "happy" once clean, "fussy" while water hits the face, and "sleepy" on the lock screen.
 * The blush sits outside the `.face` group, whose size sets how near water must come to count as on the face.
 */
export function face(x: number, y: number): string {
  const cheeks = `<ellipse cx="${x - 20}" cy="${y + 7}" rx="5" ry="3.5"/><ellipse cx="${x + 20}" cy="${y + 7}" rx="5" ry="3.5"/>`;
  const mouth = `M${x - 11} ${y + 5} q11 16 22 0 Z`;
  return `<g data-moods="normal sleepy" fill="#f8bbd0">${cheeks}</g>
    <g data-moods="happy" fill="#f48fb1">${cheeks}</g>
    <g class="face">
      <g data-moods="normal happy">
        <g fill="#3e2723"><ellipse cx="${x - 11}" cy="${y - 6}" rx="5.5" ry="7"/><ellipse cx="${x + 11}" cy="${y - 6}" rx="5.5" ry="7"/></g>
        <g fill="#fff">
          <circle cx="${x - 12.8}" cy="${y - 8.8}" r="2.2"/><circle cx="${x + 9.2}" cy="${y - 8.8}" r="2.2"/>
          <circle cx="${x - 9.4}" cy="${y - 3.4}" r="1"/><circle cx="${x + 12.6}" cy="${y - 3.4}" r="1"/>
        </g>
      </g>
      <g data-moods="fussy" fill="none" stroke="#3e2723" stroke-width="3">
        <path d="M${x - 15} ${y - 11} l8 5 l-8 5"/><path d="M${x + 15} ${y - 11} l-8 5 l8 5"/>
      </g>
      <g data-moods="sleepy" fill="none" stroke="#3e2723" stroke-width="3">
        <path d="M${x - 16} ${y - 7} q5 5 10 0"/><path d="M${x + 6} ${y - 7} q5 5 10 0"/>
      </g>
      <path data-moods="normal" d="M${x - 7} ${y + 9} q7 5 14 0" fill="none" stroke="#3e2723" stroke-width="3"/>
      <g data-moods="happy">
        <path d="${mouth}" fill="#e57373"/>
        <ellipse cx="${x}" cy="${y + 11}" rx="5" ry="2.5" fill="#ffab91"/>
        <path d="${mouth}" fill="none" stroke="#3e2723" stroke-width="2.5"/>
      </g>
      <path data-moods="fussy" d="M${x - 10} ${y + 10} q2.5 -4 5 0 q2.5 4 5 0 q2.5 -4 5 0 q2.5 4 5 0" fill="none" stroke="#3e2723" stroke-width="2.5"/>
      <ellipse data-moods="sleepy" cx="${x}" cy="${y + 9}" rx="3.5" ry="4.5" fill="#3e2723"/>
    </g>`;
}

/**
 * A body colour. Every vehicle is lit from the top left: a part is `base`, with `light` along its upper
 * and left edges, `dark` along its lower and right ones, and `deep` in its seams and slots.
 */
export interface Paint {
  light: string;
  base: string;
  dark: string;
  deep: string;
}

export const YELLOW: Paint = { light: '#ffe082', base: '#fbc02d', dark: '#f9a825', deep: '#f57f17' };
export const ORANGE: Paint = { light: '#ffcc80', base: '#fb8c00', dark: '#ef6c00', deep: '#e65100' };
export const WHITE: Paint = { light: '#ffffff', base: '#eceff1', dark: '#b0bec5', deep: '#90a4ae' };
export const BLUE: Paint = { light: '#64b5f6', base: '#1e88e5', dark: '#1565c0', deep: '#0d47a1' };
export const RED: Paint = { light: '#ef9a9a', base: '#e53935', dark: '#c62828', deep: '#b71c1c' };

/** Keeps worked-out coordinates short in the markup. */
export function round(v: number): number {
  return Math.round(v * 10) / 10;
}

/** Circles of one radius along a row, as SVG markup, each with any `extra` attributes. */
function circles(xs: number[], cy: number, r: number, extra = ''): string {
  return xs.map((cx) => `<circle cx="${cx}" cy="${cy}" r="${r}" ${extra}/>`).join('');
}

/** Stretches an outline `length` long to a whole number of dash periods, so its dashes meet evenly where it starts. */
function evenDashes(length: number, period: number): string {
  return `pathLength="${Math.round(length / period) * period}"`;
}

/**
 * A crawler seen from the side: a belt of plates with grousers, round a toothed drive sprocket at the
 * back (left) and an idler at the front (right), with rollers along the bottom and top between them.
 */
export function crawler(x: number, y: number, width: number, height: number): string {
  const r = height / 2;
  const [back, front] = [x + r, x + width - r];
  const between = (n: number) => Array.from({ length: n }, (_, i) => round(back + ((front - back) * (i + 1)) / (n + 1)));
  const rollers = between(Math.round((front - back) / 40));
  /** Once round the belt, `inset` in from its outer edge. */
  const perimeter = (inset: number) => 2 * (width - height) + Math.PI * (height - 2 * inset);
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${r}" fill="#424242" stroke="#424242" stroke-width="6" stroke-dasharray="6 4" ${evenDashes(perimeter(0), 10)} stroke-linecap="butt"/>
    <rect x="${x + 4}" y="${y + 4}" width="${width - 8}" height="${height - 8}" rx="${r - 4}" fill="none" stroke="#212121" stroke-width="8" stroke-dasharray="2 9" ${evenDashes(perimeter(4), 11)} stroke-linecap="butt"/>
    <rect x="${x + 8}" y="${y + 8}" width="${width - 16}" height="${height - 16}" rx="${r - 8}" fill="#616161"/>
    <rect x="${back}" y="${y + 8}" width="${front - back}" height="7" fill="#4e4e4e"/>
    <g fill="#757575">${circles(rollers, y + height - 15, 7)}</g>
    <g fill="#bdbdbd">${circles(rollers.map((cx) => cx - 1), y + height - 16, 4.5)}</g>
    <g fill="#9e9e9e">${circles(between(2), y + 13, 4)}</g>
    <circle cx="${back}" cy="${y + r}" r="${r - 11}" fill="#757575" stroke="#757575" stroke-width="6" stroke-dasharray="4 3.5" ${evenDashes(2 * Math.PI * (r - 11), 7.5)} stroke-linecap="butt"/>
    <circle cx="${front}" cy="${y + r}" r="${r - 10}" fill="#757575"/>
    <g fill="#9e9e9e">${circles([back - 1.5, front - 1.5], y + r - 1.5, r - 15)}</g>
    <g fill="#e0e0e0">${circles([back, front], y + r, 6)}</g>
    <g fill="#757575">${circles([back, front], y + r, 2.5)}</g>`;
}

/** A unit step square to the line from (x1, y1) to (x2, y2), towards the light at the top left. */
function towardLight(x1: number, y1: number, x2: number, y2: number): [number, number] {
  const length = Math.hypot(x2 - x1, y2 - y1);
  const [nx, ny] = [(y2 - y1) / length, (x1 - x2) / length];
  // A line running straight along the light faces it on neither side: take the upper one, whichever way it is drawn.
  return nx + ny < 0 || (nx + ny === 0 && ny < 0) ? [nx, ny] : [-nx, -ny];
}

/** A straight line from (x1, y1) to (x2, y2), moved k square to it towards the light. */
function shifted(x1: number, y1: number, x2: number, y2: number, k: number, color: string, width: number): string {
  const [nx, ny] = towardLight(x1, y1, x2, y2);
  return `<path d="M${round(x1 + nx * k)} ${round(y1 + ny * k)} L${round(x2 + nx * k)} ${round(y2 + ny * k)}" stroke="${color}" stroke-width="${round(width)}"/>`;
}

/** A straight beam `width` thick from (x1, y1) to (x2, y2): lit along the edge facing the light, shaded along the other. */
export function bar(x1: number, y1: number, x2: number, y2: number, width: number, { light, base, dark }: Paint): string {
  const [lit, shade] = [width / 5, width / 3];
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${base}" stroke-width="${width}"/>
    ${shifted(x1, y1, x2, y2, (width - lit) / 2, light, lit)}
    ${shifted(x1, y1, x2, y2, -(width - shade) / 2, dark, shade)}`;
}

/** Slots in a panel at the given x positions, from y1 down to y2: each a shaded groove with a lit edge beside it. */
export function louvers(xs: number[], y1: number, y2: number, { light, deep }: Paint): string {
  const lines = (dx: number) => xs.map((x) => `<line x1="${x + dx}" y1="${y1}" x2="${x + dx}" y2="${y2}"/>`).join('');
  return `<g stroke="${deep}" stroke-width="3">${lines(0)}</g><g stroke="${light}" stroke-width="2">${lines(3)}</g>`;
}

/** A hydraulic cylinder `width` thick: its barrel from (x1, y1), and its shiny rod out to (x2, y2). Both catch the light. */
export function cylinder(x1: number, y1: number, x2: number, y2: number, width = 12): string {
  const [bx, by] = [round(x1 + (x2 - x1) * 0.6), round(y1 + (y2 - y1) * 0.6)];
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#bdbdbd" stroke-width="${width / 2}"/>
    ${shifted(bx, by, x2, y2, width / 8, '#fff', width / 6)}
    <line x1="${x1}" y1="${y1}" x2="${bx}" y2="${by}" stroke="#616161" stroke-width="${width}"/>
    ${shifted(x1, y1, bx, by, width / 4, '#8d8d8d', width / 4)}
    <g fill="#424242"><circle cx="${x1}" cy="${y1}" r="${width / 3}"/><circle cx="${x2}" cy="${y2}" r="${width / 3}"/></g>`;
}

/** Road wheels: treaded tyres of radius r centred on y, at the given x positions, with nuts round the hub. */
export function wheels(xs: number[], y: number, r: number): string {
  const nuts = xs.flatMap((x) =>
    Array.from({ length: 6 }, (_, i) => {
      const angle = (i * Math.PI) / 3;
      return `<circle cx="${round(x + Math.cos(angle) * r * 0.32)}" cy="${round(y + Math.sin(angle) * r * 0.32)}" r="${round(r * 0.06)}"/>`;
    }),
  );
  // The tread is a shade darker on the side away from the light.
  const litCentres = xs.map((x) => round(x - r * 0.05));
  return `<g fill="#263238" stroke="#263238" stroke-width="3" stroke-dasharray="4 4" stroke-linecap="butt">${circles(xs, y, r - 1.5, evenDashes(2 * Math.PI * (r - 1.5), 8))}</g>
    <g fill="#37474f">${circles(litCentres, round(y - r * 0.05), round(r * 0.88))}</g>
    <g fill="#78909c">${circles(xs, y, round(r * 0.55))}</g>
    <g fill="#cfd8dc">${circles(xs.map((x) => x - 1.5), y - 1.5, round(r * 0.5))}</g>
    <g fill="#90a4ae">${circles(xs, y, round(r * 0.2))}</g>
    <g fill="#78909c">${nuts.join('')}</g>`;
}

/** Glass in shadow: the edges of a pane set into the body, or a windscreen seen edge-on. */
export const GLASS = '#81d4fa';

/** A pane of glass set into the body: shaded along its top and left edges, with a glint in its top-right corner. */
function glass(x: number, y: number, width: number, height: number, rx = 10): string {
  const right = x + width;
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${rx}" fill="${GLASS}"/>
    <rect x="${x + 3}" y="${y + 4}" width="${width - 3}" height="${height - 4}" rx="${rx}" fill="#b3e5fc"/>
    <path d="M${right - 18} ${y + 3} h8 l7 7 v8 Z" fill="#fff" fill-opacity=".7"/>`;
}

/** A cab window with the face centred in it. */
export function cabWindow(x: number, y: number, width: number, height: number): string {
  return `${glass(x, y, width, height)}
    ${face(x + width / 2, y + height / 2)}`;
}

/** A rotating warning light standing on a roof at (x, y). */
export function beacon(x: number, y: number): string {
  return `<path d="M${x - 7} ${y} Q${x - 7} ${y - 12} ${x} ${y - 12} Q${x + 7} ${y - 12} ${x + 7} ${y} Z" fill="#ff9800"/>
    <ellipse cx="${x - 2.5}" cy="${y - 7}" rx="2" ry="3" fill="#fff" fill-opacity=".7"/>
    <rect x="${x - 10}" y="${y - 2}" width="20" height="6" rx="2" fill="#424242"/>`;
}

/**
 * The machine a shovel and a pile driver are built on: a crawler, and on it the body that turns, with
 * its counterweight at the back (left), the engine, and a deck at the front where the `attachment`
 * (an arm and bucket, a leader…) is fixed, its foot hidden behind the cab.
 */
export function shovel(paint: Paint, attachment: string): string {
  return `${shovelBody(paint)}${attachment}${shovelCab(paint)}`;
}

/** The crawler and the body of shovel(), drawn behind its attachment. */
function shovelBody(paint: Paint): string {
  const { light, base, dark, deep } = paint;
  return `${crawler(24, 198, 238, 52)}
  <rect x="96" y="186" width="120" height="14" fill="#424242"/>
  <path d="M92 122 V108 H164 V122" fill="none" stroke="#616161" stroke-width="4"/>
  <rect x="106" y="102" width="8" height="26" rx="2" fill="#616161"/>
  <line x1="108.5" y1="106" x2="108.5" y2="122" stroke="#9e9e9e" stroke-width="2"/>
  <rect x="80" y="118" width="96" height="16" rx="5" fill="${light}"/>
  <rect x="80" y="126" width="96" height="24" rx="4" fill="${base}"/>
  <rect x="40" y="142" width="222" height="50" rx="8" fill="${base}"/>
  <path d="M40 182 H262 V184 Q262 192 254 192 H48 Q40 192 40 184 Z" fill="${dark}"/>
  ${louvers([100, 114, 128, 142], 154, 176, paint)}
  <path d="M88 134 V196 H46 Q16 196 16 165 Q16 134 46 134 Z" fill="${base}"/>
  <path d="M20 168 Q22 192 46 192 H86" fill="none" stroke="${dark}" stroke-width="8"/>
  <path d="M20 164 Q20 138 46 138 H84" fill="none" stroke="${light}" stroke-width="5"/>
  <line x1="88" y1="136" x2="88" y2="194" stroke="${deep}" stroke-width="3"/>`;
}

/** The cab at the front of shovelBody(), with the face in its door window and a beacon on its roof. */
function shovelCab({ light, base, dark }: Paint): string {
  return `<path d="M174 176 V80 Q174 66 188 65 L238 62 Q248 62 249 72 L254 176 Z" fill="${base}"/>
  <path d="M246 72 L251 174" stroke="${dark}" stroke-width="6"/>
  <path d="M177 172 V80 Q177 69 189 68 L238 65" fill="none" stroke="${light}" stroke-width="5"/>
  ${cabWindow(182, 72, 60, 62)}
  ${glass(182, 142, 50, 26, 4)}
  <rect x="236" y="150" width="10" height="4" rx="2" fill="#424242"/>
  ${beacon(232, 60)}`;
}

/**
 * A cab-over truck facing right, with two rear axles; `load` (a dump bed, a drum…) sits on the frame
 * behind the cab, and a band of the `stripe` colour runs along the cab.
 */
export function truck({ light, base, dark }: Paint, load: string, stripe: string): string {
  return `<path d="M60 224 V200 Q60 186 76 186 H178 Q194 186 194 200 V224 Z" fill="#424242"/>
    <rect x="34" y="188" width="300" height="16" fill="#424242"/>
    <rect x="30" y="190" width="8" height="12" rx="2" fill="#e53935"/>
    ${load}
    <rect x="212" y="190" width="60" height="30" rx="8" fill="#cfd8dc"/>
    <rect x="216" y="192" width="52" height="5" rx="2.5" fill="#fff"/>
    <rect x="216" y="212" width="52" height="5" rx="2.5" fill="#90a4ae"/>
    <g stroke="#78909c" stroke-width="3"><line x1="226" y1="190" x2="226" y2="220"/><line x1="258" y1="190" x2="258" y2="220"/></g>
    <rect x="302" y="196" width="16" height="6" rx="2" fill="#424242"/>
    <path d="M300 206 V80 Q300 66 314 66 H386 Q400 66 402 80 L406 206 H383 A34 34 0 0 0 321 206 Z" fill="${base}"/>
    <rect x="300" y="158" width="105" height="10" fill="${stripe}"/>
    <path d="M303 200 V82 Q303 70 315 70 H384" fill="none" stroke="${light}" stroke-width="5"/>
    <path d="M399 82 L403 204" stroke="${dark}" stroke-width="6"/>
    <path d="M321 206 A34 34 0 0 1 383 206 Z" fill="#212121"/>
    ${cabWindow(312, 80, 72, 58)}
    <path d="M390 72 Q398 72 399 80 L402 138 H390 Z" fill="${GLASS}"/>
    <rect x="314" y="146" width="14" height="5" rx="2" fill="#424242"/>
    <path d="M402 92 Q414 92 414 84" fill="none" stroke="#424242" stroke-width="3"/>
    <rect x="409" y="60" width="9" height="26" rx="3" fill="#424242"/>
    <rect x="386" y="196" width="28" height="20" rx="4" fill="#9e9e9e"/>
    <rect x="386" y="196" width="28" height="5" rx="2" fill="#e0e0e0"/>
    <rect x="404" y="203" width="8" height="7" rx="2" fill="#fff59d"/>
    ${wheels([96, 158, 352], 220, 28)}`;
}
