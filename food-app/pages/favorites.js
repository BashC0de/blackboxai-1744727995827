export function init() {
    // Set user name from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.name) {
        document.getElementById('userName').textContent = userData.name;
    }

    // Load favorite restaurants
    loadFavorites();
}

function loadFavorites() {
    // Get favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById('favoritesList');

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="col-span-3 text-center py-10 text-gray-500">
                <i class="fas fa-heart text-2xl mb-2"></i>
                <p>No favorites saved yet</p>
                <a href="/home" data-link class="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Browse Restaurants
                </a>
            </div>
        `;
        return;
    }

    // In a real app, this would fetch actual restaurant data from the server
    const mockRestaurants = {
        '1': {
            id: '1',
            name: 'Italian Bistro',
            photo_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
            rating: 4.5,
            cuisine_type: 'Italian, Mediterranean',
            delivery_time: '25-35 min'
        },
        '2': {
            id: '2',
            name: 'Burger Palace',
            photo_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
            rating: 4.2,
            cuisine_type: 'American, Fast Food',
            delivery_time: '20-30 min'
        },
        '3': {
            id: '3',
            name: 'Sushi World',
            photo_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
            rating: 4.7,
            cuisine_type: 'Japanese, Sushi',
            delivery_time: '30-45 min'
        }
    };

    favoritesContainer.innerHTML = '';

    favorites.forEach(favId => {
        const restaurant = mockRestaurants[favId];
        if (!restaurant) return;

        const restaurantCard = document.createElement('div');
        restaurantCard.className = 'bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow';
        restaurantCard.innerHTML = `
            <a href="/restaurant/${restaurant.id}" data-link>
                <img src="${restaurant.photo_url}" alt="${restaurant.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-bold text-gray-800">${restaurant.name}</h3>
                        <button data-restaurant-id="${restaurant.id}" class="remove-favorite text-red-500 hover:text-red-600">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                    <div class="flex items-center text-yellow-400 mb-1">
                        ${getStarRating(restaurant.rating)}
                        <span class="text-gray-600 ml-1">(${restaurant.rating})</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-1">${restaurant.cuisine_type}</p>
                    <p class="text-sm text-gray-600">${restaurant.delivery_time}</p>
                </div>
            </a>
        `;
        favoritesContainer.appendChild(restaurantCard);
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-favorite').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const restaurantId = e.currentTarget.getAttribute('data-restaurant-id');
            removeFavorite(restaurantId);
        });
    });
}

function removeFavorite(restaurantId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== restaurantId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Show success message
    const successElement = document.createElement('div');
    successElement.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-100 border border-green-400 text-green-700 rounded shadow-lg';
    successElement.textContent = 'Removed from favorites';
    document.body.appendChild(successElement);
    
    setTimeout(() => {
        successElement.remove();
        loadFavorites(); // Refresh the list
    }, 1000);
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
