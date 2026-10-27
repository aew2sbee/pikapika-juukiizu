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
    </g>`}function S(e,t,n){return e.map(e=>`<circle cx="${e}" cy="${t}" r="${n}"/>`).join(``)}function C(e,t,n,r,i){let a=t+r/2;return`<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="${r/2}" fill="#424242"/>
    <g fill="#757575">${S(i,a,Math.round(r*.31))}</g>
    <g fill="#bdbdbd">${S(i,a,6)}</g>`}function ne(e,t,n,r){let i=r/2,[a,o]=[e+i,e+n-i],s=e=>Array.from({length:e},(t,n)=>a+(o-a)*(n+1)/(e+1)),c=s(Math.round((o-a)/40));return`<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="${i}" fill="#424242" stroke="#424242" stroke-width="6" stroke-dasharray="6 4" stroke-linecap="butt"/>
    <rect x="${e+4}" y="${t+4}" width="${n-8}" height="${r-8}" rx="${i-4}" fill="none" stroke="#212121" stroke-width="8" stroke-dasharray="2 9" stroke-linecap="butt"/>
    <rect x="${e+8}" y="${t+8}" width="${n-16}" height="${r-16}" rx="${i-8}" fill="#616161"/>
    <rect x="${a}" y="${t+8}" width="${o-a}" height="7" fill="#4e4e4e"/>
    <g fill="#757575">${S(c,t+r-15,7)}</g>
    <g fill="#bdbdbd">${S(c.map(e=>e-1),t+r-16,4.5)}</g>
    <g fill="#9e9e9e">${S(s(2),t+13,4)}</g>
    <circle cx="${a}" cy="${t+i}" r="${i-11}" fill="#757575" stroke="#757575" stroke-width="6" stroke-dasharray="4 3.5" stroke-linecap="butt"/>
    <circle cx="${o}" cy="${t+i}" r="${i-10}" fill="#757575"/>
    <g fill="#9e9e9e">${S([a-1.5,o-1.5],t+i-1.5,i-15)}</g>
    <g fill="#e0e0e0">${S([a,o],t+i,6)}</g>
    <g fill="#757575">${S([a,o],t+i,2.5)}</g>`}function w(e,t,n,r){let i=e=>Math.round(e*10)/10,[a,o]=[i(e+(n-e)*.6),i(t+(r-t)*.6)],s=(n>=e?1:-1)/Math.hypot(n-e,r-t),[c,l]=[(r-t)*s,(e-n)*s],u=(e,t,n)=>`${i(e+c*n)} ${i(t+l*n)}`;return`<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="#bdbdbd" stroke-width="6"/>
    <path d="M${u(a,o,1.5)} L${u(n,r,1.5)}" stroke="#fff" stroke-width="2"/>
    <line x1="${e}" y1="${t}" x2="${a}" y2="${o}" stroke="#616161" stroke-width="12"/>
    <path d="M${u(e,t,3)} L${u(a,o,3)}" stroke="#8d8d8d" stroke-width="3"/>
    <g fill="#424242"><circle cx="${e}" cy="${t}" r="4"/><circle cx="${n}" cy="${r}" r="4"/></g>`}function T(e,t,n){return`<g fill="#37474f">${S(e,t,n)}</g>
    <g fill="#bdbdbd">${S(e,t,n*.5)}</g>
    <g fill="#757575">${S(e,t,n*.2)}</g>`}function E(e,t,n,r,i=10){let a=e+n;return`<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="${i}" fill="#81d4fa"/>
    <rect x="${e+3}" y="${t+4}" width="${n-3}" height="${r-4}" rx="${i}" fill="#b3e5fc"/>
    <path d="M${a-18} ${t+3} h8 l7 7 v8 Z" fill="#fff" fill-opacity=".7"/>`}function D(e,t,n,r){return`${E(e,t,n,r)}
    ${x(e+n/2,t+r/2)}`}function O(e,t){return`<rect x="30" y="172" width="360" height="22" rx="4" fill="#424242"/>
    ${t}
    <rect x="282" y="74" width="110" height="108" rx="16" fill="${e}"/>
    ${D(296,86,82,62)}
    <rect x="378" y="164" width="22" height="16" rx="4" fill="#757575"/>
    <circle cx="388" cy="156" r="6" fill="#fff59d"/>
    ${T([82,150,334],204,30)}`}var k={name:`ぶるどーざー`,width:420,height:260,shapes:`
  <path d="M44 150 L22 150 L14 226 L26 230 L34 172 L44 172 Z" fill="#616161"/>
  ${C(34,192,270,56,[66,116,168,220,272])}
  <line x1="250" y1="196" x2="334" y2="200" stroke="#f9a825" stroke-width="16"/>
  <line x1="268" y1="152" x2="334" y2="140" stroke="#9e9e9e" stroke-width="8"/>
  <rect x="40" y="118" width="124" height="78" rx="12" fill="#f9a825"/>
  <rect x="150" y="136" width="160" height="60" rx="10" fill="#fbc02d"/>
  <g stroke="#f9a825" stroke-width="4"><line x1="284" y1="148" x2="284" y2="184"/><line x1="296" y1="148" x2="296" y2="184"/></g>
  <rect x="214" y="104" width="12" height="36" rx="3" fill="#616161"/>
  <rect x="210" y="98" width="20" height="10" rx="3" fill="#424242"/>
  <rect x="58" y="34" width="104" height="90" rx="14" fill="#fbc02d"/>
  ${D(70,46,80,64)}
  <path d="M324 104 L356 98 Q378 172 358 246 L324 246 Z" fill="#fbc02d" stroke="#f9a825" stroke-width="4"/>
  <rect x="322" y="240" width="40" height="9" rx="2" fill="#9e9e9e"/>`},A={name:`くれーんしゃ`,width:420,height:260,shapes:`
  <g fill="#757575"><rect x="36" y="176" width="14" height="46"/><rect x="372" y="176" width="14" height="46"/></g>
  <g fill="#9e9e9e"><rect x="28" y="218" width="30" height="8" rx="2"/><rect x="364" y="218" width="30" height="8" rx="2"/></g>
  <rect x="22" y="158" width="370" height="36" rx="8" fill="#fbc02d"/>
  <rect x="86" y="124" width="124" height="38" rx="8" fill="#f9a825"/>
  <rect x="92" y="90" width="44" height="38" rx="6" fill="#f9a825"/>
  <rect x="100" y="98" width="28" height="20" rx="4" fill="#b3e5fc"/>
  <rect x="294" y="78" width="100" height="90" rx="16" fill="#fbc02d"/>
  ${D(306,90,76,58)}
  <circle cx="390" cy="156" r="6" fill="#fff59d"/>
  <line x1="404" y1="16" x2="404" y2="44" stroke="#424242" stroke-width="3"/>
  <rect x="392" y="42" width="24" height="20" rx="4" fill="#ffb300"/>
  <path d="M404 62 l0 8 q0 10 -9 10 q-8 0 -8 -8" fill="none" stroke="#616161" stroke-width="5"/>
  <line x1="196" y1="150" x2="250" y2="96" stroke="#9e9e9e" stroke-width="10"/>
  <line x1="160" y1="132" x2="290" y2="68" stroke="#fbc02d" stroke-width="26"/>
  <line x1="284" y1="71" x2="404" y2="12" stroke="#fdd835" stroke-width="16"/>
  <circle cx="160" cy="132" r="10" fill="#616161"/>
  <circle cx="404" cy="12" r="8" fill="#616161"/>
  ${T([80,140,280,340],206,26)}`},j={name:`だんぷとらっく`,width:420,height:260,shapes:O(`#fbc02d`,`
    <path d="M24 84 L272 70 L262 176 L42 176 Z" fill="#f9a825"/>
    <g stroke="#f57f17" stroke-width="5">
      <line x1="90" y1="82" x2="94" y2="172"/><line x1="150" y1="78" x2="152" y2="172"/><line x1="210" y1="75" x2="210" y2="172"/>
    </g>
    <rect x="18" y="76" width="258" height="12" rx="4" fill="#f57f17"/>`)},M=[{name:`しょべるかー`,width:420,height:260,shapes:`
  ${ne(24,198,238,52)}
  <rect x="96" y="186" width="120" height="14" fill="#424242"/>
  <path d="M92 122 V108 H164 V122" fill="none" stroke="#616161" stroke-width="4"/>
  <rect x="106" y="102" width="8" height="26" rx="2" fill="#616161"/>
  <line x1="108.5" y1="106" x2="108.5" y2="122" stroke="#9e9e9e" stroke-width="2"/>
  <rect x="80" y="118" width="96" height="16" rx="5" fill="#ffe082"/>
  <rect x="80" y="126" width="96" height="24" rx="4" fill="#fbc02d"/>
  <rect x="40" y="142" width="222" height="50" rx="8" fill="#fbc02d"/>
  <path d="M40 182 H262 V184 Q262 192 254 192 H48 Q40 192 40 184 Z" fill="#f9a825"/>
  <g stroke="#f57f17" stroke-width="3"><line x1="100" y1="154" x2="100" y2="176"/><line x1="114" y1="154" x2="114" y2="176"/><line x1="128" y1="154" x2="128" y2="176"/><line x1="142" y1="154" x2="142" y2="176"/></g>
  <g stroke="#ffe082" stroke-width="2"><line x1="103" y1="154" x2="103" y2="176"/><line x1="117" y1="154" x2="117" y2="176"/><line x1="131" y1="154" x2="131" y2="176"/><line x1="145" y1="154" x2="145" y2="176"/></g>
  <path d="M88 134 V196 H46 Q16 196 16 165 Q16 134 46 134 Z" fill="#fbc02d"/>
  <path d="M20 168 Q22 192 46 192 H86" fill="none" stroke="#f9a825" stroke-width="8"/>
  <path d="M20 164 Q20 138 46 138 H84" fill="none" stroke="#ffe082" stroke-width="5"/>
  <line x1="88" y1="136" x2="88" y2="194" stroke="#f57f17" stroke-width="3"/>
  <path d="M226 144 L276 70 L282 50 L296 54 L341 47 A11 11 0 0 1 347 69 L306 86 L246 160 Z" fill="#fbc02d"/>
  <path d="M345 65 L304 83 L243 157" fill="none" stroke="#f9a825" stroke-width="8"/>
  <path d="M228 145 L278 71 M296 56 L340 50" fill="none" stroke="#ffe082" stroke-width="5"/>
  <rect x="254" y="111" width="12" height="10" rx="2" fill="#424242"/>
  <rect x="264" y="112" width="4" height="8" rx="1" fill="#fff59d"/>
  ${w(256,172,290,106)}
  ${w(283,55,338,36)}
  <line x1="338" y1="36" x2="378" y2="176" stroke="#fbc02d" stroke-width="18"/>
  <line x1="342.8" y1="34.6" x2="382.8" y2="174.6" stroke="#f9a825" stroke-width="8"/>
  <line x1="331.8" y1="37.8" x2="371.8" y2="177.8" stroke="#ffe082" stroke-width="4"/>
  ${w(353,44,383,150)}
  <g stroke="#757575" stroke-width="6"><line x1="370" y1="160" x2="383" y2="150"/><line x1="383" y1="150" x2="398" y2="172"/></g>
  <path d="M370 168 L400 168 Q418 204 390 234 L352 238 Q364 206 370 168 Z" fill="#616161"/>
  <path d="M375 173 L396 173 Q410 204 387 228 L362 232 Q371 206 375 173 Z" fill="#757575"/>
  <path d="M357 230 Q366 206 372 172" fill="none" stroke="#9e9e9e" stroke-width="3"/>
  <path d="M356 232 l-14 8 l15 1 Z M370 234 l-13 9 l15 0 Z" fill="#bdbdbd"/>
  <g fill="#424242"><circle cx="344" cy="58" r="6"/><circle cx="378" cy="176" r="6"/></g>
  <g fill="#757575"><circle cx="342.5" cy="56.5" r="2.5"/><circle cx="376.5" cy="174.5" r="2.5"/></g>
  <path d="M174 176 V80 Q174 66 188 65 L238 62 Q248 62 249 72 L254 176 Z" fill="#fbc02d"/>
  <path d="M246 72 L251 174" stroke="#f9a825" stroke-width="6"/>
  <path d="M177 172 V80 Q177 69 189 68 L238 65" fill="none" stroke="#ffe082" stroke-width="5"/>
  ${D(182,72,60,62)}
  ${E(182,142,50,26,4)}
  <rect x="236" y="150" width="10" height="4" rx="2" fill="#424242"/>
  <path d="M225 60 Q225 48 232 48 Q239 48 239 60 Z" fill="#ff9800"/>
  <ellipse cx="229.5" cy="53" rx="2" ry="3" fill="#fff" fill-opacity=".7"/>
  <rect x="222" y="58" width="20" height="6" rx="2" fill="#424242"/>`},k,j,{name:`みきさーしゃ`,width:420,height:260,shapes:O(`#1e88e5`,`
    <g fill="#616161"><rect x="58" y="110" width="16" height="64" rx="3"/><rect x="196" y="156" width="20" height="18" rx="3"/></g>
    <path d="M58 114 L22 150 L30 158 L68 122 Z" fill="#9e9e9e"/>
    <path d="M68 57 L202 56 Q262 70 262 128 Q250 172 178 170 L56 115 Q44 86 68 57 Z" fill="#eceff1" stroke="#b0bec5" stroke-width="4"/>
    <g fill="#ff7043">
      <path d="M100 57 L118 57 L98 134 L80 126 Z"/><path d="M150 56 L168 56 L148 156 L130 148 Z"/><path d="M204 57 L220 60 L196 170 L182 170 Z"/>
    </g>
    <path d="M42 34 L86 34 L76 60 L56 60 Z" fill="#90a4ae" stroke="#78909c" stroke-width="3"/>`)},A,{name:`ぱいるどらいばー`,width:420,height:260,shapes:`
  <rect x="324" y="88" width="14" height="164" fill="#a1887f"/>
  ${C(40,196,250,52,[68,114,165,216,262])}
  <rect x="120" y="184" width="90" height="14" fill="#616161"/>
  <rect x="40" y="140" width="34" height="46" rx="12" fill="#f9a825"/>
  <rect x="54" y="130" width="230" height="60" rx="12" fill="#fbc02d"/>
  <line x1="262" y1="140" x2="320" y2="56" stroke="#9e9e9e" stroke-width="8"/>
  <line x1="276" y1="180" x2="318" y2="196" stroke="#9e9e9e" stroke-width="8"/>
  <rect x="316" y="8" width="30" height="232" rx="4" fill="#fbc02d"/>
  <g stroke="#f9a825" stroke-width="4">
    <line x1="316" y1="40" x2="346" y2="70"/><line x1="346" y1="100" x2="316" y2="130"/>
    <line x1="316" y1="160" x2="346" y2="190"/><line x1="346" y1="210" x2="316" y2="236"/>
  </g>
  <rect x="308" y="44" width="46" height="46" rx="6" fill="#616161"/>
  <circle cx="331" cy="10" r="9" fill="#616161"/>
  <rect x="150" y="58" width="84" height="84" rx="14" fill="#fbc02d"/>
  ${D(162,70,60,56)}`}];function N({width:e,height:t,shapes:n}){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${e} ${t}" width="${e}" height="${t}" stroke-linecap="round" stroke-linejoin="round">${n}</svg>`}var P={x:-50,y:-45,width:240,height:110},F={x:-P.x/P.width,y:-P.y/P.height},re=184,I=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${P.x} ${P.y} ${P.width} ${P.height}">
  <g stroke-linejoin="round" stroke-linecap="round">
    <rect x="40" y="-5" width="130" height="10" rx="4" fill="#b0bec5" stroke="#78909c" stroke-width="2"/>
    <rect x="160" y="-9" width="24" height="18" rx="5" fill="#ffb300"/>
    <path d="M-12 -2 L-26 50 Q-28 58 -18 60 L-2 60 Q6 60 6 52 L14 8 Z" fill="#263238"/>
    <path d="M10 8 q10 16 -2 26" fill="none" stroke="#263238" stroke-width="5"/>
    <rect x="-40" y="-18" width="90" height="30" rx="12" fill="#1e88e5" stroke="#1565c0" stroke-width="3"/>
    <circle cx="-24" cy="-3" r="5" fill="#90caf9"/>
  </g>
