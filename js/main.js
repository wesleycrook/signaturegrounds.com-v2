// Main functions that run various features
document.addEventListener('DOMContentLoaded', () => {
  // Update the copyright year in the footer (on every page)
  // to always have the current year.
  const el = document.getElementById('copyright-year');
  if (el) el.textContent = new Date().getFullYear();

  // Mobile nav toggle (every page)
  const toggle = document.querySelector('.nav-mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.style.display === 'flex';
      navLinks.style.display = open ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '68px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'var(--forest)';
      navLinks.style.padding = '16px 24px 24px';
      navLinks.style.gap = '16px';
      toggle.setAttribute('aria-expanded', String(!open));
    });
  }

  // Lightbox initializer — safe to call on any page; no-ops if the
  // lightbox element doesn't exist. Supports optional prev/next buttons
  // when multiple photos are passed via photoSelector.
  function initLightbox(lightboxId, photoSelector) {
    const lightbox = document.getElementById(lightboxId);
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const photos = Array.from(document.querySelectorAll(photoSelector));
    let currentIndex = 0;

    function open(index) {
      currentIndex = index;
      const item = photos[index];
      lightboxImg.src = item.dataset.large;
      lightboxImg.alt = item.querySelector('img').alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (prevBtn) prevBtn.style.visibility = index > 0 ? 'visible' : 'hidden';
      if (nextBtn) nextBtn.style.visibility = index < photos.length - 1 ? 'visible' : 'hidden';
    }

    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      lightboxImg.src = '';
    }

    photos.forEach((item, index) => {
      item.addEventListener('click', () => open(index));
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(index); }
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => { if (currentIndex > 0) open(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', () => { if (currentIndex < photos.length - 1) open(currentIndex + 1); });

    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (prevBtn && e.key === 'ArrowLeft' && currentIndex > 0) open(currentIndex - 1);
      if (nextBtn && e.key === 'ArrowRight' && currentIndex < photos.length - 1) open(currentIndex + 1);
    });
  }

  initLightbox('home-lightbox', '.home-about-photo-grid .photo-item');
  initLightbox('about-lightbox', '.intro-split .photo-item, .area-section .photo-item');
  initLightbox('services-lightbox', '#lawn-maintenance .photo-item');
});
