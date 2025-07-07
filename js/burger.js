let cart = [];
let couponDiscount = 0;
const handlingFee = 50.00;

function setupAddButtons() {
    const addButtons = document.querySelectorAll('.add-btn');

    addButtons.forEach(button => {
        button.removeEventListener('click', handleAddButtonClick);
        button.addEventListener('click', handleAddButtonClick);
    });
}

function handleAddButtonClick() {
    const menuItemCard = this.closest('.menu-item-card');
    const name = menuItemCard.querySelector('.menu-item-name').textContent;
    const code = name;
    const priceText = menuItemCard.querySelector('.menu-item-price').textContent;

    const priceMatch = priceText.match(/රු\.(\d+(?:,\d+)*(?:\.\d+)?)/);
    const price = priceMatch ? parseFloat(priceMatch[1].replace(/,/g, '')) : 0;

    const discountElement = menuItemCard.querySelector('.menu-item-discount');
    let discountPercent = 0;
    if (discountElement) {
        const discountMatch = discountElement.textContent.match(/(\d+)%/);
        discountPercent = discountMatch ? parseInt(discountMatch[1]) : 0;
    }

    const finalPrice = price - (price * discountPercent / 100);

    addToCart(name, code, finalPrice, price, discountPercent);
}

function addToCart(name, code, price, originalPrice, discount) {
    let existingItem = cart.find(item => item.code === code);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            code: code,
            price: price,
            originalPrice: originalPrice,
            discount: discount,
            quantity: 1
        });
    }

    updateCartDisplay();
    updateTotals();
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-products');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="empty-cart">Your cart is empty. Add items from the menu!</div>';
        return;
    }

    let html = '';
    cart.forEach((item, index) => {
        html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-code">${item.code}</div>
                        ${item.discount > 0 ? `<div class="cart-item-discount">${item.discount}% OFF</div>` : ''}
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" onclick="changeQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                    <div class="cart-item-price">රු.${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="remove-btn" onclick="removeItem(${index})">x</button>
                </div>
                `;
    });

    cartContainer.innerHTML = html;
}

function changeQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCartDisplay();
    updateTotals();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    updateTotals();
}

function calculateSubtotal() {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    return subtotal;
}

function updateTotals() {
    const subtotal = calculateSubtotal();
    const couponDiscountAmount = subtotal * (couponDiscount / 100);
    const total = subtotal - couponDiscountAmount + handlingFee;

    document.getElementById('subtotal').textContent = 'රු.' + subtotal.toFixed(2);
    document.getElementById('coupon-discount').textContent = 'රු.' + couponDiscountAmount.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

function applyCoupon() {
    const couponInput = document.getElementById('coupon-input').value.trim();
    if (couponInput === 'DISCOUNT10') {
        couponDiscount = 10; 
        alert('Coupon "DISCOUNT10" applied successfully! You get 10% off.');
    } else if (couponInput === 'SAVE20') {
        couponDiscount = 20; 
        alert('Coupon "SAVE20" applied successfully! You get 20% off.');
    } else {
        couponDiscount = 0;
        alert('Invalid or expired coupon.');
    }
    updateTotals();
}


function getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    month = month.toString().length == 1 ? '0' + month : month;
    day = day.toString().length == 1 ? '0' + day : day;
    hour = hour.toString().length == 1 ? '0' + hour : hour;
    minute = minute.toString().length == 1 ? '0' + minute : minute;
    second = second.toString().length == 1 ? '0' + second : second;
    var dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    document.getElementById("digital-clock").innerHTML = dateTime;
}


async function fetchMenuItems(url, elementId, isSearch = false) {
    const menuContainer = document.getElementById(elementId);
    let body = "";
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Response Received for ${elementId}:`, data);

        if (data.length === 0 && isSearch) {
            menuContainer.innerHTML = `<div class="empty-menu">No results found for your search.</div>`;
            return;
        }
        
        const itemsToDisplay = Array.isArray(data) ? data : [data];

        itemsToDisplay.forEach(element => {
            body += `
                    <div class="menu-item-card">
                        <div class="menu-item-details">
                            <center><div class="menu-item-name">${element.title}</div></center>
                            <center><div class="menu-item-image">
                                <img src="${element.imageUrl}" alt="${element.title}" class="menu-img"/>
                            </div></center>
                        </div>
                        <center><div class="menu-item-price">රු.${element.price.toFixed(2)}</div></center>
                        <center><button class="add-btn">Add</button></center>
                    </div>
                    `;
        });
        menuContainer.innerHTML = body;
        setupAddButtons();
    } catch (error) {
        console.error(`Error fetching ${elementId}:`, error);
        menuContainer.innerHTML = `<div class="empty-menu">Failed to load ${elementId}. Please try again later.</div>`;
    }
}

