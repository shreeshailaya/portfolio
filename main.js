import * as THREE from 'three';
import { gsap } from 'gsap';
import anime from 'animejs';
import Text3DSystem from './3d-text.js';

// Global variables
let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let isDarkTheme = true;
let animationId;

// 3D Objects
let interactiveObjects = [];
let particleTrails = [];
let floatingGeometry = [];
let lights = [];
let raycaster, mouse;
let text3DSystem;

// DOM elements
const canvasContainer = document.getElementById('canvasContainer') || null;
const loadingScreen = document.getElementById('loadingScreen') || null;
const themeToggle = document.getElementById('themeToggle') || null;
const cursor = document.getElementById('cursor') || null;
const cursorFollower = document.getElementById('cursorFollower') || null;

// Initialize the application
function init() {
    // Hide loading screen after a short delay (if present)
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
    }

    // Initialize Three.js
    initThreeJS();
    
    // Initialize UI interactions
    initUI();
    
    // Initialize Anime.js animations
    initAnimeJS();
    
    // Start animation loop
    animate();
}

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing...');
    init();
});

// Also check if DOM is already loaded (for cases where script loads after DOM)
if (document.readyState !== 'loading') {
    console.log('DOM already loaded, initializing immediately...');
    init();
}

// Initialize Three.js scene
function initThreeJS() {
    // Create scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 100);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
  
    
    // Initialize raycaster for mouse interactions
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    // Create 3D text system for name
    try {
        text3DSystem = new Text3DSystem(scene, camera, renderer);
        console.log('3D Text System created successfully');
    } catch (error) {
        console.error('Error creating 3D Text System:', error);
    }
    
    // Create interactive 3D objects
    createInteractiveObjects();
    
    // Create floating geometry
    createFloatingGeometry();
    
    // Create particle trails
    createParticleTrails();
    
    // Setup lighting
    setupLighting();
    
    // Add post-processing effects
    addPostProcessing();
}

// Create interactive 3D objects
function createInteractiveObjects() {
    // Create floating cubes
    for (let i = 0; i < 15; i++) {
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshPhongMaterial({
            color: isDarkTheme ? 0x64ffda : 0x007bff,
            transparent: true,
            opacity: 0.7,
            wireframe: Math.random() > 0.5
        });
        
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        cube.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        cube.userData = {
            originalPosition: cube.position.clone(),
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            },
            hovered: false
        };
        
        interactiveObjects.push(cube);
        scene.add(cube);
    }
    
    // Create floating spheres
    for (let i = 0; i < 10; i++) {
        const geometry = new THREE.SphereGeometry(0.3, 16, 16);
        const material = new THREE.MeshPhongMaterial({
            color: isDarkTheme ? 0xff6b6b : 0xff4757,
            transparent: true,
            opacity: 0.6
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 12,
            (Math.random() - 0.5) * 12
        );
        
        sphere.userData = {
            originalPosition: sphere.position.clone(),
            hovered: false,
            pulsePhase: Math.random() * Math.PI * 2
        };
        
        interactiveObjects.push(sphere);
        scene.add(sphere);
    }
    
    // Create torus knots
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.TorusKnotGeometry(0.4, 0.1, 100, 16);
        const material = new THREE.MeshPhongMaterial({
            color: isDarkTheme ? 0x4ecdc4 : 0x2ed573,
            transparent: true,
            opacity: 0.5,
            wireframe: true
        });
        
        const torusKnot = new THREE.Mesh(geometry, material);
        torusKnot.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        
        torusKnot.userData = {
            originalPosition: torusKnot.position.clone(),
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            }
        };
        
        interactiveObjects.push(torusKnot);
        scene.add(torusKnot);
    }
}

