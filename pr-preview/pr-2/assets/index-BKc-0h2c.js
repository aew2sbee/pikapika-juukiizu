(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,t,n){new ResizeObserver(()=>{let r=Math.min(devicePixelRatio,t);e.width=Math.round(e.clientWidth*r),e.height=Math.round(e.clientHeight*r),n?.()}).observe(e)}function t(e,t){e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,e.canvas.width,e.canvas.height);let n=e.canvas.width/t;e.setTransform(n,0,0,n,0,0)}function n(e,t,n){let[r,i]=[n.x-t.x,n.y-t.y],a=r*r+i*i,o=a?Math.max(0,Math.min(1,((e.x-t.x)*r+(e.y-t.y)*i)/a)):0;return Math.hypot(e.x-(t.x+o*r),e.y-(t.y+o*i))}var r={dust:.04,mud:.3},i=.6,a=6,o=class{cells;left;constructor(e){this.cells=e,this.left=e.filter(e=>e.hp>0).length}get remaining(){return this.cells.length?this.left/this.cells.length:0}spray(e,t,r,i){let a=!1;for(let o of this.cells)o.hp<=0||n(o,e,t)>r||(o.hp=Math.max(0,o.hp-i),o.hp===0&&this.left--,a=!0);return a}clear(){for(let e of this.cells)e.hp=0;this.left=0}};function s(e){return e.hp/r[e.kind]}function c(e,t=Math.random){let{cols:n,cellSize:s}=e,c=e.filled.flatMap((e,t)=>e?[{col:t%n,row:Math.floor(t/n)}]:[]),l=new Map,u=(e,n,r)=>{let i=c[Math.floor(t()*c.length)],a=(n+t()*(r-n))/s;for(let t of c)(t.col-i.col)**2+(t.row-i.row)**2<=a**2&&l.set(t,e)};if(c.length){for(let e=0;e<50&&l.size<c.length*i;e++)u(`dust`,20,40);for(let e=0;e<a;e++)u(`mud`,10,20)}return new o([...l].map(([{col:e,row:n},i])=>({x:(e+.5+(t()-.5)*.6)*s,y:(n+.5+(t()-.5)*.6)*s,r:s*(.75+t()*.35),kind:i,hp:r[i]})))}var l,u,d,f={air:1300,dirt:2600};function p(){try{l??=new AudioContext,l.state!==`running`&&l.resume().catch(()=>{})}catch{}}function m(){v(e=>{if(d)return;u??=b(e,1);let t=new AudioBufferSourceNode(e,{buffer:u,loop:!0}),n=new BiquadFilterNode(e,{type:`bandpass`,frequency:f.air,Q:.7}),r=new GainNode(e),i=e.currentTime;r.gain.setValueAtTime(0,i),r.gain.linearRampToValueAtTime(.12,i+.05),t.connect(n).connect(r).connect(e.destination),t.start(i),d={source:t,filter:n,gain:r}})}function h(){let e=d;d=void 0,e&&v(t=>{let n=t.currentTime;e.gain.gain.cancelScheduledValues(n),e.gain.gain.setTargetAtTime(0,n,.04),e.source.stop(n+.3)})}function g(e){v(t=>{d?.filter.frequency.setTargetAtTime(e?f.dirt:f.air,t.currentTime,.05)})}function _(){v(e=>{let t=e.currentTime;[523.25,659.25,783.99,1046.5].forEach((n,r)=>y(e,n,t+r*.13,r===3?.7:.18))})}function v(e){if(l)try{e(l)}catch{}}function y(e,t,n,r){let i=new OscillatorNode(e,{type:`triangle`,frequency:t}),a=new GainNode(e);a.gain.setValueAtTime(0,n),a.gain.linearRampToValueAtTime(.25,n+.02),a.gain.exponentialRampToValueAtTime(.001,n+r),i.connect(a).connect(e.destination),i.start(n),i.stop(n+r)}function b(e,t){let n=new AudioBuffer({length:Math.ceil(e.sampleRate*t),sampleRate:e.sampleRate}),r=n.getChannelData(0);for(let e=0;e<r.length;e++)r[e]=Math.random()*2-1;return n}var x={x:-50,y:-45,width:240,height:110},S={x:-x.x/x.width,y:-x.y/x.height},C=184,w=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x.x} ${x.y} ${x.width} ${x.height}">
  <g stroke-linejoin="round" stroke-linecap="round">
    <rect x="40" y="-5" width="130" height="10" rx="4" fill="#b0bec5" stroke="#78909c" stroke-width="2"/>
    <rect x="160" y="-9" width="24" height="18" rx="5" fill="#ffb300"/>
    <path d="M-12 -2 L-26 50 Q-28 58 -18 60 L-2 60 Q6 60 6 52 L14 8 Z" fill="#263238"/>
    <path d="M10 8 q10 16 -2 26" fill="none" stroke="#263238" stroke-width="5"/>
    <rect x="-40" y="-18" width="90" height="30" rx="12" fill="#1e88e5" stroke="#1565c0" stroke-width="3"/>
    <circle cx="-24" cy="-3" r="5" fill="#90caf9"/>
  </g>
