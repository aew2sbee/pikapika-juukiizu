(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,{maxDensity:t,signal:n,onResize:r}){let i=new ResizeObserver(()=>{let n=Math.min(devicePixelRatio,t);e.width=Math.round(e.clientWidth*n),e.height=Math.round(e.clientHeight*n),r?.()});i.observe(e),n.addEventListener(`abort`,()=>i.disconnect())}function t(e,t){e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,e.canvas.width,e.canvas.height);let n=e.canvas.width/t;e.setTransform(n,0,0,n,0,0)}function n(e,t,n,r){e.fillStyle=n,e.globalAlpha=r,e.beginPath();for(let n of t)e.moveTo(n.x+n.r,n.y),e.arc(n.x,n.y,n.r,0,Math.PI*2);e.fill(),e.globalAlpha=1}function r(e,t,n){let[r,i]=[n.x-t.x,n.y-t.y],a=r*r+i*i,o=a?Math.max(0,Math.min(1,((e.x-t.x)*r+(e.y-t.y)*i)/a)):0;return Math.hypot(e.x-(t.x+o*r),e.y-(t.y+o*i))}var i={dust:.04,mud:.4},a=.6,o=6,s=class{cells;left;constructor(e){this.cells=e,this.left=e.filter(e=>e.hp>0).length}get remaining(){return this.cells.length?this.left/this.cells.length:0}spray(e,t,n,i){let a=!1;for(let o of this.cells)o.hp<=0||r(o,e,t)>n||(o.hp=Math.max(0,o.hp-i),o.hp===0&&this.left--,a=!0);return a}clear(){for(let e of this.cells)e.hp=0;this.left=0}};function c(e){return e.hp/i[e.kind]}function l(e,t=Math.random){let{cols:n,cellSize:r}=e,c=e.filled.flatMap((e,t)=>e?[{col:t%n,row:Math.floor(t/n)}]:[]),l=new Map,u=(e,n,i)=>{let a=c[Math.floor(t()*c.length)],o=(n+t()*(i-n))/r;for(let t of c)(t.col-a.col)**2+(t.row-a.row)**2<=o**2&&l.set(t,e)};if(c.length){for(let e=0;e<50&&l.size<c.length*a;e++)u(`dust`,20,40);for(let e=0;e<o;e++)u(`mud`,10,20)}return new s([...l].map(([{col:e,row:n},a])=>({x:(e+.5+(t()-.5)*.6)*r,y:(n+.5+(t()-.5)*.6)*r,r:r*(.75+t()*.35),kind:a,hp:i[a]})))}var u,d,f,p={air:1300,dirt:2600};function m(){try{u??=new AudioContext,u.state!==`running`&&u.resume().catch(()=>{})}catch{}}function h(){v(e=>{if(f)return;d??=b(e,1);let t=new AudioBufferSourceNode(e,{buffer:d,loop:!0}),n=new BiquadFilterNode(e,{type:`bandpass`,frequency:p.air,Q:.7}),r=new GainNode(e),i=e.currentTime;r.gain.setValueAtTime(0,i),r.gain.linearRampToValueAtTime(.12,i+.05),t.connect(n).connect(r).connect(e.destination),t.start(i),f={source:t,filter:n,gain:r}})}function g(){let e=f;f=void 0,e&&v(t=>{let n=t.currentTime;e.gain.gain.cancelScheduledValues(n),e.gain.gain.setTargetAtTime(0,n,.04),e.source.stop(n+.3)})}function _(e){v(t=>{f?.filter.frequency.setTargetAtTime(e?p.dirt:p.air,t.currentTime,.05)})}function ee(){v(e=>{let t=e.currentTime;[523.25,659.25,783.99,1046.5].forEach((n,r)=>y(e,n,t+r*.13,r===3?.7:.18))})}function te(){v(e=>{let t=e.currentTime;[660,520,440].forEach((n,r)=>y(e,n,t+r*.09,.12))})}function v(e){if(u)try{e(u)}catch{}}function y(e,t,n,r){let i=new OscillatorNode(e,{type:`triangle`,frequency:t}),a=new GainNode(e);a.gain.setValueAtTime(0,n),a.gain.linearRampToValueAtTime(.25,n+.02),a.gain.exponentialRampToValueAtTime(.001,n+r),i.connect(a).connect(e.destination),i.start(n),i.stop(n+r)}function b(e,t){let n=new AudioBuffer({length:Math.ceil(e.sampleRate*t),sampleRate:e.sampleRate}),r=n.getChannelData(0);for(let e=0;e<r.length;e++)r[e]=Math.random()*2-1;return n}function x(e,t){let n=`<ellipse cx="${e-20}" cy="${t+7}" rx="5" ry="3.5"/><ellipse cx="${e+20}" cy="${t+7}" rx="5" ry="3.5"/>`,r=`M${e-11} ${t+5} q11 16 22 0 Z`;return`<g class="face">
      <g data-moods="normal sleepy" fill="#f8bbd0">${n}</g>
      <g data-moods="happy" fill="#f48fb1">${n}</g>
      <g data-moods="normal happy">
        <g fill="#3e2723"><ellipse cx="${e-11}" cy="${t-6}" rx="5.5" ry="7"/><ellipse cx="${e+11}" cy="${t-6}" rx="5.5" ry="7"/></g>
        <g fill="#fff">
          <circle cx="${e-12.8}" cy="${t-8.8}" r="2.2"/><circle cx="${e+9.2}" cy="${t-8.8}" r="2.2"/>
          <circle cx="${e-9.4}" cy="${t-3.4}" r="1"/><circle cx="${e+12.6}" cy="${t-3.4}" r="1"/>
        </g>
      </g>
      <g data-moods="fussy" fill="none" stroke="#3e2723" stroke-width="3">
        <path d="M${e-15} ${t-11} l8 5 l-8 5"/><path d="M${e+15} ${t-11} l-8 5 l8 5"/>
      </g>
      <g data-moods="sleepy" fill="none" stroke="#3e2723" stroke-width="3">
        <path d="M${e-16} ${t-7} q5 5 10 0"/><path d="M${e+6} ${t-7} q5 5 10 0"/>
      </g>
      <path data-moods="normal" d="M${e-7} ${t+9} q7 5 14 0" fill="none" stroke="#3e2723" stroke-width="3"/>
      <g data-moods="happy">
        <path d="${r}" fill="#e57373"/>
        <ellipse cx="${e}" cy="${t+11}" rx="5" ry="2.5" fill="#ffab91"/>
        <path d="${r}" fill="none" stroke="#3e2723" stroke-width="2.5"/>
      </g>
      <path data-moods="fussy" d="M${e-10} ${t+10} q2.5 -4 5 0 q2.5 4 5 0 q2.5 -4 5 0 q2.5 4 5 0" fill="none" stroke="#3e2723" stroke-width="2.5"/>
      <ellipse data-moods="sleepy" cx="${e}" cy="${t+9}" rx="3.5" ry="4.5" fill="#3e2723"/>
    </g>`}var S={light:`#ffe082`,base:`#fbc02d`,dark:`#f9a825`,deep:`#f57f17`},C={light:`#ffcc80`,base:`#fb8c00`,dark:`#ef6c00`,deep:`#e65100`},w={light:`#ffffff`,base:`#eceff1`,dark:`#b0bec5`,deep:`#90a4ae`},T={light:`#64b5f6`,base:`#1e88e5`,dark:`#1565c0`,deep:`#0d47a1`},E={light:`#ef9a9a`,base:`#e53935`,dark:`#c62828`,deep:`#b71c1c`};function D(e){return Math.round(e*10)/10}function O(e,t,n){return e.map(e=>`<circle cx="${e}" cy="${t}" r="${n}"/>`).join(``)}function k(e,t,n,r){let i=r/2,[a,o]=[e+i,e+n-i],s=e=>Array.from({length:e},(t,n)=>a+(o-a)*(n+1)/(e+1)),c=s(Math.round((o-a)/40));return`<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="${i}" fill="#424242" stroke="#424242" stroke-width="6" stroke-dasharray="6 4" stroke-linecap="butt"/>
    <rect x="${e+4}" y="${t+4}" width="${n-8}" height="${r-8}" rx="${i-4}" fill="none" stroke="#212121" stroke-width="8" stroke-dasharray="2 9" stroke-linecap="butt"/>
    <rect x="${e+8}" y="${t+8}" width="${n-16}" height="${r-16}" rx="${i-8}" fill="#616161"/>
    <rect x="${a}" y="${t+8}" width="${o-a}" height="7" fill="#4e4e4e"/>
    <g fill="#757575">${O(c,t+r-15,7)}</g>
    <g fill="#bdbdbd">${O(c.map(e=>e-1),t+r-16,4.5)}</g>
    <g fill="#9e9e9e">${O(s(2),t+13,4)}</g>
    <circle cx="${a}" cy="${t+i}" r="${i-11}" fill="#757575" stroke="#757575" stroke-width="6" stroke-dasharray="4 3.5" stroke-linecap="butt"/>
    <circle cx="${o}" cy="${t+i}" r="${i-10}" fill="#757575"/>
    <g fill="#9e9e9e">${O([a-1.5,o-1.5],t+i-1.5,i-15)}</g>
    <g fill="#e0e0e0">${O([a,o],t+i,6)}</g>
    <g fill="#757575">${O([a,o],t+i,2.5)}</g>`}function A(e,t,n,r){let i=Math.hypot(n-e,r-t),[a,o]=[(r-t)/i,(e-n)/i];return a+o<=0?[a,o]:[-a,-o]}function j(e,t,n,r,i,a,o){let[s,c]=A(e,t,n,r);return`<path d="M${D(e+s*i)} ${D(t+c*i)} L${D(n+s*i)} ${D(r+c*i)}" stroke="${a}" stroke-width="${D(o)}"/>`}function M(e,t,n,r,i,{light:a,base:o,dark:s}){let[c,l]=[i/5,i/3];return`<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="${o}" stroke-width="${i}"/>
    ${j(e,t,n,r,(i-c)/2,a,c)}
    ${j(e,t,n,r,-(i-l)/2,s,l)}`}function ne(e,t,n,{light:r,deep:i}){let a=r=>e.map(e=>`<line x1="${e+r}" y1="${t}" x2="${e+r}" y2="${n}"/>`).join(``);return`<g stroke="${i}" stroke-width="3">${a(0)}</g><g stroke="${r}" stroke-width="2">${a(3)}</g>`}function N(e,t,n,r,i=12){let[a,o]=[D(e+(n-e)*.6),D(t+(r-t)*.6)];return`<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="#bdbdbd" stroke-width="${i/2}"/>
    ${j(a,o,n,r,i/8,`#fff`,i/6)}
    <line x1="${e}" y1="${t}" x2="${a}" y2="${o}" stroke="#616161" stroke-width="${i}"/>
    ${j(e,t,a,o,i/4,`#8d8d8d`,i/4)}
    <g fill="#424242"><circle cx="${e}" cy="${t}" r="${i/3}"/><circle cx="${n}" cy="${r}" r="${i/3}"/></g>`}function re(e,t,n){let r=e.flatMap(e=>Array.from({length:6},(r,i)=>{let a=i*Math.PI/3;return`<circle cx="${D(e+Math.cos(a)*n*.32)}" cy="${D(t+Math.sin(a)*n*.32)}" r="${D(n*.06)}"/>`})),i=e.map(e=>D(e-n*.05));return`<g fill="#263238" stroke="#263238" stroke-width="3" stroke-dasharray="4 4" stroke-linecap="butt">${O(e,t,n-1.5)}</g>
    <g fill="#37474f">${O(i,D(t-n*.05),D(n*.88))}</g>
    <g fill="#78909c">${O(e,t,D(n*.55))}</g>
    <g fill="#cfd8dc">${O(e.map(e=>e-1.5),t-1.5,D(n*.5))}</g>
    <g fill="#90a4ae">${O(e,t,D(n*.2))}</g>
    <g fill="#78909c">${r.join(``)}</g>`}function P(e,t,n,r,i=10){let a=e+n;return`<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="${i}" fill="#81d4fa"/>
    <rect x="${e+3}" y="${t+4}" width="${n-3}" height="${r-4}" rx="${i}" fill="#b3e5fc"/>
    <path d="M${a-18} ${t+3} h8 l7 7 v8 Z" fill="#fff" fill-opacity=".7"/>`}function F(e,t,n,r){return`${P(e,t,n,r)}
    ${x(e+n/2,t+r/2)}`}function I(e,t){return`<path d="M${e-7} ${t} Q${e-7} ${t-12} ${e} ${t-12} Q${e+7} ${t-12} ${e+7} ${t} Z" fill="#ff9800"/>
    <ellipse cx="${e-2.5}" cy="${t-7}" rx="2" ry="3" fill="#fff" fill-opacity=".7"/>
    <rect x="${e-10}" y="${t-2}" width="20" height="6" rx="2" fill="#424242"/>`}function ie(e){let{light:t,base:n,dark:r,deep:i}=e;return`${k(24,198,238,52)}
  <rect x="96" y="186" width="120" height="14" fill="#424242"/>
  <path d="M92 122 V108 H164 V122" fill="none" stroke="#616161" stroke-width="4"/>
  <rect x="106" y="102" width="8" height="26" rx="2" fill="#616161"/>
  <line x1="108.5" y1="106" x2="108.5" y2="122" stroke="#9e9e9e" stroke-width="2"/>
  <rect x="80" y="118" width="96" height="16" rx="5" fill="${t}"/>
  <rect x="80" y="126" width="96" height="24" rx="4" fill="${n}"/>
  <rect x="40" y="142" width="222" height="50" rx="8" fill="${n}"/>
  <path d="M40 182 H262 V184 Q262 192 254 192 H48 Q40 192 40 184 Z" fill="${r}"/>
  ${ne([100,114,128,142],154,176,e)}
  <path d="M88 134 V196 H46 Q16 196 16 165 Q16 134 46 134 Z" fill="${n}"/>
  <path d="M20 168 Q22 192 46 192 H86" fill="none" stroke="${r}" stroke-width="8"/>
  <path d="M20 164 Q20 138 46 138 H84" fill="none" stroke="${t}" stroke-width="5"/>
  <line x1="88" y1="136" x2="88" y2="194" stroke="${i}" stroke-width="3"/>`}function ae({light:e,base:t,dark:n}){return`<path d="M174 176 V80 Q174 66 188 65 L238 62 Q248 62 249 72 L254 176 Z" fill="${t}"/>
  <path d="M246 72 L251 174" stroke="${n}" stroke-width="6"/>
  <path d="M177 172 V80 Q177 69 189 68 L238 65" fill="none" stroke="${e}" stroke-width="5"/>
  ${F(182,72,60,62)}
  ${P(182,142,50,26,4)}
  <rect x="236" y="150" width="10" height="4" rx="2" fill="#424242"/>
  ${I(232,60)}`}function oe({light:e,base:t,dark:n},r,i){return`<path d="M60 224 V200 Q60 186 76 186 H178 Q194 186 194 200 V224 Z" fill="#424242"/>
    <rect x="34" y="188" width="300" height="16" fill="#424242"/>
    <rect x="30" y="190" width="8" height="12" rx="2" fill="#e53935"/>
    ${r}
    <rect x="212" y="190" width="60" height="30" rx="8" fill="#cfd8dc"/>
    <rect x="216" y="192" width="52" height="5" rx="2.5" fill="#fff"/>
    <rect x="216" y="212" width="52" height="5" rx="2.5" fill="#90a4ae"/>
    <g stroke="#78909c" stroke-width="3"><line x1="226" y1="190" x2="226" y2="220"/><line x1="258" y1="190" x2="258" y2="220"/></g>
    <rect x="302" y="196" width="16" height="6" rx="2" fill="#424242"/>
    <path d="M300 206 V80 Q300 66 314 66 H386 Q400 66 402 80 L406 206 H383 A34 34 0 0 0 321 206 Z" fill="${t}"/>
    <rect x="300" y="158" width="105" height="10" fill="${i}"/>
    <path d="M303 200 V82 Q303 70 315 70 H384" fill="none" stroke="${e}" stroke-width="5"/>
    <path d="M399 82 L403 204" stroke="${n}" stroke-width="6"/>
    <path d="M321 206 A34 34 0 0 1 383 206 Z" fill="#212121"/>
    ${F(312,80,72,58)}
    <path d="M390 72 Q398 72 399 80 L402 138 H390 Z" fill="#81d4fa"/>
    <rect x="314" y="146" width="14" height="5" rx="2" fill="#424242"/>
    <path d="M402 92 Q414 92 414 84" fill="none" stroke="#424242" stroke-width="3"/>
    <rect x="409" y="60" width="9" height="26" rx="3" fill="#424242"/>
    <rect x="386" y="196" width="28" height="20" rx="4" fill="#9e9e9e"/>
    <rect x="386" y="196" width="28" height="5" rx="2" fill="#e0e0e0"/>
    <rect x="404" y="203" width="8" height="7" rx="2" fill="#fff59d"/>
    ${re([96,158,352],220,28)}`}var{light:se,base:L,dark:R}=S,ce={name:`ぶるどーざー`,width:420,height:260,shapes:`
  <rect x="52" y="148" width="16" height="42" rx="3" fill="#616161"/>
  <g stroke="#757575" stroke-width="7"><line x1="58" y1="154" x2="38" y2="148"/><line x1="58" y1="184" x2="36" y2="176"/></g>
  <path d="M44 140 L28 140 L18 222 L26 238 L34 230 L36 170 L44 170 Z" fill="#616161"/>
  <path d="M28 146 L20 220" stroke="#9e9e9e" stroke-width="3"/>
  <path d="M18 222 L26 238 L30 228 Z" fill="#bdbdbd"/>
  ${k(50,196,272,54)}
  <rect x="62" y="140" width="146" height="56" rx="8" fill="${L}"/>
  <path d="M62 186 H208 V188 Q208 196 200 196 H70 Q62 196 62 188 Z" fill="${R}"/>
  <rect x="276" y="88" width="10" height="34" rx="2" fill="#616161"/>
  <line x1="278.5" y1="92" x2="278.5" y2="118" stroke="#9e9e9e" stroke-width="2"/>
  <path d="M274 90 L276 82 H292 L290 90 Z" fill="#424242"/>
  <rect x="234" y="100" width="16" height="22" rx="3" fill="#424242"/>
  <rect x="231" y="96" width="22" height="7" rx="3" fill="#616161"/>
  <rect x="202" y="116" width="132" height="16" rx="5" fill="${se}"/>
  <rect x="202" y="124" width="132" height="72" rx="4" fill="${L}"/>
  <rect x="202" y="184" width="132" height="12" fill="${R}"/>
  ${ne([226,240,254,268,282],144,172,S)}
  <rect x="326" y="120" width="16" height="76" rx="3" fill="#424242"/>
  <g stroke="#757575" stroke-width="3"><line x1="329" y1="132" x2="339" y2="132"/><line x1="329" y1="144" x2="339" y2="144"/><line x1="329" y1="156" x2="339" y2="156"/><line x1="329" y1="168" x2="339" y2="168"/><line x1="329" y1="180" x2="339" y2="180"/></g>
  <path d="M96 146 V62 Q96 50 108 50 H186 Q198 50 198 62 V146 Z" fill="${L}"/>
  <path d="M195 62 V142" stroke="${R}" stroke-width="6"/>
  <path d="M99 142 V64 Q99 53 110 53 H184" fill="none" stroke="${se}" stroke-width="5"/>
  ${F(108,62,78,66)}
  ${I(178,50)}
  ${M(196,224,360,238,14,S)}
  <circle cx="196" cy="224" r="6" fill="#424242"/>
  <line x1="330" y1="234" x2="356" y2="192" stroke="#757575" stroke-width="6"/>
  ${N(306,132,360,158)}
  <path d="M354 116 L384 106 Q394 106 390 116 Q370 176 394 242 L394 250 L358 250 Z" fill="${L}"/>
  <path d="M358 118 L361 240" stroke="${se}" stroke-width="4"/>
  <path d="M385 118 Q366 176 388 238" fill="none" stroke="${R}" stroke-width="8"/>
  <path d="M356 240 H394 V250 H358 Z" fill="#616161"/>
  <line x1="358" y1="242" x2="392" y2="242" stroke="#9e9e9e" stroke-width="2"/>`},{light:z,base:B,dark:V,deep:le}=w,[ue,de]=[140,124],fe=24*Math.PI/180,[pe,me]=[Math.cos(fe),-Math.sin(fe)];function H(e,t=0){return[D(ue+pe*e-me*t),D(de+me*e+pe*t)]}function U(e,t=0){return H(e,t).join(` `)}function W(e,t,n){return`<g stroke-linecap="butt">${M(...H(e),...H(t),n,w)}
    <path d="M${U(t-5)} L${U(t)}" stroke="${le}" stroke-width="${n+2}"/></g>`}function he(e){return`${N(e,186,e,236,14)}
  <rect x="${e-16}" y="236" width="32" height="10" rx="2" fill="#757575"/>
  <rect x="${e-16}" y="236" width="32" height="3" rx="1.5" fill="#bdbdbd"/>
  <rect x="${e-12}" y="170" width="24" height="20" rx="3" fill="${E.base}"/>
  <rect x="${e-12}" y="170" width="24" height="5" rx="2" fill="${E.light}"/>`}var ge={name:`くれーんしゃ`,width:420,height:260,shapes:`
  <path d="M40 172 Q40 164 48 164 H362 Q370 164 370 172 V202 H334 A38 38 0 0 0 258 202 H138 A38 38 0 0 0 62 202 H40 Z" fill="${B}"/>
  <path d="M43 200 V172 Q43 167 48 167 H362" fill="none" stroke="${z}" stroke-width="4"/>
  <path d="M40 199 H62 M138 199 H258 M334 199 H370" stroke="${V}" stroke-width="6" stroke-linecap="butt"/>
  <rect x="40" y="180" width="330" height="7" fill="${E.base}"/>
  <g fill="#212121"><path d="M62 202 A38 38 0 0 1 138 202 Z"/><path d="M258 202 A38 38 0 0 1 334 202 Z"/></g>
  <rect x="364" y="170" width="8" height="10" rx="2" fill="#fff59d"/>
  <rect x="130" y="156" width="120" height="10" fill="#424242"/>
  <rect x="112" y="132" width="140" height="30" rx="6" fill="${B}"/>
  <path d="M115 159 V138 Q115 135 118 135 H248" fill="none" stroke="${z}" stroke-width="4"/>
  <rect x="112" y="154" width="140" height="8" fill="${V}"/>
  <path d="M152 118 V164 H120 Q100 164 100 144 V138 Q100 118 120 118 Z" fill="${E.base}"/>
  <path d="M104 146 V138 Q104 122 120 122 H150" fill="none" stroke="${E.light}" stroke-width="4"/>
  <path d="M104 150 Q106 160 120 160 H150" fill="none" stroke="${E.dark}" stroke-width="6"/>
  ${N(204,160,234,99,16)}
  ${W(214,262,15)}
  ${W(170,224,19)}
  ${W(110,180,24)}
  ${W(-6,120,30)}
  <circle cx="${ue}" cy="${de}" r="8" fill="#424242"/>
  <path d="M${U(258,-12)} L${U(272,-12)} L${U(272,12)} L${U(258,12)} Z" fill="${E.base}"/>
  <line x1="393" y1="16" x2="393" y2="100" stroke="#424242" stroke-width="2"/>
  <circle cx="383" cy="15.8" r="10" fill="#616161"/>
  <circle cx="381.5" cy="14.3" r="6" fill="#9e9e9e"/>
  <circle cx="383" cy="15.8" r="3" fill="#424242"/>
  <rect x="382" y="98" width="22" height="30" rx="4" fill="#fbc02d"/>
  <path d="M382 110 L394 98 H400 L382 116 Z M386 128 L404 110 V116 L392 128 Z" fill="#424242"/>
  <rect x="382" y="98" width="22" height="4" rx="2" fill="#ffe082"/>
  <path d="M393 128 V136 Q393 148 383 148 Q375 148 375 140" fill="none" stroke="#616161" stroke-width="5"/>
  <path d="M236 170 V104 Q236 92 248 92 H290 Q298 92 302 100 L314 158 V170 Z" fill="${B}"/>
  <path d="M239 166 V104 Q239 95 248 95 H288" fill="none" stroke="${z}" stroke-width="4"/>
  <path d="M236 167 H314" stroke="${V}" stroke-width="6"/>
  ${F(244,102,56,56)}
  <path d="M302 100 L314 158 H306 L298 108 Z" fill="#81d4fa"/>
  ${I(258,92)}
  ${he(50)}
  ${he(360)}
  ${re([100,296],214,34)}`},_e=`#43a047`,ve=e=>[70,118,166,214].map(t=>`<rect x="${t}" y="108" width="${e}" height="68"/>`).join(``),ye={name:`だんぷとらっく`,width:420,height:260,shapes:oe(w,`
    <path d="M272 56 H318 V64 H292 V190 H272 Z" fill="#90a4ae"/>
    <path d="M275 59.5 H316 M275.5 60 V188" fill="none" stroke="#cfd8dc" stroke-width="3"/>
    <rect x="36" y="98" width="240" height="90" rx="4" fill="#b0bec5"/>
    <rect x="36" y="98" width="240" height="10" rx="3" fill="#cfd8dc"/>
    <rect x="36" y="176" width="240" height="12" fill="#90a4ae"/>
    <g fill="#90a4ae">${ve(8)}</g>
    <g fill="#cfd8dc">${ve(2)}</g>
    <rect x="30" y="96" width="10" height="94" rx="3" fill="#78909c"/>
    <rect x="40" y="188" width="236" height="6" fill="#607d8b"/>`,_e)},{light:be,base:xe,dark:Se}=S,Ce={name:`しょべるかー`,width:420,height:260,shapes:`
  ${ie(S)}
  <path d="M226 144 L276 70 L282 50 L296 54 L341 47 A11 11 0 0 1 347 69 L306 86 L246 160 Z" fill="${xe}"/>
  <path d="M345 65 L304 83 L243 157" fill="none" stroke="${Se}" stroke-width="8"/>
  <path d="M228 145 L278 71 M296 56 L340 50" fill="none" stroke="${be}" stroke-width="5"/>
  <rect x="254" y="111" width="12" height="10" rx="2" fill="#424242"/>
  <rect x="264" y="112" width="4" height="8" rx="1" fill="#fff59d"/>
  ${N(256,172,290,106)}
  ${N(283,55,338,36)}
  ${M(338,36,378,176,18,S)}
  ${N(353,44,383,150)}
  <g stroke="#757575" stroke-width="6"><line x1="370" y1="160" x2="383" y2="150"/><line x1="383" y1="150" x2="398" y2="172"/></g>
  <path d="M370 168 L400 168 Q418 204 390 234 L352 238 Q364 206 370 168 Z" fill="#616161"/>
  <path d="M375 173 L396 173 Q410 204 387 228 L362 232 Q371 206 375 173 Z" fill="#757575"/>
  <path d="M357 230 Q366 206 372 172" fill="none" stroke="#9e9e9e" stroke-width="3"/>
  <path d="M356 232 l-14 8 l15 1 Z M370 234 l-13 9 l15 0 Z" fill="#bdbdbd"/>
  <g fill="#424242"><circle cx="344" cy="58" r="6"/><circle cx="378" cy="176" r="6"/></g>
  <g fill="#757575"><circle cx="342.5" cy="56.5" r="2.5"/><circle cx="376.5" cy="174.5" r="2.5"/></g>
  ${ae(S)}`},we={name:`みきさーしゃ`,width:420,height:260,shapes:oe(T,`
    <g stroke="#757575" stroke-width="3"><line x1="26" y1="60" x2="26" y2="190"/><line x1="38" y1="60" x2="38" y2="190"/>${[72,88,104,120,136,152,168,184].map(e=>`<line x1="26" y1="${e}" x2="38" y2="${e}"/>`).join(``)}</g>
    <g fill="#616161"><rect x="70" y="120" width="20" height="70"/><rect x="250" y="130" width="20" height="60"/></g>
    <rect x="282" y="64" width="16" height="124" rx="6" fill="#cfd8dc"/>
    <rect x="284" y="68" width="4" height="116" rx="2" fill="#fff"/>
    <path d="M55 50 Q140 38 210 40 L249 48 C283 55 292 98 284 112 C276 138 254 160 227 157 L188 149 Q110 120 49 78 Z" fill="#b0bec5"/>
    <path d="M55 50 Q140 38 210 40 L249 48 C281 55 290 96 280 110 C262 134 230 140 200 134 Q120 110 52 70 Z" fill="#eceff1"/>
    <path d="M60 52 Q140 41 210 43 L246 51" fill="none" stroke="#fff" stroke-width="5"/>
    <g fill="#ff7043">
      <path d="M100 45 L122 43 Q132 92 152 133 L132 124 Q110 92 100 45 Z"/>
      <path d="M160 40 L184 40 Q190 100 214 152 L190 147 Q168 100 160 40 Z"/>
      <path d="M232 45 L254 51 Q258 110 262 146 L244 155 Q244 100 232 45 Z"/>
    </g>
    <path d="M47 76 L55 50" stroke="#616161" stroke-width="7"/>
    <path d="M30 20 H80 L68 44 H42 Z" fill="#90a4ae"/>
    <path d="M30 20 H80 L78 25 H32 Z" fill="#cfd8dc"/>
    <rect x="48" y="42" width="14" height="12" fill="#78909c"/>
    <path d="M46 84 L22 132" stroke="#78909c" stroke-width="10"/>
    <path d="M43 84 L19 130" stroke="#b0bec5" stroke-width="3"/>`,`#fff`)},{light:Te,base:Ee,dark:De,deep:Oe}=C,ke=[34,70,106,142,178,214].map(e=>`<rect x="305" y="${e}" width="12" height="10" rx="2"/>`).join(``),Ae=[92,106,120,134,148,162,176,190,204,218,232].map(e=>`M328 ${e} L356 ${e+8}`).join(` `),je=[Ce,ce,ye,we,ge,{name:`ぱいるどらいばー`,width:420,height:260,shapes:`
  ${ie(C)}
  ${N(112,124,302,52,10)}
  <rect x="250" y="150" width="54" height="24" rx="4" fill="${Ee}"/>
  <rect x="250" y="150" width="54" height="5" rx="2" fill="${Te}"/>
  <rect x="250" y="168" width="54" height="6" rx="2" fill="${De}"/>
  <rect x="300" y="10" width="24" height="232" rx="3" fill="${Ee}"/>
  <rect x="302" y="12" width="4" height="228" rx="2" fill="${Te}"/>
  <rect x="318" y="12" width="6" height="228" fill="${De}"/>
  <g fill="${Oe}">${ke}</g>
  <rect x="324" y="10" width="5" height="232" fill="#616161"/>
  <rect x="294" y="2" width="40" height="12" rx="3" fill="#616161"/>
  <rect x="294" y="2" width="40" height="3" rx="1.5" fill="#9e9e9e"/>
  <g stroke="#424242" stroke-width="2"><line x1="330" y1="14" x2="330" y2="42"/><line x1="336" y1="14" x2="336" y2="42"/></g>
  <line x1="342" y1="86" x2="342" y2="244" stroke="#757575" stroke-width="6"/>
  <path d="${Ae}" stroke="#9e9e9e" stroke-width="6"/>
  <path d="${Ae}" stroke="#e0e0e0" stroke-width="2" transform="translate(0 -2)"/>
  <path d="M332 240 L352 240 L342 254 Z" fill="#9e9e9e"/>
  <rect x="318" y="40" width="48" height="46" rx="6" fill="#616161"/>
  <rect x="318" y="40" width="48" height="8" rx="4" fill="#9e9e9e"/>
  <g stroke="#424242" stroke-width="3"><line x1="328" y1="58" x2="356" y2="58"/><line x1="328" y1="66" x2="356" y2="66"/><line x1="328" y1="74" x2="356" y2="74"/></g>
  ${ae(C)}`}];function G({width:e,height:t,shapes:n}){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${e} ${t}" width="${e}" height="${t}" stroke-linecap="round" stroke-linejoin="round">${n}</svg>`}var K={x:-50,y:-45,width:240,height:110},q={x:-K.x/K.width,y:-K.y/K.height},Me=184,Ne=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${K.x} ${K.y} ${K.width} ${K.height}">
  <g stroke-linejoin="round" stroke-linecap="round">
    <rect x="40" y="-5" width="130" height="10" rx="4" fill="#b0bec5" stroke="#78909c" stroke-width="2"/>
    <rect x="160" y="-9" width="24" height="18" rx="5" fill="#ffb300"/>
    <path d="M-12 -2 L-26 50 Q-28 58 -18 60 L-2 60 Q6 60 6 52 L14 8 Z" fill="#263238"/>
    <path d="M10 8 q10 16 -2 26" fill="none" stroke="#263238" stroke-width="5"/>
    <rect x="-40" y="-18" width="90" height="30" rx="12" fill="#1e88e5" stroke="#1565c0" stroke-width="3"/>
    <circle cx="-24" cy="-3" r="5" fill="#90caf9"/>
  </g>
