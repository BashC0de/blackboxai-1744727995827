export function init() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const mobile = document.getElementById('mobile').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        try {
            // Simulate API call
            const response = await authenticateUser(mobile, password);
            
            if (response.success) {
                // Store token
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('userData', JSON.stringify(response.user));
                
                // Redirect to home
                window.location.href = '/home';
            } else {
                showError(response.message);
            }
        } catch (error) {
            showError('Login failed. Please try again.');
        }
    });
}

async function authenticateUser(mobile, password) {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock response
            if (mobile === '1234567890' && password === 'password123') {
                resolve({
                    success: true,
                    token: 'mock-auth-token',
                    user: {
                        name: 'John Doe',
                        mobile: '1234567890',
                        address: '123 Main St, City'
                    }
                });
            } else {
                resolve({
                    success: false,
                    message: 'Invalid mobile number or password'
                });
            }
        }, 1000);
    });
}

function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded';
    errorElement.textContent = message;
    
    const form = document.getElementById('loginForm');
    form.insertAdjacentElement('afterend', errorElement);
    
    setTimeout(() => {
        errorElement.remove();
    }, 3000);
}