// Create floating geometry
function createFloatingGeometry() {
    // Create DNA-like helix
    const helixGeometry = new THREE.BufferGeometry();
    const helixPoints = [];
    const helixColors = [];
    
    for (let i = 0; i < 100; i++) {
        const t = i / 100 * Math.PI * 4;
        const x = Math.cos(t) * 2;
        const y = (i / 100 - 0.5) * 8;
        const z = Math.sin(t) * 2;
        
        helixPoints.push(x, y, z);
        
        const color = new THREE.Color();
        color.setHSL(i / 100, 1, 0.5);
        helixColors.push(color.r, color.g, color.b);
    }
    
    helixGeometry.setAttribute('position', new THREE.Float32BufferAttribute(helixPoints, 3));
    helixGeometry.setAttribute('color', new THREE.Float32BufferAttribute(helixColors, 3));
    
    const helixMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.6
    });
    
    const helix = new THREE.Line(helixGeometry, helixMaterial);
    helix.position.set(8, 0, 0);
    floatingGeometry.push(helix);
    scene.add(helix);
    
    // Create particle field
    const fieldGeometry = new THREE.BufferGeometry();
    const fieldPoints = [];
    const fieldColors = [];
    
    for (let i = 0; i < 500; i++) {
        const x = (Math.random() - 0.5) * 40;
        const y = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 20;
        
        fieldPoints.push(x, y, z);
        
        const color = new THREE.Color();
        color.setHSL(Math.random(), 0.8, 0.6);
        fieldColors.push(color.r, color.g, color.b);
    }
    
    fieldGeometry.setAttribute('position', new THREE.Float32BufferAttribute(fieldPoints, 3));
    fieldGeometry.setAttribute('color', new THREE.Float32BufferAttribute(fieldColors, 3));
    
    const fieldMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });
    
    const field = new THREE.Points(fieldGeometry, fieldMaterial);
    field.position.set(-8, 0, 0);
    floatingGeometry.push(field);
    scene.add(field);
}

// Create particle trails
function createParticleTrails() {
    for (let i = 0; i < 20; i++) {
        const trailGeometry = new THREE.BufferGeometry();
        const trailPoints = [];
        const trailColors = [];
        
        for (let j = 0; j < 50; j++) {
            trailPoints.push(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            );
            
            const color = new THREE.Color();
            color.setHSL(Math.random(), 1, 0.7);
            trailColors.push(color.r, color.g, color.b);
        }
        
        trailGeometry.setAttribute('position', new THREE.Float32BufferAttribute(trailPoints, 3));
        trailGeometry.setAttribute('color', new THREE.Float32BufferAttribute(trailColors, 3));
        
        const trailMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.3
        });
        
        const trail = new THREE.Line(trailGeometry, trailMaterial);
        trail.userData = {
            speed: Math.random() * 0.02 + 0.01,
            direction: new THREE.Vector3(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            ).normalize()
        };
        
        particleTrails.push(trail);
        scene.add(trail);
    }
}

// Setup lighting
function setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);
    lights.push(ambientLight);
    
    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    lights.push(directionalLight);
    
    // Point lights
    for (let i = 0; i < 3; i++) {
        const pointLight = new THREE.PointLight(
            isDarkTheme ? 0x64ffda : 0x007bff,
            0.5,
            20
        );
        pointLight.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        pointLight.userData = {
            originalPosition: pointLight.position.clone(),
            speed: Math.random() * 0.02 + 0.01
        };
        scene.add(pointLight);
        lights.push(pointLight);
    }
    
    // Spot light
    const spotLight = new THREE.SpotLight(0xffffff, 0.3);
    spotLight.position.set(0, 10, 0);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.1;
    spotLight.decay = 2;
    spotLight.distance = 50;
    scene.add(spotLight);
    lights.push(spotLight);
}

// Add post-processing effects (simplified)
function addPostProcessing() {
    // Post-processing effects can be added here later if needed
    // For now, keeping it simple to avoid build issues
    console.log('Post-processing initialized (simplified)');
}

