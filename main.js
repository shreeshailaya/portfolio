import HorizontalNav from './horizontal-nav.js';
import Lenis from 'lenis';

// Initialize Lenis smooth scrolling with enhanced configuration
const lenis = new Lenis({
    duration: 0.8,                    // Faster, more responsive scrolling
    easing: (t) => 1 - Math.pow(1 - t, 3), // Smooth cubic-bezier easing
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 0.8,            // Reduced for smoother mouse scrolling
    smoothTouch: true,                // Enable smooth touch for mobile
    touchMultiplier: 1.5,            // Optimized touch sensitivity
    infinite: false,
    lerp: 0.1,                       // Linear interpolation for smoother movement
    wheelMultiplier: 0.8,            // Smoother wheel scrolling
    syncTouch: true,                 // Sync touch and mouse scrolling
    syncTouchLerp: 0.1,             // Touch interpolation
    touchInertiaMultiplier: 40,      // Touch inertia for natural feel
});

// Enhanced RAF for Lenis with better performance
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Initialize horizontal navigation
let horizontalNav;

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    init();
});

// Initialize everything
function init() {
    initHorizontalNavigation();
    initContactForm();
    initScrollAnimations();
    initHeroAnimation();
}

// Initialize Horizontal Navigation
function initHorizontalNavigation() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        // Create horizontal navigation container
        const horizontalNavContainer = document.createElement('nav');
        horizontalNavContainer.className = 'horizontal-nav';
        document.body.insertBefore(horizontalNavContainer, document.body.firstChild);
        
        // Initialize horizontal navigation
        horizontalNav = new HorizontalNav(horizontalNavContainer, {
            items: [
                { label: "Home", href: "#home", icon: "fas fa-home" },
                { label: "About", href: "#about", icon: "fas fa-user" },
                { label: "Services", href: "#services", icon: "fas fa-cogs" },
                { label: "Skills", href: "#skills", icon: "fas fa-code" },
                { label: "Blogs", href: "#blogs", icon: "fas fa-blog" },
                { label: "Links", href: "#links", icon: "fas fa-link" },
                { label: "Contact", href: "#contact", icon: "fas fa-envelope" }
            ]
        });
        
        // Hide the old sidebar
        sidebar.style.display = 'none';
        
        // Add main-content class to body for proper spacing
        document.body.classList.add('main-content');
    }
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    if (!contactForm) return;

    contactForm.addEventListener('submit', handleFormSubmit);

    async function handleFormSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim(),
            send_to_email: import.meta.env.VITE_SEND_TO_EMAIL || 's.r.vitkar55@gmail.com',
            source: import.meta.env.VITE_SOURCE || 'helloshree.com'
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            showFormError('Please fill in all fields.');
            return;
        }

        if (!isValidEmail(formData.email)) {
            showFormError('Please enter a valid email address.');
            return;
        }

        // Set loading state
        setFormLoadingState(true);

        try {
            const response = await submitFormData(formData);
            
            if (response.success) {
                showFormSuccess();
                contactForm.reset();
            } else {
                showFormError(response.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showFormError('An error occurred. Please try again later.');
        } finally {
            setFormLoadingState(false);
        }
    }

    async function submitFormData(formData) {
        const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
        const bearerToken = import.meta.env.VITE_API_BEARER_TOKEN;

        if (!apiEndpoint) {
            throw new Error('API endpoint not configured');
        }

        // Try simple POST first to avoid CORS preflight
        try {
            const formBody = new URLSearchParams();
            Object.keys(formData).forEach(key => {
                formBody.append(key, formData[key]);
            });

            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody
            });

            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.log('Simple POST failed, trying JSON with auth...');
        }

        // Fallback to JSON with authorization
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    function setFormLoadingState(isLoading) {
        if (submitBtn) {
            submitBtn.disabled = isLoading;
            submitText.textContent = isLoading ? 'Sending...' : 'Send Message';
        }
    }

    function showFormSuccess() {
        if (successMessage) {
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    }

    function showFormError(message) {
        if (errorMessage && errorText) {
            errorText.textContent = message;
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Enhanced scroll animations with better performance and timeout protection
function initScrollAnimations() {
    // Intersection Observer for fade-in animations with better options
    const observerOptions = {
        threshold: [0, 0.1, 0.2], // Reduced thresholds for better performance
        rootMargin: '0px 0px -50px 0px', // Optimized trigger timing
        root: null
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class with timeout protection
                const timeoutId = setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, 100); // Reduced delay for better performance
                
                // Clean up timeout if element is no longer intersecting
                if (!entry.isIntersecting) {
                    clearTimeout(timeoutId);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const animatedElements = document.querySelectorAll('.section, .about-card, .project-card, .service-card, .skill-item, .blog-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Cleanup observer after 30 seconds to prevent memory leaks and hanging
    setTimeout(() => {
        observer.disconnect();
    }, 30000);
}

// Hero Animation with fallback system
function initHeroAnimation() {
    const nameText = document.querySelector('.name-text');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (nameText) {
        // Simple fade-in animation as fallback
        nameText.style.opacity = '0';
        nameText.style.transform = 'translateY(30px)';
        
        // Fallback animation if main animations fail
        setTimeout(() => {
            nameText.style.transition = 'all 1s ease-out';
            nameText.style.opacity = '1';
            nameText.style.transform = 'translateY(0)';
            
            // After name animation completes, show the tagline
            setTimeout(() => {
                showTagline();
            }, 1000); // Wait 1 second after name animation
        }, 500);
        
        // Add error handling for animation failures
        setTimeout(() => {
            if (nameText.style.opacity === '0') {
                console.log('Applying fallback animation for hero section');
                nameText.style.transition = 'all 1s ease-out';
                nameText.style.opacity = '1';
                nameText.style.transform = 'translateY(0)';
                showTagline();
            }
        }, 3000); // Fallback after 3 seconds
    }
}

// Show tagline after name animation
function showTagline() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        // Ensure the tagline is visible and animated
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroSubtitle.style.transition = 'all 0.8s ease-out';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Enhanced navigation sync with better scroll detection
function updateActiveNavigation(scrollY) {
    if (!horizontalNav) return;
    
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    let minDistance = Infinity;
    
    // Find the closest section to current scroll position
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150; // Better offset for detection
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionCenter = sectionTop + (section.offsetHeight / 2);
        
        // Calculate distance to section center
        const distance = Math.abs(scrollY - sectionCenter);
        
        if (scrollY >= sectionTop && scrollY < sectionBottom && distance < minDistance) {
            minDistance = distance;
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active navigation with smooth transition
    if (currentSection) {
        const navItems = horizontalNav.options.items;
        const currentIndex = navItems.findIndex(item => item.href === `#${currentSection}`);
        
        if (currentIndex !== -1 && currentIndex !== horizontalNav.activeIndex) {
            horizontalNav.setActive(currentIndex);
        }
    }
}

// Synchronize navigation with scroll position using Lenis
lenis.on('scroll', (e) => {
    updateActiveNavigation(e.scroll);
});

// Add smooth scroll behavior to all internal links
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                lenis.scrollTo(targetSection, {
                    offset: -70, // Account for fixed navigation
                    duration: 1.2,
                    easing: (t) => 1 - Math.pow(1 - t, 3), // Smooth cubic easing
                    immediate: false
                });
            }
        });
    });
    
    // Enhanced smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                lenis.scrollTo(targetSection, {
                    offset: -70, // Account for fixed navigation
                    duration: 1.2,
                    easing: (t) => 1 - Math.pow(1 - t, 3), // Smooth cubic easing
                    immediate: false
                });
            }
        });
    });
    
    // Add smooth scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top-btn';
    scrollToTopBtn.title = 'Scroll to top';
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    lenis.on('scroll', (e) => {
        if (e.scroll > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        lenis.scrollTo(0, {
            duration: 1.5,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            immediate: false
        });
    });
    
    // Add smooth scroll for any element with data-smooth-scroll attribute
    const smoothScrollElements = document.querySelectorAll('[data-smooth-scroll]');
    smoothScrollElements.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = element.getAttribute('data-smooth-scroll');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                lenis.scrollTo(targetElement, {
                    offset: -70,
                    duration: 1.2,
                    easing: (t) => 1 - Math.pow(1 - t, 3),
                    immediate: false
                });
            }
        });
    });
});

