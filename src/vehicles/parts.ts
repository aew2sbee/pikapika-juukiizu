/**
 * The face every vehicle wears in its cab window, centred on (x, y) in viewBox units. Each part lists
 * the moods it shows in: "normal", "happy" once clean, and "fussy" while water hits the face.
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
      <g data-moods="happy" fill="#f48fb1">
        <circle cx="${x - 20}" cy="${y + 6}" r="4.5"/><circle cx="${x + 20}" cy="${y + 6}" r="4.5"/>
      </g>
      <path data-moods="normal" d="M${x - 7} ${y + 9} q7 5 14 0" fill="none" stroke="#3e2723" stroke-width="3"/>
      <path data-moods="happy" d="M${x - 11} ${y + 5} q11 16 22 0 Z" fill="#e57373" stroke="#3e2723" stroke-width="2.5"/>
      <path data-moods="fussy" d="M${x - 10} ${y + 10} q2.5 -4 5 0 q2.5 4 5 0 q2.5 -4 5 0 q2.5 4 5 0" fill="none" stroke="#3e2723" stroke-width="2.5"/>
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