// Initialize Anime.js animations
function initAnimeJS() {
    // Animate statistics numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        
        anime({
            targets: stat,
            innerHTML: [0, target],
            round: 1,
            duration: 2000,
            easing: 'easeOutExpo',
            delay: anime.stagger(200)
        });
    });

    // Animate skill items on hover
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            anime({
                targets: item,
                scale: 1.1,
                rotateY: 10,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            anime({
                targets: item,
                scale: 1,
                rotateY: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        anime({
            targets: card,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800,
            delay: index * 200,
            easing: 'easeOutQuad'
        });
    });

    // Animate about cards
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach((card, index) => {
        anime({
            targets: card,
            translateX: [index % 2 === 0 ? -50 : 50, 0],
            opacity: [0, 1],
            duration: 800,
            delay: index * 300,
            easing: 'easeOutQuad'
        });
    });
}

// Initialize UI interactions
function initUI() {
    // Theme toggle
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    
    // Mouse movement for cursor and particles
    document.addEventListener('mousemove', onMouseMove);
    
    // Click animations
    document.addEventListener('click', createClickRipple);
    
    // Mouse interactions with 3D objects
    document.addEventListener('mousemove', onMouseMove3D);
    document.addEventListener('click', onMouseClick3D);
    
    // Scroll animations
    initScrollAnimations();
    
    // Navigation
    initNavigation();
    
    // Form submission
    initContactForm();
    
    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', (event) => {
            createClickRipple(event);
            anime({
                targets: card,
                scale: [1, 1.05, 1],
                duration: 300,
                easing: 'easeInOutQuad'
            });
        });
    });
    
    // Skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('click', (event) => {
            createClickRipple(event);
            anime({
                targets: item,
                rotateY: [0, 360],
                duration: 600,
                easing: 'easeInOutQuad'
            });
        });
    });

    // Social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            anime({
                targets: link,
                rotate: 360,
                scale: 1.2,
                duration: 400,
                easing: 'easeOutQuad'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            anime({
                targets: link,
                rotate: 0,
                scale: 1,
                duration: 400,
                easing: 'easeOutQuad'
            });
        });
    });
}

// 3D Mouse movement handler
function onMouseMove3D(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects);
    
    // Reset all objects
    interactiveObjects.forEach(obj => {
        if (obj.userData.hovered) {
            obj.userData.hovered = false;
            obj.scale.setScalar(1);
            obj.material.opacity = 0.7;
        }
    });
    
    // Highlight intersected objects
    intersects.forEach(intersect => {
        intersect.object.userData.hovered = true;
        intersect.object.scale.setScalar(1.5);
        intersect.object.material.opacity = 1;
    });
    

}

// 3D Mouse click handler
function onMouseClick3D(event) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects);
    
    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        
        // Create explosion effect
        createExplosion(clickedObject.position);
        
        // Animate the clicked object
        anime({
            targets: clickedObject.rotation,
            x: clickedObject.rotation.x + Math.PI * 2,
            y: clickedObject.rotation.y + Math.PI * 2,
            duration: 1000,
            easing: 'easeInOutQuad'
        });
    }
}

// Create explosion effect
function createExplosion(position) {
    for (let i = 0; i < 20; i++) {
        const geometry = new THREE.SphereGeometry(0.05, 8, 8);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(Math.random(), 1, 0.7),
            transparent: true,
            opacity: 1
        });
        
        const particle = new THREE.Mesh(geometry, material);
        particle.position.copy(position);
        
        const velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.2
        );
        
        particle.userData = {
            velocity: velocity,
            life: 1.0
        };
        
        scene.add(particle);
        
        // Animate particle
        anime({
            targets: particle.userData,
            life: 0,
            duration: 1000,
            easing: 'easeOutQuad',
            update: () => {
                particle.position.add(velocity);
                particle.material.opacity = particle.userData.life;
                particle.scale.setScalar(particle.userData.life);
            },
            complete: () => {
                scene.remove(particle);
            }
        });
    }
}

