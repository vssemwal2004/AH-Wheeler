// Masthead condenses after the hero; on small screens a full-screen menu.

import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initMasthead({ lenis }) {
  const header = document.querySelector('[data-masthead]');
  const toggle = header.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');

  ScrollTrigger.create({
    start: 80, end: 'max',
    onToggle: (self) => header.classList.toggle('is-condensed', self.isActive),
  });

  const setOpen = (open) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    open ? lenis?.stop() : lenis?.start();
  };
  toggle.addEventListener('click', () => setOpen(menu.hidden));
  menu.addEventListener('click', (e) => e.target.closest('a') && setOpen(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) { setOpen(false); toggle.focus(); }
  });
}
