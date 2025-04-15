// Main application router
import { Router } from './router.js';

// Initialize the router
const router = new Router();

// Define routes
router.addRoute('/', './pages/welcome.html');
router.addRoute('/login', './pages/login.html');
router.addRoute('/register', './pages/register.html');
router.addRoute('/forgot-password', './pages/forgot-password.html');
router.addRoute('/home', './pages/home.html');
router.addRoute('/profile', './pages/profile.html');
router.addRoute('/favorites', './pages/favorites.html');
router.addRoute('/order-history', './pages/order-history.html');
router.addRoute('/faqs', './pages/faqs.html');
router.addRoute('/restaurant/:id', './pages/restaurant-details.html');
router.addRoute('/cart', './pages/cart.html');
router.addRoute('/logout', './pages/logout.html');

// Handle initial route
router.navigate(window.location.pathname);

// Initialize common UI components
function initCommonComponents() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('mobileMenuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.toggle('hidden');
        });
    }

    // Set active user name if logged in
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.name) {
        const userNameElements = document.querySelectorAll('.user-name');
        userNameElements.forEach(el => {
            el.textContent = userData.name;
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCommonComponents);
