import { face } from './face';
import type { Vehicle } from './types';

export const bulldozer: Vehicle = {
  name: 'ブルドーザー',
  width: 420,
  height: 260,
  shapes: `
  <g stroke-linecap="round" stroke-linejoin="round">
    <path d="M44 150 L22 150 L14 226 L26 230 L34 172 L44 172 Z" fill="#616161"/>
    <rect x="34" y="192" width="270" height="56" rx="28" fill="#424242"/>
    <g fill="#757575">
      <circle cx="66" cy="220" r="17"/><circle cx="116" cy="220" r="17"/><circle cx="168" cy="220" r="17"/>
      <circle cx="220" cy="220" r="17"/><circle cx="272" cy="220" r="17"/>
    </g>
    <g fill="#bdbdbd">
      <circle cx="66" cy="220" r="6"/><circle cx="116" cy="220" r="6"/><circle cx="168" cy="220" r="6"/>
      <circle cx="220" cy="220" r="6"/><circle cx="272" cy="220" r="6"/>
    </g>
    <line x1="250" y1="196" x2="334" y2="200" stroke="#f9a825" stroke-width="16"/>
    <line x1="268" y1="152" x2="334" y2="140" stroke="#9e9e9e" stroke-width="8"/>
    <rect x="40" y="118" width="124" height="78" rx="12" fill="#f9a825"/>
    <rect x="150" y="136" width="160" height="60" rx="10" fill="#fbc02d"/>
    <g stroke="#f9a825" stroke-width="4"><line x1="284" y1="148" x2="284" y2="184"/><line x1="296" y1="148" x2="296" y2="184"/></g>
    <rect x="214" y="104" width="12" height="36" rx="3" fill="#616161"/>
    <rect x="210" y="98" width="20" height="10" rx="3" fill="#424242"/>
    <rect x="58" y="34" width="104" height="90" rx="14" fill="#fbc02d"/>
    <rect x="70" y="46" width="80" height="64" rx="10" fill="#b3e5fc"/>
    ${face(110, 80)}
    <path d="M324 104 L356 98 Q378 172 358 246 L324 246 Z" fill="#fbc02d" stroke="#f9a825" stroke-width="4"/>
    <rect x="322" y="240" width="40" height="9" rx="2" fill="#9e9e9e"/>
  </g>`,
};
