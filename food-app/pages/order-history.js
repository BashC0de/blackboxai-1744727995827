export function init() {
    // Set user name from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.name) {
        document.getElementById('userName').textContent = userData.name;
    }

    // Load order history
    loadOrderHistory();
}

async function loadOrderHistory() {
    try {
        // In a real app, this would be an API call
        const mockOrders = [
            {
                id: 'ORD-12345',
                date: '2023-05-15',
                restaurant: 'Italian Bistro',
                items: [
                    { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
                    { name: 'Garlic Bread', quantity: 2, price: 4.99 }
                ],
                status: 'Delivered',
                total: 22.97
            },
            {
                id: 'ORD-12344',
                date: '2023-05-10',
                restaurant: 'Burger Palace',
                items: [
                    { name: 'Cheeseburger', quantity: 1, price: 8.99 },
                    { name: 'French Fries', quantity: 1, price: 3.99 },
                    { name: 'Soda', quantity: 1, price: 1.99 }
                ],
                status: 'Delivered',
                total: 14.97
            },
            {
                id: 'ORD-12343',
                date: '2023-05-05',
                restaurant: 'Sushi World',
                items: [
                    { name: 'California Roll', quantity: 1, price: 9.99 },
                    { name: 'Miso Soup', quantity: 1, price: 2.99 }
                ],
                status: 'Cancelled',
                total: 12.98
            }
        ];

        displayOrders(mockOrders);
    } catch (error) {
        console.error('Error fetching order history:', error);
        showError('Failed to load order history. Please try again later.');
    }
}

function displayOrders(orders) {
    const orderList = document.getElementById('orderList');
    
    if (!orders || orders.length === 0) {
        orderList.innerHTML = `
            <div class="text-center py-10 text-gray-500">
                <i class="fas fa-history text-2xl mb-2"></i>
                <p>No orders found</p>
            </div>
        `;
        return;
    }

    orderList.innerHTML = '';
    
    orders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'bg-white p-4 rounded-lg shadow-sm border border-gray-100';
        orderCard.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h3 class="font-bold text-gray-800">Order #${order.id}</h3>
                    <p class="text-sm text-gray-600">${order.date} • ${order.restaurant}</p>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }">
                    ${order.status}
                </span>
            </div>
            
            <div class="border-t border-gray-200 pt-3">
                ${order.items.map(item => `
                    <div class="flex justify-between mb-2">
                        <span>${item.quantity}x ${item.name}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
                
                <div class="flex justify-between font-bold border-t border-gray-200 pt-2 mt-2">
                    <span>Total</span>
                    <span>$${order.total.toFixed(2)}</span>
                </div>
            </div>
            
            <div class="mt-4 flex justify-end space-x-2">
                <button data-order-id="${order.id}" class="reorder-btn px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                    Reorder
                </button>
                <button data-order-id="${order.id}" class="px-3 py-1 bg-white border border-gray-300 text-sm rounded hover:bg-gray-50">
                    View Details
                </button>
            </div>
        `;
        orderList.appendChild(orderCard);
    });

    // Add event listeners to reorder buttons
    document.querySelectorAll('.reorder-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const orderId = e.target.getAttribute('data-order-id');
            reorderItems(orderId);
        });
    });
}

function reorderItems(orderId) {
    // In a real app, this would add items to cart
    alert(`Adding order ${orderId} to cart - this would add items to cart in a real app`);
    
    // Show success message
    const successElement = document.createElement('div');
    successElement.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-100 border border-green-400 text-green-700 rounded shadow-lg';
    successElement.textContent = 'Items added to cart!';
    document.body.appendChild(successElement);
    
    setTimeout(() => {
        successElement.remove();
    }, 2000);
}

function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded';
    errorElement.textContent = message;
    
    const orderList = document.getElementById('orderList');
    orderList.insertAdjacentElement('afterend', errorElement);
    
    setTimeout(() => {
        errorElement.remove();
    }, 3000);
}
