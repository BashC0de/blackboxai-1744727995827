export function init() {
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const mobile = document.getElementById('mobile').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const address = document.getElementById('address').value;
        
        // Validate form
        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }
        
        if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
            showError('Please enter a valid 10-digit mobile number');
            return;
        }
        
        try {
            // Simulate API call
            const response = await registerUser({
                name,
                mobile,
                email,
                password,
                address
            });
            
            if (response.success) {
                // Store token and redirect to login
                showSuccess('Registration successful! Please login');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                showError(response.message);
            }
        } catch (error) {
            showError('Registration failed. Please try again.');
        }
    });
}

async function registerUser(userData) {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock response
            resolve({
                success: true,
                message: 'Registration successful'
            });
        }, 1000);
    });
}

function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded';
    errorElement.textContent = message;
    
    const form = document.getElementById('registerForm');
    form.insertAdjacentElement('afterend', errorElement);
    
    setTimeout(() => {
        errorElement.remove();
    }, 3000);
}

function showSuccess(message) {
    const successElement = document.createElement('div');
    successElement.className = 'mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded';
    successElement.textContent = message;
    
    const form = document.getElementById('registerForm');
    form.insertAdjacentElement('afterend', successElement);
    
    setTimeout(() => {
        successElement.remove();
    }, 3000);
}
