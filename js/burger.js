let cart = [];
let couponDiscount = 0;
const handlingFee = 50.00;

document.addEventListener('DOMContentLoaded', function () {
    setupAddButtons();
    setupCouponForm();
});

function setupAddButtons() {
    const addButtons = document.querySelectorAll('.add-btn');

    addButtons.forEach(button => {
        button.addEventListener('click', function () {
            const menuItem = this.closest('.menu-item');
            const name = menuItem.querySelector('.menu-item-name').textContent;
            const code = menuItem.querySelector('.menu-item-code').textContent;
            const priceText = menuItem.querySelector('.menu-item-price').textContent;

            const priceMatch = priceText.match(/රු\.(\d+(?:,\d+)*(?:\.\d+)?)/);
            const price = priceMatch ? parseFloat(priceMatch[1].replace(/,/g, '')) : 0;

            const discountElement = menuItem.querySelector('.menu-item-discount');
            let discountPercent = 0;
            if (discountElement) {
                const discountMatch = discountElement.textContent.match(/(\d+)%/);
                discountPercent = discountMatch ? parseInt(discountMatch[1]) : 0;
            }

            const finalPrice = price - (price * discountPercent / 100);

            addToCart(name, code, finalPrice, price, discountPercent);
        });
    });
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
        html += '<div class="cart-item">';
        html += '<div class="cart-item-info">';
        html += '<div class="cart-item-name">' + item.name + '</div>';
        html += '<div class="cart-item-code">' + item.code + '</div>';
        if (item.discount > 0) {
            html += '<div class="cart-item-discount">' + item.discount + '% OFF</div>';
        }
        html += '</div>';
        html += '<div class="cart-item-quantity">';
        html += '<button class="quantity-btn minus" onclick="changeQuantity(' + index + ', -1)">-</button>';
        html += '<span>' + item.quantity + '</span>';
        html += '<button class="quantity-btn plus" onclick="changeQuantity(' + index + ', 1)">+</button>';
        html += '</div>';
        html += '<div class="cart-item-price">රු.' + (item.price * item.quantity).toFixed(2) + '</div>';
        html += '<button class="remove-btn" onclick="removeItem(' + index + ')">x</button>';
        html += '</div>';
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
const style = document.createElement('style');
style.textContent = `
.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 5px;
}
.cart-item-info {
    flex: 1;
}
.cart-item-name {
    font-weight: bold;
    font-size: 14px;
}
.cart-item-code {
    font-size: 12px;
    color: #666;
}
.cart-item-discount {
    font-size: 11px;
    color: green;
}
.cart-item-quantity {
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 0 10px;
}
.quantity-btn {
    width: 25px;
    height: 25px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}
.quantity-btn.minus {
    background: #dc3545;
    color: white;
}
.quantity-btn.plus {
    background: #28a745;
    color: white;
}
.cart-item-price {
    font-weight: bold;
    min-width: 80px;
    text-align: right;
}
.remove-btn {
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 5px 8px;
    cursor: pointer;
    margin-left: 10px;
}
.empty-cart {
    text-align: center;
    color: #666;
    padding: 20px;
}
`;
document.head.appendChild(style);

function getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        second = '0' + second;
    }
    var dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return dateTime;
}

// example usage: realtime clock
setInterval(function () {
    currentTime = getDateTime();
    document.getElementById("digital-clock").innerHTML = currentTime;
}, 1000);
