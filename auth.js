// auth.js - Complete Authentication System
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const signupForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check authentication state on page load
    checkAuthState();

    // ================= SIGNUP FUNCTIONALITY =================
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(registerForm);
            
            const userData = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirmPassword')
            };

            if (validateSignup(userData)) {
                registerUser(userData);
            }
        });
    }

    // ================= LOGIN FUNCTIONALITY =================
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(loginForm);
            
            const credentials = {
                email: formData.get('email'),
                password: formData.get('password')
            };

            if (validateLogin(credentials)) {
                loginUser(credentials);
            }
        });
    }


    // ================= VALIDATION FUNCTIONS =================
    function validateSignup(userData) {
        if (!userData.username || !userData.email || !userData.password) {
            showAlert('Please fill in all fields', 'error');
            return false;
        }

        if (userData.password !== userData.confirmPassword) {
            showAlert('Passwords do not match', 'error');
            return false;
        }

        if (userData.password.length < 6) {
            showAlert('Password must be at least 6 characters', 'error');
            return false;
        }

        return true;
    }

    function validateLogin(credentials) {
        if (!credentials.email || !credentials.password) {
            showAlert('Please fill in all fields', 'error');
            return false;
        }

        if (!isValidEmail(credentials.email)) {
            showAlert('Please enter a valid email address', 'error');
            return false;
        }

        return true;
    }

    // ================= AUTHENTICATION FUNCTIONS =================
    function registerUser(userData) {
        // Simulate API call - REPLACE WITH ACTUAL FETCH IN PRODUCTION
        showAlert('Creating your account...', 'success');
        
        setTimeout(() => {
            // Create user object (in real app, this comes from your backend)
            const user = {
                id: Date.now().toString(),
                username: userData.username,
                email: userData.email,
                token: generateToken()
            };

            // Save user to localStorage (sessionStorage for more security)
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('isAuthenticated', 'true');
            
            showAlert('Registration successful! Redirecting...', 'success');
            redirectToHome();
        }, 1500);
    }

    function loginUser(credentials) {
        // Simulate API call - REPLACE WITH ACTUAL FETCH IN PRODUCTION
        showAlert('Authenticating...', 'success');
        
        setTimeout(() => {
            // Check against "registered" users (for demo only)
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            const user = registeredUsers.find(u => u.email === credentials.email);
            
            if (user && user.password === credentials.password) {
                // Create session (without password)
                const sessionUser = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    token: generateToken()
                };

                localStorage.setItem('currentUser', JSON.stringify(sessionUser));
                localStorage.setItem('isAuthenticated', 'true');
                
                showAlert('Login successful! Redirecting...', 'success');
                redirectToHome();
            } else {
                showAlert('Invalid email or password', 'error');
            }
        }, 1500);
    }

    function logoutUser() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAuthenticated');
        window.location.href = 'signup.html';
    }

    // ================= UTILITY FUNCTIONS =================
    function checkAuthState() {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        
        // Redirect authenticated users away from auth pages
        if (isAuthenticated && (window.location.pathname.includes('loginForm') || 
                                window.location.pathname.includes('registerForm'))) {
            redirectToHome();
        }
        
        // Hide/show auth buttons in navigation
        updateAuthUI();
    }

    function updateAuthUI() {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const profileBtn = document.getElementById('profileBtn');

        if (isAuthenticated) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (signupBtn) signupBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'block';
            if (profileBtn) profileBtn.style.display = 'block';
        } else {
            if (loginBtn) loginBtn.style.display = 'block';
            if (signupBtn) signupBtn.style.display = 'block';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (profileBtn) profileBtn.style.display = 'none';
        }
    }

    function redirectToHome() {
        window.location.href = 'home.html';
    }

    function showAlert(message, type) {
        // Create or use existing alert container
        let alertContainer = document.getElementById('alertContainer');
        if (!alertContainer) {
            alertContainer = document.createElement('div');
            alertContainer.id = 'alertContainer';
            alertContainer.style.position = 'fixed';
            alertContainer.style.top = '20px';
            alertContainer.style.right = '20px';
            alertContainer.style.zIndex = '1000';
            document.body.appendChild(alertContainer);
        }

        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        alert.style.padding = '10px 20px';
        alert.style.marginBottom = '10px';
        alert.style.borderRadius = '4px';
        alert.style.color = 'white';
        alert.style.backgroundColor = type === 'error' ? '#e74c3c' : '#2ecc71';
        alert.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        
        alertContainer.appendChild(alert);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            alert.remove();
            if (alertContainer.children.length === 0) {
                alertContainer.remove();
            }
        }, 3000);
    }

    function generateToken() {
        return 'token-' + Math.random().toString(36).substr(2) + Date.now().toString(36);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});