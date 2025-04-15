export function init() {
    // Show progress bar animation
    const progressBar = document.getElementById('progressBar');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            performLogout();
        } else {
            width += 10;
            progressBar.style.width = width + '%';
        }
    }, 100);

    // Prevent going back after logout starts
    window.onbeforeunload = function() {
        return "Are you sure you want to leave?";
    };
}

function performLogout() {
    // Clear user data from localStorage
    localStorage.removeItem('userData');
    localStorage.removeItem('cart');
    localStorage.removeItem('favorites');

    // Redirect to welcome page after logout
    setTimeout(() => {
        window.location.href = '/welcome';
    }, 500);
}
