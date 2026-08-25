document.addEventListener('DOMContentLoaded', () => {
  initPreferences();

  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      const lang = localStorage.getItem('portfolio-language') || 'en';
      const t = translations[lang] || translations.en;
      hamburger.setAttribute('aria-label', isOpen ? t.menuClose : t.menuOpen);
    });

    // Close menu when link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        const lang = localStorage.getItem('portfolio-language') || 'en';
        const t = translations[lang] || translations.en;
        hamburger.setAttribute('aria-label', t.menuOpen);
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

/* ────────────────────────────────────────────────
   Translations
   ──────────────────────────────────────────────── */
const translations = {
  en: {
    nav: ['Home', 'Projects', 'About', 'Skills'],
    themeDark: 'Dark mode',
    themeLight: 'Light mode',
    language: 'Select language',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    home: {
      subtitle: 'Full Stack Developer',
      desc: 'Building robust, scalable applications from database to browser.',
      viewProjects: 'View Projects',
      aboutMe: 'About Me',
      featured: 'Featured Projects',
      viewAll: 'View all',
      work: "Let's Work Together",
      workDesc: 'Currently working as a Full Stack Developer at RobotMinds AB. Feel free to reach out if you have interesting projects or opportunities.',
      contact: 'Get in Touch',
      salon: 'Hair Salon Booking System: An online platform for clients to book appointments and for salons to manage schedules and services.',
      balkan: 'Full-stack football club platform for FBK Balkan, featuring player management, match scheduling, and club information.',
      library: 'School project built with Spring Boot and JPA.',
      tagline: 'Full Stack Developer & Creative',
      rights: 'All rights reserved.'
    }
  },
  sv: {
    nav: ['Hem', 'Projekt', 'Om mig', 'Kompetenser'],
    themeDark: 'Mörkt läge',
    themeLight: 'Ljust läge',
    language: 'Välj språk',
    menuOpen: 'Öppna meny',
    menuClose: 'Stäng meny',
    home: {
      subtitle: 'Fullstackutvecklare',
      desc: 'Jag bygger robusta och skalbara applikationer från databas till webbläsare.',
      viewProjects: 'Visa projekt',
      aboutMe: 'Om mig',
      featured: 'Utvalda projekt',
      viewAll: 'Visa alla',
      work: 'Låt oss arbeta tillsammans',
      workDesc: 'Arbetar för närvarande som fullstackutvecklare på RobotMinds AB. Hör gärna av dig om du har intressanta projekt eller möjligheter.',
      contact: 'Kontakta mig',
      salon: 'Bokningssystem för frisörsalong: En plattform där kunder kan boka tider och salonger hantera scheman och tjänster.',
      balkan: 'Fullstackplattform för fotbollsklubben FBK Balkan med spelarhantering, matchplanering och klubbinfo.',
      library: 'Skolprojekt byggt med Spring Boot och JPA.',
      tagline: 'Fullstackutvecklare & Kreatör',
      rights: 'Med ensamrätt.'
    }
  },
  pages: {
    about: {
      title: ['About Me', 'Om mig'],
      paragraphs: [
        [
          'Recently graduated Full Stack Developer from Teknikhögskolan with over 14 years of experience in graphic design, web design and digital product development.',
          'Nyligen examinerad fullstackutvecklare från Teknikhögskolan med över 14 års erfarenhet av grafisk design, webbdesign och digital produktutveckling.'
        ],
        [
          'Strong knowledge of JavaScript, HTML, CSS, Node.js, Java, REST APIs and modern development methods, combined with a solid background in UX design and prototyping.',
          'Stark kunskap i JavaScript, HTML, CSS, Node.js, Java, REST API:er och moderna utvecklingsmetoder, kombinerat med en solid bakgrund inom UX-design och prototyper.'
        ],
        [
          'Currently working as a Full Stack Developer at RobotMinds AB. I enjoy collaborating in agile teams and contributing to scalable, user-friendly digital solutions.',
          'Arbetar för närvarande som fullstackutvecklare på RobotMinds AB. Jag trivs med att samarbeta i agila team och bidra till skalbara och användarvänliga digitala lösningar.'
        ]
      ],
      labels: [
        ['Key Competencies', 'Nyckelkompetenser'],
        ['Technical Skills', 'Tekniska kompetenser'],
        ['Design & UX', 'Design & UX'],
        ['Web & UI/UX', 'Webb & UI/UX'],
        ['Other', 'Övrigt'],
        ['Core Focus', 'Fokusområden'],
        ['Find Me Online', 'Hitta mig online']
      ]
    },
    projects: {
      title: ['Projects', 'Projekt'],
      desc: [
        'Full-stack applications, REST APIs, secure systems and frontend experiments built during studies and personal projects.',
        'Fullstackapplikationer, REST API:er, säkra system och frontendexperiment från studier och egna projekt.'
      ],
      all: ['All Projects', 'Alla projekt'],
      filters: [
        ['All', 'Alla'],
        ['Frontend', 'Frontend'],
        ['Backend', 'Backend'],
        ['Full Stack', 'Fullstack']
      ],
      cards: [
        [
          'Hair Salon Booking System: An online platform for clients to book appointments and for salons to manage schedules and services.',
          'Bokningssystem för frisörsalong: En plattform där kunder kan boka tider och salonger hantera scheman och tjänster.'
        ],
        [
          'Cocktail information website fetching data from an API using vanilla JavaScript and Bulma CSS.',
          'Cocktailsida som hämtar data från ett API med vanilla JavaScript och Bulma CSS.'
        ],
        [
          'School project built with Spring Boot and JPA.',
          'Skolprojekt byggt med Spring Boot och JPA.'
        ],
        [
          'School project – REST API & database integration.',
          'Skolprojekt – REST API och databasintegration.'
        ],
        [
          'School project focused on authentication & authorization.',
          'Skolprojekt med fokus på autentisering och behörighet.'
        ],
        [
          'Full-stack football club platform for FBK Balkan, featuring player management, match scheduling, and club information.',
          'Fullstackplattform för fotbollsklubben FBK Balkan med spelarhantering, matchplanering och klubbinfo.'
        ]
      ]
    },
    skills: {
      title: ['Technical Skills', 'Tekniska kompetenser'],
      desc: [
        'Core competencies in full-stack development, modern web technologies, databases and development tools – based on Yrkeshögskoleexamen from Teknikhögskolan (410 YH-poäng).',
        'Centrala kompetenser inom fullstackutveckling, modern webbteknik, databaser och utvecklingsverktyg – baserat på yrkeshögskoleexamen från Teknikhögskolan (410 YH-poäng).'
      ],
      categories: [
        ['Frontend', 'Frontend'],
        ['Backend', 'Backend'],
        ['Databases', 'Databaser'],
        ['Tools & DevOps', 'Verktyg & DevOps']
      ],
      levels: {
        Average: 'Genomsnittlig',
        Intermediate: 'Mellanliggande',
        Advanced: 'Avancerad',
        Expert: 'Expert'
      }
    }
  }
};

