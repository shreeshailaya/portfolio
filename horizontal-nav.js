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
            ...options
        };
        
        this.activeIndex = 0;
        this.init();
    }
    
    init() {
        this.createNav();
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
        `;
        
        this.navItems = this.container.querySelectorAll('.nav-item');
        this.navLinks = this.container.querySelectorAll('.nav-link');
        this.themeToggle = this.container.querySelector('#themeToggle');
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
        if (index === this.activeIndex) return;
        
        this.activeIndex = index;
        
        // Update active states
        this.navItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        // Smooth scroll to section
        const targetSection = document.querySelector(this.options.items[index].href);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
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