</svg>`,L=-.45,ie=.05,ae=900,oe=240,R=4,se=[[.7,`rgb(129 212 250 / 0.35)`],[.35,`rgb(179 229 252 / 0.85)`],[.12,`rgb(255 255 255 / 0.95)`]],ce=class{options;gun;g;drops=[];fingers=new Map;nozzle;shades=Array.from({length:R},()=>[]);hitting=!1;animating=!1;frameRequest=0;lastFrame;constructor(t,n){this.options=n,t.insertAdjacentHTML(`beforeend`,`<canvas class="water"></canvas><div class="gun">${I}</div>`);let r=t.querySelector(`.water`);this.g=r.getContext(`2d`),this.gun=t.querySelector(`.gun`),this.gun.style.aspectRatio=`${P.width} / ${P.height}`,this.gun.querySelector(`svg`).style.transformOrigin=`${F.x*100}% ${F.y*100}%`,this.aim(L);let{signal:i}=n;e(r,{maxDensity:1,signal:i}),i.addEventListener(`abort`,()=>{cancelAnimationFrame(this.frameRequest),g()}),t.addEventListener(`pointerdown`,e=>{if(m(),e.pointerType===`mouse`&&e.button!==0||e.target.closest(`button`))return;t.setPointerCapture(e.pointerId);let n={x:e.clientX,y:e.clientY};this.fingers.set(e.pointerId,n),!this.nozzle&&(this.nozzle={id:e.pointerId,last:n},h(),this.animate())}),t.addEventListener(`pointermove`,e=>{this.fingers.has(e.pointerId)&&this.fingers.set(e.pointerId,{x:e.clientX,y:e.clientY})}),t.addEventListener(`pointerup`,e=>{m(),this.release(e)}),t.addEventListener(`pointercancel`,e=>this.release(e))}release(e){if(this.fingers.delete(e.pointerId),this.nozzle?.id!==e.pointerId)return;let[t]=this.fingers;if(t){let[e,n]=t;this.nozzle={id:e,last:n}}else this.nozzle=void 0,this.hitting=!1,this.aim(L),g()}animate(){this.animating||(this.animating=!0,this.lastFrame=void 0,this.frameRequest=requestAnimationFrame(this.frame))}frame=e=>{let n=this.lastFrame===void 0?0:Math.min((e-this.lastFrame)/1e3,ie);this.lastFrame=e;let{g:r,nozzle:i}=this;if(t(r,r.canvas.clientWidth),i){let e=this.fingers.get(i.id),t=this.options.onSpray(i.last,e,n);i.last=e,t!==this.hitting&&_(this.hitting=t);let r=this.options.splashRadius();this.drawJet(this.aimAt(e),e,r),this.splash(e,r,n)}this.drawDrops(n),this.animating=!!this.nozzle||this.drops.length>0,this.animating&&(this.frameRequest=requestAnimationFrame(this.frame))};aimAt(e){let t=this.gun.getBoundingClientRect(),n={x:t.left+F.x*t.width,y:t.top+F.y*t.height},r=Math.atan2(e.y-n.y,e.x-n.x);this.aim(r);let i=re/P.width*t.width;return{x:n.x+Math.cos(r)*i,y:n.y+Math.sin(r)*i}}aim(e){this.gun.style.setProperty(`--angle`,`${e}rad`)}drawJet(e,t,n){let{g:r}=this,i=Math.hypot(t.x-e.x,t.y-e.y),a=(e.x+t.x)/2+(Math.random()-.5)*4,o=(e.y+t.y)/2-i*.05+(Math.random()-.5)*4;r.lineCap=`round`;for(let[i,s]of se)r.lineWidth=n*i,r.strokeStyle=s,r.beginPath(),r.moveTo(e.x,e.y),r.quadraticCurveTo(a,o,t.x,t.y),r.stroke()}splash(e,t,n){let{g:r}=this,i=r.createRadialGradient(e.x,e.y,0,e.x,e.y,t);i.addColorStop(0,`rgb(225 245 254 / 0.8)`),i.addColorStop(1,`rgb(225 245 254 / 0)`),r.fillStyle=i,r.beginPath(),r.arc(e.x,e.y,t,0,Math.PI*2),r.fill();for(let r=Math.round(oe*n*Math.random()*2);r>0;r--){let n=-Math.PI*Math.random(),r=120+Math.random()*200;this.drops.push({x:e.x,y:e.y,vx:Math.cos(n)*r,vy:Math.sin(n)*r,r:t*(.05+Math.random()*.08),age:0,life:.3+Math.random()*.3})}}drawDrops(e){let{g:t,drops:r,shades:i}=this;for(let e of i)e.length=0;let a=0;for(let t of r)t.age+=e,!(t.age>=t.life)&&(t.vy+=ae*e,t.x+=t.vx*e,t.y+=t.vy*e,r[a++]=t,i[Math.ceil((1-t.age/t.life)*R)-1].push(t));r.length=a,i.forEach((e,r)=>{e.length&&n(t,e,`rgb(179 229 252)`,(r+1)/R)})}},z=6,B=18,le=27,ue=.03,de=8,fe=14,pe=.6,me=400,he=1500,ge={dust:`#d7b98a`,mud:`#5d4037`};async function _e(i,a,{signal:o,onBack:s,onClean:u,onOneMore:d,onSleep:f}){let{width:p,height:m}=a,h=N(a);i.classList.add(`wash`),i.innerHTML=`
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
    </div>`;let g=i.querySelector(`.stage`),_=g.querySelector(`canvas`),v=g.querySelector(`.cheer`),y=g.querySelector(`.actions`),b=g.querySelector(`.question`),x=g.querySelector(`.ask`),S=i.querySelector(`.sleep-now`),C=_.getContext(`2d`),ne=ye(g.querySelector(`.face`));for(let e of[`mask-image`,`-webkit-mask-image`])_.style.setProperty(e,`url("${xe(h)}")`);i.querySelector(`.back`).addEventListener(`click`,s),S.addEventListener(`click`,f);let w=await Se(a);if(o.aborted)return;let T,E=0,D=!1,O=!1,k=0,A=0;function j(){g.dataset.mood=O?`fussy`:D?`happy`:`normal`}function M(){T=l(w),clearTimeout(E),D=!1,g.querySelectorAll(`.sparkle`).forEach(e=>e.remove()),v.hidden=y.hidden=b.hidden=x.hidden=!0,S.hidden=!1,F(),I()}function P(e,t,n,i){r(ne,e,t)>ne.r+n-B?k=0:(k+=i,clearTimeout(A),A=window.setTimeout(F,me),k>=pe&&!O&&(O=!0,j(),te()))}function F(){clearTimeout(A),k=0,O=!1,j()}function re(){T.clear(),I(),D=!0,j(),v.hidden=!1,S.hidden=!0,we(g);let e=u();E=window.setTimeout(()=>{e===`lock`?f():e===`ask`?(v.hidden=!0,b.hidden=x.hidden=!1):y.hidden=!1},he),ee()}function I(){t(C,p);let e=[],r=new Map;for(let t of T.cells)if(!(t.hp<=0)){if(t.kind===`dust`)e.push(t);else{let e=Math.ceil(c(t)*de)/de,n=r.get(e);n?n.push(t):r.set(e,[t])}}n(C,e,ge.dust,.9);for(let[e,t]of r)n(C,t,ge.mud,.35+.65*e)}function L(){let e=_.clientWidth;return e?Math.max(B,le*p/e):B}function ie(e,t){return{x:(e.x-t.left)/t.width*p,y:(e.y-t.top)/t.height*m}}new ce(i,{onSpray(e,t,n){let r=_.getBoundingClientRect(),i=ie(e,r),a=ie(t,r),o=L();P(i,a,o,n);let s=T.spray(i,a,o,n);return s&&T.remaining<=ue?re():s&&I(),s},splashRadius:()=>L()*_.clientWidth/p,signal:o}),g.querySelector(`.again`).addEventListener(`click`,M),g.querySelector(`.others`).addEventListener(`click`,s),g.querySelector(`.one-more`).addEventListener(`click`,()=>{d(),b.hidden=x.hidden=!0,v.hidden=y.hidden=!1,g.querySelector(`.again`).focus()}),g.querySelector(`.goodnight-now`).addEventListener(`click`,f),o.addEventListener(`abort`,()=>{clearTimeout(E),clearTimeout(A)}),e(_,{maxDensity:2,signal:o,onResize:I}),M()}var ve=12;function ye(e){let t=e.getBBox();return{x:t.x+t.width/2,y:t.y+t.height/2,r:Math.max(t.width,t.height)/2+ve}}function be(e){return new Promise((t,n)=>{let r=new Image;r.onload=()=>t(r),r.onerror=()=>n(Error(`Could not load ${e.slice(0,40)}…`)),r.src=e})}function xe(e){return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`}var V=new Map;function Se(e){let t=V.get(e);if(!t){let n=Math.ceil(e.width/z),r=Math.ceil(e.height/z);t=be(xe(N(e))).then(e=>Ce(e,n,r),t=>{throw V.delete(e),t}),V.set(e,t)}return t}function Ce(e,t,n){let r=document.createElement(`canvas`);r.width=t,r.height=n;let i=r.getContext(`2d`,{willReadFrequently:!0});i.drawImage(e,0,0,t,n);let a=i.getImageData(0,0,t,n).data.filter((e,t)=>t%4==3);return{cols:t,rows:n,cellSize:z,filled:Array.from(a,e=>e>128)}}function we(e){for(let t=0;t<fe;t++){let t=document.createElement(`span`);t.className=`sparkle`,t.style.left=`${5+Math.random()*90}%`,t.style.top=`${5+Math.random()*85}%`,t.style.animationDelay=`${Math.random()*1.2}s`,t.style.setProperty(`--size`,`${18+Math.random()*26}px`),e.append(t)}}var Te=Array.from({length:11},(e,t)=>`<line x1="${100+t*140}" y1="0" x2="${100+t*140}" y2="630"/>`).join(``),Ee=e=>`
  <line x1="${e}" y1="0" x2="${e}" y2="90" stroke="#455a64" stroke-width="4"/>
  <circle cx="${e}" cy="160" r="130" fill="url(#glow)"/>
  <path d="M${e-45} 130 L${e-25} 90 L${e+25} 90 L${e+45} 130 Z" fill="#455a64"/>
  <ellipse cx="${e}" cy="131" rx="24" ry="8" fill="#fff59d"/>`,De=e=>`<rect x="100" y="${e}" width="180" height="52" rx="24" fill="#37474f" stroke="#263238" stroke-width="4"/>`,Oe=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#b3afa8"/><stop offset="1" stop-color="#8a8781"/>
    </linearGradient>
    <radialGradient id="glow">
      <stop offset="0" stop-color="#fff8e1" stop-opacity="0.9"/><stop offset="1" stop-color="#fff8e1" stop-opacity="0"/>
    </radialGradient>
    <pattern id="hazard" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="20" height="40" fill="#fbc02d"/><rect x="20" width="20" height="40" fill="#424242"/>
    </pattern>
    <pattern id="slats" width="10" height="28" patternUnits="userSpaceOnUse">
      <rect width="10" height="28" fill="#cfd8dc"/><rect y="22" width="10" height="6" fill="#b0bec5"/>
    </pattern>
    <pattern id="pegboard" width="24" height="24" patternUnits="userSpaceOnUse">
      <rect width="24" height="24" fill="#d7b48a"/><circle cx="12" cy="12" r="2.5" fill="#a1825e"/>
    </pattern>
  </defs>

  <rect width="1600" height="1000" fill="#e6dccd"/>
  <g stroke="#d9cdbb" stroke-width="4">${Te}</g>

  <rect x="470" y="110" width="660" height="530" fill="#90a4ae"/>
  <rect x="490" y="130" width="620" height="510" fill="url(#slats)"/>
  <rect x="770" y="590" width="60" height="12" rx="6" fill="#607d8b"/>

  ${Ee(320)}
  ${Ee(1280)}

  <rect x="70" y="230" width="300" height="230" rx="8" fill="url(#pegboard)" stroke="#8d6e63" stroke-width="8"/>
  <g transform="translate(140 300) rotate(20)">
    <rect x="-8" y="0" width="16" height="120" rx="8" fill="#78909c"/>
    <circle r="22" fill="#78909c"/><rect x="-7" y="-26" width="14" height="22" fill="#d7b48a"/>
  </g>
  <g transform="translate(240 290) rotate(-15)">
    <rect x="-7" y="0" width="14" height="120" rx="6" fill="#a1887f"/>
    <rect x="-36" y="-14" width="72" height="28" rx="6" fill="#546e7a"/>
  </g>
  <g transform="translate(320 280)">
    <rect x="-9" y="0" width="18" height="50" rx="8" fill="#e53935"/><rect x="-3" y="50" width="6" height="70" fill="#90a4ae"/>
  </g>

  <g fill="#6d4c41"><rect x="1240" y="220" width="12" height="420"/><rect x="1508" y="220" width="12" height="420"/></g>
  <g fill="#8d6e63">
    <rect x="1230" y="320" width="300" height="14"/><rect x="1230" y="450" width="300" height="14"/><rect x="1230" y="580" width="300" height="14"/>
  </g>
  <rect x="1270" y="262" width="50" height="58" rx="6" fill="#e53935"/>
  <rect x="1340" y="276" width="40" height="44" rx="6" fill="#43a047"/>
  <rect x="1400" y="256" width="60" height="64" rx="6" fill="#1e88e5"/>
  <rect x="1262" y="370" width="110" height="80" rx="4" fill="#bcaaa4"/>
  <rect x="1392" y="390" width="90" height="60" rx="4" fill="#ffb300"/>
  <path d="M1300 520 L1400 520 L1390 580 L1310 580 Z" fill="#ff7043"/>

  <rect y="640" width="1600" height="360" fill="url(#floor)"/>
  <rect y="628" width="1600" height="16" fill="url(#hazard)"/>
  <ellipse cx="1180" cy="930" rx="90" ry="14" fill="#7d7a75" opacity="0.5"/>

  ${De(658)}${De(606)}${De(554)}
  <ellipse cx="190" cy="556" rx="50" ry="10" fill="#263238"/>

  <rect x="1370" y="560" width="120" height="150" rx="10" fill="#c62828"/>
  <rect x="1370" y="600" width="120" height="8" fill="#e57373"/><rect x="1370" y="662" width="120" height="8" fill="#e57373"/>
  <ellipse cx="1430" cy="562" rx="60" ry="12" fill="#b71c1c"/>