</svg>`,T=-.45,E=.05,D=900,O=240,k=4,A=[[.7,`rgb(129 212 250 / 0.35)`],[.35,`rgb(179 229 252 / 0.85)`],[.12,`rgb(255 255 255 / 0.95)`]],j=class{options;gun;g;drops=[];nozzle;hitting=!1;animating=!1;lastFrame=0;constructor(t,n){this.options=n,t.insertAdjacentHTML(`beforeend`,`<canvas class="water"></canvas><div class="gun">${w}</div>`);let r=t.querySelector(`.water`);this.g=r.getContext(`2d`),this.gun=t.querySelector(`.gun`),this.gun.style.aspectRatio=`${x.width} / ${x.height}`,this.gun.querySelector(`svg`).style.transformOrigin=`${S.x*100}% ${S.y*100}%`,this.aim(T),e(r,1),t.addEventListener(`pointerdown`,e=>{if(p(),this.nozzle||e.target.closest(`button`))return;t.setPointerCapture(e.pointerId);let n={x:e.clientX,y:e.clientY};this.nozzle={id:e.pointerId,at:n,last:n},m(),this.animate()}),t.addEventListener(`pointermove`,e=>{this.nozzle?.id===e.pointerId&&(this.nozzle.at={x:e.clientX,y:e.clientY})}),t.addEventListener(`pointerup`,e=>{p(),this.release(e)}),t.addEventListener(`pointercancel`,e=>this.release(e))}release(e){this.nozzle?.id===e.pointerId&&(this.nozzle=void 0,this.hitting=!1,h())}animate(){this.animating||(this.animating=!0,this.lastFrame=performance.now(),requestAnimationFrame(this.frame))}frame=e=>{let n=Math.min((e-this.lastFrame)/1e3,E);this.lastFrame=e;let{g:r,nozzle:i}=this;if(t(r,r.canvas.clientWidth),i){let e=this.options.onSpray(i.last,i.at,n);i.last=i.at,e!==this.hitting&&g(this.hitting=e);let t=this.options.splashRadius();this.drawJet(this.aimAt(i.at),i.at,t),this.splash(i.at,t,n)}this.drawDrops(n),this.animating=!!this.nozzle||this.drops.length>0,this.animating&&requestAnimationFrame(this.frame)};aimAt(e){let t=this.gun.getBoundingClientRect(),n={x:t.left+S.x*t.width,y:t.top+S.y*t.height},r=Math.atan2(e.y-n.y,e.x-n.x);this.aim(r);let i=C/x.width*t.width;return{x:n.x+Math.cos(r)*i,y:n.y+Math.sin(r)*i}}aim(e){this.gun.style.setProperty(`--angle`,`${e}rad`)}drawJet(e,t,n){let{g:r}=this,i=Math.hypot(t.x-e.x,t.y-e.y),a=(e.x+t.x)/2+(Math.random()-.5)*4,o=(e.y+t.y)/2-i*.05+(Math.random()-.5)*4;r.lineCap=`round`;for(let[i,s]of A)r.lineWidth=n*i,r.strokeStyle=s,r.beginPath(),r.moveTo(e.x,e.y),r.quadraticCurveTo(a,o,t.x,t.y),r.stroke()}splash(e,t,n){let{g:r}=this,i=r.createRadialGradient(e.x,e.y,0,e.x,e.y,t);i.addColorStop(0,`rgb(225 245 254 / 0.8)`),i.addColorStop(1,`rgb(225 245 254 / 0)`),r.fillStyle=i,r.beginPath(),r.arc(e.x,e.y,t,0,Math.PI*2),r.fill();for(let r=Math.round(O*n*Math.random()*2);r>0;r--){let n=-Math.PI*Math.random(),r=120+Math.random()*200;this.drops.push({x:e.x,y:e.y,vx:Math.cos(n)*r,vy:Math.sin(n)*r,r:t*(.05+Math.random()*.08),age:0,life:.3+Math.random()*.3})}}drawDrops(e){let{g:t,drops:n}=this,r=0;for(let t of n)t.age+=e,!(t.age>=t.life)&&(t.vy+=D*e,t.x+=t.vx*e,t.y+=t.vy*e,n[r++]=t);n.length=r,t.fillStyle=`rgb(179 229 252)`;for(let e=1;e<=k;e++){t.globalAlpha=e/k,t.beginPath();for(let r of n)Math.ceil((1-r.age/r.life)*k)===e&&(t.moveTo(r.x+r.r,r.y),t.arc(r.x,r.y,r.r,0,Math.PI*2));t.fill()}t.globalAlpha=1}},M=6,N=18,P=.03,F=8,I=14,L=1500,R={dust:`#d7b98a`,mud:`#5d4037`};async function z(n,r){let{width:i,height:a}=r,o=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${i} ${a}" width="${i}" height="${a}">${r.shapes}</svg>`,l=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(o)}`;n.innerHTML=`
    <div class="stage" style="--aspect: ${i} / ${a}">
      <div class="vehicle" aria-label="${r.name}">${o}<canvas></canvas></div>
      <p class="cheer" hidden>ぴかぴか！</p>
      <button class="again" type="button" hidden>もういっかい</button>
    </div>`;let u=n.querySelector(`.stage`),d=u.querySelector(`canvas`),f=u.querySelector(`.cheer`),p=u.querySelector(`.again`),m=d.getContext(`2d`);for(let e of[`mask-image`,`-webkit-mask-image`])d.style.setProperty(e,`url("${l}")`);let h=V(await B(l),Math.ceil(i/M),Math.ceil(a/M)),g,v=0;function y(){g=c(h),clearTimeout(v),u.classList.remove(`happy`),u.querySelectorAll(`.sparkle`).forEach(e=>e.remove()),f.hidden=p.hidden=!0,x()}function b(){g.clear(),x(),u.classList.add(`happy`),f.hidden=!1,U(u),v=window.setTimeout(()=>p.hidden=!1,L),_()}function x(){t(m,i);let e=[],n=new Map;for(let t of g.cells)if(!(t.hp<=0)){if(t.kind===`dust`)e.push(t);else{let e=Math.ceil(s(t)*F)/F,r=n.get(e);r?r.push(t):n.set(e,[t])}}H(m,e,R.dust,.9);for(let[e,t]of n)H(m,t,R.mud,.35+.65*e)}function S(e,t){return{x:(e.x-t.left)/t.width*i,y:(e.y-t.top)/t.height*a}}new j(n,{onSpray(e,t,n){let r=d.getBoundingClientRect(),i=g.spray(S(e,r),S(t,r),N,n);return i&&g.remaining<=P?b():i&&x(),i},splashRadius:()=>N*d.getBoundingClientRect().width/i}),p.addEventListener(`click`,y),e(d,2,x),y()}function B(e){let t=new Image;return t.src=e,t.decode().then(()=>t)}function V(e,t,n){let r=document.createElement(`canvas`);r.width=t,r.height=n;let i=r.getContext(`2d`,{willReadFrequently:!0});i.drawImage(e,0,0,t,n);let a=i.getImageData(0,0,t,n).data.filter((e,t)=>t%4==3);return{cols:t,rows:n,cellSize:M,filled:Array.from(a,e=>e>128)}}function H(e,t,n,r){e.fillStyle=n,e.globalAlpha=r,e.beginPath();for(let n of t)e.moveTo(n.x+n.r,n.y),e.arc(n.x,n.y,n.r,0,Math.PI*2);e.fill()}function U(e){for(let t=0;t<I;t++){let t=document.createElement(`span`);t.className=`sparkle`,t.style.left=`${5+Math.random()*90}%`,t.style.top=`${5+Math.random()*85}%`,t.style.animationDelay=`${Math.random()*1.2}s`,t.style.setProperty(`--size`,`${18+Math.random()*26}px`),e.append(t)}}var W=Array.from({length:11},(e,t)=>`<line x1="${100+t*140}" y1="0" x2="${100+t*140}" y2="630"/>`).join(``),G=e=>`
  <line x1="${e}" y1="0" x2="${e}" y2="90" stroke="#455a64" stroke-width="4"/>
  <circle cx="${e}" cy="160" r="130" fill="url(#glow)"/>
  <path d="M${e-45} 130 L${e-25} 90 L${e+25} 90 L${e+45} 130 Z" fill="#455a64"/>
  <ellipse cx="${e}" cy="131" rx="24" ry="8" fill="#fff59d"/>`,K=e=>`<rect x="100" y="${e}" width="180" height="52" rx="24" fill="#37474f" stroke="#263238" stroke-width="4"/>`,q=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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
  <g stroke="#d9cdbb" stroke-width="4">${W}</g>

  <rect x="470" y="110" width="660" height="530" fill="#90a4ae"/>
  <rect x="490" y="130" width="620" height="510" fill="url(#slats)"/>
  <rect x="770" y="590" width="60" height="12" rx="6" fill="#607d8b"/>

  ${G(320)}
  ${G(1280)}

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

  ${K(658)}${K(606)}${K(554)}
  <ellipse cx="190" cy="556" rx="50" ry="10" fill="#263238"/>

  <rect x="1370" y="560" width="120" height="150" rx="10" fill="#c62828"/>
  <rect x="1370" y="600" width="120" height="8" fill="#e57373"/><rect x="1370" y="662" width="120" height="8" fill="#e57373"/>
  <ellipse cx="1430" cy="562" rx="60" ry="12" fill="#b71c1c"/>
</svg>`;document.body.insertAdjacentHTML(`afterbegin`,`<div class="garage">${q}</div>`),document.body.insertAdjacentHTML(`beforeend`,`<div class="badge">プレビュー</div>`),z(document.querySelector(`#app`),{name:`ショベルカー`,width:420,height:260,shapes:`
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