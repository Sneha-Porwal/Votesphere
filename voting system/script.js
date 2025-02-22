document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.wrapper');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const closeBtn = document.getElementById('close-btn');

    // Switch to registration form
    registerLink.addEventListener('click', () => {
        document.querySelector('.login').classList.remove('active');
        document.querySelector('.register').classList.add('active');
    });

    // Switch to login form
    loginLink.addEventListener('click', () => {
        document.querySelector('.register').classList.remove('active');
        document.querySelector('.login').classList.add('active');
    });

    // Close popup (optional)
    closeBtn.addEventListener('click', () => {
        wrapper.style.display = 'none';
    });

    // Form validation functions
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    function validatePassword(password) {
        return password.length >= 8; // At least 8 characters
    }

    function validateUsername(username) {
        return username.trim().length >= 3; // At least 3 characters
    }

    // Login form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        if (!validatePassword(password)) {
            alert('Password must be at least 8 characters long.');
            return;
        }

        alert('Login successful!');
        // Add login logic here (e.g., API call)
    });

    // Register form submission
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('register-username').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value.trim();

        if (!validateUsername(username)) {
            alert('Username must be at least 3 characters long.');
            return;
        }
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        if (!validatePassword(password)) {
            alert('Password must be at least 8 characters long.');
            return;
        }

        alert('Registration successful!');
        // Add registration logic here (e.g., API call)
    });

    // Toggle password visibility
    function togglePassword(inputId) {
        const passwordInput = document.getElementById(inputId);
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }

    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function () {
            const inputId = this.previousElementSibling.id;
            togglePassword(inputId);
            this.textContent = this.textContent === '👁️' ? '🙈' : '👁️'; // Toggle eye icon
        });
    });
});
