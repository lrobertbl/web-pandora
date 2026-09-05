// Main JavaScript for L2J Mobius Website

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle (for future implementation)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Update server status (simulated for now)
function updateServerStatus() {
    const loginStatus = document.querySelector('.status-item:nth-child(1) .status-indicator');
    const gameStatus = document.querySelector('.status-item:nth-child(2) .status-indicator');
    
    // This would normally be fetched from the server
    // For now, it's simulated
    const isOnline = Math.random() > 0.1; // 90% chance of being online
    
    if (isOnline) {
        loginStatus.className = 'status-indicator online';
        loginStatus.textContent = '● Online';
        gameStatus.className = 'status-indicator online';
        gameStatus.textContent = '● Online';
    } else {
        loginStatus.className = 'status-indicator offline';
        loginStatus.textContent = '● Offline';
        gameStatus.className = 'status-indicator offline';
        gameStatus.textContent = '● Offline';
    }
}

// Update player count (simulated)
function updatePlayerCount() {
    const playerCount = document.querySelector('.status-item:nth-child(3) .status-value');
    if (playerCount) {
        // Random between 100-150 for simulation
        const count = Math.floor(Math.random() * 50) + 100;
        playerCount.textContent = count;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateServerStatus();
    updatePlayerCount();
    
    // Update every 30 seconds
    setInterval(updateServerStatus, 30000);
    setInterval(updatePlayerCount, 30000);
});

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateUsername(username) {
    return username.length >= 4 && username.length <= 16;
}

// Loading animation
function showLoading(element) {
    element.innerHTML = '<div class="loading">Cargando...</div>';
}

function hideLoading(element, content) {
    element.innerHTML = content;
}

// Error message display
function showError(element, message) {
    element.innerHTML = `<div class="alert alert-error">${message}</div>`;
}

function showSuccess(element, message) {
    element.innerHTML = `<div class="alert alert-success">${message}</div>`;
}

function showInfo(element, message) {
    element.innerHTML = `<div class="alert alert-info">${message}</div>`;
}
