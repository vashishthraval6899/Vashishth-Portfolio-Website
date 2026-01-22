// Toggle Mobile Menu
function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('active');
}

// Subtle Parallax effect for "Doodles"
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    const doodles = document.querySelectorAll('.doodle');
    
    doodles.forEach((doodle, index) => {
        const speed = (index + 1) * 0.1;
        doodle.style.transform = `translateY(${scroll * speed}px)`;
    });
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
