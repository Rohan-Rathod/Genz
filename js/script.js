let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = 0;

// List of available products with images
const products = [
    { id: 1, name: "Classic White T-Shirt", price: 25.00, img: "img/white-tshirt.jpg" },
    { id: 2, name: "Stylish Blue Shirt", price: 35.00, img: "img/blue-shirt.jpg" },
    { id: 3, name: "Premium Hoodie", price: 55.00, img: "img/premium-hoodie.jpg" },
];

// Generate the product listings dynamically
function displayProducts() {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
        `;
        productContainer.appendChild(productDiv);
    });

    // Add event listeners to buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));

            addItemToCart(productId, productName, productPrice);
        });
    });
}

// Add item to cart
function addItemToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCart();
}

// Update cart display and save to local storage
function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';
    totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)} 
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update total price
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);

    // Enable or disable checkout button
    document.getElementById('checkout-btn').disabled = cart.length === 0;

    // Save cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart counter
    document.getElementById('cart-counter').textContent = `Cart (${cart.length})`;

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = parseInt(button.getAttribute('data-id'));
            removeItemFromCart(itemId);
        });
    });
}

// Remove item from cart
function removeItemFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Checkout simulation
document.getElementById('checkout-btn').addEventListener('click', () => {
    alert(`Thank you for your purchase of $${totalPrice.toFixed(2)}!`);
    cart = [];
    updateCart();
});

// Initialize the page
displayProducts();
updateCart();
