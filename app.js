/* ==========================================================================
   Portfolio App JS — Dark Mode Toggle + Active Nav Highlighting
   ========================================================================== */

// ── Dark Mode ──────────────────────────────────────────────────────────────

const DARK_CLASS = 'dark-mode';
const STORAGE_KEY = 'portfolio-theme';

function applyTheme(dark) {
  document.documentElement.classList.toggle(DARK_CLASS, dark);
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.querySelector('.theme-icon-sun').style.display  = dark ? 'block' : 'none';
    btn.querySelector('.theme-icon-moon').style.display = dark ? 'none'  : 'block';
  }
}

function initTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = stored ? stored === 'dark' : prefersDark;
  applyTheme(dark);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle(DARK_CLASS);
  localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  applyTheme(isDark);
}

// ── Active Nav Highlighting ────────────────────────────────────────────────

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const active = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('nav-active', active);
          });
        }
      });
    },
    {
      rootMargin: '-30% 0px -60% 0px', // trigger when section is in the middle viewport band
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// ── Boot ───────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initActiveNav();

  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
});
