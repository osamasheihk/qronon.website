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