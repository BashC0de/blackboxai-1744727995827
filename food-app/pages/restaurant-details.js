export function init() {
    // Get restaurant ID from URL
    const pathSegments = window.location.pathname.split('/');
    const restaurantId = pathSegments[pathSegments.length - 1];
    
    // Set user name from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.name) {
        document.getElementById('userName').textContent = userData.name;
    }

    // Fetch restaurant details and menu
    fetchRestaurantDetails(restaurantId);
    setupEventListeners();
}

async function fetchRestaurantDetails(restaurantId) {
    try {
        // In a real app, this would be an API call
        const mockRestaurant = {
            id: restaurantId,
            name: "Sample Restaurant",
            photo_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
            rating: 4.5,
            cuisine_type: "Italian, Mediterranean",
            location: "123 Main St, City",
            menu: [
                { id: 1, name: "Margherita Pizza", description: "Classic pizza with tomato sauce and mozzarella", price: 12.99, category: "Pizzas" },
                { id: 2, name: "Pasta Carbonara", description: "Spaghetti with creamy egg sauce and pancetta", price: 14.99, category: "Pastas" },
                { id: 3, name: "Tiramisu", description: "Classic Italian dessert", price: 6.99, category: "Desserts" },
                { id: 4, name: "Garlic Bread", description: "Toasted bread with garlic butter", price: 4.99, category: "Appetizers" }
            ]
        };

        displayRestaurantDetails(mockRestaurant);
        displayMenuItems(mockRestaurant.menu);
    } catch (error) {
        console.error('Error fetching restaurant details:', error);
        showError('Failed to load restaurant details. Please try again later.');
    }
}

function displayRestaurantDetails(restaurant) {
    document.getElementById('restaurantImage').src = restaurant.photo_url;
    document.getElementById('restaurantName').textContent = restaurant.name;
    document.getElementById('restaurantRating').innerHTML = getStarRating(restaurant.rating);
    document.getElementById('restaurantRatingValue').textContent = `(${restaurant.rating})`;
    document.getElementById('restaurantCuisine').textContent = restaurant.cuisine_type;
    document.getElementById('restaurantLocation').textContent = restaurant.location;
}

function displayMenuItems(menuItems) {
    const menuContainer = document.getElementById('menuItems');
    menuContainer.innerHTML = '';

    if (!menuItems || menuItems.length === 0) {
        menuContainer.innerHTML = `
            <div class="text-center py-10 text-gray-500">
                <i class="fas fa-utensils text-2xl mb-2"></i>
                <p>No menu items available</p>
            </div>
        `;
        return;
    }

    // Group by category
    const categories = {};
    menuItems.forEach(item => {
        if (!categories[item.category]) {
            categories[item.category] = [];
        }
        categories[item.category].push(item);
    });

    // Display by category
    for (const [category, items] of Object.entries(categories)) {
        const categoryHeader = document.createElement('h3');
        categoryHeader.className = 'text-lg font-semibold text-gray-800 mb-3 mt-6';
        categoryHeader.textContent = category;
        menuContainer.appendChild(categoryHeader);

        items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'bg-white p-4 rounded-lg shadow-sm border border-gray-100';
            menuItem.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <h4 class="font-medium text-gray-800">${item.name}</h4>
                        <p class="text-sm text-gray-600 mt-1">${item.description}</p>
                    </div>
                    <div class="flex items-center ml-4">
                        <span class="font-medium text-gray-800 mr-4">$${item.price.toFixed(2)}</span>
                        <button data-item-id="${item.id}" class="add-to-cart px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Add
                        </button>
                    </div>
                </div>
            `;
            menuContainer.appendChild(menuItem);
        });
    }
}

function setupEventListeners() {
    // Add to cart buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const itemId = e.target.getAttribute('data-item-id');
            addToCart(itemId);
        }
    });

    // Toggle favorite
    document.getElementById('toggleFavorite').addEventListener('click', toggleFavorite);
}

function addToCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already in cart
    const existingItem = cart.find(item => item.id === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: itemId, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSummary();
    showSuccess('Item added to cart');
}

function toggleFavorite() {
    const button = document.getElementById('toggleFavorite');
    const isFavorite = button.classList.contains('favorited');
    
    if (isFavorite) {
        button.innerHTML = '<i class="far fa-heart mr-2"></i>Add to Favorites';
        button.classList.remove('favorited');
    } else {
        button.innerHTML = '<i class="fas fa-heart mr-2 text-red-500"></i>Added to Favorites';
        button.classList.add('favorited');
    }
}

function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    // In a real app, we would calculate the total price
    
    document.getElementById('cartCount').textContent = totalItems;
    document.getElementById('cartTotal').textContent = `$${(totalItems * 10).toFixed(2)}`; // Mock calculation
}

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
    if (halfStar) stars += '<i class="fas fa-star-half-alt"></i>';
    for (let i = 0; i < emptyStars; i++) stars += '<i class="far fa-star"></i>';
    
    return stars;
}

function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded';
    errorElement.textContent = message;
    
    const menuContainer = document.getElementById('menuItems');
    menuContainer.insertAdjacentElement('afterend', errorElement);
    
    setTimeout(() => {
        errorElement.remove();
    }, 3000);
}

function showSuccess(message) {
    const successElement = document.createElement('div');
    successElement.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-100 border border-green-400 text-green-700 rounded shadow-lg';
    successElement.textContent = message;
    
    document.body.appendChild(successElement);
    
    setTimeout(() => {
        successElement.remove();
    }, 2000);
}