</svg>`,Pe=-.45,Fe=.05,Ie=900,Le=240,Re=4,ze=[[.7,`rgb(129 212 250 / 0.35)`],[.35,`rgb(179 229 252 / 0.85)`],[.12,`rgb(255 255 255 / 0.95)`]],Be=class{options;gun;g;drops=[];fingers=new Map;nozzle;shades=Array.from({length:Re},()=>[]);hitting=!1;animating=!1;frameRequest=0;lastFrame;constructor(t,n){this.options=n,t.insertAdjacentHTML(`beforeend`,`<canvas class="water"></canvas><div class="gun">${Ne}</div>`);let r=t.querySelector(`.water`);this.g=r.getContext(`2d`),this.gun=t.querySelector(`.gun`),this.gun.style.aspectRatio=`${K.width} / ${K.height}`,this.gun.querySelector(`svg`).style.transformOrigin=`${q.x*100}% ${q.y*100}%`,this.aim(Pe);let{signal:i}=n;e(r,{maxDensity:1,signal:i}),i.addEventListener(`abort`,()=>{cancelAnimationFrame(this.frameRequest),g()}),t.addEventListener(`pointerdown`,e=>{if(m(),e.pointerType===`mouse`&&e.button!==0||e.target.closest(`button`))return;t.setPointerCapture(e.pointerId);let n={x:e.clientX,y:e.clientY};this.fingers.set(e.pointerId,n),!this.nozzle&&(this.nozzle={id:e.pointerId,last:n},h(),this.animate())}),t.addEventListener(`pointermove`,e=>{this.fingers.has(e.pointerId)&&this.fingers.set(e.pointerId,{x:e.clientX,y:e.clientY})}),t.addEventListener(`pointerup`,e=>{m(),this.release(e)}),t.addEventListener(`pointercancel`,e=>this.release(e))}release(e){if(this.fingers.delete(e.pointerId),this.nozzle?.id!==e.pointerId)return;let[t]=this.fingers;if(t){let[e,n]=t;this.nozzle={id:e,last:n}}else this.nozzle=void 0,this.hitting=!1,this.aim(Pe),g()}animate(){this.animating||(this.animating=!0,this.lastFrame=void 0,this.frameRequest=requestAnimationFrame(this.frame))}frame=e=>{let n=this.lastFrame===void 0?0:Math.min((e-this.lastFrame)/1e3,Fe);this.lastFrame=e;let{g:r,nozzle:i}=this;if(t(r,r.canvas.clientWidth),i){let e=this.fingers.get(i.id),t=this.options.onSpray(i.last,e,n);i.last=e,t!==this.hitting&&_(this.hitting=t);let r=this.options.splashRadius();this.drawJet(this.aimAt(e),e,r),this.splash(e,r,n)}this.drawDrops(n),this.animating=!!this.nozzle||this.drops.length>0,this.animating&&(this.frameRequest=requestAnimationFrame(this.frame))};aimAt(e){let t=this.gun.getBoundingClientRect(),n={x:t.left+q.x*t.width,y:t.top+q.y*t.height},r=Math.atan2(e.y-n.y,e.x-n.x);this.aim(r);let i=Me/K.width*t.width;return{x:n.x+Math.cos(r)*i,y:n.y+Math.sin(r)*i}}aim(e){this.gun.style.setProperty(`--angle`,`${e}rad`)}drawJet(e,t,n){let{g:r}=this,i=Math.hypot(t.x-e.x,t.y-e.y),a=(e.x+t.x)/2+(Math.random()-.5)*4,o=(e.y+t.y)/2-i*.05+(Math.random()-.5)*4;r.lineCap=`round`;for(let[i,s]of ze)r.lineWidth=n*i,r.strokeStyle=s,r.beginPath(),r.moveTo(e.x,e.y),r.quadraticCurveTo(a,o,t.x,t.y),r.stroke()}splash(e,t,n){let{g:r}=this,i=r.createRadialGradient(e.x,e.y,0,e.x,e.y,t);i.addColorStop(0,`rgb(225 245 254 / 0.8)`),i.addColorStop(1,`rgb(225 245 254 / 0)`),r.fillStyle=i,r.beginPath(),r.arc(e.x,e.y,t,0,Math.PI*2),r.fill();for(let r=Math.round(Le*n*Math.random()*2);r>0;r--){let n=-Math.PI*Math.random(),r=120+Math.random()*200;this.drops.push({x:e.x,y:e.y,vx:Math.cos(n)*r,vy:Math.sin(n)*r,r:t*(.05+Math.random()*.08),age:0,life:.3+Math.random()*.3})}}drawDrops(e){let{g:t,drops:r,shades:i}=this;for(let e of i)e.length=0;let a=0;for(let t of r)t.age+=e,!(t.age>=t.life)&&(t.vy+=Ie*e,t.x+=t.vx*e,t.y+=t.vy*e,r[a++]=t,i[Math.ceil((1-t.age/t.life)*Re)-1].push(t));r.length=a,i.forEach((e,r)=>{e.length&&n(t,e,`rgb(179 229 252)`,(r+1)/Re)})}},Ve=6,He=18,Ue=27,We=.03,Ge=8,Ke=14,qe=.6,Je=400,Ye=1500,Xe={dust:`#d7b98a`,mud:`#5d4037`};async function Ze(i,a,{signal:o,onBack:s,onClean:u,onOneMore:d,onSleep:f}){let{width:p,height:m}=a,h=G(a);i.classList.add(`wash`),i.innerHTML=`
    <button class="back pill" type="button">◀ もどる</button>
    <button class="sleep-now pill" type="button">☾ おやすみ</button>
    <div class="stage" data-mood="normal" style="--aspect: ${p} / ${m}">
      <div class="vehicle" aria-label="${a.name}">${h}<canvas></canvas></div>
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
    </div>`;let g=i.querySelector(`.stage`),_=g.querySelector(`canvas`),v=g.querySelector(`.cheer`),y=g.querySelector(`.actions`),b=g.querySelector(`.question`),x=g.querySelector(`.ask`),S=_.getContext(`2d`),C=$e(g.querySelector(`.face`));for(let e of[`mask-image`,`-webkit-mask-image`])_.style.setProperty(e,`url("${tt(h)}")`);i.querySelector(`.back`).addEventListener(`click`,s),i.querySelector(`.sleep-now`).addEventListener(`click`,f);let w=await rt(a);if(o.aborted)return;let T,E=0,D=!1,O=!1,k=0,A=0;function j(){g.dataset.mood=O?`fussy`:D?`happy`:`normal`}function M(){T=l(w),clearTimeout(E),D=!1,g.querySelectorAll(`.sparkle`).forEach(e=>e.remove()),v.hidden=y.hidden=b.hidden=x.hidden=!0,N(),P()}function ne(e,t,n,i){r(C,e,t)>C.r+n-He?k=0:(k+=i,clearTimeout(A),A=window.setTimeout(N,Je),k>=qe&&!O&&(O=!0,j(),te()))}function N(){clearTimeout(A),k=0,O=!1,j()}function re(){T.clear(),P(),D=!0,j(),v.hidden=!1,at(g);let e=u();E=window.setTimeout(()=>{e===`lock`?f():e===`ask`?(v.hidden=!0,b.hidden=x.hidden=!1):y.hidden=!1},Ye),ee()}function P(){t(S,p);let e=[],r=new Map;for(let t of T.cells)if(!(t.hp<=0)){if(t.kind===`dust`)e.push(t);else{let e=Math.ceil(c(t)*Ge)/Ge,n=r.get(e);n?n.push(t):r.set(e,[t])}}n(S,e,Xe.dust,.9);for(let[e,t]of r)n(S,t,Xe.mud,.35+.65*e)}function F(){let e=_.clientWidth;return e?Math.max(He,Ue*p/e):He}function I(e,t){return{x:(e.x-t.left)/t.width*p,y:(e.y-t.top)/t.height*m}}new Be(i,{onSpray(e,t,n){let r=_.getBoundingClientRect(),i=I(e,r),a=I(t,r),o=F();ne(i,a,o,n);let s=T.spray(i,a,o,n);return s&&T.remaining<=We?re():s&&P(),s},splashRadius:()=>F()*_.clientWidth/p,signal:o}),g.querySelector(`.again`).addEventListener(`click`,M),g.querySelector(`.others`).addEventListener(`click`,s),g.querySelector(`.one-more`).addEventListener(`click`,()=>{d(),b.hidden=x.hidden=!0,v.hidden=y.hidden=!1,g.querySelector(`.again`).focus()}),g.querySelector(`.goodnight-now`).addEventListener(`click`,f),o.addEventListener(`abort`,()=>{clearTimeout(E),clearTimeout(A)}),e(_,{maxDensity:2,signal:o,onResize:P}),M()}var Qe=12;function $e(e){let t=e.getBBox();return{x:t.x+t.width/2,y:t.y+t.height/2,r:Math.max(t.width,t.height)/2+Qe}}function et(e){return new Promise((t,n)=>{let r=new Image;r.onload=()=>t(r),r.onerror=()=>n(Error(`Could not load ${e.slice(0,40)}…`)),r.src=e})}function tt(e){return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`}var nt=new Map;function rt(e){let t=nt.get(e);if(!t){let n=Math.ceil(e.width/Ve),r=Math.ceil(e.height/Ve);t=et(tt(G(e))).then(e=>it(e,n,r),t=>{throw nt.delete(e),t}),nt.set(e,t)}return t}function it(e,t,n){let r=document.createElement(`canvas`);r.width=t,r.height=n;let i=r.getContext(`2d`,{willReadFrequently:!0});i.drawImage(e,0,0,t,n);let a=i.getImageData(0,0,t,n).data.filter((e,t)=>t%4==3);return{cols:t,rows:n,cellSize:Ve,filled:Array.from(a,e=>e>128)}}function at(e){for(let t=0;t<Ke;t++){let t=document.createElement(`span`);t.className=`sparkle`,t.style.left=`${5+Math.random()*90}%`,t.style.top=`${5+Math.random()*85}%`,t.style.animationDelay=`${Math.random()*1.2}s`,t.style.setProperty(`--size`,`${18+Math.random()*26}px`),e.append(t)}}var ot=e=>Array.from({length:11},(t,n)=>`<line x1="${100+n*140+e}" y1="40" x2="${100+n*140+e}" y2="516"/>`).join(``),st=e=>`
  <line x1="${e}" y1="40" x2="${e}" y2="86" stroke="#455a64" stroke-width="4"/>
  <circle cx="${e}" cy="160" r="130" fill="url(#glow)"/>
  <rect x="${e-10}" y="82" width="20" height="10" rx="3" fill="#37474f"/>
  <path d="M${e-45} 130 L${e-25} 90 L${e+25} 90 L${e+45} 130 Z" fill="#455a64"/>
  <path d="M${e-45} 130 L${e-25} 90 L${e-10} 90 L${e-22} 130 Z" fill="#607d8b"/>
  <rect x="${e-47}" y="127" width="94" height="6" rx="3" fill="#37474f"/>
  <ellipse cx="${e}" cy="134" rx="24" ry="8" fill="#fff59d"/>`,ct=e=>`
  <rect x="100" y="${e}" width="180" height="52" rx="24" fill="#37474f"/>
  <rect x="106" y="${e+4}" width="168" height="9" rx="4.5" fill="#546e7a"/>
  <rect x="106" y="${e+40}" width="168" height="8" rx="4" fill="#263238"/>
  <g stroke="#263238" stroke-width="5">${[124,142,160,178,196,214,232,250].map(t=>`<line x1="${t}" y1="${e+17}" x2="${t+6}" y2="${e+35}"/>`).join(``)}</g>`,lt=(e,t,n,r)=>`
  <g transform="translate(${e+6} ${t+8}) rotate(${n})" fill="#3e2723" opacity="0.2">${r.map(([e])=>e).join(``)}</g>
  <g transform="translate(${e} ${t}) rotate(${n})">${r.map(([e,t])=>`<g fill="${t}">${e}</g>`).join(``)}</g>`,ut=(e,t,n,r,{light:i,base:a,dark:o})=>{let s=t-r;return`<rect x="${e}" y="${s}" width="${n}" height="${r}" rx="4" fill="${a}"/>
  <rect x="${e+4}" y="${s+4}" width="6" height="${r-8}" rx="3" fill="${i}"/>
  <rect x="${e+n-10}" y="${s+4}" width="7" height="${r-8}" rx="3" fill="${o}"/>
  <rect x="${e}" y="${s+r*.4}" width="${n}" height="${r*.28}" fill="#fff" opacity="0.85"/>
  <ellipse cx="${e+n/2}" cy="${s}" rx="${n/2}" ry="5" fill="${i}"/>
  <ellipse cx="${e+n/2}" cy="${s}" rx="${n/2-5}" ry="3" fill="${a}"/>`},dt=(e,t,n,r,{light:i,base:a,dark:o})=>{let s=t-r;return`<rect x="${e+4}" y="${s-8}" width="${n-4}" height="12" rx="3" fill="${i}"/>
  <rect x="${e}" y="${s}" width="${n}" height="${r}" rx="3" fill="${a}"/>
  <rect x="${e}" y="${t-7}" width="${n}" height="7" rx="2" fill="${o}"/>`},ft=e=>`
  <rect x="1230" y="${e+14}" width="300" height="10" fill="#000" opacity="0.1"/>
  <path d="M1238 ${e-8} H1522 L1530 ${e} H1230 Z" fill="#bcaaa4"/>
  <rect x="1230" y="${e}" width="300" height="14" fill="#8d6e63"/>
  <rect x="1230" y="${e}" width="300" height="3" fill="#a1887f"/>`,pt=e=>[150,470,1130,1450].map(t=>`<line x1="${t+e}" y1="652" x2="${800+(t-800)*1.9+e}" y2="1000"/>`).join(``),mt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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
  <g stroke="#d3c6b2" stroke-width="4">${ot(0)}</g>
  <g stroke="#f1e9dc" stroke-width="3">${ot(4)}</g>
  <rect y="516" width="1600" height="112" fill="#d8ccb9"/>
  <rect y="512" width="1600" height="8" fill="#efe6d8"/>
  <rect y="520" width="1600" height="5" fill="#c4b7a2"/>

  <rect width="1600" height="32" fill="#546e7a"/>
  <rect y="30" width="1600" height="10" fill="#78909c"/>
  <rect y="30" width="1600" height="3" fill="#90a4ae"/>
  <rect y="40" width="1600" height="10" fill="#000" opacity="0.1"/>
  <g fill="#37474f">${Array.from({length:9},(e,t)=>`<circle cx="${100+t*175}" cy="16" r="5"/>`).join(``)}</g>

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

  ${st(320)}
  ${st(1280)}

  <rect x="62" y="222" width="316" height="246" rx="10" fill="#8d6e63"/>
  <path d="M66 462 V232 Q66 226 72 226 H372" fill="none" stroke="#a1887f" stroke-width="5"/>
  <path d="M374 232 V458 Q374 464 368 464 H72" fill="none" stroke="#5d4037" stroke-width="5"/>
  <rect x="74" y="234" width="292" height="222" fill="url(#pegboard)"/>
  <path d="M78 456 V238 H366" fill="none" stroke="#3e2723" stroke-opacity="0.15" stroke-width="8"/>
  ${lt(140,300,20,[[`<path d="M-7 -20.9 A22 22 0 1 0 7 -20.9 V-4 H-7 Z"/><rect x="-8" y="0" width="16" height="120" rx="8"/>`,`#78909c`],[`<rect x="-6" y="6" width="4" height="108" rx="2"/><path d="M-19 -6 A19 19 0 0 1 -8 -18" fill="none" stroke="#b0bec5" stroke-width="4"/>`,`#b0bec5`]])}
  ${lt(240,290,-15,[[`<rect x="-7" y="0" width="14" height="120" rx="6"/>`,`#a1887f`],[`<rect x="-5" y="4" width="4" height="110" rx="2"/>`,`#bcaaa4`],[`<rect x="-36" y="-14" width="72" height="28" rx="6"/>`,`#546e7a`],[`<rect x="-33" y="-12" width="66" height="6" rx="3"/>`,`#78909c`]])}
  ${lt(320,280,0,[[`<rect x="-3" y="50" width="6" height="70"/>`,`#90a4ae`],[`<rect x="-2" y="52" width="2" height="66"/>`,`#cfd8dc`],[`<rect x="-9" y="0" width="18" height="50" rx="8"/>`,`#e53935`],[`<rect x="-6" y="5" width="4" height="40" rx="2"/>`,`#ef9a9a`]])}
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
  ${ft(320)}${ft(450)}${ft(580)}
  ${ut(1270,316,50,54,{light:`#ef9a9a`,base:`#e53935`,dark:`#b71c1c`})}
  ${ut(1340,316,40,40,{light:`#a5d6a7`,base:`#43a047`,dark:`#1b5e20`})}
  ${ut(1400,316,60,60,{light:`#90caf9`,base:`#1e88e5`,dark:`#0d47a1`})}
  ${dt(1262,446,110,72,{light:`#dcc3a1`,base:`#c8a27a`,dark:`#a98458`})}
  <rect x="1306" y="366" width="22" height="80" fill="#e8d5b5"/>
  ${dt(1392,446,90,52,{light:`#ffe082`,base:`#ffb300`,dark:`#ff8f00`})}
  <path d="M1418 394 V382 H1456 V394" fill="none" stroke="#5d4037" stroke-width="6"/>
  <path d="M1300 520 L1400 520 L1390 576 L1310 576 Z" fill="#ff7043"/>
  <path d="M1306 528 L1316 528 L1312 570 L1314 570 Z" fill="#ffab91"/>
  <path d="M1384 528 L1394 528 L1388 570 L1380 570 Z" fill="#e64a19"/>
  <ellipse cx="1350" cy="520" rx="50" ry="9" fill="#ff8a65"/>
  <ellipse cx="1350" cy="520" rx="43" ry="6" fill="#bf360c"/>

  <rect y="644" width="1600" height="356" fill="url(#floor)"/>
  <g stroke="#9a968f" stroke-width="3">${pt(0)}<line x1="0" y1="790" x2="1600" y2="790"/></g>
  <g stroke="#c2beb6" stroke-width="2">${pt(3)}<line x1="0" y1="793" x2="1600" y2="793"/></g>
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
  ${ct(658)}${ct(606)}${ct(554)}
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
</svg>`,ht=15e5,gt=Object.freeze({elapsedMs:0,locked:!1,oneMore:!1,vehicle:null});function _t({elapsedMs:e,oneMore:t},n=ht){return e<n?`play`:t?`lock`:`ask`}function vt(e){return e+`playtime`}function yt(e,t){try{return bt(e?.getItem(vt(t))??null)}catch{return{...gt}}}function bt(e){try{let t=JSON.parse(e??`null`),n=Number(t?.elapsedMs);return{elapsedMs:Number.isFinite(n)&&n>0?n:0,locked:t?.locked===!0,oneMore:t?.oneMore===!0,vehicle:typeof t?.vehicle==`string`?t.vehicle:null}}catch{return{...gt}}}function xt(e,t,n){try{e?.setItem(vt(t),JSON.stringify(n))}catch{}}function St(e=Math.random,t){for(;;){let n=3+Math.floor(e()*7),r=3+Math.floor(e()*7);if(!t||n!==t.a||r!==t.b)return{a:n,b:r,answer:n*r}}}function Ct(e,t){if(!t)return ht;let n=Number(new URLSearchParams(e).get(`limit`));return Number.isFinite(n)&&n>0?n*6e4:ht}var wt=2,Tt=18;function Et(e,t,n){let r=Array.from({length:Tt},(e,t)=>`<span class="star" style="left: ${(t*37+11)%100}%; top: ${(t*23+7)%45}%; animation-delay: ${t%5*.4}s"></span>`).join(``);e.classList.add(`sleep`),e.innerHTML=`
    <div class="night" aria-hidden="true">${r}<span class="moon"></span></div>
    <div class="bed">
      <h1 class="goodnight" tabindex="-1">またあしたね</h1>
      <div class="stage" data-mood="sleepy" style="--aspect: ${t.width} / ${t.height}">
        <div class="vehicle" aria-label="${t.name}">${G(t)}</div>
        <p class="snore" aria-hidden="true">ぐう</p>
      </div>
    </div>
    <button class="adult pill" type="button">おとなの ひと</button>
    <div class="gate" role="dialog" aria-modal="true" aria-label="おとなの ひと" hidden>
      <p class="gate__sum"><span class="gate__question"></span> = <output class="gate__answer">?</output></p>
      <p class="gate__hint" aria-live="polite"></p>
      <div class="gate__keys"></div>
      <button class="gate__back pill" type="button">もどる</button>
    </div>`;let i=e.querySelector(`.adult`),a=e.querySelector(`.gate`),o=a.querySelector(`.gate__question`),s=a.querySelector(`.gate__answer`),c=a.querySelector(`.gate__hint`),l=a.querySelector(`.gate__keys`),u,d=``;function f(){s.value=d||`?`}function p(){u=St(Math.random,u),o.textContent=`${u.a} × ${u.b}`,d=``,c.textContent=``,f(),i.hidden=!0,a.hidden=!1,l.querySelector(`button`)?.focus()}function m(){a.hidden=!0,i.hidden=!1,i.focus()}function h(e){d.length>=wt||(d=d===`0`?e:d+e,c.textContent=``,f())}function g(){d=``,f()}function _(){u&&d!==``&&(Number(d)===u.answer?n():(g(),c.textContent=`ちがうよ。もういちど いれてね`))}let ee=[...[1,2,3,4,5,6,7,8,9].map(e=>({label:String(e),action:()=>h(String(e))})),{label:`けす`,kind:`clear`,action:g},{label:`0`,action:()=>h(`0`)},{label:`けってい`,kind:`enter`,action:_}];for(let e of ee){let t=document.createElement(`button`);t.type=`button`,t.className=e.kind?`gate__key gate__key--${e.kind}`:`gate__key`,t.textContent=e.label,t.addEventListener(`click`,e.action),l.append(t)}i.addEventListener(`click`,p),a.querySelector(`.gate__back`).addEventListener(`click`,m),a.addEventListener(`keydown`,e=>{e.key===`Escape`&&m()}),e.querySelector(`.goodnight`).focus()}function Dt(e,t,n){let r=Math.ceil(Math.sqrt(t.length)),i=Math.ceil(t.length/r);e.classList.add(`pick`),e.innerHTML=`
    <div class="select">
      <h1 class="title">どの くるまを あらう？</h1>
      <div class="cards" style="--cols: ${r}; --rows: ${i}">
        ${t.map(e=>`
          <button class="card" type="button" data-mood="normal">
            ${G(e)}
            <span>${e.name}</span>
          </button>`).join(``)}
      </div>
    </div>`,e.querySelectorAll(`.card`).forEach((e,r)=>{e.addEventListener(`click`,()=>{m(),n(t[r])})})}var Ot=5e3;document.body.insertAdjacentHTML(`afterbegin`,`<div class="garage">${mt}</div>`),document.body.insertAdjacentHTML(`beforeend`,`<div class="badge">ぷれびゅー</div>`);var kt=document.querySelector(`#app`),At,J=`/pikapika-juukiizu/pr-preview/pr-6/:`,jt=(()=>{try{return localStorage}catch{return}})(),Mt=Ct(location.search,!0),Y=yt(jt,J),X;function Z(){let e=performance.now();X!==void 0&&(Y.elapsedMs+=e-X),X=document.visibilityState===`visible`&&!Y.locked?e:void 0}function Q(){Z(),xt(jt,J,Y)}function Nt(){let e=Y.locked;Object.assign(Y,yt(jt,J)),X=void 0,Z(),Y.locked&&!e?It():!Y.locked&&e&&$()}setInterval(Q,Ot),document.addEventListener(`visibilitychange`,Q),window.addEventListener(`pagehide`,Q),window.addEventListener(`storage`,e=>{e.key===vt(J)&&Nt()}),window.addEventListener(`pageshow`,e=>{e.persisted&&Nt()});function Pt(e){At?.abort(),At=new AbortController;let t=document.createElement(`div`);t.className=`screen`,kt.replaceChildren(t),e(t,At.signal)}function $(){Pt(e=>Dt(e,je,Ft))}function Ft(e){Y.vehicle=e.name,Pt((t,n)=>{Ze(t,e,{signal:n,onBack:$,onClean(){Z();let e=_t(Y,Mt);return e===`lock`&&(Y.locked=!0,Q()),e},onOneMore(){Y.oneMore=!0,Q()},onSleep:It}).catch(e=>{console.error(e),n.aborted||$()})})}function It(){Z(),Y.locked=!0,Q();let e=je.find(e=>e.name===Y.vehicle)??je[0];Pt(t=>Et(t,e,Lt))}function Lt(){Object.assign(Y,{...gt,vehicle:Y.vehicle}),Q(),$()}Y.locked?It():(Z(),$());