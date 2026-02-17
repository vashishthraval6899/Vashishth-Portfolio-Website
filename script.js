// Portfolio JavaScript - Mobile & Tablet Optimized

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
        this.fixMobileHeaderSpacing();
        this.initConsoleGreeting();
        this.initProjectHoverEffects();
    }

    // Mobile Menu - Improved Logic
    initMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelectorAll('.mobile-menu-link');

        if (!navToggle || !mobileMenu) return;

        // Helper to close menu
        const closeMenu = () => {
            mobileMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = ''; // Unlock scroll
        };

        // Toggle click
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = mobileMenu.classList.contains('active');
            
            if (isActive) {
                closeMenu();
            } else {
                mobileMenu.classList.add('active');
                navToggle.classList.add('active');
                document.body.style.overflow = 'hidden'; // Lock scroll
            }
        });

        // Close when clicking ANY link inside the menu
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Handle resize (close menu if user rotates phone to landscape/desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // Smooth Scrolling with Header Offset Fix
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Skip empty or external links
                if (href === '#' || href.startsWith('http')) return;
                
                const targetElement = document.querySelector(href);
                if (!targetElement) return;
                
                e.preventDefault();
                
                // Calculate header height dynamically
                const nav = document.querySelector('.nav');
                const headerHeight = nav ? nav.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 10;

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
        
        if (!nav) return;
        
        const handleScroll = () => {
            // Add shadow to navbar on scroll
            if (window.scrollY > 20) {
                nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
            } else {
                nav.style.boxShadow = 'none';
            }
        };
        
        // Debounce scroll events for performance
        let scrollTimeout;
        const debouncedScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(handleScroll, 20);
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
        
        // Only add hover listeners for non-touch devices
        if (window.matchMedia('(hover: hover)').matches) {
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
    }

    // Enhanced project hover effects
    initProjectHoverEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        // Only run on non-touch devices
        if (window.matchMedia('(hover: hover)').matches) {
            projectCards.forEach(card => {
                const techTags = card.querySelectorAll('.project-tech span');
                
                card.addEventListener('mouseenter', () => {
                    // Pulse effect on tech tags
                    techTags.forEach((tag, index) => {
                        tag.style.transition = `all 0.2s ease ${index * 0.05}s`;
                        tag.style.transform = 'scale(1.05)';
                        tag.style.backgroundColor = 'rgba(37, 99, 235, 0.15)';
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    techTags.forEach(tag => {
                        tag.style.transform = 'scale(1)';
                        tag.style.backgroundColor = '';
                    });
                });
            });
        }
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
        
        // Update after images load
        window.addEventListener('load', updateHeaderSpacing);
    }

    // Image Loading Optimization
    initImageLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        });
        
        // Error handling for broken images
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                console.warn(`Image failed to load: ${e.target.src}`);
                e.target.classList.add('error');
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
        console.log('%c🚀 Featured: TradeMind Pro, InvestWise, YouTube Sentiment AI', 'color: #6b7280; font-size: 12px;');
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading styles
    const style = document.createElement('style');
    style.textContent = `
        img { opacity: 0; transition: opacity 0.5s ease; }
        img.loaded { opacity: 1; }
        img.error { opacity: 0.5; filter: grayscale(1); }
        
        /* Fix for iOS Safari 100vh issue */
        @supports (-webkit-touch-callout: none) {
            .hero { min-height: -webkit-fill-available; }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize portfolio
    const portfolio = new Portfolio();
});

// Add class for touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
}
