export function init() {
    // Load user data
    loadUserData();
    setupEventListeners();
}

function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {
        name: 'John Doe',
        mobile: '+1 (555) 123-4567',
        email: 'john.doe@example.com',
        address: '123 Main Street, Apt 4B, New York, NY 10001'
    };

    // Display user data
    document.getElementById('profileName').textContent = userData.name;
    document.getElementById('profileMobile').textContent = userData.mobile;
    document.getElementById('profileEmail').textContent = userData.email;
    document.getElementById('profileAddress').textContent = userData.address;
    document.getElementById('userName').textContent = userData.name;
}

function setupEventListeners() {
    // Edit Profile Button
    document.getElementById('editProfileBtn').addEventListener('click', () => {
        openEditModal('profile');
    });

    // Edit Address Button
    document.getElementById('editAddressBtn').addEventListener('click', () => {
        openEditModal('address');
    });

    // Change Password Button
    document.getElementById('changePasswordBtn').addEventListener('click', () => {
        window.location.href = '/forgot-password';
    });

    // Notification Settings Button
    document.getElementById('notificationSettingsBtn').addEventListener('click', () => {
        alert('Notification settings would open here in a real app');
    });

    // Delete Account Button
    document.getElementById('deleteAccountBtn').addEventListener('click', () => {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            localStorage.removeItem('userData');
            localStorage.removeItem('cart');
            window.location.href = '/welcome';
        }
    });
}

function openEditModal(type) {
    const userData = JSON.parse(localStorage.getItem('userData')) || {
        name: 'John Doe',
        mobile: '+1 (555) 123-4567',
        email: 'john.doe@example.com',
        address: '123 Main Street, Apt 4B, New York, NY 10001'
    };

    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modalOverlay.id = 'editModalOverlay';

    // Create modal content based on type
    let modalContent = '';
    if (type === 'profile') {
        modalContent = `
            <div class="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 class="text-xl font-bold text-gray-800 mb-4">Edit Profile</h3>
                <form id="editProfileForm">
                    <div class="mb-4">
                        <label class="block text-gray-700 mb-2">Full Name</label>
                        <input type="text" id="editName" value="${userData.name}" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 mb-2">Mobile Number</label>
                        <input type="tel" id="editMobile" value="${userData.mobile}" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 mb-2">Email</label>
                        <input type="email" id="editEmail" value="${userData.email}" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md">
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" id="cancelEditProfile" 
                            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                            Cancel
                        </button>
                        <button type="submit" 
                            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        `;
    } else {
        modalContent = `
            <div class="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 class="text-xl font-bold text-gray-800 mb-4">Edit Address</h3>
                <form id="editAddressForm">
                    <div class="mb-4">
                        <label class="block text-gray-700 mb-2">Delivery Address</label>
                        <textarea id="editAddress" rows="3"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md">${userData.address}</textarea>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" id="cancelEditAddress" 
                            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                            Cancel
                        </button>
                        <button type="submit" 
                            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    modalOverlay.innerHTML = modalContent;
    document.body.appendChild(modalOverlay);

    // Setup form submission
    const formId = type === 'profile' ? 'editProfileForm' : 'editAddressForm';
    const cancelId = type === 'profile' ? 'cancelEditProfile' : 'cancelEditAddress';

    document.getElementById(formId).addEventListener('submit', (e) => {
        e.preventDefault();
        saveChanges(type);
    });

    document.getElementById(cancelId).addEventListener('click', () => {
        modalOverlay.remove();
    });
}

function saveChanges(type) {
    const userData = JSON.parse(localStorage.getItem('userData')) || {
        name: 'John Doe',
        mobile: '+1 (555) 123-4567',
        email: 'john.doe@example.com',
        address: '123 Main Street, Apt 4B, New York, NY 10001'
    };

    if (type === 'profile') {
        userData.name = document.getElementById('editName').value;
        userData.mobile = document.getElementById('editMobile').value;
        userData.email = document.getElementById('editEmail').value;
    } else {
        userData.address = document.getElementById('editAddress').value;
    }

    localStorage.setItem('userData', JSON.stringify(userData));
    document.getElementById('editModalOverlay').remove();
    loadUserData();

    // Show success message
    const successElement = document.createElement('div');
    successElement.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-100 border border-green-400 text-green-700 rounded shadow-lg';
    successElement.textContent = 'Changes saved successfully!';
    document.body.appendChild(successElement);

    setTimeout(() => {
        successElement.remove();
    }, 2000);
}