// Theme toggle functionality
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    
    // Animate theme transition
    anime({
        targets: 'body',
        backgroundColor: isDarkTheme ? '#0a0a0a' : '#ffffff',
        color: isDarkTheme ? '#ffffff' : '#1a1a1a',
        duration: 500,
        easing: 'easeInOutQuad'
    });
    
    // Update interactive objects colors
    interactiveObjects.forEach(obj => {
        const newColor = isDarkTheme ? 0x64ffda : 0x007bff;
        anime({
            targets: obj.material.color,
            r: new THREE.Color(newColor).r,
            g: new THREE.Color(newColor).g,
            b: new THREE.Color(newColor).b,
            duration: 500,
            easing: 'easeInOutQuad'
        });
    });
    
    // Update 3D text system theme
    if (text3DSystem) {
        text3DSystem.updateTheme(isDarkTheme);
    }
    


    // Animate theme toggle button
    anime({
        targets: themeToggle,
        rotateY: [0, 180],
        duration: 400,
        easing: 'easeInOutQuad'
    });
}

// Mouse movement handler
function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
    
    // Update custom cursor
    if (cursor) {
        cursor.style.left = event.clientX + 'px';
        cursor.style.top = event.clientY + 'px';
    }
    
    if (cursorFollower) {
        gsap.to(cursorFollower, {
            left: event.clientX - 20 + 'px',
            top: event.clientY - 20 + 'px',
            duration: 0.3
        });
    }
    
    // Update 3D text system based on mouse position
    if (text3DSystem) {
        // Add subtle camera movement for 3D text
        camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
    }
}

// Create click ripple effect
function createClickRipple(event) {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = (event.clientX - 50) + 'px';
    ripple.style.top = (event.clientY - 50) + 'px';
    document.body.appendChild(ripple);
    
    anime({
        targets: ripple,
        scale: [0, 1],
        opacity: [1, 0],
        duration: 600,
        easing: 'easeOutQuad',
        complete: () => {
            ripple.remove();
        }
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add Anime.js animations for elements in view
                const animatedElements = entry.target.querySelectorAll('.fade-in');
                animatedElements.forEach((el, index) => {
                    anime({
                        targets: el,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        delay: index * 100,
                        easing: 'easeOutQuad'
                    });
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections for fade-in animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Initialize navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                

            }
        });
    });
    
    // Update active navigation based on scroll position
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + window.innerHeight / 2;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index]?.classList.add('active');
                
                // Animate active nav link
                anime({
                    targets: navLinks[index],
                    scale: [1, 1.1, 1],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
                

            }
        });
    });
}

// Initialize contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    console.log('Initializing contact form:', contactForm);
    
    if (contactForm) {
        // Ensure no duplicate listeners then attach one canonical handler
        contactForm.removeEventListener('submit', handleFormSubmit);
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Optional: also handle button click
        const submitBtn = contactForm.querySelector('#submitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                // Let the form submit handler run; also guard against Enter default
                if (e) e.preventDefault();
                contactForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
            });
        }
        
        console.log('Contact form initialized');
        
    } else {
        console.error('Contact form not found!');
    }
}

