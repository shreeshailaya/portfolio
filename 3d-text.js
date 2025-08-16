import * as THREE from 'three';

// 3D Text System
class Text3DSystem {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.letters = [];
        this.textParticles = [];
        this.isDarkTheme = true;
        
        this.init();
    }
    
    init() {
        this.create3DText();
        this.createLetterParticles();
        this.createTextEffects();
    }
    
    create3DText() {
        const name = "Shreeshail Vitkar";
        const letterSpacing = 1.0;
        
        for (let i = 0; i < name.length; i++) {
            const letter = name[i];
            if (letter === ' ') continue;
            
            // Create a simple 3D letter using basic geometry
            const letterGroup = this.createSimpleLetter(letter, i);
            const xPos = (i - name.length / 2) * letterSpacing;
            letterGroup.position.set(xPos, 0, 0);
            
            // Add glow effect
            const glowGroup = this.createSimpleLetter(letter, i, true);
            glowGroup.position.copy(letterGroup.position);
            glowGroup.scale.set(1.3, 1.3, 1.3);
            
            letterGroup.userData = {
                originalPosition: letterGroup.position.clone(),
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.01
                },
                floatSpeed: Math.random() * 0.01 + 0.005,
                floatPhase: Math.random() * Math.PI * 2,
                glowGroup: glowGroup
            };
            
            this.letters.push(letterGroup);
            this.scene.add(letterGroup);
            this.scene.add(glowGroup);
        }
    }
    
    createSimpleLetter(letter, index, isGlow = false) {
        const group = new THREE.Group();
        
        // Create material
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(index / 15, 1, 0.6),
            transparent: true,
            opacity: isGlow ? 0.2 : 0.9,
            shininess: 100
        });
        
        // Create letter shape using simple boxes
        const letterShape = this.getLetterShape(letter);
        
        letterShape.forEach(segment => {
            const geometry = new THREE.BoxGeometry(segment.width, segment.height, 0.2);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(segment.x, segment.y, 0);
            if (segment.rotation) {
                mesh.rotation.z = segment.rotation;
            }
            group.add(mesh);
        });
        
        return group;
    }
    
    getLetterShape(letter) {
        const shapes = {
            'S': [
                { x: 0, y: 0.3, width: 0.4, height: 0.1 },
                { x: 0.15, y: 0.15, width: 0.1, height: 0.2 },
                { x: 0, y: 0, width: 0.4, height: 0.1 },
                { x: -0.15, y: -0.15, width: 0.1, height: 0.2 },
                { x: 0, y: -0.3, width: 0.4, height: 0.1 }
            ],
            'H': [
                { x: -0.2, y: 0, width: 0.1, height: 0.7 },
                { x: 0.2, y: 0, width: 0.1, height: 0.7 },
                { x: 0, y: 0, width: 0.5, height: 0.1 }
            ],
            'R': [
                { x: -0.2, y: 0, width: 0.1, height: 0.7 },
                { x: 0, y: 0.3, width: 0.4, height: 0.1 },
                { x: 0.15, y: 0.15, width: 0.1, height: 0.2 },
                { x: 0, y: 0, width: 0.4, height: 0.1 },
                { x: 0.15, y: -0.2, width: 0.1, height: 0.4, rotation: -0.3 }
            ],
            'E': [
                { x: -0.2, y: 0, width: 0.1, height: 0.7 },
                { x: 0, y: 0.3, width: 0.5, height: 0.1 },
                { x: 0, y: 0, width: 0.4, height: 0.1 },
                { x: 0, y: -0.3, width: 0.5, height: 0.1 }
            ],
            'A': [
                { x: -0.15, y: 0, width: 0.1, height: 0.7, rotation: 0.2 },
                { x: 0.15, y: 0, width: 0.1, height: 0.7, rotation: -0.2 },
                { x: 0, y: 0.1, width: 0.3, height: 0.1 }
            ],
            'I': [
                { x: 0, y: 0, width: 0.1, height: 0.7 }
            ],
            'L': [
                { x: -0.2, y: 0, width: 0.1, height: 0.7 },
                { x: 0, y: -0.3, width: 0.5, height: 0.1 }
            ],
            'V': [
                { x: -0.15, y: 0.1, width: 0.1, height: 0.6, rotation: 0.2 },
                { x: 0.15, y: 0.1, width: 0.1, height: 0.6, rotation: -0.2 }
            ],
            'T': [
                { x: 0, y: 0.3, width: 0.6, height: 0.1 },
                { x: 0, y: -0.05, width: 0.1, height: 0.6 }
            ],
            'K': [
                { x: -0.2, y: 0, width: 0.1, height: 0.7 },
                { x: 0.15, y: 0.2, width: 0.1, height: 0.3, rotation: 0.5 },
                { x: 0.15, y: -0.2, width: 0.1, height: 0.3, rotation: -0.5 }
            ]
        };
        
        return shapes[letter.toUpperCase()] || [
            { x: 0, y: 0, width: 0.3, height: 0.6 }
        ];
    }
    
    createLetterParticles() {
        if (!this.letters.length) return;
        
        for (let i = 0; i < 100; i++) {
            const geometry = new THREE.SphereGeometry(0.02, 8, 8);
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), 1, 0.7),
                transparent: true,
                opacity: 0.6
            });
            
            const particle = new THREE.Mesh(geometry, material);
            
            const letterIndex = Math.floor(Math.random() * this.letters.length);
            const letter = this.letters[letterIndex];
            const radius = 1.0 + Math.random() * 0.5;
            const angle = Math.random() * Math.PI * 2;
            
            particle.position.set(
                letter.position.x + Math.cos(angle) * radius,
                letter.position.y + Math.sin(angle) * radius,
                letter.position.z + (Math.random() - 0.5) * 0.5
            );
            
            particle.userData = {
                letterIndex: letterIndex,
                radius: radius,
                angle: angle,
                speed: Math.random() * 0.02 + 0.01
            };
            
            this.textParticles.push(particle);
            this.scene.add(particle);
        }
    }
    
    createTextEffects() {
        // Create energy beams around text
        for (let i = 0; i < 6; i++) {
            const geometry = new THREE.CylinderGeometry(0.01, 0.01, 8, 8);
            const material = new THREE.MeshBasicMaterial({
                color: this.isDarkTheme ? 0x64ffda : 0x007bff,
                transparent: true,
                opacity: 0.3
            });
            
            const beam = new THREE.Mesh(geometry, material);
            const angle = (i / 6) * Math.PI * 2;
            const radius = 4;
            
            beam.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                0
            );
            beam.rotation.z = angle + Math.PI / 2;
            
            beam.userData = {
                originalAngle: angle,
                radius: radius,
                speed: 0.01
            };
            
            this.scene.add(beam);
        }
    }
    
    update(time) {
        // Animate letters
        this.letters.forEach((letter, index) => {
            // Rotate letters
            letter.rotation.x += letter.userData.rotationSpeed.x;
            letter.rotation.y += letter.userData.rotationSpeed.y;
            letter.rotation.z += letter.userData.rotationSpeed.z;
            
            // Float letters
            letter.position.y = letter.userData.originalPosition.y + 
                Math.sin(time * letter.userData.floatSpeed + letter.userData.floatPhase) * 0.2;
            
            // Scale letters with time
            const scale = 1 + Math.sin(time * 2 + index) * 0.05;
            letter.scale.setScalar(scale);
            
            // Update glow
            if (letter.userData.glowGroup) {
                const glowGroup = letter.userData.glowGroup;
                glowGroup.position.copy(letter.position);
                glowGroup.rotation.copy(letter.rotation);
                glowGroup.scale.setScalar(scale * 1.3);
                
                glowGroup.children.forEach(child => {
                    child.material.opacity = 0.2 + Math.sin(time * 2 + index) * 0.1;
                });
            }
        });
        
        // Animate particles
        this.textParticles.forEach(particle => {
            const letter = this.letters[particle.userData.letterIndex];
            if (letter) {
                particle.userData.angle += particle.userData.speed;
                
                particle.position.x = letter.position.x + 
                    Math.cos(particle.userData.angle) * particle.userData.radius;
                particle.position.y = letter.position.y + 
                    Math.sin(particle.userData.angle) * particle.userData.radius;
                particle.position.z = letter.position.z + 
                    Math.sin(time + particle.userData.angle) * 0.2;
                
                const pulse = 0.5 + Math.sin(time * 3 + particle.userData.angle) * 0.5;
                particle.material.opacity = pulse * 0.6;
            }
        });
    }
    
    updateTheme(isDark) {
        this.isDarkTheme = isDark;
        
        this.letters.forEach((letter, index) => {
            const hue = index / this.letters.length;
            const color = new THREE.Color().setHSL(hue, 1, isDark ? 0.6 : 0.5);

            letter.children.forEach(child => {
                child.material.color = color;
            });
            
            if (letter.userData.glowGroup) {
                letter.userData.glowGroup.children.forEach(child => {
                    child.material.color = color;
                });
            }
        });
    }
}

export default Text3DSystem; 