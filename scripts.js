// Optimized script.js
(function() {
  'use strict';

  // Cache DOM elements
  const body = document.body;
  const yearSpan = document.getElementById("year");
  const video = document.querySelector('.bg-video');
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.desktop-nav');

  // Set current year
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Optimized video autoplay
  if (video) {
    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked, try on first user interaction
          const startVideo = () => {
            video.play();
            document.removeEventListener('click', startVideo);
            document.removeEventListener('touchstart', startVideo);
          };
          document.addEventListener('click', startVideo, { passive: true });
          document.addEventListener('touchstart', startVideo, { passive: true });
        });
      }
    };

    const onVideoLoaded = () => {
      video.classList.add('loaded');
      playVideo();
    };

    if (video.readyState >= 3) {
      onVideoLoaded();
    } else {
      video.addEventListener('loadeddata', onVideoLoaded, { once: true });
    }
  }

  // Optimized scroll reveal with Intersection Observer
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target); // Stop observing once revealed
        }
      });
    }, observerOptions);

    // Initialize scroll animations
    const animatedElements = document.querySelectorAll('.section, .contact-container');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      observer.observe(el);
    });
  }

  // Mobile menu handling
  if (menuToggle && nav) {
    const toggleMenu = () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
    };

    const closeMenu = () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
    };

    // Toggle on button click
    menuToggle.addEventListener('click', toggleMenu);

    // Close when clicking nav links
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu, { passive: true });
    });

    // Close when clicking outside (using event delegation)
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('active') && 
          !nav.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        closeMenu();
      }
    }, { passive: true });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // Tab switching function (if needed)
  window.showTab = function(tabId) {
    const sections = document.querySelectorAll('.section');
    const buttons = document.querySelectorAll('.tab-button');
    const targetSection = document.getElementById(tabId);
    
    if (targetSection) {
      sections.forEach(section => section.classList.remove('active'));
      buttons.forEach(btn => btn.classList.remove('active'));
      targetSection.classList.add('active');
      
      const targetButton = document.querySelector(`button[onclick="showTab('${tabId}')"]`);
      if (targetButton) targetButton.classList.add('active');
    }
  };

})();


// function to load header and footer automatically
function loadPart(id, file) {
  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${file}`);
      return res.text();
    })
    .then(html => {
      document.getElementById(id).innerHTML = html;

      // If it's the footer, also update the year
      if (file === 'footer.html') {
        const year = new Date().getFullYear();
        const yearEl = document.getElementById("year");
        if (yearEl) yearEl.textContent = year;
      }
    })
    .catch(err => console.error(err));
}

document.addEventListener("DOMContentLoaded", () => {
  loadPart("header-placeholder", "header.html");
  loadPart("footer-placeholder", "footer.html");
});