// Portfolio JavaScript - Minimal Implementation

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
        this.initProjectHoverEffects(); // New
    }

    // Mobile Menu
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
                const offsetPosition = targetPosition - headerHeight - 10;
                
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

    // Project Card Interactions - Enhanced
    initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
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
        });
    }

    // New: Enhanced project hover effects
    initProjectHoverEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const techTags = card.querySelectorAll('.project-tech span');
            const description = card.querySelector('.project-description');
            
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
        
        // Error handling for broken images
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                console.warn(`Image failed to load: ${e.target.src}`);
                e.target.classList.add('error');
            }
        }, true);
    }

    // Console Greeting - Updated with new project info
    initConsoleGreeting() {
        const styles = [
            'color: #2563eb',
            'font-size: 14px',
            'font-weight: 600',
            'font-family: "Inter", sans-serif',
            'padding: 4px 0'
        ].join(';');
        
        console.log('%c👋 Hello! Thanks for checking out my portfolio.', styles);
        console.log('%c🚀 Featured: TradeMind Pro (Multi-Agent AI), InvestWise, YouTube Sentiment AI', 'color: #6b7280; font-size: 12px;');
        console.log('%c✨ Clean design, hand-drawn space theme.', 'color: #6b7280; font-size: 12px;');
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading styles
    const style = document.createElement('style');
    style.textContent = `
        img.loaded {
            animation: fadeIn 0.5s ease;
        }
        
        img.error {
            opacity: 0.5;
            filter: grayscale(1);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Fix for iOS Safari 100vh issue */
        @supports (-webkit-touch-callout: none) {
            .hero {
                min-height: -webkit-fill-available;
            }
        }
        
        /* Smooth transitions for project tech tags */
        .project-tech span {
            transition: all 0.2s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize portfolio
    const portfolio = new Portfolio();
});

// Handle window resize with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const header = document.querySelector('.nav');
        const heroSection = document.querySelector('.hero');
        
        if (header && heroSection) {
            const headerHeight = header.offsetHeight;
            heroSection.style.marginTop = `${headerHeight}px`;
        }
    }, 250);
});

// Add class for touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
}

// Add this method to your Portfolio class
initProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const techTags = card.querySelectorAll('.project-tech span');
        const icon = card.querySelector('.project-icon');
        
        card.addEventListener('mouseenter', () => {
            // Pulse effect on tech tags
            techTags.forEach((tag, index) => {
                tag.style.transition = `all 0.2s ease ${index * 0.05}s`;
                tag.style.transform = 'scale(1.05)';
                tag.style.backgroundColor = 'rgba(37, 99, 235, 0.15)';
            });
            
            // Icon animation
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            techTags.forEach(tag => {
                tag.style.transform = 'scale(1)';
                tag.style.backgroundColor = '';
            });
            
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
}

// Don't forget to call it in init():
// Add this line to the init() method:
this.initProjectHoverEffects();
