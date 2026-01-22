// Portfolio JavaScript - Fixed Issues

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
        this.initContactCards();
        this.initConsoleGreeting();
        this.fixMobileHeaderSpacing();
    }

    // Fixed Mobile Menu with better header spacing
    initMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');
        const header = document.querySelector('.nav');

        if (!navToggle || !mobileMenu || !header) return;

        const toggleMenu = () => {
            const isOpening = !mobileMenu.classList.contains('active');
            
            mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isOpening ? 'hidden' : '';
            
            // Add padding to header when menu is open on mobile
            if (window.innerWidth <= 768) {
                header.style.paddingBottom = isOpening ? '10px' : '';
            }
        };

        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
                header.style.paddingBottom = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                toggleMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Smooth Scrolling with header offset
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Skip empty or external links
                if (href === '#' || href.startsWith('http')) return;
                
                const targetElement = document.querySelector(href);
                if (!targetElement) return;
                
                e.preventDefault();
                
                // Account for fixed header height
                const headerHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - 10; // Extra 10px padding
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL without refresh
                history.pushState(null, null, href);
            });
        });
    }

    // Scroll Effects with fixed header
    initScrollEffects() {
        const nav = document.querySelector('.nav');
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!nav) return;
        
        const handleScroll = () => {
            // Add shadow to navbar on scroll
            if (window.scrollY > 20) {
                nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
            } else {
                nav.style.boxShadow = 'none';
            }
            
            // Update active nav link
            let current = '';
            const scrollPosition = window.scrollY + 100; // Offset for better detection
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const linkHref = link.getAttribute('href');
                if (linkHref === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };
        
        // Debounce scroll events for performance
        let scrollTimeout;
        const debouncedScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(handleScroll, 50);
        };
        
        window.addEventListener('scroll', debouncedScroll);
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
                if (window.innerWidth > 768) { // Only on desktop
                    const links = card.querySelectorAll('.project-link');
                    links.forEach(link => {
                        link.style.transform = 'translateX(4px)';
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const links = card.querySelectorAll('.project-link');
                links.forEach(link => {
                    link.style.transform = 'translateX(0)';
                });
            });
            
            // Touch support for mobile
            card.addEventListener('touchstart', () => {
                card.classList.add('touch-active');
            }, { passive: true });
            
            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    card.classList.remove('touch-active');
                }, 150);
            }, { passive: true });
        });
    }

    // Contact Card Interactions
    initContactCards() {
        const contactCards = document.querySelectorAll('.contact-card, .contact-social-card');
        
        contactCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    card.style.zIndex = '1';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.zIndex = '';
            });
        });
    }

    // Fix Mobile Header Spacing Issues
    fixMobileHeaderSpacing() {
        const header = document.querySelector('.nav');
        const heroSection = document.querySelector('.hero');
        
        if (!header || !heroSection) return;
        
        const updateHeaderSpacing = () => {
            const headerHeight = header.offsetHeight;
            
            // Update hero section margin-top to account for fixed header
            heroSection.style.marginTop = `${headerHeight}px`;
            heroSection.style.paddingTop = '0';
            
            // Update mobile menu position
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) {
                mobileMenu.style.top = `${headerHeight}px`;
            }
        };
        
        // Initial update
        updateHeaderSpacing();
        
        // Update on resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateHeaderSpacing, 100);
        });
        
        // Update after images load (profile picture might affect header height)
        window.addEventListener('load', updateHeaderSpacing);
    }

    // Image Loading Optimization
    initImageLoading() {
        const images = document.querySelectorAll('img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Handle lazy loading
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
            
            images.forEach(img => {
                if (!img.complete) {
                    img.classList.add('loading');
                    imageObserver.observe(img);
                } else {
                    img.classList.add('loaded');
                }
            });
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
            });
        }
        
        // Error handling for broken images
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                console.warn(`Image failed to load: ${e.target.src}`);
                e.target.classList.add('error');
                e.target.classList.remove('loading');
            }
        }, true);
    }

    // Console Greeting
    initConsoleGreeting() {
        const styles = [
            'color: #2563eb',
            'font-size: 14px',
            'font-weight: 600',
            'font-family: "Inter", sans-serif',
            'padding: 4px 0'
        ].join(';');
        
        console.log('%c👋 Hello! Thanks for checking out my portfolio.', styles);
        console.log('%cBuilt with clean, minimalist design for Data Science professionals.', 'color: #6b7280; font-size: 12px;');
        console.log('%cFeel free to explore the code or reach out to connect!', 'color: #9ca3af; font-size: 11px;');
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading styles
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
        
        img.error {
            opacity: 0.5;
            filter: grayscale(1);
        }
        
        .project-card.touch-active {
            transform: scale(0.98);
            transition: transform 0.2s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Ensure mobile menu doesn't cause horizontal scroll */
        .mobile-menu {
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
        
        /* Fix for iOS Safari 100vh issue */
        @supports (-webkit-touch-callout: none) {
            .hero {
                min-height: -webkit-fill-available;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize portfolio
    const portfolio = new Portfolio();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        console.log('Portfolio is now visible');
    }
});

// Handle window resize with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate any layout-dependent values if needed
        const header = document.querySelector('.nav');
        const heroSection = document.querySelector('.hero');
        
        if (header && heroSection) {
            const headerHeight = header.offsetHeight;
            heroSection.style.marginTop = `${headerHeight}px`;
        }
    }, 250);
});

// Handle iOS form zoom prevention
document.addEventListener('touchstart', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        // Allow default behavior
        return;
    }
    
    // Prevent zoom on double-tap
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// Add class for touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
}
