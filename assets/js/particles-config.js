// Configuration des couleurs cyberpunk
const cyberpunkColors = {
    primary: '#0ff',
    secondary: '#f0f',
    accent: '#93f',
    dark: '#000',
    light: '#fff'
};

// Configuration principale de particles.js
particlesJS("particles-js", {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: [cyberpunkColors.primary, cyberpunkColors.secondary, cyberpunkColors.accent]
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: cyberpunkColors.dark
            }
        },
        opacity: {
            value: 0.6,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 4,
                size_min: 0.3,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: cyberpunkColors.primary,
            opacity: 0.4,
            width: 1,
            shadow: {
                enable: true,
                color: cyberpunkColors.primary,
                blur: 5
            }
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "bounce",
            bounce: true,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "window", // Changé de "canvas" à "window" pour une meilleure détection
        events: {
            onhover: {
                enable: true,
                mode: ["grab", "repulse", "bubble"] // Ajout de plusieurs modes
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 200, // Augmenté pour une meilleure visibilité
                line_linked: {
                    opacity: 1,
                    color: cyberpunkColors.secondary
                }
            },
            bubble: {
                distance: 250,
                size: 6,
                duration: 0.3,
                opacity: 0.8,
                speed: 3
            },
            repulse: {
                distance: 150,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// Gestion des événements de la souris
const mouseHandler = {
    pos: { x: 0, y: 0 },
    status: 'leave',
    clickPos: { x: 0, y: 0 },
    clickTime: null
};

// Mise à jour améliorée de la position de la souris
document.addEventListener('mousemove', function(e) {
    if (window.pJSDom && window.pJSDom[0]) {
        const pJS = window.pJSDom[0].pJS;

        // Mise à jour de la position
        mouseHandler.pos.x = e.clientX;
        mouseHandler.pos.y = e.clientY;

        // Mise à jour de pJS
        pJS.interactivity.mouse.pos_x = e.clientX;
        pJS.interactivity.mouse.pos_y = e.clientY;
        pJS.interactivity.status = 'mousemove';

        // Effet de répulsion amélioré
        if (pJS.particles && pJS.particles.array) {
            pJS.particles.array.forEach(particle => {
                const dx = particle.x - e.clientX;
                const dy = particle.y - e.clientY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    const force = (100 - dist) / 10;
                    particle.vx += (dx / dist) * force * 0.2;
                    particle.vy += (dy / dist) * force * 0.2;
                }
            });
        }
    }
});

// Effet au clic amélioré
document.addEventListener('click', function(e) {
    if (window.pJSDom && window.pJSDom[0]) {
        const pJS = window.pJSDom[0].pJS;
        mouseHandler.clickPos.x = e.clientX;
        mouseHandler.clickPos.y = e.clientY;
        mouseHandler.clickTime = new Date().getTime();

        // Effet d'onde de choc
        pJS.particles.array.forEach(particle => {
            const dx = particle.x - e.clientX;
            const dy = particle.y - e.clientY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const force = (150 - dist) / 10;
                particle.vx = (dx / dist) * force;
                particle.vy = (dy / dist) * force;

                // Effet de couleur au clic
                particle.color = cyberpunkColors.secondary;
            }
        });

        // Ajouter de nouvelles particules au clic
        for (let i = 0; i < 4; i++) {
            pJS.particles.array.push(pJS.fn.modes.pushParticles(1, {
                pos_x: e.clientX,
                pos_y: e.clientY
            }));
        }
    }
});

// Optimisation des performances
let lastTime = 0;
const maxFPS = 60;
const frameDelay = 1000 / maxFPS;

// Animation fluide des particules avec gestion de la souris
function animateParticles(timestamp) {
    if (timestamp - lastTime < frameDelay) {
        requestAnimationFrame(animateParticles);
        return;
    }
    lastTime = timestamp;

    if (window.pJSDom && window.pJSDom[0]) {
        const pJS = window.pJSDom[0].pJS;
        pJS.fn.particlesUpdate();

        // Mise à jour des interactions souris
        if (mouseHandler.status === 'mousemove') {
            pJS.interactivity.el.dispatchEvent(new MouseEvent('mousemove', {
                clientX: mouseHandler.pos.x,
                clientY: mouseHandler.pos.y
            }));
        }
    }

    requestAnimationFrame(animateParticles);
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Démarrer l'animation
    requestAnimationFrame(animateParticles);
    initializeParticleEvents();
    console.log('Particles.js initialized with enhanced mouse interaction');
});