// Add CSS for enhanced smooth scrolling and scroll-to-top button
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
    /* Enhanced smooth scrolling */
    html {
        scroll-behavior: smooth;
    }
    
    body {
        overflow-x: hidden;
    }
    
    /* Scroll to top button */
    .scroll-to-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, var(--accent-color), #00bcd4);
        color: #000;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(100, 255, 218, 0.3);
    }
    
    .scroll-to-top-btn.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .scroll-to-top-btn:hover {
        transform: translateY(-5px) scale(1.1);
        box-shadow: 0 8px 30px rgba(100, 255, 218, 0.4);
    }
    
    /* Enhanced animation classes */
    .section, .about-card, .project-card, .service-card, .skill-item, .blog-card {
        opacity: 0;
        transform: translateY(40px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform, opacity;
    }
    
    .section.animate-in, .about-card.animate-in, .project-card.animate-in, 
    .service-card.animate-in, .skill-item.animate-in, .blog-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Staggered animations with better timing */
    .about-card:nth-child(1) { transition-delay: 0.1s; }
    .about-card:nth-child(2) { transition-delay: 0.2s; }
    .about-card:nth-child(3) { transition-delay: 0.3s; }
    
    .project-card:nth-child(1) { transition-delay: 0.1s; }
    .project-card:nth-child(2) { transition-delay: 0.2s; }
    .project-card:nth-child(3) { transition-delay: 0.3s; }
    
    .service-card:nth-child(1) { transition-delay: 0.1s; }
    .service-card:nth-child(2) { transition-delay: 0.2s; }
    .service-card:nth-child(3) { transition-delay: 0.3s; }
    
    .skill-item:nth-child(1) { transition-delay: 0.1s; }
    .skill-item:nth-child(2) { transition-delay: 0.2s; }
    .skill-item:nth-child(3) { transition-delay: 0.3s; }
    .skill-item:nth-child(4) { transition-delay: 0.4s; }
    .skill-item:nth-child(5) { transition-delay: 0.5s; }
    .skill-item:nth-child(6) { transition-delay: 0.6s; }
    
    .blog-card:nth-child(1) { transition-delay: 0.1s; }
    .blog-card:nth-child(2) { transition-delay: 0.2s; }
    .blog-card:nth-child(3) { transition-delay: 0.3s; }
    
    /* Mobile optimizations */
    @media (max-width: 768px) {
        .scroll-to-top-btn {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 1rem;
        }
    }
`;
document.head.appendChild(enhancedStyle);
