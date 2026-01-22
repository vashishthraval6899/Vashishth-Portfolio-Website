// Portfolio JavaScript - Minimal & Functional

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all functionality
        this.initMobileMenu();
        this.initSmoothScroll();
        this.initScrollEffects();
        this.initCurrentYear();
        this.initProjectCards();
        this.initImageLoading();
        this.initConsoleGreeting();
    }

    // Mobile Menu Toggle
    initMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');

        if (!navToggle || !mobileMenu) return;

        const toggleMenu = () => {
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            
            // Animate hamburger icon
            navToggle.classList.toggle('active');
        };

        navToggle.addEventListener('click', toggleMenu);

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && 
                !navToggle.contains(e.target) && 
                mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Smooth Scrolling
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Skip empty or external links
                if (href === '#' || href.startsWith('#!')) return;
                
                const targetElement = document.querySelector(href);
                if (!targetElement) return;
                
                e.preventDefault();
                
                const headerHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    // Scroll Effects
    initScrollEffects() {
        const nav = document.querySelector('.nav');
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Navbar shadow on scroll
        const handleScroll = () => {
            if (window.scrollY > 20) {
                nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            } else {
                nav.style.boxShadow = 'none';
            }
            
            // Update active nav link
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call
    }

    // Update Current Year in Footer
    initCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // Project Card Interactions
    initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const links = card.querySelectorAll('.project-link');
                links.forEach(link => {
                    link.style.transform = 'translateX(4px)';
                });
            });
            
            card.addEventListener('mouseleave', () => {
                const links = card.querySelectorAll('.project-link');
                links.forEach(link => {
                    link.style.transform = 'translateX(0)';
                });
            });
        });
    }

    // Image Loading Optimization
    initImageLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
        
        // Add loading state to all images
        document.querySelectorAll('img').forEach(img => {
            if (!img.complete) {
                img.classList.add('loading');
                img.addEventListener('load', () => {
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                });
            } else {
                img.classList.add('loaded');
            }
        });
    }

    // Console Greeting (Optional)
    initConsoleGreeting() {
        const styles = [
            'color: #2563eb',
            'font-size: 14px',
            'font-weight: 500',
            'font-family: "Source Code Pro", monospace'
        ].join(';');
        
        console.log('%c👋 Hello there!', styles);
        console.log('%cThanks for checking out my portfolio.', 'color: #6b7280; font-size: 12px;');
        console.log('%cFeel free to explore the code or reach out to connect!', 'color: #9ca3af; font-size: 11px;');
    }

    // Utility: Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
    
    // Add CSS for loading states
    const style = document.createElement('style');
    style.textContent = `
        img.loading {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        img.loaded {
            opacity: 1;
            animation: fadeIn 0.5s ease;
        }
        
        .nav-toggle.active .nav-toggle-line:first-child {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active .nav-toggle-line:last-child {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Page became visible again
        console.log('Portfolio is now visible');
    }
});

// Handle window resize with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle responsive adjustments here if needed
    }, 250);
});

// Error handling for broken images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.warn(`Image failed to load: ${e.target.src}`);
        // You could set a placeholder image here
        // e.target.src = 'path/to/placeholder.jpg';
    }
}, true);
