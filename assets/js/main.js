// Main JavaScript for portfolio site

// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const navOverlay = document.querySelector('.nav-overlay');
const body = document.body;

if (navToggle && mainNav && navOverlay) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
  });

  navOverlay.addEventListener('click', () => {
    navToggle.classList.remove('active');
    mainNav.classList.remove('active');
    navOverlay.classList.remove('active');
    body.style.overflow = '';
  });

  // Close menu when clicking a nav link
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mainNav.classList.remove('active');
      navOverlay.classList.remove('active');
      body.style.overflow = '';
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
      navToggle.classList.remove('active');
      mainNav.classList.remove('active');
      navOverlay.classList.remove('active');
      body.style.overflow = '';
    }
  });
}

// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle-btn');
const html = document.documentElement;

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Active Navigation Highlighting
function setActiveNav() {
  const navLinks = document.querySelectorAll('.nav-menu a');
  const currentPath = window.location.pathname;
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const linkPath = new URL(link.href).pathname;
    
    if (currentPath === linkPath || 
        (currentPath === '/' && linkPath === '/') ||
        (currentPath.startsWith('/blog') && linkPath.includes('/blog'))) {
      link.classList.add('active');
    }
  });
}

// Set active nav on page load
setActiveNav();

// Lazy Loading Images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
        }
        
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px'
  });

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Form Handling
const contactForms = document.querySelectorAll('.contact-form form');

contactForms.forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.form-button');
    const statusDiv = form.querySelector('.form-status') || createStatusDiv(form);
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        statusDiv.textContent = 'Thank you! Your message has been sent successfully.';
        statusDiv.className = 'form-status success';
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      statusDiv.textContent = 'Oops! There was a problem sending your message. Please try again.';
      statusDiv.className = 'form-status error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      
      // Hide status after 5 seconds
      setTimeout(() => {
        statusDiv.textContent = '';
        statusDiv.className = 'form-status';
      }, 5000);
    }
  });
});

function createStatusDiv(form) {
  const statusDiv = document.createElement('div');
  statusDiv.className = 'form-status';
  form.appendChild(statusDiv);
  return statusDiv;
}

// Fade in on scroll
const fadeElements = document.querySelectorAll('.fade-in');

if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  fadeElements.forEach(el => fadeObserver.observe(el));
}
