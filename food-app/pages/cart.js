export function init() {
    // Set user name from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.name) {
        document.getElementById('userName').textContent = userData.name;
    }

    // Load cart items
    loadCartItems();
    setupEventListeners();
}

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-10 text-gray-500">
                <i class="fas fa-shopping-cart text-2xl mb-2"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        document.getElementById('checkoutButton').disabled = true;
        updateOrderSummary(0);
        return;
    }

    // In a real app, we would fetch actual item details from the server
    const mockItems = {
        '1': { name: 'Margherita Pizza', price: 12.99, restaurant: 'Italian Bistro' },
        '2': { name: 'Pasta Carbonara', price: 14.99, restaurant: 'Italian Bistro' },
        '3': { name: 'Tiramisu', price: 6.99, restaurant: 'Italian Bistro' },
        '4': { name: 'Garlic Bread', price: 4.99, restaurant: 'Italian Bistro' }
    };

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemDetails = mockItems[item.id];
        if (!itemDetails) return;

        subtotal += itemDetails.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'bg-white p-4 rounded-lg shadow-sm border border-gray-100';
        cartItem.innerHTML = `
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <h4 class="font-medium text-gray-800">${itemDetails.name}</h4>
                    <p class="text-sm text-gray-600 mt-1">${itemDetails.restaurant}</p>
                </div>
                <div class="flex items-center ml-4">
                    <span class="font-medium text-gray-800 mr-4">$${(itemDetails.price * item.quantity).toFixed(2)}</span>
                    <div class="flex items-center border border-gray-300 rounded">
                        <button data-item-id="${item.id}" class="quantity-btn px-2 py-1 text-gray-600 hover:bg-gray-100">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="px-2">${item.quantity}</span>
                        <button data-item-id="${item.id}" class="quantity-btn px-2 py-1 text-gray-600 hover:bg-gray-100">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button data-item-id="${item.id}" class="remove-btn ml-4 text-red-500 hover:text-red-600">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateOrderSummary(subtotal);
}

function setupEventListeners() {
    // Quantity buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('quantity-btn') || e.target.closest('.quantity-btn')) {
            const button = e.target.classList.contains('quantity-btn') ? e.target : e.target.closest('.quantity-btn');
            const itemId = button.getAttribute('data-item-id');
            const isIncrease = button.innerHTML.includes('plus');
            updateCartItemQuantity(itemId, isIncrease);
        }
        
        if (e.target.classList.contains('remove-btn') || e.target.closest('.remove-btn')) {
            const button = e.target.classList.contains('remove-btn') ? e.target : e.target.closest('.remove-btn');
            const itemId = button.getAttribute('data-item-id');
            removeCartItem(itemId);
        }
    });

    // Checkout button
    document.getElementById('checkoutButton').addEventListener('click', proceedToCheckout);
}

function updateCartItemQuantity(itemId, isIncrease) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        if (isIncrease) {
            cart[itemIndex].quantity += 1;
        } else {
            cart[itemIndex].quantity = Math.max(1, cart[itemIndex].quantity - 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
    }
}

function removeCartItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== itemId);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

function updateOrderSummary(subtotal) {
    const deliveryFee = 2.99;
    const total = subtotal + deliveryFee;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function proceedToCheckout() {
    // In a real app, this would redirect to a payment page
    alert('Proceeding to checkout - this would redirect to payment in a real app');
    
    // For demo purposes, we'll just clear the cart
    localStorage.removeItem('cart');
    loadCartItems();
    
    // Show success message
    const successElement = document.createElement('div');
    successElement.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-100 border border-green-400 text-green-700 rounded shadow-lg';
    successElement.textContent = 'Order placed successfully!';
    document.body.appendChild(successElement);
    
    setTimeout(() => {
        successElement.remove();
        window.location.href = '/home';
    }, 2000);
}