// Handle form submission
async function handleFormSubmit(event) {
    console.log('Form submission started');
    
    // CRITICAL: Prevent default form submission
    if (event) event.preventDefault();
    
    // Get form elements
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const submitText = submitBtn.querySelector('#submitText');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Hide any existing messages
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
    
    // Get form data
    const formData = {
        name: form.querySelector('#name').value.trim(),
        email: form.querySelector('#email').value.trim(),
        message: form.querySelector('#message').value.trim(),
        send_to_email: import.meta.env.VITE_SEND_TO_EMAIL || 's.r.vitkar55@gmail.com',
        source: import.meta.env.VITE_SOURCE || 'helloshree.com'
    };
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
        showFormError('Please fill in all required fields.');
        return;
    }
    
    if (!isValidEmail(formData.email)) {
        showFormError('Please enter a valid email address.');
        return;
    }
    
    // Show loading state
    setFormLoadingState(true, submitBtn, submitText);
    
    try {
        // Multiple CORS handling strategies
        const apiUrl = import.meta.env.VITE_API_ENDPOINT || 'https://api-hub-apihub-pg3atw-515a65-38-242-229-21.traefik.me/contact';
        const isDevelopment = import.meta.env.DEV;
        
        let response;
        let attemptMethod = 'direct';
        
        // Strategy 1: Simple POST without preflight (form-encoded data)
        try {
            console.log('Attempting simple POST request...');
            
            // Convert to form data to avoid preflight
            const formDataEncoded = new URLSearchParams();
            Object.keys(formData).forEach(key => {
                formDataEncoded.append(key, formData[key]);
            });
            
            response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    // No Authorization header to avoid preflight
                },
                body: formDataEncoded
            });
            
            if (response.ok) {
                console.log('Simple POST request successful');
                attemptMethod = 'simple-post';
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
        } catch (simpleError) {
            console.log('Simple POST failed:', simpleError.message);
            
            // Strategy 2: JSON POST with Authorization (will trigger preflight)
            try {
                console.log('Attempting JSON POST with Authorization...');
                response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${import.meta.env.VITE_API_BEARER_TOKEN || 'YOUR_BEARER_TOKEN_HERE'}`
                    },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    console.log('JSON POST with Authorization successful');
                    attemptMethod = 'json-with-auth';
                } else {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
            } catch (jsonError) {
                console.log('JSON POST with Authorization failed:', jsonError.message);
                
                // Strategy 3: Final fallback
                console.log('All API attempts failed');
                throw new Error('Unable to reach the API server. Please check your connection and try again later.');
            }
        }
        
        // Process the successful response
        if (response && response.ok) {
            try {
                const result = await response.json();
                console.log('API Response:', result);
                
                if (result.success) {
                    showFormSuccess(successMessage, errorMessage, result.message);
                    form.reset();
                } else {
                    showFormError(result.message || 'Submission failed. Please try again.');
                }
            } catch (parseError) {
                console.log('Response parsing failed, treating as success');
                // If we can't parse JSON but got a 200 response, assume success
                showFormSuccess(successMessage, errorMessage, 'Message sent successfully!');
                form.reset();
            }
        } else {
            throw new Error(`HTTP error! status: ${response?.status || 'unknown'}`);
        }
        
    } catch (error) {
        console.error('Error sending message:', error);
        
        let userErrorMessage = 'Network error. Please check your connection and try again.';
        
        if (error.message.includes('405')) {
            userErrorMessage = 'Server configuration error: Method not allowed. Please try again later.';
        } else if (error.message.includes('403')) {
            userErrorMessage = 'Access forbidden. Please check your credentials or try again later.';
        } else if (error.message.includes('Unable to reach the API server')) {
            userErrorMessage = 'Unable to reach the server. Please check your connection and try again later.';
        }
        
        showFormError(userErrorMessage);
    } finally {
        setFormLoadingState(false, submitBtn, submitText);
    }
}

function setFormLoadingState(loading, submitBtn, submitText) {
    if (loading) {
        submitBtn.classList.add('loading');
        submitText.textContent = 'Sending...';
        submitBtn.disabled = true;
    } else {
        submitBtn.classList.remove('loading');
        submitText.textContent = 'Send Message';
        submitBtn.disabled = false;
    }
}

function showFormSuccess(successMessage, errorMessage, customMessage = null) {
    if (successMessage) {
        // Update success message with custom text if provided
        if (customMessage) {
            const successText = successMessage.querySelector('p');
            if (successText) {
                successText.textContent = customMessage;
            }
        }
        successMessage.style.display = 'block';
    }
    if (errorMessage) errorMessage.style.display = 'none';
    
    // Scroll to success message
    if (successMessage) {
        successMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
}

function showFormError(message) {
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    if (errorMessage && errorText) {
        errorText.textContent = message;
        errorMessage.style.display = 'block';
        
        // Scroll to error message
        errorMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
