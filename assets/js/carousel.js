const carousels = document.querySelectorAll('[data-photo-carousel]');

carousels.forEach((carousel) => {
  const viewport = carousel.querySelector('[data-carousel-viewport]');
  const track = carousel.querySelector('[data-carousel-track]');
  const slides = [...carousel.querySelectorAll('[data-carousel-slide]')];
  const previousButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  const currentLabel = carousel.querySelector('[data-carousel-current]');
  const totalLabel = carousel.querySelector('[data-carousel-total]');

  if (!viewport || !track || slides.length === 0) return;

  const AUTO_ROTATE_DELAY = 5000;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let currentIndex = 0;
  let touchStartX = null;
  let autoRotateTimer = null;

  if (totalLabel) totalLabel.textContent = String(slides.length).padStart(2, '0');

  const slideStep = () => {
    if (slides.length < 2) return viewport.clientWidth;
    return slides[1].offsetLeft - slides[0].offsetLeft;
  };

  const maxIndex = () => {
    const step = slideStep();
    if (!step) return slides.length - 1;
    const visibleWidth = viewport.clientWidth;
    const trackWidth = track.scrollWidth;
    return Math.max(0, Math.ceil((trackWidth - visibleWidth) / step));
  };

  const update = (nextIndex, behavior = 'smooth') => {
    const lastIndex = maxIndex();
    if (lastIndex === 0) {
      currentIndex = 0;
    } else if (nextIndex < 0) {
      currentIndex = lastIndex;
    } else if (nextIndex > lastIndex) {
      currentIndex = 0;
    } else {
      currentIndex = nextIndex;
    }

    viewport.scrollTo({ left: currentIndex * slideStep(), behavior });
    if (currentLabel) currentLabel.textContent = String(currentIndex + 1).padStart(2, '0');
    if (previousButton) previousButton.disabled = lastIndex === 0;
    if (nextButton) nextButton.disabled = lastIndex === 0;
  };

  const stopAutoRotate = () => {
    window.clearInterval(autoRotateTimer);
    autoRotateTimer = null;
  };

  const startAutoRotate = () => {
    stopAutoRotate();
    if (reduceMotion.matches || maxIndex() === 0) return;
    autoRotateTimer = window.setInterval(() => {
      update(currentIndex >= maxIndex() ? 0 : currentIndex + 1);
    }, AUTO_ROTATE_DELAY);
  };

  const restartAutoRotate = () => {
    stopAutoRotate();
    startAutoRotate();
  };

  previousButton?.addEventListener('click', () => {
    update(currentIndex - 1);
    restartAutoRotate();
  });

  nextButton?.addEventListener('click', () => {
    update(currentIndex + 1);
    restartAutoRotate();
  });

  viewport.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      update(currentIndex - 1);
      restartAutoRotate();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      update(currentIndex + 1);
      restartAutoRotate();
    }
  });

  viewport.addEventListener('touchstart', (event) => {
    stopAutoRotate();
    touchStartX = event.changedTouches[0]?.clientX ?? null;
  }, { passive: true });

  viewport.addEventListener('touchend', (event) => {
    if (touchStartX === null) return;
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) > 45) update(currentIndex + (delta < 0 ? 1 : -1));
    touchStartX = null;
    startAutoRotate();
  }, { passive: true });

  carousel.addEventListener('mouseenter', stopAutoRotate);
  carousel.addEventListener('mouseleave', startAutoRotate);
  carousel.addEventListener('focusin', stopAutoRotate);
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) startAutoRotate();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoRotate();
    else startAutoRotate();
  });

  reduceMotion.addEventListener?.('change', startAutoRotate);

  window.addEventListener('resize', () => {
    update(currentIndex, 'auto');
    startAutoRotate();
  });

  update(0, 'auto');
  startAutoRotate();
});