/* ────────────────────────────────────────────────
   Theme & Language
   ──────────────────────────────────────────────── */
function initPreferences() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  const initialTheme =
    savedTheme ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const savedLanguage = localStorage.getItem('portfolio-language');
  const initialLanguage =
    savedLanguage ||
    (navigator.language.toLowerCase().startsWith('sv') ? 'sv' : 'en');

  applyTheme(initialTheme);
  applyLanguage(initialLanguage);

  // Theme toggle
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(current);
  });

  // Language select
  document.getElementById('language-select')?.addEventListener('change', event => {
    applyLanguage(event.target.value);
  });

  // Listen to system preference change (only if user hasn't chosen a theme)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('portfolio-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('portfolio-theme', theme);

  // Update theme-color meta
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#171614' : '#faf8f5');

  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const dark = theme === 'dark';
  const lang = localStorage.getItem('portfolio-language') || 'en';
  const labels = translations[lang] || translations.en;

  toggle.setAttribute('aria-pressed', String(dark));
  toggle.setAttribute('aria-label', dark ? labels.themeLight : labels.themeDark);

  const icon = toggle.querySelector('.theme-toggle__icon');
  const label = toggle.querySelector('.theme-toggle__label');

  if (icon) icon.textContent = dark ? '☀' : '☾';
  if (label) label.textContent = dark ? labels.themeLight : labels.themeDark;
}

