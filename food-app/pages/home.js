export function init() {
    // Set user name from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.name) {
        document.getElementById('userName').textContent = userData.name;
    }

    // Fetch restaurants
    fetchRestaurants();
}

async function fetchRestaurants() {
    try {
        const response = await fetch('http://13.235.250.119/v2/restaurants/fetch_result/');
        
        if (!response.ok) {
            throw new Error('Failed to fetch restaurants');
        }

        const data = await response.json();
        displayRestaurants(data.restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        showError('Failed to load restaurants. Please try again later.');
    }
}

function displayRestaurants(restaurants) {
    const restaurantList = document.getElementById('restaurantList');
    restaurantList.innerHTML = '';

    if (!restaurants || restaurants.length === 0) {
        restaurantList.innerHTML = `
            <div class="col-span-3 text-center py-10 text-gray-500">
                <i class="fas fa-utensils text-2xl mb-2"></i>
                <p>No restaurants found in your area</p>
            </div>
        `;
        return;
    }

    restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200';
        restaurantCard.innerHTML = `
            <a href="/restaurant/${restaurant.id}" data-link>
                <img src="${restaurant.photo_url}" alt="${restaurant.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="font-bold text-lg mb-1">${restaurant.name}</h3>
                    <div class="flex items-center text-yellow-400 mb-2">
                        ${getStarRating(restaurant.rating)}
                        <span class="text-gray-600 ml-1">(${restaurant.rating})</span>
                    </div>
                    <p class="text-gray-600 mb-2">${restaurant.cuisine_type}</p>
                    <p class="text-gray-600">${restaurant.location}</p>
                </div>
            </a>
        `;
        restaurantList.appendChild(restaurantCard);
    });
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
    const restaurantList = document.getElementById('restaurantList');
    restaurantList.innerHTML = `
        <div class="col-span-3 text-center py-10 text-red-500">
            <i class="fas fa-exclamation-circle text-2xl mb-2"></i>
            <p>${message}</p>
            <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Try Again
            </button>
        </div>
    `;
}
