// Horizontal Navigation Component
class HorizontalNav {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
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
            colors: [1, 2, 3, 1, 2, 3, 1, 4],
            ...options
        };
        
        this.activeIndex = this.options.initialActiveIndex;
        this.particles = [];
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.createNav();
        this.createParticles();
        this.bindEvents();
        this.setActive(this.activeIndex);
    }
    
    createNav() {
        this.container.innerHTML = `
            <div class="horizontal-nav-wrapper">
                <div class="nav-brand">
                    <span>SV</span>
                </div>
                <ul class="nav-menu">
                    ${this.options.items.map((item, index) => `
                        <li class="nav-item" data-index="${index}">
                            <a href="${item.href}" class="nav-link" title="${item.label}">
                                <i class="${item.icon}"></i>
                                <span class="nav-label">${item.label}</span>
                            </a>
                        </li>
                    `).join('')}
                </ul>
                <button id="themeToggle" class="theme-toggle" title="Toggle Theme">
                    <i class="fas fa-moon"></i>
                </button>
            </div>
            <div class="nav-particles" id="navParticles"></div>
        `;
        
        this.navItems = this.container.querySelectorAll('.nav-item');
        this.navLinks = this.container.querySelectorAll('.nav-link');
        this.themeToggle = this.container.querySelector('#themeToggle');
    }
    
    createParticles() {
        const particlesContainer = this.container.querySelector('#navParticles');
        
        for (let i = 0; i < this.options.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'nav-particle';
            particle.style.setProperty('--particle-index', i);
            
            const angle = (i / this.options.particleCount) * Math.PI * 2;
            const distance = this.options.particleDistances[Math.floor(Math.random() * this.options.particleDistances.length)];
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            particle.style.setProperty('--particle-x', x);
            particle.style.setProperty('--particle-y', y);
            particle.style.setProperty('--particle-color', this.options.colors[i % this.options.colors.length]);
            
            particlesContainer.appendChild(particle);
            this.particles.push(particle);
        }
    }
    
    bindEvents() {
        this.navItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.setActive(index);
            });
        });
        
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
    
    setActive(index) {
        if (this.isAnimating || index === this.activeIndex) return;
        
        this.isAnimating = true;
        const prevActive = this.activeIndex;
        this.activeIndex = index;
        
        // Update active states
        this.navItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        // Animate particles
        this.animateParticles(index, prevActive);
        
        // Smooth scroll to section
        const targetSection = document.querySelector(this.options.items[index].href);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        setTimeout(() => {
            this.isAnimating = false;
        }, this.options.animationTime);
    }
    
    animateParticles(activeIndex, prevIndex) {
        const activeItem = this.navItems[activeIndex];
        const activeRect = activeItem.getBoundingClientRect();
        const navRect = this.container.getBoundingClientRect();
        
        const centerX = activeRect.left + activeRect.width / 2 - navRect.left;
        const centerY = activeRect.top + activeRect.height / 2 - navRect.top;
        
        this.particles.forEach((particle, i) => {
            const delay = (i * this.options.timeVariance) / this.options.particleCount;
            
            // Animate to active position
            particle.style.transition = `all ${this.options.animationTime}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`;
            particle.style.transform = `translate(${centerX}px, ${centerY}px) scale(1.5)`;
            particle.style.opacity = '0.8';
            
            // Reset after animation
            setTimeout(() => {
                particle.style.transition = 'all 0.3s ease';
                particle.style.transform = 'translate(0, 0) scale(1)';
                particle.style.opacity = '0.3';
            }, this.options.animationTime + delay);
        });
    }
    
    toggleTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        
        const icon = this.themeToggle.querySelector('i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        
        // Animate theme toggle
        this.themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    }
}

// Export for use in main.js
export default HorizontalNav;
