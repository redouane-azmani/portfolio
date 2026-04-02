    // Configuration initiale
    document.addEventListener('DOMContentLoaded', function() {
        initParticles();
        initCustomCursor();
        initScrollAnimations();
        initSmoothScroll();
        initLoadingScreen();
        initContactForm();
    });


    // Initialisation des particles
    function initParticles() {
        particlesJS.load('particles-js', 'assets/js/particles-config.js', function() {
            console.log('Particles.js chargé');
        });
    }

    // Initialisation du curseur personnalisé
    function initCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        if (!cursor || !cursorFollower) return;

        let cursorPosition = { x: 0, y: 0 };
        let followerPosition = { x: 0, y: 0 };
        let isMoving = false;

        // Gestion du mouvement fluide du curseur
        document.addEventListener('mousemove', (e) => {
            cursorPosition.x = e.pageX;
            cursorPosition.y = e.pageY;

            // Démarrer l'animation si ce n'est pas déjà fait
            if (!isMoving) {
                isMoving = true;
                requestAnimationFrame(updateCursor);
            }
        });

        function updateCursor() {
            // Animation fluide du suiveur
            followerPosition.x += (cursorPosition.x - followerPosition.x) * 0.1;
            followerPosition.y += (cursorPosition.y - followerPosition.y) * 0.1;

            // Mise à jour des positions
            cursor.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
            cursorFollower.style.transform = `translate(${followerPosition.x}px, ${followerPosition.y}px)`;

            // Continuer l'animation si le curseur bouge encore
            if (
                Math.abs(cursorPosition.x - followerPosition.x) > 0.1 ||
                Math.abs(cursorPosition.y - followerPosition.y) > 0.1
            ) {
                requestAnimationFrame(updateCursor);
            } else {
                isMoving = false;
            }
        }

        // Effet hover sur les éléments interactifs
        const interactiveElements = document.querySelectorAll('a, button, .interactive');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorFollower.classList.add('cursor-hover');
            });

            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorFollower.classList.remove('cursor-hover');
            });
        });
    }

    // Initialisation des animations au scroll
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Désactiver l'observation une fois l'animation déclenchée
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section, .animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    }

    // Initialisation du smooth scroll
    function initSmoothScroll() {
        document.querySelectorAll('nav a, .scroll-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (!targetId || targetId === '#') return;

                const targetSection = document.querySelector(targetId);
                if (!targetSection) return;

                const headerOffset = 60;
                const targetPosition = targetSection.offsetTop - headerOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    // Gestion de l'écran de chargement
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const initials = document.getElementById('initials');

        if (!loadingScreen || !initials) return;

        // Masquer l'écran de chargement quand tout est prêt
        window.addEventListener('load', () => {
            setTimeout(() => {
                initials.style.animation = 'none';
                loadingScreen.style.opacity = '0';

                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.classList.add('loaded');
                    // Déclencher les animations d'entrée
                    document.querySelectorAll('.fade-in').forEach((element, index) => {
                        element.style.animationDelay = `${index * 0.2}s`;
                        element.classList.add('visible');
                    });
                }, 500);
            }, 2000);
        });
    }

    // Initialisation du formulaire de contact
    function initContactForm() {
        const form = document.querySelector('#contact-form');
        console.log('Initialisation du formulaire de contact');

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                console.log('Soumission du formulaire détectée');

                // Récupérer les données du formulaire en utilisant les IDs
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                };

                console.log('Données du formulaire:', formData);

                // Vérification des champs requis
                if (!formData.name || !formData.email || !formData.message) {
                    console.error('❌ Tous les champs sont requis');
                    alert('Veuillez remplir tous les champs');
                    return;
                }

                // Vérification basique du format email
                if (!formData.email.includes('@')) {
                    console.error('❌ Format d\'email invalide');
                    alert('Veuillez entrer une adresse email valide');
                    return;
                }

                try {
                    console.log('Tentative d\'envoi au serveur...');
                    const submitButton = form.querySelector('button[type="submit"]');
                    submitButton.disabled = true;
                    submitButton.textContent = 'Envoi en cours...';

                    const response = await fetch('/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    const data = await response.json();
                    console.log('Réponse du serveur:', data);

                    if (response.ok) {
                        console.log('✅ Message envoyé avec succès!');
                        alert('Message envoyé avec succès!');
                        form.reset();

                        // Réinitialiser l'état des labels
                        form.querySelectorAll('label').forEach(label => {
                            label.classList.remove('active');
                        });
                    } else {
                        console.error('❌ Erreur lors de l\'envoi:', data.error);
                        alert('Erreur lors de l\'envoi du message: ' + data.error);
                    }
                } catch (error) {
                    console.error('❌ Erreur lors de l\'envoi:', error);
                    alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
                } finally {
                    // Réactive le bouton et restaure son texte
                    const submitButton = form.querySelector('button[type="submit"]');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Envoyer';
                }
            });

            // Animation des labels
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                // Gestion de l'état initial
                if (input.value) {
                    input.parentElement.querySelector('label').classList.add('active');
                }

                // Événements pour l'animation des labels
                input.addEventListener('focus', (e) => {
                    e.target.parentElement.querySelector('label').classList.add('active');
                });

                input.addEventListener('blur', (e) => {
                    if (!e.target.value) {
                        e.target.parentElement.querySelector('label').classList.remove('active');
                    }
                });
            });
        } else {
            console.error('❌ Formulaire de contact non trouvé dans le DOM');
        }
    }