function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  const page = getCurrentPage();

  document.documentElement.lang = lang;
  localStorage.setItem('portfolio-language', lang);

  // Document title
  const pageTitles = {
    home: ['KHALED IBRAHIM | Creative Portfolio', 'KHALED IBRAHIM | Kreativ portfolio'],
    about: ['About | KHALED IBRAHIM', 'Om mig | KHALED IBRAHIM'],
    projects: ['KHALED IBRAHIM | Projects', 'KHALED IBRAHIM | Projekt'],
    skills: ['KHALED IBRAHIM | Skills', 'KHALED IBRAHIM | Kompetenser']
  };

  if (pageTitles[page]) {
    document.title = pageTitles[page][lang === 'sv' ? 1 : 0];
  }

  // Language select
  const select = document.getElementById('language-select');
  if (select) select.value = lang;

  document
    .querySelector('.language-select select')
    ?.setAttribute('aria-label', t.language);

  // Hamburger aria-label
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-label', isOpen ? t.menuClose : t.menuOpen);
  }

  // Navigation links
  document.querySelectorAll('.nav-desktop a, .mobile-menu__list a').forEach((el, i) => {
    if (t.nav[i]) el.textContent = t.nav[i];
  });

  document.querySelectorAll('.footer__nav a').forEach((el, i) => {
    if (t.nav[i]) el.textContent = t.nav[i];
  });

  // Footer tagline
  document.querySelectorAll('.footer__tagline').forEach(el => {
    el.textContent = t.home.tagline;
  });

  // Footer copyright
  const copyEl = document.querySelector('.footer__copy');
  if (copyEl) {
    const year =
      document.getElementById('current-year')?.textContent ||
      new Date().getFullYear();
    copyEl.innerHTML = `© <span id="current-year">${year}</span> KHALED IBRAHIM. ${t.home.rights}`;
  }

  // Page-specific content
  const p = translations.pages[page];

  if (page === 'home') {
    setMarkup(
      '.hero__title',
      lang === 'sv' ? 'Hej, jag är<br>KHALED IBRAHIM' : "Hi, I'm<br>KHALED IBRAHIM"
    );
    setText('.hero-subtitle', t.home.subtitle);
    setText('.hero__desc', t.home.desc);
    setText('.hero__actions .btn--primary', t.home.viewProjects);
    setText('.hero__actions .btn--outline', t.home.aboutMe);
    setText('.featured__title', t.home.featured);
    setText('.featured__link', t.home.viewAll, true);
    setText('.support__title', t.home.work);
    setText('.support__desc', t.home.workDesc);
    setText('.support__btn', t.home.contact);
    setText('.project-card:nth-child(1) .product-card__desc', t.home.salon);
    setText('.project-card:nth-child(2) .product-card__desc', t.home.balkan);
    setText('.project-card:nth-child(3) .product-card__desc', t.home.library);
  } else if (p) {
    // Title
    setText(
      '.page-header__title, .about-section .page-header__title',
      p.title?.[lang === 'sv' ? 1 : 0]
    );

    // Description
    setText('.page-header__desc', p.desc?.[lang === 'sv' ? 1 : 0]);

    // About paragraphs
    if (p.paragraphs) {
      document.querySelectorAll('.about__bio > p').forEach((el, i) => {
        if (p.paragraphs[i]) {
          el.textContent = p.paragraphs[i][lang === 'sv' ? 1 : 0];
        }
      });
    }

    // About labels
    if (p.labels) {
      document.querySelectorAll('.about__label').forEach((el, i) => {
        if (p.labels[i]) {
          el.textContent = p.labels[i][lang === 'sv' ? 1 : 0];
        }
      });
    }

    // Projects page – "All Projects"
    if (p.all) {
      setText('.featured__title', p.all[lang === 'sv' ? 1 : 0]);
    }

    // Filter buttons
    if (p.filters) {
      document.querySelectorAll('.filter-btn').forEach((el, i) => {
        if (p.filters[i]) {
          el.textContent = p.filters[i][lang === 'sv' ? 1 : 0];
        }
      });
    }

    // Project card descriptions
    if (p.cards) {
      document.querySelectorAll('.project-card .product-card__desc').forEach((el, i) => {
        if (p.cards[i]) {
          el.textContent = p.cards[i][lang === 'sv' ? 1 : 0];
        }
      });
    }

    // Skills categories
    if (p.categories) {
      document.querySelectorAll('.category-title').forEach((el, i) => {
        if (p.categories[i]) {
          el.textContent = p.categories[i][lang === 'sv' ? 1 : 0];
        }
      });
    }

    // Skill levels
    if (p.levels) {
      document.querySelectorAll('.skill-level').forEach(el => {
        if (!el.dataset.enLevel) {
          el.dataset.enLevel = el.textContent.trim();
        }
        el.textContent =
          lang === 'sv'
            ? p.levels[el.dataset.enLevel] || el.dataset.enLevel
            : el.dataset.enLevel;
      });
    }
  }

  // Re-apply theme labels with the new language
  applyTheme(localStorage.getItem('portfolio-theme') || 'light');
}

