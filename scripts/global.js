// Enhanced mobile nav toggle, on-load and on-scroll animations
document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('header');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (hamburger && header) {
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('aria-label', 'Toggle navigation');
    hamburger.setAttribute('aria-expanded', 'false');

    hamburger.addEventListener('click', function () {
      const open = header.classList.toggle('nav-open');
      hamburger.classList.toggle('is-active', open);
      hamburger.setAttribute('aria-expanded', String(open));

      // stagger nav link reveal on mobile
      const nav = document.querySelector('.nav-links');
      if (nav) {
        const links = Array.from(nav.querySelectorAll('a'));
        if (open) {
          links.forEach((a, i) => {
            a.style.setProperty('--i', i);
            setTimeout(() => a.classList.add('animate-in'), i * 70 + 80);
          });
        } else {
          links.forEach((a) => {
            a.classList.remove('animate-in');
            a.style.removeProperty('--i');
          });
        }
      }
    });

    // close menu when clicking a nav link (mobile)
    navLinks && navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        header.classList.remove('nav-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // close when clicking outside
    document.addEventListener('click', function (e) {
      if (header.classList.contains('nav-open') && !header.contains(e.target)) {
        header.classList.remove('nav-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Animations: on-load and on-scroll (respect reduced-motion)
  function prepareAnimateElements() {
    document.querySelectorAll('[data-animate]').forEach(el => {
      const type = el.getAttribute('data-animate') || 'fade-up';
      el.classList.add('anim-' + type.replace(/\s+/g, '-'));
    });
    document.querySelectorAll('[data-anim-load]').forEach(el => {
      const type = el.getAttribute('data-anim-load') || 'pop';
      el.classList.add('anim-' + type.replace(/\s+/g, '-'));
    });
  }

  function revealLoadElements() {
    const loadEls = document.querySelectorAll('[data-anim-load]');
    loadEls.forEach((el, i) => setTimeout(() => el.classList.add('animate-in'), i * 130 + 120));
  }

  function initScrollAnimations() {
    prepareAnimateElements();

    if (prefersReduced) {
      document.querySelectorAll('[data-anim-load], [data-animate]').forEach((el) => el.classList.add('animate-in'));
      return;
    }

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-animate]').forEach((el) => io.observe(el));
    revealLoadElements();
  }

  initScrollAnimations();

  // Simple newsletter UX
  const form = document.querySelector('.newsletter-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button');
      btn.textContent = 'Thanks!';
      setTimeout(() => (btn.textContent = 'Subscribe'), 2200);
      form.reset();
    });
  }
});