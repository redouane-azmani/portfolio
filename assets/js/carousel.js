document.addEventListener('DOMContentLoaded', function() {
    // Éléments
    const carousel = document.querySelector('.carousel-inner');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    // Configuration
    let currentIndex = 0;
    const slideCount = slides.length;
    let isTransitioning = false;

    // Fonction pour changer de slide
    function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex = index;
        const offset = -currentIndex * 20; // 20% par slide
        carousel.style.transform = `translateX(${offset}%)`;

        // Mise à jour des dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        // Reset du flag de transition
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    // Navigation
    function nextSlide() {
        goToSlide((currentIndex + 1) % slideCount);
    }

    function prevSlide() {
        goToSlide((currentIndex - 1 + slideCount) % slideCount);
    }

    // Event Listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Swipe sur mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Navigation clavier
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Autoplay optionnel (décommenter pour activer)
    /*
    let autoplayInterval = setInterval(nextSlide, 5000);

    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 5000);
    });
    */
});