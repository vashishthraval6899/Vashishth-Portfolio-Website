// Smooth Scroll for Navigation Links
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

// Parallax Doodle Effect
// Makes the space elements move slightly at different speeds during scroll
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const doodles = document.querySelectorAll('.doodle');
    
    doodles.forEach((doodle, index) => {
        // Assigning different speeds based on index
        const speed = (index % 3 + 1) * 0.05;
        doodle.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// Navbar active state / shadow on scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
    } else {
        nav.style.boxShadow = "none";
    }
});
