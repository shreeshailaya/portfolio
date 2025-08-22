import HorizontalNav from './horizontal-nav.js';

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
            ],
            particleCount: 15,
            particleDistances: [90, 10],
            particleR: 100,
            initialActiveIndex: 0,
            animationTime: 600,
            timeVariance: 300,
            colors: [1, 2, 3, 1, 2, 3, 1, 4]
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

// Scroll Animations
function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const animatedElements = document.querySelectorAll('.section, .about-card, .project-card, .service-card, .skill-item, .blog-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Hero Animation
function initHeroAnimation() {
    const nameText = document.querySelector('.name-text');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (nameText) {
        // Simple fade-in animation
        nameText.style.opacity = '0';
        nameText.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            nameText.style.transition = 'all 1s ease-out';
            nameText.style.opacity = '1';
            nameText.style.transform = 'translateY(0)';
        }, 500);
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroSubtitle.style.transition = 'all 0.8s ease-out 0.3s';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 800);
    }
}

// Update active navigation based on scroll position
window.addEventListener('scroll', () => {
    if (horizontalNav) {
        const scrollPos = window.scrollY + window.innerHeight / 3;
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Find the index of the current section
        const navItems = horizontalNav.options.items;
        const currentIndex = navItems.findIndex(item => item.href === `#${currentSection}`);
        
        if (currentIndex !== -1 && currentIndex !== horizontalNav.activeIndex) {
            horizontalNav.setActive(currentIndex);
        }
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .section, .about-card, .project-card, .service-card, .skill-item, .blog-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    
    .section.animate-in, .about-card.animate-in, .project-card.animate-in, 
    .service-card.animate-in, .skill-item.animate-in, .blog-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
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
`;
document.head.appendChild(style);
