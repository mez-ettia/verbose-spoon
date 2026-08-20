/* Coco Ma — interaction layer.
   Three small jobs: stick the header, reveal sections as they arrive,
   and run the mobile menu. Everything degrades to a working page without it. */
(function () {
  'use strict';

  var doc = document;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- header state ---------------------------------------------------- */
  var head = doc.getElementById('siteHead');
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      head.classList.toggle('is-stuck', window.scrollY > 24);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- reveal on scroll ------------------------------------------------- */
  var targets = doc.querySelectorAll('.reveal');

  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    targets.forEach(function (el) { io.observe(el); });

    /* Stagger siblings inside a group so rows arrive in sequence. */
    ['.cards', '.services__list', '.journal'].forEach(function (sel) {
      var group = doc.querySelector(sel);
      if (!group) return;
      Array.prototype.forEach.call(group.children, function (child, i) {
        child.style.transitionDelay = (i * 0.09) + 's';
      });
    });
  }

  /* ---- mobile menu ------------------------------------------------------ */
  var burger = doc.getElementById('burger');
  var nav = doc.getElementById('nav');

  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    doc.documentElement.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', function () {
    setMenu(burger.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      burger.focus();
    }
  });

  /* ---- housekeeping ----------------------------------------------------- */
  var year = doc.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
