export function init() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    
    forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const mobile = document.getElementById('mobile').value;
        
        try {
            // Simulate API call
            const response = await sendResetLink(mobile);
            
            if (response.success) {
                showSuccess(response.message);
            } else {
                showError(response.message);
            }
        } catch (error) {
            showError('Failed to send reset link. Please try again.');
        }
    });
}

async function sendResetLink(mobile) {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock response
            if (mobile === '1234567890') {
                resolve({
                    success: true,
                    message: 'Password reset link sent to your mobile'
                });
            } else {
                resolve({
                    success: false,
                    message: 'Mobile number not registered'
                });
            }
        }, 1000);
    });
}

function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded';
    errorElement.textContent = message;
    
    const form = document.getElementById('forgotPasswordForm');
    form.insertAdjacentElement('afterend', errorElement);
    
    setTimeout(() => {
        errorElement.remove();
    }, 3000);
}

function showSuccess(message) {
    const successElement = document.createElement('div');
    successElement.className = 'mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded';
    successElement.textContent = message;
    
    const form = document.getElementById('forgotPasswordForm');
    form.insertAdjacentElement('afterend', successElement);
    
    setTimeout(() => {
        successElement.remove();
    }, 3000);
}
