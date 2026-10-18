// Archive loupe: a circular magnifier over documents (mouse/pen).
// On touch, tapping the document opens it full screen instead.

const ZOOM = 2.4;

export function initLoupes() {
  document.querySelectorAll('[data-loupe]').forEach((figure) => {
    const target = figure.querySelector('[data-loupe-target]');
    if (!target) return;

    const lens = document.createElement('div');
    lens.className = 'loupe';
    lens.setAttribute('aria-hidden', 'true');
    const inner = target.cloneNode(true);
    inner.removeAttribute('data-loupe-target');
    inner.classList.add('loupe__inner');
    lens.append(inner);
    figure.append(lens);

    const size = () => {
      inner.style.width = `${target.offsetWidth}px`;
      inner.style.height = `${target.offsetHeight}px`;
    };

    target.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'touch') return;
      size();
      lens.classList.add('is-on');
    });
    target.addEventListener('pointerleave', () => lens.classList.remove('is-on'));
    target.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const r = target.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const half = lens.offsetWidth / 2;
      lens.style.left = `${target.offsetLeft + x - half}px`;
      lens.style.top = `${target.offsetTop + y - half}px`;
      inner.style.transform = `translate(${half - x * ZOOM}px, ${half - y * ZOOM}px) scale(${ZOOM})`;
    });

    // click is not a PointerEvent in every browser, so remember the last pointer type
    let lastPointer = 'mouse';
    target.addEventListener('pointerdown', (e) => { lastPointer = e.pointerType; });
    target.addEventListener('click', () => lastPointer === 'touch' && openOverlay(target));
  });
}

function openOverlay(target) {
  const overlay = document.createElement('div');
  overlay.className = 'loupe-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Document, enlarged');
  overlay.setAttribute('data-lenis-prevent', '');
  const copy = target.cloneNode(true);
  copy.removeAttribute('data-loupe-target');
  const close = document.createElement('button');
  close.className = 'btn btn--ghost loupe-overlay__close';
  close.type = 'button';
  close.textContent = 'Close';
  overlay.append(copy, close);
  document.body.append(overlay);
  close.focus();
  const remove = () => overlay.remove();
  close.addEventListener('click', remove);
  overlay.addEventListener('keydown', (e) => e.key === 'Escape' && remove());
}
