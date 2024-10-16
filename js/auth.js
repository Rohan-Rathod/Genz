// Helper function to get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Helper function to save users to localStorage
function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Helper function to check if a user is logged in
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Helper function to get the current logged-in user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Signup Form Submission
document.getElementById('signup-form')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const users = getUsers();
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        document.getElementById('signup-error').textContent = "User already exists with this email!";
    } else {
        const newUser = { username, email, password };
        saveUser(newUser);
        setCurrentUser(newUser);
        window.location.href = "index.html";  // Redirect to the main page after signup
    }
});

// Login Form Submission
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = getUsers();
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        setCurrentUser(user);
        window.location.href = "index.html";  // Redirect to the main page after login
    } else {
        document.getElementById('login-error').textContent = "Invalid email or password!";
    }
});

// Redirect if user is logged in
window.onload = () => {
    const currentUser = getCurrentUser();
    if (currentUser && window.location.pathname !== '/index.html') {
        window.location.href = 'index.html';  // Redirect logged in users to the store
    }
};