</svg>`,H=15e5,U=Object.freeze({elapsedMs:0,locked:!1,oneMore:!1,vehicle:null});function ke({elapsedMs:e,oneMore:t},n=H){return e<n?`play`:t?`lock`:`ask`}function W(e){return e+`playtime`}function Ae(e,t){try{return je(e?.getItem(W(t))??null)}catch{return{...U}}}function je(e){try{let t=JSON.parse(e??`null`),n=Number(t?.elapsedMs);return{elapsedMs:Number.isFinite(n)&&n>0?n:0,locked:t?.locked===!0,oneMore:t?.oneMore===!0,vehicle:typeof t?.vehicle==`string`?t.vehicle:null}}catch{return{...U}}}function Me(e,t,n){try{e?.setItem(W(t),JSON.stringify(n))}catch{}}function Ne(e=Math.random,t){for(;;){let n=3+Math.floor(e()*7),r=3+Math.floor(e()*7);if(!t||n!==t.a||r!==t.b)return{a:n,b:r,answer:n*r}}}function Pe(e,t){if(!t)return H;let n=Number(new URLSearchParams(e).get(`limit`));return Number.isFinite(n)&&n>0?n*6e4:H}var Fe=2,Ie=18;function Le(e,t,n){let r=Array.from({length:Ie},(e,t)=>`<span class="star" style="left: ${(t*37+11)%100}%; top: ${(t*23+7)%45}%; animation-delay: ${t%5*.4}s"></span>`).join(``);e.classList.add(`sleep`),e.innerHTML=`
    <div class="night" aria-hidden="true">${r}<span class="moon"></span></div>
    <div class="bed">
      <h1 class="goodnight" tabindex="-1">またあしたね</h1>
      <div class="stage" data-mood="sleepy" style="--aspect: ${t.width} / ${t.height}">
        <div class="vehicle" aria-label="${t.name}">${N(t)}</div>
        <p class="snore" aria-hidden="true">ぐう</p>
      </div>
    </div>
    <button class="adult pill" type="button">おとなの ひと</button>
    <div class="gate" role="dialog" aria-modal="true" aria-label="おとなの ひと" hidden>
      <p class="gate__sum"><span class="gate__question"></span> = <output class="gate__answer">?</output></p>
      <p class="gate__hint" aria-live="polite"></p>
      <div class="gate__keys"></div>
      <button class="gate__back pill" type="button">もどる</button>
    </div>`;let i=e.querySelector(`.adult`),a=e.querySelector(`.gate`),o=a.querySelector(`.gate__question`),s=a.querySelector(`.gate__answer`),c=a.querySelector(`.gate__hint`),l=a.querySelector(`.gate__keys`),u,d=``;function f(){s.value=d||`?`}function p(){u=Ne(Math.random,u),o.textContent=`${u.a} × ${u.b}`,d=``,c.textContent=``,f(),i.hidden=!0,a.hidden=!1,l.querySelector(`button`)?.focus()}function m(){a.hidden=!0,i.hidden=!1,i.focus()}function h(e){d.length>=Fe||(d=d===`0`?e:d+e,c.textContent=``,f())}function g(){d=``,f()}function _(){u&&d!==``&&(Number(d)===u.answer?n():(g(),c.textContent=`ちがうよ。もういちど いれてね`))}let ee=[...[1,2,3,4,5,6,7,8,9].map(e=>({label:String(e),action:()=>h(String(e))})),{label:`けす`,kind:`clear`,action:g},{label:`0`,action:()=>h(`0`)},{label:`けってい`,kind:`enter`,action:_}];for(let e of ee){let t=document.createElement(`button`);t.type=`button`,t.className=e.kind?`gate__key gate__key--${e.kind}`:`gate__key`,t.textContent=e.label,t.addEventListener(`click`,e.action),l.append(t)}i.addEventListener(`click`,p),a.querySelector(`.gate__back`).addEventListener(`click`,m),a.addEventListener(`keydown`,e=>{e.key===`Escape`&&m()}),e.querySelector(`.goodnight`).focus()}function Re(e,t,n){let r=Math.ceil(Math.sqrt(t.length)),i=Math.ceil(t.length/r);e.classList.add(`pick`),e.innerHTML=`
    <div class="select">
      <h1 class="title">どの くるまを あらう？</h1>
      <div class="cards" style="--cols: ${r}; --rows: ${i}">
        ${t.map(e=>`
          <button class="card" type="button" data-mood="normal">
            ${N(e)}
            <span>${e.name}</span>
          </button>`).join(``)}
      </div>
    </div>`,e.querySelectorAll(`.card`).forEach((e,r)=>{e.addEventListener(`click`,()=>{m(),n(t[r])})})}var ze=5e3;document.body.insertAdjacentHTML(`afterbegin`,`<div class="garage">${Oe}</div>`),document.body.insertAdjacentHTML(`beforeend`,`<div class="badge">ぷれびゅー</div>`);var Be=document.querySelector(`#app`),G,K=`/pikapika-juukiizu/pr-preview/pr-6/:`,q=(()=>{try{return localStorage}catch{return}})(),Ve=Pe(location.search,!0),J=Ae(q,K),Y;function X(){let e=performance.now();Y!==void 0&&(J.elapsedMs+=e-Y),Y=document.visibilityState===`visible`&&!J.locked?e:void 0}function Z(){X(),Me(q,K,J)}function He(){let e=J.locked;Object.assign(J,Ae(q,K)),Y=void 0,X(),J.locked&&!e?$():!J.locked&&e&&Q()}setInterval(Z,ze),document.addEventListener(`visibilitychange`,Z),window.addEventListener(`pagehide`,Z),window.addEventListener(`storage`,e=>{e.key===W(K)&&He()}),window.addEventListener(`pageshow`,e=>{e.persisted&&He()});function Ue(e){G?.abort(),G=new AbortController;let t=document.createElement(`div`);t.className=`screen`,Be.replaceChildren(t),e(t,G.signal)}function Q(){Ue(e=>Re(e,M,We))}function We(e){J.vehicle=e.name,Ue((t,n)=>{_e(t,e,{signal:n,onBack:Q,onClean(){X();let e=ke(J,Ve);return e===`lock`&&(J.locked=!0,Z()),e},onOneMore(){J.oneMore=!0,Z()},onSleep:$}).catch(e=>{console.error(e),n.aborted||Q()})})}function $(){X(),J.locked=!0,Z();let e=M.find(e=>e.name===J.vehicle)??M[0];Ue(t=>Le(t,e,Ge))}function Ge(){Object.assign(J,{...U,vehicle:J.vehicle}),Z(),Q()}J.locked?$():(X(),Q());