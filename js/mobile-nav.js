// Mobile Navigation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    const body = document.body;
    
    // Create mobile overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    body.appendChild(overlay);
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileToggle.classList.toggle('active');
        mainMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = mainMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileToggle.classList.remove('active');
        mainMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }
    
    // Event listeners
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when clicking on menu links
    const menuLinks = document.querySelectorAll('.main-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only close menu if it's a navigation link (not a button)
            if (!this.querySelector('button') && window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
    
    // Close menu on window resize if desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});

// Dark mode toggle function (enhanced for mobile)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    const originalPrices = document.querySelectorAll('.original-price');
    const prices = document.querySelectorAll('.price');
    const discountedPrices = document.querySelectorAll('.discounted-price');
    const priceContainers = document.querySelectorAll('.price-container');
    const categoryname = document.querySelectorAll('.category-name');
    const footer = document.querySelectorAll('.footer-bottom');
    const footerText = document.querySelectorAll('.footer-text');
    const footerLinks = document.querySelectorAll('.footer-link');
    const footerIcons = document.querySelectorAll('.footer-icon');
    const footerLogo = document.querySelector('.footer-logo');
    const headline = document.querySelector('.testimonial-heading1');
    const mobileMenu = document.querySelector('.main-menu');
    
    if (document.body.classList.contains('dark-mode')) {
        originalPrices.forEach(element => element.style.color = 'white');
        prices.forEach(element => element.style.color = 'white');
        discountedPrices.forEach(element => element.style.color = 'white');
        priceContainers.forEach(element => element.style.color = 'white');
        categoryname.forEach(element => element.style.color = 'white');
        footer.forEach(element => element.style.backgroundColor = 'white');
        footer.forEach(element => element.style.color = 'white');
        footerText.forEach(element => element.style.color = 'black');
        headline.forEach(element => element.style.color = 'white');
        
        // Dark mode for mobile menu
        if (mobileMenu) {
            mobileMenu.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
        }
    } else {
        originalPrices.forEach(element => element.style.color = '');
        prices.forEach(element => element.style.color = '');
        discountedPrices.forEach(element => element.style.color = '');
        priceContainers.forEach(element => element.style.color = '');
        categoryname.forEach(element => element.style.color = '');
        footer.forEach(element => element.style.backgroundColor = '');
        footer.forEach(element => element.style.color = '');
        headline.forEach(element => element.style.color = '');
        
        // Light mode for mobile menu
        if (mobileMenu) {
            mobileMenu.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)';
        }
    }
}

function logoutbtn() {
    window.location.href = "index.html";
}