// The garage the vehicles are washed in: a full-screen backdrop drawn in a 1600 x 1000 viewBox, lit
// from the top left like the vehicles.

/** Grooves between the wall panels; `dx` shifts them right, for the lit edge beside each. */
const seams = (dx: number) =>
  Array.from({ length: 11 }, (_, i) => `<line x1="${100 + i * 140 + dx}" y1="40" x2="${100 + i * 140 + dx}" y2="516"/>`).join('');

const lamp = (x: number) => `
  <line x1="${x}" y1="40" x2="${x}" y2="86" stroke="#455a64" stroke-width="4"/>
  <circle cx="${x}" cy="160" r="130" fill="url(#glow)"/>
  <rect x="${x - 10}" y="82" width="20" height="10" rx="3" fill="#37474f"/>
  <path d="M${x - 45} 130 L${x - 25} 90 L${x + 25} 90 L${x + 45} 130 Z" fill="#455a64"/>
  <path d="M${x - 45} 130 L${x - 25} 90 L${x - 10} 90 L${x - 22} 130 Z" fill="#607d8b"/>
  <rect x="${x - 47}" y="127" width="94" height="6" rx="3" fill="#37474f"/>
  <ellipse cx="${x}" cy="134" rx="24" ry="8" fill="#fff59d"/>`;

/** A tyre lying in the stack, its tread from y to y + 52. */
const tire = (y: number) => `
  <rect x="100" y="${y}" width="180" height="52" rx="24" fill="#37474f"/>
  <rect x="106" y="${y + 4}" width="168" height="9" rx="4.5" fill="#546e7a"/>
  <rect x="106" y="${y + 40}" width="168" height="8" rx="4" fill="#263238"/>
  <g stroke="#263238" stroke-width="5">${[124, 142, 160, 178, 196, 214, 232, 250].map((x) => `<line x1="${x}" y1="${y + 17}" x2="${x + 6}" y2="${y + 35}"/>`).join('')}</g>`;

/** A tool hung on the pegboard at (x, y), casting its shadow on the board; each part is [shape, colour]. */
const hung = (x: number, y: number, angle: number, parts: [string, string][]) => `
  <g transform="translate(${x + 6} ${y + 8}) rotate(${angle})" fill="#3e2723" opacity="0.2">${parts.map(([shape]) => shape).join('')}</g>
  <g transform="translate(${x} ${y}) rotate(${angle})">${parts.map(([shape, color]) => `<g fill="${color}">${shape}</g>`).join('')}</g>`;

/** A paint can standing on a shelf at `bottom`: a cylinder with its lid showing, lit on the left. */
const can = (x: number, bottom: number, width: number, height: number, [light, base, dark]: string[]) => {
  const top = bottom - height;
  return `<rect x="${x}" y="${top}" width="${width}" height="${height}" rx="4" fill="${base}"/>
  <rect x="${x + 4}" y="${top + 4}" width="6" height="${height - 8}" rx="3" fill="${light}"/>
  <rect x="${x + width - 10}" y="${top + 4}" width="7" height="${height - 8}" rx="3" fill="${dark}"/>
  <rect x="${x}" y="${top + height * 0.4}" width="${width}" height="${height * 0.28}" fill="#fff" opacity="0.85"/>
  <ellipse cx="${x + width / 2}" cy="${top}" rx="${width / 2}" ry="5" fill="${light}"/>
  <ellipse cx="${x + width / 2}" cy="${top}" rx="${width / 2 - 5}" ry="3" fill="${base}"/>`;
};

/** A box standing on a shelf at `bottom`, its lid showing above its front. */
const box = (x: number, bottom: number, width: number, height: number, [light, base, dark]: string[]) => {
  const top = bottom - height;
  return `<rect x="${x + 4}" y="${top - 8}" width="${width - 4}" height="12" rx="3" fill="${light}"/>
  <rect x="${x}" y="${top}" width="${width}" height="${height}" rx="3" fill="${base}"/>
  <rect x="${x}" y="${bottom - 7}" width="${width}" height="7" rx="2" fill="${dark}"/>`;
};

