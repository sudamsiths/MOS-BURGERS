const categories = {
    beverage: { items: [], nextId: 1 },
    burger: { items: [], nextId: 1 },
    chicken: { items: [], nextId: 1 },
    fries: { items: [], nextId: 1 },
    pasta: { items: [], nextId: 1 },
    submarines: { items: [], nextId: 1 }
};

document.addEventListener('DOMContentLoaded', function() {
    setupTabSwitching();
    setupFormHandlers();
    setupImageHandlers();
    updateAllIdDisplays();
});

// Setup tab switching functionality - FIXED VERSION
function setupTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const formSections = document.querySelectorAll('.form-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetCategory = this.dataset.category;
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all form sections
            formSections.forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            
            // Show target form section
            const targetSection = document.getElementById(targetCategory + '-form');
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.style.display = 'block';
            }
        });
    });
}

