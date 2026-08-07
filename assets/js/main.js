/*
  Shared site behavior.
  This file is loaded on every page (or nearly every page), so keep it limited to
  behaviors that are shared across the site. Page-specific interactive code lives in
  life.js and carousel.js.
*/

// Mobile navigation: opens/closes the six-link top navigation below 780px.
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    navLinks.classList.toggle('is-open', !open);
    document.body.classList.toggle('menu-open', !open);
  });

  // Close the mobile menu after a navigation link is chosen.
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    });
  });

  // Reset the mobile-menu state if the browser is widened back to desktop size.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 780) {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }
  });
}

// Scroll-in reveal animation for elements with class="reveal".
// Visitors who prefer reduced motion see everything immediately.
const revealNodes = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add('is-visible'));
}

// Conway's Game of Life information dialog on the About page.
// The dialog content itself is editable in index.html; the simulation is in life.js.
const lifeInfoDialog = document.querySelector('[data-life-info-dialog]');
const lifeInfoOpen = document.querySelector('[data-life-info-open]');
const lifeInfoClose = document.querySelector('[data-life-info-close]');

if (lifeInfoDialog && lifeInfoOpen) {
  lifeInfoOpen.addEventListener('click', () => {
    if (typeof lifeInfoDialog.showModal === 'function') {
      lifeInfoDialog.showModal();
    } else {
      // Fallback for older browsers that do not support <dialog>.showModal().
      lifeInfoDialog.setAttribute('open', '');
    }
  });

  lifeInfoClose?.addEventListener('click', () => lifeInfoDialog.close());

  // Clicking the dark backdrop (outside the light modal panel) closes the dialog.
  lifeInfoDialog.addEventListener('click', (event) => {
    if (event.target === lifeInfoDialog) lifeInfoDialog.close();
  });

  // Return keyboard focus to the information button after closing the dialog.
  lifeInfoDialog.addEventListener('close', () => lifeInfoOpen.focus());
}
