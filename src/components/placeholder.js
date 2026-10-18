// Catalogue-labelled image slots. A slot listed in data/images.json renders
// the real image with its caption and credit; any other slot shows a labelled placeholder.

import images from '../data/images.json';

const ratioLabel = (ratio) => ratio.replace('/', ':');
const attr = (s = '') => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export const imageFor = (slot) => images[slot];

export function placeholderMarkup({ slot, caption = '', date = '', ratio = '4/3', variant = '', eager = false }) {
  const img = images[slot];
  if (img?.focus) {
    // Zoomed detail of a larger image (e.g. one station on the 1893 map), centred on `focus`
    const [a, b] = ratio.split('/').map(Number);
    const sx = img.zoom;
    const sy = img.zoom * img.aspect / (b / a);
    const pos = (f, s) => Math.min(100, Math.max(0, ((f * s - 0.5) / (s - 1)) * 100)).toFixed(2);
    const style = `background-image: url(${img.src}); background-size: ${sx * 100}% auto; background-position: ${pos(img.focus[0], sx)}% ${pos(img.focus[1], sy)}%`;
    const figcaption = variant === 'bare' || variant === 'nocap'
      ? ''
      : `<figcaption class="caption">${img.caption}<span class="caption__credit">${img.credit}</span></figcaption>`;
    return `<div class="ph-box has-img" style="--ratio: ${ratio}"><div class="ph-zoom" role="img" aria-label="${attr(img.caption)}" style="${style}"></div></div>${figcaption}`;
  }
  if (img) {
    // optional focal point for tight crops, e.g. "50% 12%"
    const focus = img.position ? ` style="object-position: ${img.position}"` : '';
    const tag = `<img src="${img.src}" alt="${attr(img.caption)}"${focus} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
    const figcaption = variant === 'bare' || variant === 'nocap'
      ? ''
      : `<figcaption class="caption">${img.caption}<span class="caption__credit">${img.credit}</span></figcaption>`;
    return `<div class="ph-box has-img" style="--ratio: ${ratio}">${tag}</div>${figcaption}`;
  }

  const meta = [caption, date, ratioLabel(ratio)].filter(Boolean).join(' · ');
  return `<div class="ph-box" style="--ratio: ${ratio}" role="img" aria-label="Image placeholder: ${attr(caption || slot)}">
      <span class="ph-box__id">AHW-IMG · ${slot}</span>
      <span class="ph-box__mark" aria-hidden="true"></span>
      ${variant === 'nocap' ? '' : `<span class="ph-box__meta">${meta}</span>`}
    </div>`;
}

export function renderPlaceholders(root = document) {
  root.querySelectorAll('[data-ph]').forEach((el) => {
    const { ph: slot, caption, date, ratio, variant } = el.dataset;
    if (variant) el.classList.add(`ph--${variant}`);
    el.innerHTML = placeholderMarkup({ slot, caption, date, ratio, variant, eager: slot === 'HERO-01' });
  });
}
