// Optimized script.js
(function() {
  'use strict';

  // Cache DOM elements
  const yearSpan = document.getElementById("year");
  const video = document.querySelector('.bg-video, .qronon-hero__video');
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
    const animatedElements = document.querySelectorAll('.section, .contact-container, .home-reveal');
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
      const isOpen = menuToggle.classList.toggle('active');
      nav.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    };

    const closeMenu = () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
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

})();
