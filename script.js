// Mobile Menu Logic
const hamburger = document.querySelector('.hamburger-menu');
const mobileMenu = document.querySelector('.mobile-menu-overlay');
const closeMenu = document.querySelector('.close-menu');
const mobileLinks = document.querySelectorAll('.mobile-links a');

function toggleMenu() {
    mobileMenu.classList.toggle('active');
}

if(hamburger) hamburger.addEventListener('click', toggleMenu);
if(closeMenu) closeMenu.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Navbar Scroll Effect (Subtle border appearing)
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.borderBottomColor = "#cbd5e1"; // Darker border on scroll
    } else {
        navbar.style.borderBottomColor = "#e2e8f0"; // Light border at top
    }
});
