/* ============================================================
   DON BOSCO SKILL MISSION — COMIC THEME JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Smooth Scroll Navigation ───────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      const navHeight = document.getElementById('navbar').offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({ top: targetPos, behavior: 'smooth' });

      // Close mobile menu if open
      const navLinks = document.getElementById('nav-links');
      const navToggle = document.getElementById('nav-toggle');
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });


  // ── Mobile Hamburger Menu Toggle ───────────────────────────
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });


  // ── Sticky Nav Scroll Effect ───────────────────────────────
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });


  // ── Active Nav Link Highlighting ───────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinksAll.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav(); // Initial call


  // ── Scroll-Triggered Reveal Animations ─────────────────────
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ── Program Card Search / Filter ───────────────────────────
  const searchInput = document.getElementById('program-search');
  const programCards = document.querySelectorAll('.program-card');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      programCards.forEach(card => {
        const category = (card.getAttribute('data-category') || '').toLowerCase();
        const title = (card.querySelector('.program-card-title')?.textContent || '').toLowerCase();
        const subtitle = (card.querySelector('.program-card-subtitle')?.textContent || '').toLowerCase();
        const desc = (card.querySelector('.program-card-desc')?.textContent || '').toLowerCase();

        const matches = !query ||
          category.includes(query) ||
          title.includes(query) ||
          subtitle.includes(query) ||
          desc.includes(query);

        card.classList.toggle('hidden', !matches);
      });
    });
  }


  // ── Enquiry Form Handler (mailto) ──────────────────────────
  const enquiryForm = document.getElementById('enquiry-form');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('enquiry-name').value;
      const phone = document.getElementById('enquiry-phone').value;
      const email = document.getElementById('enquiry-email').value;
      const program = document.getElementById('enquiry-program').value;
      const message = document.getElementById('enquiry-message').value;

      const subject = encodeURIComponent(`DBSM Enquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Email: ${email}\n` +
        `Program of Interest: ${program || 'Not specified'}\n` +
        `\nMessage:\n${message || 'No additional message.'}`
      );

      window.location.href = `mailto:director.dbsm@dbtech.co.in?subject=${subject}&body=${body}`;
    });
  }


  // ── Hero Scroll Indicator Click ────────────────────────────
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPos = aboutSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
    scrollIndicator.style.cursor = 'pointer';
  }

});


// ── Program Card Expand / Collapse ─────────────────────────
function toggleCard(infoId, button) {
  const info = document.getElementById(infoId);
  if (!info) return;

  const isExpanded = info.classList.toggle('expanded');
  button.classList.toggle('open', isExpanded);
  button.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');

  // Update button text
  const toggleIcon = button.querySelector('.toggle-icon');
  if (toggleIcon) {
    toggleIcon.textContent = isExpanded ? '▲' : '▼';
  }
}
