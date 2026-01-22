// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger-menu');
const mobileMenu = document.querySelector('.mobile-menu-overlay');
const closeMenu = document.querySelector('.close-menu');
const mobileLinks = document.querySelectorAll('.mobile-links a');

function toggleMenu() {
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll'); // Optional: prevent body scroll
}

hamburger.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);

// Close menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Navbar Scroll Effect (Glassmorphism shadow on scroll)
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
    } else {
        navbar.style.boxShadow = "none";
    }
});
