/* ============================================================
   SAMSTEV LENSMAN — Homepage Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. CUSTOM CURSOR ──────────────────────────────────── */
  const cursor      = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');

  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Lagging trail
  function animateTrail() {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Hover state
  const interactables = document.querySelectorAll(
    'a, button, .service-card, .g-cell, .filter'
  );
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });


  /* ── 2. NAV SCROLL BEHAVIOUR ───────────────────────────── */
  const nav = document.getElementById('nav');
  let lastScrollY = window.scrollY;

  const onScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Hide if scrolling down past 80px, Show if scrolling up
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      nav.classList.add('nav--hidden');
    } else {
      nav.classList.remove('nav--hidden');
    }
    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load


  /* ── 3. MOBILE BURGER MENU ─────────────────────────────── */
  const burger    = document.getElementById('burger');
  const navLinks  = document.getElementById('navLinks');

  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    nav.classList.toggle('menu-open', isOpen);
    // Prevent body scroll when menu open
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.documentElement.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      nav.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    });
  });


  /* ── 4. SCROLL REVEAL ──────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // fire once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── 5. COUNTER ANIMATION ──────────────────────────────── */
  // Runs on both hero stats and stats bar
  const counters = document.querySelectorAll('.stat-num, .snum');

  const formatNum = (value, target) => {
    if (target >= 1000) {
      // show in K
      return Math.round(value / 1000);
    }
    return Math.round(value);
  };

  const getSuffix = (target) => {
    if (target >= 1000) return 'K+';
    return '';
  };

  const runCounter = (el) => {
    const target  = parseInt(el.dataset.target, 10);
    const duration = 1800; // ms
    const steps   = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const tick = () => {
      step++;
      // Ease-out: slow down near end
      const progress = step / steps;
      const eased    = 1 - Math.pow(1 - progress, 3);
      current = target * eased;

      el.textContent = formatNum(current, target);

      // Update suffix if inside hero__stat
      const suffixEl = el.nextElementSibling;
      if (suffixEl && suffixEl.classList.contains('stat-suffix') && target >= 1000) {
        suffixEl.textContent = 'K+';
      }

      if (step < steps) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = formatNum(target, target);
      }
    };

    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => {
    if (el.dataset.target) {
      counterObserver.observe(el);
    }
  });


  /* ── 6. GALLERY FILTER ─────────────────────────────────── */
  const filters     = document.querySelectorAll('.filter');
  const galleryCells = document.querySelectorAll('.g-cell');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active state
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;

      galleryCells.forEach((cell, i) => {
        const matches = cat === 'all' || cell.dataset.cat === cat;

        if (matches) {
          cell.style.opacity    = '1';
          cell.style.transform  = 'scale(1)';
          cell.style.pointerEvents = 'auto';
        } else {
          cell.style.opacity    = '0.1';
          cell.style.transform  = 'scale(0.97)';
          cell.style.pointerEvents = 'none';
        }

        // Stagger transition
        cell.style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`;
      });
    });
  });


  /* ── 7. HERO IMAGE FALLBACK ────────────────────────────── */
  const heroImg = document.getElementById('heroImg');
  if (heroImg) {
    heroImg.addEventListener('error', () => {
      // Try GitHub CDN
      if (!heroImg.src.includes('thwebstr.github.io')) {
        heroImg.src = 'https://thwebstr.github.io/sam/photos/samstev.jpg';
      }
    });
  }


  /* ── 8. SMOOTH ANCHOR SCROLL ───────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── 9. MARQUEE PAUSE ON HOVER ─────────────────────────── */
  const marqueeTrack = document.querySelector('.marquee__track');
  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }


  /* ── 10. PARALLAX HERO IMAGE (subtle) ─────────────────── */
  const heroImgEl = document.querySelector('.hero__img');
  if (heroImgEl) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroImgEl.style.transform = `scale(1) translateY(${scrollY * 0.18}px)`;
      }
    }, { passive: true });
  }

});