/** A shelf board at y: its top showing, its front edge, and its shadow on the wall below. */
const shelf = (y: number) => `
  <rect x="1230" y="${y + 14}" width="300" height="10" fill="#000" opacity="0.1"/>
  <path d="M1238 ${y - 8} H1522 L1530 ${y} H1230 Z" fill="#bcaaa4"/>
  <rect x="1230" y="${y}" width="300" height="14" fill="#8d6e63"/>
  <rect x="1230" y="${y}" width="300" height="3" fill="#a1887f"/>`;

/** Lines in the concrete floor, running away from the viewer from the foot of the wall. */
const floorJoints = (dx: number) =>
  [150, 470, 1130, 1450].map((x) => `<line x1="${x + dx}" y1="652" x2="${800 + (x - 800) * 1.9 + dx}" y2="1000"/>`).join('');

export const garage = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#b3afa8"/><stop offset="1" stop-color="#8a8781"/>
    </linearGradient>
    <linearGradient id="ceiling" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5d4037" stop-opacity="0.18"/><stop offset="1" stop-color="#5d4037" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="glow">
      <stop offset="0" stop-color="#fff8e1" stop-opacity="0.9"/><stop offset="1" stop-color="#fff8e1" stop-opacity="0"/>
    </radialGradient>
    <pattern id="hazard" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="20" height="40" fill="#fbc02d"/><rect x="20" width="20" height="40" fill="#424242"/>
    </pattern>
    <pattern id="slats" width="10" height="28" patternUnits="userSpaceOnUse">
      <rect width="10" height="28" fill="#cfd8dc"/><rect width="10" height="4" fill="#eceff1"/><rect y="21" width="10" height="7" fill="#b0bec5"/>
    </pattern>
    <pattern id="pegboard" width="24" height="24" patternUnits="userSpaceOnUse">
      <rect width="24" height="24" fill="#d7b48a"/><circle cx="12.8" cy="12.8" r="2.5" fill="#ecd2ae"/><circle cx="12" cy="12" r="2.5" fill="#a1825e"/>
    </pattern>
  </defs>

  <rect width="1600" height="1000" fill="#e6dccd"/>
  <rect y="40" width="1600" height="240" fill="url(#ceiling)"/>
  <g stroke="#d3c6b2" stroke-width="4">${seams(0)}</g>
  <g stroke="#f1e9dc" stroke-width="3">${seams(4)}</g>
  <rect y="516" width="1600" height="112" fill="#d8ccb9"/>
  <rect y="512" width="1600" height="8" fill="#efe6d8"/>
  <rect y="520" width="1600" height="5" fill="#c4b7a2"/>

  <rect width="1600" height="32" fill="#546e7a"/>
  <rect y="30" width="1600" height="10" fill="#78909c"/>
  <rect y="30" width="1600" height="3" fill="#90a4ae"/>
  <rect y="40" width="1600" height="10" fill="#000" opacity="0.1"/>
  <g fill="#37474f">${Array.from({ length: 9 }, (_, i) => `<circle cx="${100 + i * 175}" cy="16" r="5"/>`).join('')}</g>

  <rect x="462" y="86" width="676" height="554" fill="#90a4ae"/>
  <path d="M465 640 V89 H1135" fill="none" stroke="#b0bec5" stroke-width="6"/>
  <rect x="494" y="128" width="612" height="512" fill="url(#slats)"/>
  <rect x="494" y="128" width="612" height="16" fill="#000" opacity="0.12"/>
  <rect x="494" y="610" width="612" height="30" fill="#90a4ae"/>
  <rect x="494" y="610" width="612" height="5" fill="#cfd8dc"/>
  <rect x="770" y="590" width="60" height="14" rx="7" fill="#546e7a"/>
  <rect x="774" y="592" width="52" height="4" rx="2" fill="#90a4ae"/>
  <g fill="#78909c"><rect x="478" y="128" width="16" height="512"/><rect x="1106" y="128" width="16" height="512"/></g>
  <g fill="#b0bec5"><rect x="478" y="128" width="4" height="512"/><rect x="1106" y="128" width="4" height="512"/></g>
  <g fill="#546e7a"><rect x="490" y="128" width="4" height="512"/><rect x="1118" y="128" width="4" height="512"/></g>
  <rect x="450" y="76" width="700" height="52" rx="6" fill="#90a4ae"/>
  <rect x="450" y="76" width="700" height="9" rx="4" fill="#b0bec5"/>
  <rect x="450" y="120" width="700" height="8" rx="3" fill="#607d8b"/>

  ${lamp(320)}
  ${lamp(1280)}

  <rect x="62" y="222" width="316" height="246" rx="10" fill="#8d6e63"/>
  <path d="M66 462 V232 Q66 226 72 226 H372" fill="none" stroke="#a1887f" stroke-width="5"/>
  <path d="M374 232 V458 Q374 464 368 464 H72" fill="none" stroke="#5d4037" stroke-width="5"/>
  <rect x="74" y="234" width="292" height="222" fill="url(#pegboard)"/>
  <path d="M78 456 V238 H366" fill="none" stroke="#3e2723" stroke-opacity="0.15" stroke-width="8"/>
  ${hung(140, 300, 20, [
    ['<path d="M-7 -20.9 A22 22 0 1 0 7 -20.9 V-4 H-7 Z"/><rect x="-8" y="0" width="16" height="120" rx="8"/>', '#78909c'],
    ['<rect x="-6" y="6" width="4" height="108" rx="2"/><path d="M-19 -6 A19 19 0 0 1 -8 -18" fill="none" stroke="#b0bec5" stroke-width="4"/>', '#b0bec5'],
  ])}
  ${hung(240, 290, -15, [
    ['<rect x="-7" y="0" width="14" height="120" rx="6"/>', '#a1887f'],
    ['<rect x="-5" y="4" width="4" height="110" rx="2"/>', '#bcaaa4'],
    ['<rect x="-36" y="-14" width="72" height="28" rx="6"/>', '#546e7a'],
    ['<rect x="-33" y="-12" width="66" height="6" rx="3"/>', '#78909c'],
  ])}
  ${hung(320, 280, 0, [
    ['<rect x="-3" y="50" width="6" height="70"/>', '#90a4ae'],
    ['<rect x="-2" y="52" width="2" height="66"/>', '#cfd8dc'],
    ['<rect x="-9" y="0" width="18" height="50" rx="8"/>', '#e53935'],
    ['<rect x="-6" y="5" width="4" height="40" rx="2"/>', '#ef9a9a'],
  ])}
  <g fill="#616161"><circle cx="140" cy="276" r="4"/><circle cx="244" cy="270" r="4"/><circle cx="320" cy="274" r="4"/></g>

  <rect x="1176" y="506" width="24" height="10" rx="3" fill="#455a64"/>
  <rect x="1170" y="526" width="36" height="96" rx="14" fill="#d32f2f"/>
  <rect x="1175" y="534" width="7" height="80" rx="3.5" fill="#ef9a9a"/>
  <rect x="1195" y="534" width="7" height="80" rx="3.5" fill="#b71c1c"/>
  <rect x="1176" y="556" width="24" height="26" rx="3" fill="#fff"/>
  <rect x="1180" y="510" width="16" height="18" rx="3" fill="#37474f"/>
  <path d="M1196 516 Q1220 520 1214 566" fill="none" stroke="#212121" stroke-width="5"/>

  <g fill="#6d4c41"><rect x="1240" y="220" width="12" height="420"/><rect x="1508" y="220" width="12" height="420"/></g>
  <g fill="#8d6e63"><rect x="1240" y="220" width="3" height="420"/><rect x="1508" y="220" width="3" height="420"/></g>
  ${shelf(320)}${shelf(450)}${shelf(580)}
  ${can(1270, 316, 50, 54, ['#ef9a9a', '#e53935', '#b71c1c'])}
  ${can(1340, 316, 40, 40, ['#a5d6a7', '#43a047', '#1b5e20'])}
  ${can(1400, 316, 60, 60, ['#90caf9', '#1e88e5', '#0d47a1'])}
  ${box(1262, 446, 110, 72, ['#dcc3a1', '#c8a27a', '#a98458'])}
  <rect x="1306" y="366" width="22" height="80" fill="#e8d5b5"/>
  ${box(1392, 446, 90, 52, ['#ffe082', '#ffb300', '#ff8f00'])}
  <path d="M1418 394 V382 H1456 V394" fill="none" stroke="#5d4037" stroke-width="6"/>
  <path d="M1300 520 L1400 520 L1390 576 L1310 576 Z" fill="#ff7043"/>
  <path d="M1306 528 L1316 528 L1312 570 L1314 570 Z" fill="#ffab91"/>
  <path d="M1384 528 L1394 528 L1388 570 L1380 570 Z" fill="#e64a19"/>
  <ellipse cx="1350" cy="520" rx="50" ry="9" fill="#ff8a65"/>
  <ellipse cx="1350" cy="520" rx="43" ry="6" fill="#bf360c"/>

  <rect y="644" width="1600" height="356" fill="url(#floor)"/>
  <g stroke="#9a968f" stroke-width="3">${floorJoints(0)}<line x1="0" y1="790" x2="1600" y2="790"/></g>
  <g stroke="#c2beb6" stroke-width="2">${floorJoints(3)}<line x1="0" y1="793" x2="1600" y2="793"/></g>
  <rect y="644" width="1600" height="10" fill="#000" opacity="0.12"/>
  <rect y="620" width="1600" height="8" fill="#cfc9be"/>
  <rect y="628" width="1600" height="16" fill="url(#hazard)"/>
  <g opacity="0.55">
    <ellipse cx="330" cy="905" rx="130" ry="20" fill="#cfe3ec"/>
    <ellipse cx="1290" cy="870" rx="90" ry="14" fill="#cfe3ec"/>
  </g>
  <g fill="#fff" opacity="0.7">
    <ellipse cx="290" cy="900" rx="40" ry="4"/>
    <ellipse cx="1265" cy="866" rx="26" ry="3"/>
  </g>

  <ellipse cx="205" cy="712" rx="112" ry="12" fill="#000" opacity="0.2"/>
  ${tire(658)}${tire(606)}${tire(554)}
  <ellipse cx="190" cy="557" rx="86" ry="13" fill="#455a64"/>
  <ellipse cx="190" cy="557" rx="50" ry="8" fill="#1c262b"/>

  <ellipse cx="1442" cy="712" rx="80" ry="12" fill="#000" opacity="0.2"/>
  <rect x="1370" y="562" width="120" height="148" rx="10" fill="#c62828"/>
  <rect x="1378" y="568" width="14" height="136" rx="7" fill="#e57373"/>
  <rect x="1464" y="568" width="20" height="136" rx="8" fill="#8e0000"/>
  <g fill="#b71c1c"><rect x="1370" y="600" width="120" height="10"/><rect x="1370" y="662" width="120" height="10"/></g>
  <g fill="#ef9a9a"><rect x="1370" y="600" width="120" height="3"/><rect x="1370" y="662" width="120" height="3"/></g>
  <ellipse cx="1430" cy="562" rx="60" ry="12" fill="#b71c1c"/>
  <ellipse cx="1430" cy="561" rx="54" ry="9" fill="#e53935"/>
  <ellipse cx="1452" cy="560" rx="7" ry="3" fill="#7f0000"/>
</svg>`;
