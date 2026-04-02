class Carousel {
    constructor() {
        // Sélection des éléments du DOM
        this.container = document.querySelector('.projects-container');
        this.cards = Array.from(document.querySelectorAll('.project-card'));

        // Configuration
        this.totalCards = this.cards.length;
        this.theta = 360 / this.totalCards;
        this.radius = 600; // Rayon du cercle
        this.currentIndex = 0;
        this.isAnimating = false;
        this.autoplayInterval = null;

        // Initialisation
        this.init();
    }

    init() {
        this.setupCards();
        this.createControls();
        this.setupEventListeners();
        this.startAutoplay();
        this.handleResize();
    }

    setupCards() {
        this.cards.forEach((card, i) => {
            const angle = this.theta * i;
            const rotation = `rotateY(${angle}deg) translateZ(${this.radius}px)`;

            card.style.transform = rotation;
            card.setAttribute('data-angle', angle);
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';

            // Effet initial
            if (i !== 0) {
                card.style.opacity = '0.7';
                card.style.filter = 'brightness(0.7)';
            }
        });

        this.container.style.transformStyle = 'preserve-3d';
        this.container.style.transform = 'rotateY(0deg)';
        this.container.style.transition = 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
    }

    createControls() {
        const controls = document.createElement('div');
        controls.className = 'carousel-controls';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn prev';
        prevBtn.innerHTML = '←';
        prevBtn.onclick = () => this.rotate('prev');

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn next';
        nextBtn.innerHTML = '→';
        nextBtn.onclick = () => this.rotate('next');

        controls.appendChild(prevBtn);
        controls.appendChild(nextBtn);

        this.container.parentElement.appendChild(controls);
    }

    setupEventListeners() {
        // Gestion du tactile
        let touchStartX = 0;
        let touchEndX = 0;

        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            this.stopAutoplay();
        }, { passive: true });

        this.container.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        }, { passive: true });

        this.container.addEventListener('touchend', () => {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) this.rotate('next');
                else this.rotate('prev');
            }
            this.startAutoplay();
        });

        // Gestion du hover
        this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());

        // Gestion du clic sur les cartes
        this.cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const currentAngle = parseInt(card.getAttribute('data-angle'));
                const rotations = Math.floor(currentAngle / this.theta);
                this.rotateToIndex(rotations);
            });
        });

        // Gestion du clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.rotate('prev');
            if (e.key === 'ArrowRight') this.rotate('next');
        });

        // Gestion du redimensionnement
        window.addEventListener('resize', () => this.handleResize());
    }

    rotate(direction) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.currentIndex = direction === 'next'
            ? (this.currentIndex + 1) % this.totalCards
            : (this.currentIndex - 1 + this.totalCards) % this.totalCards;

        const rotation = direction === 'next' ? -this.theta : this.theta;
        const currentRotation = this.getRotation();
        this.container.style.transform = `rotateY(${currentRotation + rotation}deg)`;

        this.updateCardsVisibility();

        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    rotateToIndex(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const diff = index - this.currentIndex;
        const rotation = -diff * this.theta;
        const currentRotation = this.getRotation();

        this.container.style.transform = `rotateY(${currentRotation + rotation}deg)`;
        this.currentIndex = (index + this.totalCards) % this.totalCards;

        this.updateCardsVisibility();

        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    updateCardsVisibility() {
        this.cards.forEach((card, index) => {
            const distance = Math.abs(index - this.currentIndex);
            const opacity = distance === 0 ? 1 : 0.7;
            const brightness = distance === 0 ? 1 : 0.7;

            card.style.opacity = opacity;
            card.style.filter = `brightness(${brightness})`;
        });
    }

    getRotation() {
        const transform = this.container.style.transform;
        const match = transform.match(/rotateY\(([-\d.]+)deg\)/);
        return match ? parseFloat(match[1]) : 0;
    }

    handleResize() {
        // Ajuster le rayon en fonction de la taille de l'écran
        this.radius = window.innerWidth < 768 ? 400 : 600;
        this.setupCards();
    }

    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            if (!document.hidden) {
                this.rotate('next');
            }
        }, 5000);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new Carousel();

    // Gestion de la visibilité de la page
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            carousel.stopAutoplay();
        } else {
            carousel.startAutoplay();
        }
    });
});