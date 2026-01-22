// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU FUNCTIONALITY =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    
    // Open mobile menu
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners for mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu when clicking on links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Initialize navbar state
    handleNavbarScroll();
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's a link to the current page
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // ===== ACTIVE NAV LINK ON SCROLL =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
        
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100;
        
        // Find current section based on scroll position
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });
        
        // Update active class on nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Check if link href matches current section
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Initialize active nav link
    updateActiveNavLink();
    
    // ===== PROJECT CARDS HOVER EFFECT =====
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle animation to links inside project card
            const links = card.querySelectorAll('.project-link');
            links.forEach(link => {
                link.style.transform = 'translateX(5px)';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset link position
            const links = card.querySelectorAll('.project-link');
            links.forEach(link => {
                link.style.transform = 'translateX(0)';
            });
        });
    });
    
    // ===== IMAGE LOADING ANIMATION =====
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Set initial state for fade-in effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        // Fade in when image loads
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Check if image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
        }
        
        // Add error handling for broken images
        img.addEventListener('error', function() {
            console.warn(`Image failed to load: ${this.src}`);
            // You could set a placeholder image here if needed
        });
    });
    
    // ===== SKILL TAGS INTERACTIVITY =====
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Toggle active state for skill tags
            this.classList.toggle('active');
        });
    });
    
    // ===== FORM VALIDATION (FOR FUTURE CONTACT FORM) =====
    // This is a placeholder for when you add a contact form
    function initContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic form validation
                const name = this.querySelector('input[name="name"]');
                const email = this.querySelector('input[name="email"]');
                const message = this.querySelector('textarea[name="message"]');
                
                let isValid = true;
                
                // Reset previous errors
                this.querySelectorAll('.error').forEach(error => error.remove());
                
                // Validate name
                if (!name.value.trim()) {
                    showError(name, 'Name is required');
                    isValid = false;
                }
                
                // Validate email
                if (!email.value.trim()) {
                    showError(email, 'Email is required');
                    isValid = false;
                } else if (!isValidEmail(email.value)) {
                    showError(email, 'Please enter a valid email');
                    isValid = false;
                }
                
                // Validate message
                if (!message.value.trim()) {
                    showError(message, 'Message is required');
                    isValid = false;
                }
                
                if (isValid) {
                    // Form is valid - you would submit via AJAX here
                    console.log('Form submitted successfully!');
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'success-message';
                    successMsg.textContent = 'Thank you! Your message has been sent.';
                    successMsg.style.cssText = `
                        background: #10B981;
                        color: white;
                        padding: 15px;
                        border-radius: 8px;
                        margin-top: 20px;
                        text-align: center;
                    `;
                    
                    this.appendChild(successMsg);
                    
                    // Reset form
                    this.reset();
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMsg.remove();
                    }, 5000);
                }
            });
        }
    }
    
    // Helper function for form validation
    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error';
        error.textContent = message;
        error.style.cssText = `
            color: #EF4444;
            font-size: 0.85rem;
            margin-top: 5px;
        `;
        
        input.parentNode.appendChild(error);
        input.style.borderColor = '#EF4444';
        
        // Remove error on input
        input.addEventListener('input', function() {
            error.remove();
            this.style.borderColor = '';
        }, { once: true });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Initialize form if exists
    initContactForm();
    
    // ===== ADDITIONAL ANIMATIONS =====
    // Animate elements when they come into view
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.stat-card, .skill-category, .project-card');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animation
    document.querySelectorAll('.stat-card, .skill-category, .project-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on scroll and initial load
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // ===== CONSOLE GREETING (Optional fun feature) =====
    console.log('%c👋 Hello! Thanks for checking out my portfolio.', 
        'color: #2563EB; font-size: 16px; font-weight: bold;');
    console.log('%cI\'m Vashishth Raval, a Data Scientist & ML Engineer.', 
        'color: #334155; font-size: 14px;');
    console.log('%cFeel free to explore the code or reach out to connect!', 
        'color: #64748B; font-size: 12px;');
    
    // ===== THEME TOGGLE (Optional future feature) =====
    function initThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary);
            color: white;
            border: none;
            cursor: pointer;
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        `;
        
        document.body.appendChild(themeToggle);
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('portfolio-theme', 'dark');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('portfolio-theme', 'light');
            }
        });
    }
    
    // Uncomment to enable theme toggle
    // initThemeToggle();
    
});
