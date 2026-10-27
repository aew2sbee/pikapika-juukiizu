/**
 * The face every vehicle wears in its cab window, centred on (x, y) in viewBox units. Each part lists
 * the moods it shows in: "normal", "happy" once clean, "fussy" while water hits the face, and "sleepy" on the lock screen.
 */
export function face(x: number, y: number): string {
  const cheeks = `<ellipse cx="${x - 20}" cy="${y + 7}" rx="5" ry="3.5"/><ellipse cx="${x + 20}" cy="${y + 7}" rx="5" ry="3.5"/>`;
  const mouth = `M${x - 11} ${y + 5} q11 16 22 0 Z`;
  return `<g class="face">
      <g data-moods="normal sleepy" fill="#f8bbd0">${cheeks}</g>
      <g data-moods="happy" fill="#f48fb1">${cheeks}</g>
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
  const rollers = between(Math.round((front - back) / 40));
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${r}" fill="#424242" stroke="#424242" stroke-width="6" stroke-dasharray="6 4" stroke-linecap="butt"/>
    <rect x="${x + 4}" y="${y + 4}" width="${width - 8}" height="${height - 8}" rx="${r - 4}" fill="none" stroke="#212121" stroke-width="8" stroke-dasharray="2 9" stroke-linecap="butt"/>
    <rect x="${x + 8}" y="${y + 8}" width="${width - 16}" height="${height - 16}" rx="${r - 8}" fill="#616161"/>
    <rect x="${back}" y="${y + 8}" width="${front - back}" height="7" fill="#4e4e4e"/>
    <g fill="#757575">${circles(rollers, y + height - 15, 7)}</g>
    <g fill="#bdbdbd">${circles(rollers.map((cx) => cx - 1), y + height - 16, 4.5)}</g>
    <g fill="#9e9e9e">${circles(between(2), y + 13, 4)}</g>
    <circle cx="${back}" cy="${y + r}" r="${r - 11}" fill="#757575" stroke="#757575" stroke-width="6" stroke-dasharray="4 3.5" stroke-linecap="butt"/>
    <circle cx="${front}" cy="${y + r}" r="${r - 10}" fill="#757575"/>
    <g fill="#9e9e9e">${circles([back - 1.5, front - 1.5], y + r - 1.5, r - 15)}</g>
    <g fill="#e0e0e0">${circles([back, front], y + r, 6)}</g>
    <g fill="#757575">${circles([back, front], y + r, 2.5)}</g>`;
}

/** A hydraulic cylinder: its barrel from (x1, y1), and its shiny rod out to (x2, y2). Both catch the light on their upper side. */
export function cylinder(x1: number, y1: number, x2: number, y2: number): string {
  const round = (v: number) => Math.round(v * 10) / 10;
  const [bx, by] = [round(x1 + (x2 - x1) * 0.6), round(y1 + (y2 - y1) * 0.6)];
  // A unit step square to the cylinder, towards the top of the picture.
  const side = (x2 >= x1 ? 1 : -1) / Math.hypot(x2 - x1, y2 - y1);
  const [nx, ny] = [(y2 - y1) * side, (x1 - x2) * side];
  const lit = (px: number, py: number, k: number) => `${round(px + nx * k)} ${round(py + ny * k)}`;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#bdbdbd" stroke-width="6"/>
    <path d="M${lit(bx, by, 1.5)} L${lit(x2, y2, 1.5)}" stroke="#fff" stroke-width="2"/>
    <line x1="${x1}" y1="${y1}" x2="${bx}" y2="${by}" stroke="#616161" stroke-width="12"/>
    <path d="M${lit(x1, y1, 3)} L${lit(bx, by, 3)}" stroke="#8d8d8d" stroke-width="3"/>
    <g fill="#424242"><circle cx="${x1}" cy="${y1}" r="4"/><circle cx="${x2}" cy="${y2}" r="4"/></g>`;
}

/** Road wheels: tyres of radius r centred on y, at the given x positions. */
export function wheels(xs: number[], y: number, r: number): string {
  return `<g fill="#37474f">${circles(xs, y, r)}</g>
    <g fill="#bdbdbd">${circles(xs, y, r * 0.5)}</g>
    <g fill="#757575">${circles(xs, y, r * 0.2)}</g>`;
}

/** A pane of glass set into the body: shaded along its top and left edges, with a glint in its top-right corner. */
export function glass(x: number, y: number, width: number, height: number, rx = 10): string {
  const right = x + width;
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${rx}" fill="#81d4fa"/>
    <rect x="${x + 3}" y="${y + 4}" width="${width - 3}" height="${height - 4}" rx="${rx}" fill="#b3e5fc"/>
    <path d="M${right - 18} ${y + 3} h8 l7 7 v8 Z" fill="#fff" fill-opacity=".7"/>`;
}

/** A cab window with the face centred in it. */
export function cabWindow(x: number, y: number, width: number, height: number): string {
  return `${glass(x, y, width, height)}
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
