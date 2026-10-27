/**
 * The face every vehicle wears in its cab window, centred on (x, y) in viewBox units. Each part lists
 * the moods it shows in: "normal", "happy" once clean, "fussy" while water hits the face, and "sleepy" on the lock screen.
 */
export function face(x: number, y: number): string {
  return `<g class="face">
      <g data-moods="normal happy">
        <g fill="#3e2723"><circle cx="${x - 11}" cy="${y - 6}" r="5.5"/><circle cx="${x + 11}" cy="${y - 6}" r="5.5"/></g>
        <g fill="#fff"><circle cx="${x - 9.5}" cy="${y - 7.5}" r="1.8"/><circle cx="${x + 12.5}" cy="${y - 7.5}" r="1.8"/></g>
      </g>
      <g data-moods="fussy" fill="none" stroke="#3e2723" stroke-width="3">
        <path d="M${x - 15} ${y - 11} l8 5 l-8 5"/><path d="M${x + 15} ${y - 11} l-8 5 l8 5"/>
      </g>
      <g data-moods="sleepy" fill="none" stroke="#3e2723" stroke-width="3">
        <path d="M${x - 16} ${y - 7} q5 5 10 0"/><path d="M${x + 6} ${y - 7} q5 5 10 0"/>
      </g>
      <g data-moods="happy" fill="#f48fb1">
        <circle cx="${x - 20}" cy="${y + 6}" r="4.5"/><circle cx="${x + 20}" cy="${y + 6}" r="4.5"/>
      </g>
      <path data-moods="normal" d="M${x - 7} ${y + 9} q7 5 14 0" fill="none" stroke="#3e2723" stroke-width="3"/>
      <path data-moods="happy" d="M${x - 11} ${y + 5} q11 16 22 0 Z" fill="#e57373" stroke="#3e2723" stroke-width="2.5"/>
      <path data-moods="fussy" d="M${x - 10} ${y + 10} q2.5 -4 5 0 q2.5 4 5 0 q2.5 -4 5 0 q2.5 4 5 0" fill="none" stroke="#3e2723" stroke-width="2.5"/>
      <ellipse data-moods="sleepy" cx="${x}" cy="${y + 9}" rx="3.5" ry="4.5" fill="#3e2723"/>
    </g>`;
}

/** Circles of one radius along a row, as SVG markup. */
function circles(xs: number[], cy: number, r: number): string {
  return xs.map((cx) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`).join('');
}

/** A crawler track: a rounded belt with wheels at the given x positions. */
export function track(x: number, y: number, width: number, height: number, wheelXs: number[]): string {
  const cy = y + height / 2;
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${height / 2}" fill="#424242"/>
    <g fill="#757575">${circles(wheelXs, cy, Math.round(height * 0.31))}</g>
    <g fill="#bdbdbd">${circles(wheelXs, cy, 6)}</g>`;
}

/**
 * A crawler seen from the side: a belt of plates with grousers, round a toothed drive sprocket at the
 * back (left) and an idler at the front (right), with rollers along the bottom and top between them.
 */
export function crawler(x: number, y: number, width: number, height: number): string {
  const r = height / 2;
  const [back, front] = [x + r, x + width - r];
  const between = (n: number) => Array.from({ length: n }, (_, i) => back + ((front - back) * (i + 1)) / (n + 1));
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${r}" fill="#424242" stroke="#424242" stroke-width="6" stroke-dasharray="6 4" stroke-linecap="butt"/>
    <rect x="${x + 4}" y="${y + 4}" width="${width - 8}" height="${height - 8}" rx="${r - 4}" fill="none" stroke="#212121" stroke-width="8" stroke-dasharray="2 9" stroke-linecap="butt"/>
    <rect x="${x + 8}" y="${y + 8}" width="${width - 16}" height="${height - 16}" rx="${r - 8}" fill="#616161"/>
    <g fill="#9e9e9e">${circles(between(Math.round((front - back) / 40)), y + height - 15, 7)}</g>
    <g fill="#9e9e9e">${circles(between(2), y + 13, 4)}</g>
    <circle cx="${back}" cy="${y + r}" r="${r - 11}" fill="#757575" stroke="#757575" stroke-width="6" stroke-dasharray="4 3.5" stroke-linecap="butt"/>
    <circle cx="${front}" cy="${y + r}" r="${r - 10}" fill="#757575"/>
    <g fill="#bdbdbd">${circles([back, front], y + r, 6)}</g>`;
}

/** A hydraulic cylinder: its barrel from (x1, y1), and its shiny rod out to (x2, y2). */
export function cylinder(x1: number, y1: number, x2: number, y2: number): string {
  const [bx, by] = [x1 + (x2 - x1) * 0.6, y1 + (y2 - y1) * 0.6];
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#e0e0e0" stroke-width="6"/>
    <line x1="${x1}" y1="${y1}" x2="${bx}" y2="${by}" stroke="#616161" stroke-width="12"/>
    <g fill="#424242"><circle cx="${x1}" cy="${y1}" r="4"/><circle cx="${x2}" cy="${y2}" r="4"/></g>`;
}

/** Road wheels: tyres of radius r centred on y, at the given x positions. */
export function wheels(xs: number[], y: number, r: number): string {
  return `<g fill="#37474f">${circles(xs, y, r)}</g>
    <g fill="#bdbdbd">${circles(xs, y, r * 0.5)}</g>
    <g fill="#757575">${circles(xs, y, r * 0.2)}</g>`;
}

/** A cab window with the face centred in it. */
export function cabWindow(x: number, y: number, width: number, height: number): string {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="10" fill="#b3e5fc"/>
    ${face(x + width / 2, y + height / 2)}`;
}

/** A three-wheeled truck with its cab on the right; `load` (a dump bed, a drum…) sits behind the cab. */
export function truck(cabColor: string, load: string): string {
  return `<rect x="30" y="172" width="360" height="22" rx="4" fill="#424242"/>
    ${load}
    <rect x="282" y="74" width="110" height="108" rx="16" fill="${cabColor}"/>
    ${cabWindow(296, 86, 82, 62)}
    <rect x="378" y="164" width="22" height="16" rx="4" fill="#757575"/>
    <circle cx="388" cy="156" r="6" fill="#fff59d"/>
    ${wheels([82, 150, 334], 204, 30)}`;
}
