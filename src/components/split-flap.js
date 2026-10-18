// Station-board split-flap text. Each cell cycles through characters
// before settling, like the mechanical departure boards.

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·';
const TICK_MS = 55;

export function createFlap(el, { length = 5, reduce = false } = {}) {
  el.classList.add('flap');
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '';
  const cells = Array.from({ length }, () => {
    const cell = document.createElement('span');
    cell.className = 'flap__cell flap__cell--space';
    el.append(cell);
    return cell;
  });

  let timer = null;

  function paint(cell, ch) {
    cell.textContent = ch === ' ' ? '' : ch;
    cell.classList.toggle('flap__cell--space', ch === ' ');
  }

  function set(text, { instant = reduce, delay = 0 } = {}) {
    const target = text.toUpperCase().padEnd(length, ' ').slice(0, length).split('');
    clearInterval(timer);
    if (instant) {
      target.forEach((ch, i) => paint(cells[i], ch));
      return;
    }
    // Each cell flips a few more times than the one before it
    const remaining = target.map((ch, i) => (ch === ' ' ? 0 : 3 + i * 2 + Math.floor(Math.random() * 3)));
    const start = () => {
      timer = setInterval(() => {
        let busy = false;
        cells.forEach((cell, i) => {
          if (remaining[i] > 0) {
            remaining[i] -= 1;
            busy = true;
            paint(cell, remaining[i] === 0 ? target[i] : CHARS[Math.floor(Math.random() * CHARS.length)]);
            cell.classList.remove('is-tick');
            void cell.offsetWidth; // restart the tick animation
            cell.classList.add('is-tick');
          } else if (cell.textContent !== (target[i] === ' ' ? '' : target[i])) {
            paint(cell, target[i]);
          }
        });
        if (!busy) clearInterval(timer);
      }, TICK_MS);
    };
    delay ? setTimeout(start, delay) : start();
  }

  return { set };
}