/* ────────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────────── */
function getCurrentPage() {
  const path = location.pathname.split('/').pop() || '';
  const name = path.replace('.html', '') || 'index';
  return name === 'index' ? 'home' : name;
}

function setText(selector, value, preserveChildren = false) {
  const el = document.querySelector(selector);
  if (!el || value == null) return;

  if (preserveChildren) {
    const textNode = [...el.childNodes].find(node => node.nodeType === Node.TEXT_NODE);
    if (textNode) {
      textNode.textContent = value;
    } else {
      el.prepend(document.createTextNode(value));
    }
  } else {
    el.textContent = value;
  }
}

function setMarkup(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.innerHTML = value;
}

/* ────────────────────────────────────────────────
   Navigation highlight
   ──────────────────────────────────────────────── */
function highlightActiveNav() {
  const currentFile = location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-desktop a, .mobile-menu__list a').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === currentFile);
  });
}

/* ────────────────────────────────────────────────
   Featured cards click (home page)
   ──────────────────────────────────────────────── */
function initFeaturedCardClick() {
  document.querySelectorAll('.featured .project-card').forEach(card => {
    card.style.cursor = 'pointer';

    card.addEventListener('click', e => {
      // Don't redirect if user clicked a real link (GitHub etc.)
      if (e.target.closest('a')) return;
      location.href = 'projects.html';
    });

    // Keyboard support
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!e.target.closest('a')) {
          location.href = 'projects.html';
        }
      }
    });
  });
}

/* ────────────────────────────────────────────────
   Skill bars animation
   ──────────────────────────────────────────────── */
function animateSkillBars() {
  const section = document.querySelector('.skills-section');
  if (!section) return;

  const bars = document.querySelectorAll('.skill-progress');

  const observer = new IntersectionObserver(
    entries => {
      if (!entries[0].isIntersecting) return;

      bars.forEach(bar => {
        const target = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = target;
        }, 100);
      });

      observer.disconnect();
    },
    { threshold: 0.2 }
  );

  observer.observe(section);
}

/* ────────────────────────────────────────────────
   Project filters
   ──────────────────────────────────────────────── */
function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = (btn.dataset.filter || 'all').toLowerCase();

      document.querySelectorAll('.project-card').forEach(card => {
        const category = (card.dataset.category || '').toLowerCase();
        card.style.display =
          filter === 'all' || category === filter ? '' : 'none';
      });
    });
  });
}

/* ────────────────────────────────────────────────
   Footer year
   ──────────────────────────────────────────────── */
const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}