document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.querySelector('.md\\:hidden.p-2');
  const mobileMenu = document.querySelector('.md\\:hidden.hidden.pt-4');

  menuButton.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('active');
  });
});
var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
document.addEventListener('DOMContentLoaded', function () {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');

  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }
  });
});
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
lightGallery(document.getElementById('lg-srcset-demo'));
    document.getElementById('newsletter-form').addEventListener('submit', function (event) {
      event.preventDefault();

      const email = document.getElementById('email-address').value;
      const successMessage = document.getElementById('success-message');

      if (email) {
        successMessage.style.display = 'flex';

        document.getElementById('email-address').value = '';

        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 5000);
      }
    });

    document.getElementById('close-btn').addEventListener('click', function () {
      document.getElementById('success-message').style.display = 'none';
    });