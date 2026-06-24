// Main functions that run various features
document.addEventListener('DOMContentLoaded', () => {
  // Update the Copyright year in the footer (on every page)
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
});
