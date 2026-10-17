(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={dust:.04,mud:.3},t=.6,n=6,r=class{cells;left;constructor(e){this.cells=e,this.left=e.filter(e=>e.hp>0).length}get remaining(){return this.cells.length?this.left/this.cells.length:0}spray(e,t,n,r,i,a){let s=!1;for(let c of this.dirtyNear(e,t,n,r,i))o(c.x,c.y,e,t,n,r)>i||(c.hp=Math.max(0,c.hp-a),c.hp===0&&this.left--,s=!0);return s}dirtyNear(e,t,n,r,i){let[a,o]=[Math.min(e,n)-i,Math.max(e,n)+i],[s,c]=[Math.min(t,r)-i,Math.max(t,r)+i];return this.cells.filter(e=>e.hp>0&&e.x>=a&&e.x<=o&&e.y>=s&&e.y<=c)}clear(){for(let e of this.cells)e.hp=0;this.left=0}};function i(t){return t.hp/e[t.kind]}function a(i,a=Math.random){let{cols:o,cellSize:s}=i,c=i.filled.flatMap((e,t)=>e?[{col:t%o,row:Math.floor(t/o)}]:[]),l=new Map,u=(e,t,n)=>{let r=c[Math.floor(a()*c.length)],i=(t+a()*(n-t))/s;for(let t of c)(t.col-r.col)**2+(t.row-r.row)**2<=i**2&&l.set(t,e)};if(c.length){for(let e=0;e<50&&l.size<c.length*t;e++)u(`dust`,20,40);for(let e=0;e<n;e++)u(`mud`,10,20)}return new r([...l].map(([{col:t,row:n},r])=>({x:(t+.5+(a()-.5)*.6)*s,y:(n+.5+(a()-.5)*.6)*s,r:s*(.75+a()*.35),kind:r,hp:e[r]})))}function o(e,t,n,r,i,a){let[o,s]=[i-n,a-r],c=o*o+s*s,l=c?Math.max(0,Math.min(1,((e-n)*o+(t-r)*s)/c)):0;return Math.hypot(e-(n+l*o),t-(r+l*s))}var s,c,l,u={air:1300,dirt:2600};function d(){try{s??=new AudioContext,s.state!==`running`&&s.resume().catch(()=>{})}catch{}}function f(){g(e=>{if(l)return;c??=v(e,1);let t=new AudioBufferSourceNode(e,{buffer:c,loop:!0}),n=new BiquadFilterNode(e,{type:`bandpass`,frequency:u.air,Q:.7}),r=new GainNode(e),i=e.currentTime;r.gain.setValueAtTime(0,i),r.gain.linearRampToValueAtTime(.12,i+.05),t.connect(n).connect(r).connect(e.destination),t.start(i),l={source:t,filter:n,gain:r}})}function p(){let e=l;l=void 0,e&&g(t=>{let n=t.currentTime;e.gain.gain.cancelScheduledValues(n),e.gain.gain.setTargetAtTime(0,n,.04),e.source.stop(n+.3)})}function m(e){g(t=>{l?.filter.frequency.setTargetAtTime(e?u.dirt:u.air,t.currentTime,.05)})}function h(){g(e=>{let t=e.currentTime;[523.25,659.25,783.99,1046.5].forEach((n,r)=>_(e,n,t+r*.13,r===3?.7:.18))})}function g(e){if(s)try{e(s)}catch{}}function _(e,t,n,r){let i=new OscillatorNode(e,{type:`triangle`,frequency:t}),a=new GainNode(e);a.gain.setValueAtTime(0,n),a.gain.linearRampToValueAtTime(.25,n+.02),a.gain.exponentialRampToValueAtTime(.001,n+r),i.connect(a).connect(e.destination),i.start(n),i.stop(n+r)}function v(e,t){let n=new AudioBuffer({length:Math.ceil(e.sampleRate*t),sampleRate:e.sampleRate}),r=n.getChannelData(0);for(let e=0;e<r.length;e++)r[e]=Math.random()*2-1;return n}var y={x:-50,y:-45,width:240,height:110},b=184,x=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${y.x} ${y.y} ${y.width} ${y.height}">
  <g stroke-linejoin="round" stroke-linecap="round">
    <rect x="40" y="-5" width="130" height="10" rx="4" fill="#b0bec5" stroke="#78909c" stroke-width="2"/>
    <rect x="160" y="-9" width="24" height="18" rx="5" fill="#ffb300"/>
    <path d="M-12 -2 L-26 50 Q-28 58 -18 60 L-2 60 Q6 60 6 52 L14 8 Z" fill="#263238"/>
    <path d="M10 8 q10 16 -2 26" fill="none" stroke="#263238" stroke-width="5"/>
    <rect x="-40" y="-18" width="90" height="30" rx="12" fill="#1e88e5" stroke="#1565c0" stroke-width="3"/>
    <circle cx="-24" cy="-3" r="5" fill="#90caf9"/>
  </g>
</svg>`,S=-.45,C=900,w=240,T=[[.7,`rgb(129 212 250 / 0.35)`],[.35,`rgb(179 229 252 / 0.85)`],[.12,`rgb(255 255 255 / 0.95)`]],E=class{gun;canvas;g;drops=[];density=1;constructor(e){e.insertAdjacentHTML(`beforeend`,`<canvas class="water"></canvas><div class="gun">${x}</div>`),this.canvas=e.querySelector(`.water`),this.gun=e.querySelector(`.gun`),this.g=this.canvas.getContext(`2d`),this.gun.style.aspectRatio=`${y.width} / ${y.height}`,this.gun.querySelector(`svg`).style.transformOrigin=`${-y.x/y.width*100}% ${-y.y/y.height*100}%`,this.aim(S),this.resize(),addEventListener(`resize`,()=>this.resize())}update(e,t,n){let{g:r,canvas:i,density:a}=this;if(r.setTransform(1,0,0,1,0,0),r.clearRect(0,0,i.width,i.height),r.setTransform(a,0,0,a,0,0),t){let r=this.gun.getBoundingClientRect(),i={x:r.left+-y.x/y.width*r.width,y:r.top+-y.y/y.height*r.height},a=Math.atan2(t.y-i.y,t.x-i.x);this.aim(a);let o=b/y.width*r.width;this.drawJet({x:i.x+Math.cos(a)*o,y:i.y+Math.sin(a)*o},t,n),this.splash(t,n,e)}this.drops=this.drops.filter(t=>(t.age+=e)<t.life),r.fillStyle=`rgb(179 229 252)`;for(let t of this.drops)t.vy+=C*e,t.x+=t.vx*e,t.y+=t.vy*e,r.globalAlpha=1-t.age/t.life,r.beginPath(),r.arc(t.x,t.y,t.r,0,Math.PI*2),r.fill();return r.globalAlpha=1,this.drops.length>0}aim(e){this.gun.style.setProperty(`--angle`,`${e}rad`)}drawJet(e,t,n){let{g:r}=this,i=Math.hypot(t.x-e.x,t.y-e.y),a=(e.x+t.x)/2+(Math.random()-.5)*4,o=(e.y+t.y)/2-i*.05+(Math.random()-.5)*4;r.lineCap=`round`;for(let[i,s]of T)r.lineWidth=n*i,r.strokeStyle=s,r.beginPath(),r.moveTo(e.x,e.y),r.quadraticCurveTo(a,o,t.x,t.y),r.stroke()}splash(e,t,n){let{g:r}=this,i=r.createRadialGradient(e.x,e.y,0,e.x,e.y,t);i.addColorStop(0,`rgb(225 245 254 / 0.8)`),i.addColorStop(1,`rgb(225 245 254 / 0)`),r.fillStyle=i,r.beginPath(),r.arc(e.x,e.y,t,0,Math.PI*2),r.fill();for(let r=Math.round(w*n*Math.random()*2);r>0;r--){let n=-Math.PI*Math.random(),r=120+Math.random()*200;this.drops.push({x:e.x,y:e.y,vx:Math.cos(n)*r,vy:Math.sin(n)*r,r:t*(.05+Math.random()*.08),age:0,life:.3+Math.random()*.3})}}resize(){this.density=Math.min(devicePixelRatio,2),this.canvas.width=Math.round(innerWidth*this.density),this.canvas.height=Math.round(innerHeight*this.density)}},D=6,O=18,k=.05,A=.03,j=8,M=14,N=1500,P={dust:`#d7b98a`,mud:`#5d4037`};async function F(e,t){let{width:n,height:r}=t,o=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${r}" width="${n}" height="${r}">${t.shapes}</svg>`,s=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(o)}`;e.innerHTML=`
    <div class="stage" style="--aspect: ${n} / ${r}">
      <div class="vehicle" aria-label="${t.name}">${o}<canvas></canvas></div>
      <p class="cheer" hidden>ぴかぴか！</p>
      <button class="again" type="button" hidden>もういっかい</button>
    </div>`;let c=e.querySelector(`.stage`),l=c.querySelector(`canvas`),u=c.querySelector(`.cheer`),g=c.querySelector(`.again`),_=l.getContext(`2d`),v=new E(e);for(let e of[`mask-image`,`-webkit-mask-image`])l.style.setProperty(e,`url("${s}")`);let y=L(await I(s),Math.ceil(n/D),Math.ceil(r/D)),b,x=0,S,C=!1,w=!1,T=0;function M(){b=a(y),clearTimeout(x),c.classList.remove(`happy`),c.querySelectorAll(`.sparkle`).forEach(e=>e.remove()),u.hidden=g.hidden=!0,B()}function F(){b.clear(),B(),c.classList.add(`happy`),u.hidden=!1,z(c),x=window.setTimeout(()=>g.hidden=!1,N),h()}function B(){_.setTransform(1,0,0,1,0,0),_.clearRect(0,0,l.width,l.height);let e=l.width/n;_.setTransform(e,0,0,e,0,0);let t=[],r=new Map;for(let e of b.cells)if(!(e.hp<=0)){if(e.kind===`dust`)t.push(e);else{let t=Math.ceil(i(e)*j)/j,n=r.get(t);n?n.push(e):r.set(t,[e])}}R(_,t,P.dust,.9);for(let[e,t]of r)R(_,t,P.mud,.35+.65*e)}function V(e){let t=Math.min((e-T)/1e3,k);T=e;let i=l.getBoundingClientRect();if(S){let[e,a]=[S.last,S.at].map(e=>({x:(e.x-i.left)/i.width*n,y:(e.y-i.top)/i.height*r}));S.last=S.at;let o=b.spray(e.x,e.y,a.x,a.y,O,t);o&&b.remaining<=A?F():o&&B(),o!==C&&m(C=o)}let a=v.update(t,S?.at,O*i.width/n);w=!!S||a,w&&requestAnimationFrame(V)}function H(){w||(w=!0,T=performance.now(),requestAnimationFrame(V))}e.addEventListener(`pointerdown`,t=>{if(d(),S||t.target.closest(`.again`))return;e.setPointerCapture(t.pointerId);let n={x:t.clientX,y:t.clientY};S={id:t.pointerId,at:n,last:n},f(),H()}),e.addEventListener(`pointermove`,e=>{S?.id===e.pointerId&&(S.at={x:e.clientX,y:e.clientY})});let U=e=>{S?.id===e.pointerId&&(S=void 0,C=!1,p())};e.addEventListener(`pointerup`,e=>{d(),U(e)}),e.addEventListener(`pointercancel`,U),g.addEventListener(`click`,M),new ResizeObserver(()=>{let e=Math.min(devicePixelRatio,2);l.width=Math.round(l.clientWidth*e),l.height=Math.round(l.clientHeight*e),B()}).observe(l),M()}function I(e){let t=new Image;return t.src=e,t.decode().then(()=>t)}function L(e,t,n){let r=document.createElement(`canvas`);r.width=t,r.height=n;let i=r.getContext(`2d`,{willReadFrequently:!0});i.drawImage(e,0,0,t,n);let a=i.getImageData(0,0,t,n).data.filter((e,t)=>t%4==3);return{cols:t,rows:n,cellSize:D,filled:Array.from(a,e=>e>128)}}function R(e,t,n,r){e.fillStyle=n,e.globalAlpha=r,e.beginPath();for(let n of t)e.moveTo(n.x+n.r,n.y),e.arc(n.x,n.y,n.r,0,Math.PI*2);e.fill()}function z(e){for(let t=0;t<M;t++){let t=document.createElement(`span`);t.className=`sparkle`,t.style.left=`${5+Math.random()*90}%`,t.style.top=`${5+Math.random()*85}%`,t.style.animationDelay=`${Math.random()*1.2}s`,t.style.setProperty(`--size`,`${18+Math.random()*26}px`),e.append(t)}}var B=Array.from({length:11},(e,t)=>`<line x1="${100+t*140}" y1="0" x2="${100+t*140}" y2="630"/>`).join(``),V=e=>`
  <line x1="${e}" y1="0" x2="${e}" y2="90" stroke="#455a64" stroke-width="4"/>
  <circle cx="${e}" cy="160" r="130" fill="url(#glow)"/>
  <path d="M${e-45} 130 L${e-25} 90 L${e+25} 90 L${e+45} 130 Z" fill="#455a64"/>
  <ellipse cx="${e}" cy="131" rx="24" ry="8" fill="#fff59d"/>`,H=e=>`<rect x="100" y="${e}" width="180" height="52" rx="24" fill="#37474f" stroke="#263238" stroke-width="4"/>`,U=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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
  <g stroke="#d9cdbb" stroke-width="4">${B}</g>

  <rect x="470" y="110" width="660" height="530" fill="#90a4ae"/>
  <rect x="490" y="130" width="620" height="510" fill="url(#slats)"/>
  <rect x="770" y="590" width="60" height="12" rx="6" fill="#607d8b"/>

  ${V(320)}
  ${V(1280)}

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

  ${H(658)}${H(606)}${H(554)}
  <ellipse cx="190" cy="556" rx="50" ry="10" fill="#263238"/>

  <rect x="1370" y="560" width="120" height="150" rx="10" fill="#c62828"/>
  <rect x="1370" y="600" width="120" height="8" fill="#e57373"/><rect x="1370" y="662" width="120" height="8" fill="#e57373"/>
  <ellipse cx="1430" cy="562" rx="60" ry="12" fill="#b71c1c"/>
</svg>`;document.body.insertAdjacentHTML(`afterbegin`,`<div class="garage">${U}</div>`),document.body.insertAdjacentHTML(`beforeend`,`<div class="badge">プレビュー</div>`),F(document.querySelector(`#app`),{name:`ショベルカー`,width:420,height:260,shapes:`
  <g stroke-linecap="round" stroke-linejoin="round">
    <rect x="40" y="196" width="250" height="52" rx="26" fill="#424242"/>
    <g fill="#757575">
      <circle cx="68" cy="222" r="16"/><circle cx="114" cy="222" r="16"/><circle cx="165" cy="222" r="16"/>
      <circle cx="216" cy="222" r="16"/><circle cx="262" cy="222" r="16"/>
    </g>
    <g fill="#bdbdbd">
      <circle cx="68" cy="222" r="6"/><circle cx="114" cy="222" r="6"/><circle cx="165" cy="222" r="6"/>
      <circle cx="216" cy="222" r="6"/><circle cx="262" cy="222" r="6"/>
    </g>
    <rect x="120" y="184" width="90" height="14" fill="#616161"/>
    <rect x="80" y="110" width="9" height="24" rx="3" fill="#616161"/>
    <rect x="40" y="140" width="34" height="46" rx="12" fill="#f9a825"/>
    <rect x="54" y="130" width="200" height="60" rx="12" fill="#fbc02d"/>
    <line x1="215" y1="140" x2="300" y2="84" stroke="#9e9e9e" stroke-width="8"/>
    <line x1="245" y1="146" x2="335" y2="50" stroke="#fbc02d" stroke-width="26"/>
    <line x1="335" y1="50" x2="370" y2="148" stroke="#f9a825" stroke-width="18"/>
    <circle cx="245" cy="146" r="8" fill="#616161"/>
    <circle cx="335" cy="50" r="8" fill="#616161"/>
    <path d="M356 142 L396 150 L392 190 L372 204 L350 196 Q362 172 356 142 Z" fill="#616161"/>
    <path d="M350 196 l-6 9 l11 -3 Z M362 201 l-4 10 l10 -6 Z M374 203 l1 10 l7 -9 Z" fill="#9e9e9e"/>
    <rect x="158" y="58" width="84" height="84" rx="14" fill="#fbc02d"/>
    <rect x="170" y="70" width="60" height="56" rx="10" fill="#b3e5fc"/>
    <g fill="#3e2723">
      <circle cx="189" cy="92" r="5.5"/><circle cx="211" cy="92" r="5.5"/>
    </g>
    <g fill="#fff">
      <circle cx="190.5" cy="90.5" r="1.8"/><circle cx="212.5" cy="90.5" r="1.8"/>
    </g>
    <g class="cheeks" fill="#f48fb1">
      <circle cx="180" cy="104" r="4.5"/><circle cx="220" cy="104" r="4.5"/>
    </g>
    <path class="mouth-normal" d="M193 107 q7 5 14 0" fill="none" stroke="#3e2723" stroke-width="3"/>
    <path class="mouth-happy" d="M189 103 q11 16 22 0 Z" fill="#e57373" stroke="#3e2723" stroke-width="2.5"/>
  </g>`});