function getAllBurgers() {
    fetchMenuItems("http://localhost:8080/burger/getAll", "menu-burgers");
}
function getFrenchFries() {
    fetchMenuItems("http://localhost:8080/fries/getAll", "menu-french-fries");
}
function getAllSubmariens() {
    fetchMenuItems("http://localhost:8080/submarines/getAll", "menu-submariens");
}
function getAllPasta() {
    fetchMenuItems("http://localhost:8080/pasta/getAll", "menu-pasta");
}
function getAllChicken() {
    fetchMenuItems("http://localhost:8080/chicken/getAll", "menu-chicken");
}
function getAllBeverages() {
    fetchMenuItems("http://localhost:8080/beverage/getAll", "menu-beverages");
}


async function SearchItems(event) {
    if (event.key === "Enter" || event.type === "click") {
        const searchTerm = document.querySelector('.search-input').value.trim();
        if (searchTerm) {
            const categories = [
                { url: "http://localhost:8080/burger/search/", elementId: "menu-burgers" },
                { url: "http://localhost:8080/fries/search/", elementId: "menu-french-fries" },
                { url: "http://localhost:8080/submarines/search/", elementId: "menu-submariens" },
                { url: "http://localhost:8080/pasta/search/", elementId: "menu-pasta" },
                { url: "http://localhost:8080/chicken/search/", elementId: "menu-chicken" },
                { url: "http://localhost:8080/beverage/search/", elementId: "menu-beverages" }
            ];

            let foundResults = false;
            for (const category of categories) {
                const searchUrl = `${category.url}${encodeURIComponent(searchTerm)}`;
                const menuContainer = document.getElementById(category.elementId);
                menuContainer.innerHTML = '';

                try {
                    const response = await fetch(searchUrl, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)) {
                            foundResults = true;
                            let body = '';
                            const itemsToDisplay = Array.isArray(data) ? data : [data];
                            itemsToDisplay.forEach(element => {
                                body += `
                                    <div class="menu-item-card">
                                        <div class="menu-item-details">
                                            <center><div class="menu-item-name">${element.title}</div></center>
                                            <center><div class="menu-item-image">
                                                <img src="${element.imageUrl}" alt="${element.title}" class="menu-img"/>
                                            </div></center>
                                        </div>
                                        <center><div class="menu-item-price">රු.${element.price.toFixed(2)}</div></center>
                                        <center><button class="add-btn">Add</button></center>
                                    </div>
                                `;
                            });
                            menuContainer.innerHTML = body;
                            setupAddButtons(); 
                        }
                    } else {
                        console.warn(`No results or error for ${category.elementId} with search term "${searchTerm}": Status ${response.status}`);
                    }
                } catch (error) {
                    console.error(`Error searching in ${category.elementId}:`, error);
                }
            }

            if (!foundResults) {
                categories.forEach(category => {
                    document.getElementById(category.elementId).innerHTML = `<div class="empty-menu">No matching items found in this category.</div>`;
                });
            }
        } else {
            getAllBurgers();
            getFrenchFries();
            getAllSubmariens();
            getAllPasta();
            getAllChicken();
            getAllBeverages();
        }
    }
}
function dialogonclick() {
    console.log("Hello");
    let dialog = document.getElementById("container02");
    dialog.showModal();
}
function registerCustomer(){
    let name = document.getElementById("customer-name");
    let phone = document.getElementById("customer-number");
    let email = document.getElementById("customer-email");

       const request = {
        "name": name.value,
        "email":email.value,
        "phoneNumber": phone.value,
    };

    fetch("http://localhost:8080/customer/add", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {"Content-Type": "application/json"}
    })
        .then(response => {
            if (response.ok) {
                alert("Customer registered successfully!");
                name.value = '';
                phone.value = '';
                email.value = '';
            } else {
                throw new Error("Failed to register customer");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Something went wrong while registering the customer.");
        });
        document.getElementById("container02").close();
}

function searchCustomer(){

    let phone = document.getElementById("customer-phoneenterd").value.trim();
    document.getElementById("customer-nameenterd").value = '';
    document.getElementById("customer-emailenterd").value = '';

    if (!phone) {
        alert("Please enter a phone number to search.");
        return;
    }

    fetch(`http://localhost:8080/customer/search/${encodeURIComponent(phone)}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 404) {
            throw new Error("Customer not found.");
        } else {
            throw new Error(`Failed to fetch customer: ${response.status} ${response.statusText}`);
        }
    })
    .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            const customer = data[0]; 
            document.getElementById("customer-nameenterd").value = customer.name;
            document.getElementById("customer-emailenterd").value = customer.email;
            alert("Customer found!"); 
        } else {
            alert("Customer not found or invalid data received.");
            console.warn("Received unexpected data format or empty array:", data);
        }
    })
    .catch(error => {
        console.error("Error during customer search:", error);
    });
}


getAllBurgers();
getFrenchFries();
getAllSubmariens();
getAllPasta();
getAllChicken();
getAllBeverages();
updateCartDisplay();
updateTotals();
setInterval(getDateTime, 1000);