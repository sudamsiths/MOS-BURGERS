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
// Add this script to your HTML file or in a separate JS file
document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  
  // Check if there's a saved preference in localStorage
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }
  
  // Add click event listener to the toggle button
  darkModeToggle.addEventListener('click', function() {
    // Toggle dark-mode class on the body
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
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
