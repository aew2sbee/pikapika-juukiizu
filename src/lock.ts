// The lock screen: the garage at night with the last vehicle asleep, "またあしたね" for the child,
// and a multiplication on a keypad for the adult.

import { makeProblem, type Problem } from './playtime';
import { vehicleSvg } from './vehicles';
import type { Vehicle } from './vehicles/types';

const MAX_DIGITS = 2;
const STARS = 18;

export function mountLock(root: HTMLElement, vehicle: Vehicle, onUnlock: () => void): void {
  // Same spots every time, so the sky doesn't jump about when the screen comes back.
  const stars = Array.from({ length: STARS }, (_, i) => {
    const left = (i * 37 + 11) % 100;
    const top = (i * 23 + 7) % 45;
    return `<span class="star" style="left: ${left}%; top: ${top}%; animation-delay: ${(i % 5) * 0.4}s"></span>`;
  }).join('');
  root.classList.add('sleep');
  root.innerHTML = `
    <div class="night" aria-hidden="true">${stars}<span class="moon"></span></div>
    <div class="bed">
      <h1 class="goodnight" tabindex="-1">またあしたね</h1>
      <div class="stage" data-mood="sleepy" style="--aspect: ${vehicle.width} / ${vehicle.height}">
        <div class="vehicle" aria-label="${vehicle.name}">${vehicleSvg(vehicle)}</div>
        <p class="snore" aria-hidden="true">ぐう</p>
      </div>
    </div>
    <button class="adult pill" type="button">おとなの ひと</button>
    <div class="gate" role="dialog" aria-modal="true" aria-label="おとなの ひと" hidden>
      <p class="gate__sum"><span class="gate__question"></span> = <output class="gate__answer">?</output></p>
      <p class="gate__hint" aria-live="polite"></p>
      <div class="gate__keys"></div>
      <button class="gate__back pill" type="button">もどる</button>
    </div>`;
  const adultButton = root.querySelector<HTMLButtonElement>('.adult')!;
  const gate = root.querySelector<HTMLDivElement>('.gate')!;
  const question = gate.querySelector<HTMLSpanElement>('.gate__question')!;
  const answer = gate.querySelector<HTMLOutputElement>('.gate__answer')!;
  const hint = gate.querySelector<HTMLParagraphElement>('.gate__hint')!;
  const keys = gate.querySelector<HTMLDivElement>('.gate__keys')!;
  let problem: Problem | undefined;
  let typed = '';

  function render() {
    answer.value = typed || '?';
  }

  function openGate() {
    // A new sum each time the gate opens, so a child can't learn one answer by heart.
    problem = makeProblem(Math.random, problem);
    question.textContent = `${problem.a} × ${problem.b}`;
    typed = '';
    hint.textContent = '';
    render();
    adultButton.hidden = true;
    gate.hidden = false;
    keys.querySelector('button')?.focus();
  }

  function closeGate() {
    gate.hidden = true;
    adultButton.hidden = false;
    adultButton.focus();
  }

  function press(digit: string) {
    if (typed.length >= MAX_DIGITS) return;
    typed = typed === '0' ? digit : typed + digit;
    hint.textContent = '';
    render();
  }

  function submit() {
    if (!problem || typed === '') return;
    if (Number(typed) === problem.answer) {
      onUnlock();
      return;
    }
    // No waiting and no new sum: just try again.
    typed = '';
    hint.textContent = 'ちがうよ。もういちど いれてね';
    render();
  }

  const layout: { label: string; action: () => void; kind?: string }[] = [
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => ({ label: String(digit), action: () => press(String(digit)) })),
    { label: 'けす', kind: 'clear', action: () => ((typed = ''), render()) },
    { label: '0', action: () => press('0') },
    { label: 'けってい', kind: 'enter', action: submit },
  ];
  for (const key of layout) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = key.kind ? `gate__key gate__key--${key.kind}` : 'gate__key';
    button.textContent = key.label;
    button.addEventListener('click', key.action);
    keys.append(button);
  }

  adultButton.addEventListener('click', openGate);
  gate.querySelector('.gate__back')!.addEventListener('click', closeGate);
  gate.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeGate();
  });

  // Whatever had focus (a vehicle, "おやすみ") has just gone.
  root.querySelector<HTMLElement>('.goodnight')!.focus();
}
