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
});

function setupTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const formSections = document.querySelectorAll('.form-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetCategory = this.dataset.category;
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            this.classList.add('active');
            
            formSections.forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            
            const targetSection = document.getElementById(targetCategory + '-form');
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.style.display = 'block';
            }
        });
    });
}
function AddBeverage(event) {
    event.preventDefault();
    const Title = document.getElementById("beverage-title");
    const price = document.getElementById("beverage-price");
    const description = document.getElementById("beverage-description");
    const image = document.getElementById("beverage-image-url");

    const request = {
        "title": Title.value,
        "price": parseFloat(price.value),
        "description": description.value,
        "imageUrl": image.value
    };

    fetch("http://localhost:8080/beverage/add", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {"Content-Type": "application/json"}
    })
    .then(response => response.ok ? 
        (alert("Beverage added successfully!"), clearForm('beverage')) : 
        Promise.reject("Failed to add beverage"))
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong while adding the beverage.");
    });
}

function AddBurger(event) {
    event.preventDefault();
    const Title = document.getElementById("burger-title");
    const price = document.getElementById("burger-price");
    const description = document.getElementById("burger-description");
    const image = document.getElementById("burger-image-url");

    const request = {
        "title": Title.value,
        "price": parseFloat(price.value),
        "description": description.value,
        "imageUrl": image.value
    };

    fetch("http://localhost:8080/burger/add", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {"Content-Type": "application/json"}
    })
    .then(response => response.ok ? 
        (alert("Burger added successfully!"), clearForm('burger')) : 
        Promise.reject("Failed to add Burger"))
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong while adding the Burger.");
    });
}
function AddChicken(event) {
    event.preventDefault();
    const Title = document.getElementById("chicken-title");
    const price = document.getElementById("chicken-price");
    const description = document.getElementById("chicken-description");
    const image = document.getElementById("chicken-image-url");

    const request = {
        "title": Title.value,
        "price": parseFloat(price.value),
        "description": description.value,
        "imageUrl": image.value
    };

    fetch("http://localhost:8080/chicken/add", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {"Content-Type": "application/json"}
    })
    .then(response => response.ok ? 
        (alert("Chicken added successfully!"), clearForm('chicken')) : 
        Promise.reject("Failed to add chicken"))
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong while adding the Burger.");
    });
}
function AddFries(event) {
    event.preventDefault();
    const Title = document.getElementById("fries-title");
    const price = document.getElementById("fries-price");
    const description = document.getElementById("fries-description");
    const image = document.getElementById("fries-image-url");

    const request = {
        "title": Title.value,
        "price": parseFloat(price.value),
        "description": description.value,
        "imageUrl": image.value
    };

    fetch("http://localhost:8080/fries/add", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {"Content-Type": "application/json"}
    })
    .then(response => response.ok ? 
        (alert("Fries added successfully!"), clearForm('fries')) : 
        Promise.reject("Failed to add fries"))
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong while adding the Fries.");
    });
}
function AddPasta(event) {
    event.preventDefault();
    const Title = document.getElementById("pasta-title");
    const price = document.getElementById("pasta-price");
    const description = document.getElementById("pasta-description");
    const image = document.getElementById("pasta-image-url");

    const request = {
        "title": Title.value,
        "price": parseFloat(price.value),
        "description": description.value,
        "imageUrl": image.value
    };

    fetch("http://localhost:8080/pasta/add", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {"Content-Type": "application/json"}
    })
    .then(response => response.ok ? 
        (alert("Pasta added successfully!"), clearForm('pasta')) : 
        Promise.reject("Failed to add Pasta"))
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong while adding the Pasta.");
    });
}
function AddSubmarine(event) {
    event.preventDefault();
    const Title = document.getElementById("submarine-title");
    const price = document.getElementById("submarine-price");
    const description = document.getElementById("submarine-description");
    const image = document.getElementById("submarine-image-url");

    const request = {
        "title": Title.value,
        "price": parseFloat(price.value),
        "description": description.value,
        "imageUrl": image.value
    };

    fetch("http://localhost:8080/submarines/add", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {"Content-Type": "application/json"}
    })
    .then(response => response.ok ? 
        (alert("Submarine added successfully!"), clearForm('submarine')) : 
        Promise.reject("Failed to add submarine"))
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong while adding the submarine.");
    });
}

function clearForm(formType) {
    document.getElementById(`${formType}-title`).value = '';
    document.getElementById(`${formType}-price`).value = '';
    document.getElementById(`${formType}-description`).value = '';
    document.getElementById(`${formType}-image-url`).value = '';
    const preview = document.getElementById(`${formType}-image-preview`);
    if (preview) preview.src = '';
}