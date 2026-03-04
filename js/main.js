document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Highlight current page in navigation
  highlightActiveNav();

  // Make featured project cards clickable on home page
  initFeaturedCardClick();

  // Animate skill bars when section enters viewport
  animateSkillBars();

  // Initialize filtering on projects page
  initFilters();
});

/* ──────────────────────────────────────────────── */

function highlightActiveNav() {
  const currentFile = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-desktop a, .mobile-menu__list a').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === currentFile);
  });
}

/* ──────────────────────────────────────────────── */

function initFeaturedCardClick() {
  document.querySelectorAll('.featured .project-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', e => {
      // Don't redirect if user clicked a real link (GitHub etc.)
      if (e.target.closest('a')) return;
      location.href = 'projects.html';
    });
  });
}

/* ──────────────────────────────────────────────── */

function animateSkillBars() {
  const section = document.querySelector('.skills-section');
  if (!section) return;

  const bars = document.querySelectorAll('.skill-progress');
  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;

    bars.forEach(bar => {
      const target = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = target;
      }, 100);
    });

    observer.disconnect();
  }, { threshold: 0.2 });

  observer.observe(section);
}

/* ──────────────────────────────────────────────── */

function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active state
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter?.toLowerCase() || 'all';

      // Filter project cards
      document.querySelectorAll('.project-card').forEach(card => {
        const category = card.dataset.category?.toLowerCase() || '';
        card.style.display = (filter === 'all' || category === filter) ? '' : 'none';
      });
    });
  });
}

/* ──────────────────────────────────────────────── */
// Footer year (optional – can be static too)
const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
<<<<<<< HEAD
}
=======
}
>>>>>>> bb6e96b6497fe772a5c6e82aa260414c4ae77005
