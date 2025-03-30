document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.md\\:hidden.p-2');
    const mobileMenu = document.querySelector('.md\\:hidden.hidden.pt-4');
    
    menuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('active');
    });
  });
  var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');


