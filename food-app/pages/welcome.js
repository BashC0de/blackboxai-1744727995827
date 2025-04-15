export function init() {
    console.log('Welcome page initialized');
    
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
        window.location.href = '/home';
    }
}
