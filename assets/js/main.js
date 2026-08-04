const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    navLinks.classList.toggle('is-open', !open);
    document.body.classList.toggle('menu-open', !open);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 780) {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }
  });
}

const yearNode = document.querySelector('[data-current-year]');
if (yearNode) yearNode.textContent = new Date().getFullYear();

document.querySelector('[data-print-page]')?.addEventListener('click', () => window.print());

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

const lifeInfoDialog = document.querySelector('[data-life-info-dialog]');
const lifeInfoOpen = document.querySelector('[data-life-info-open]');
const lifeInfoClose = document.querySelector('[data-life-info-close]');

if (lifeInfoDialog && lifeInfoOpen) {
  lifeInfoOpen.addEventListener('click', () => {
    if (typeof lifeInfoDialog.showModal === 'function') {
      lifeInfoDialog.showModal();
    } else {
      lifeInfoDialog.setAttribute('open', '');
    }
  });

  lifeInfoClose?.addEventListener('click', () => lifeInfoDialog.close());

  lifeInfoDialog.addEventListener('click', (event) => {
    if (event.target === lifeInfoDialog) lifeInfoDialog.close();
  });

  lifeInfoDialog.addEventListener('close', () => lifeInfoOpen.focus());
}
