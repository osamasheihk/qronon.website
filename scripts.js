// script.js
function showTab(tabId) {
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`button[onclick="showTab('${tabId}')"]`).classList.add('active');
  }

document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.desktop-nav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.desktop-nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = nav.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnToggle && nav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  }
});


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