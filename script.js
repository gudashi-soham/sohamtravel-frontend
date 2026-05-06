/* ============================================
   SOHAM TRAVEL AGENCY — script.js
   ============================================ */

/**
 * toggleDetail(id)
 * Opens or closes a destination detail panel.
 * If the same card is clicked again, it closes the panel.
 * Scrolls the panel into view when opened.
 *
 * @param {string} id - destination key e.g. 'kyoto', 'santorini'
 */
function toggleDetail(id) {
  const allPanels = document.querySelectorAll('.dest-detail');
  const target    = document.getElementById('detail-' + id);

  if (!target) return;

  const isAlreadyOpen = target.classList.contains('active');

  // Close all panels first
  allPanels.forEach(function(panel) {
    panel.classList.remove('active');
  });

  // If it wasn't open, open it and scroll to it
  if (!isAlreadyOpen) {
    target.classList.add('active');
    setTimeout(function() {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}


/**
 * submitBooking()
 * Validates the booking form fields.
 * Shows a success message if all required fields are filled.
 * Disables the submit button after successful submission.
 */
function submitBooking() {
  var fname = document.getElementById('fname').value.trim();
  var email = document.getElementById('email').value.trim();
  var dest  = document.getElementById('dest').value;

  // Basic validation
  if (!fname || !email || !dest) {
    alert('Please fill in your name, email address, and choose a destination.');
    return;
  }

  // Email format check
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Show success message
  var successMsg = document.getElementById('success');
  successMsg.style.display = 'block';

  // Disable button to prevent duplicate submissions
  var btn = document.querySelector('.submit-btn');
  btn.disabled = true;
  btn.style.opacity = '0.4';
  btn.style.cursor  = 'not-allowed';

  // Scroll success message into view
  successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


/**
 * Scroll-reveal animation using IntersectionObserver.
 * Destination cards and why-cards fade in when they enter the viewport.
 */
document.addEventListener('DOMContentLoaded', function() {

  var revealElements = document.querySelectorAll('.dest-card, .why-card');

  // Set initial invisible state
  revealElements.forEach(function(el) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.6s ease';
  });

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(function(el) {
    observer.observe(el);
  });

});