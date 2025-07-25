document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navbar Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu   = document.getElementById('nav-menu');
    const navLinks  = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    const plansWrapper = document.querySelector('.plans-wrapper');
    const prevButton   = document.querySelector('.carousel-arrow.prev');
    const nextButton   = document.querySelector('.carousel-arrow.next');

    if (plansWrapper && prevButton && nextButton) {
        const scrollAmount = () => {
            const card = plansWrapper.querySelector('.plan-card');
            return card ? card.offsetWidth + 30 : 300;
        };

        nextButton.addEventListener('click', () => {
            plansWrapper.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });
        prevButton.addEventListener('click', () => {
            plansWrapper.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });

        const toggleCarouselArrows = () => {
            if (window.innerWidth <= 768) {
                prevButton.style.display = 'block';
                nextButton.style.display = 'block';
            } else {
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
            }
        };
        toggleCarouselArrows();
        window.addEventListener('resize', toggleCarouselArrows);

        // —————————————
        // SWIPE HORIZONTAL CONTROLADO + SCROLL VERTICAL LIBRE
        let startX = 0;
        let startY = 0;
        let isHorizontalSwipe = null; // null hasta detectar

        plansWrapper.addEventListener('touchstart', e => {
            startX = e.changedTouches[0].screenX;
            startY = e.changedTouches[0].screenY;
            isHorizontalSwipe = null;
        });

        plansWrapper.addEventListener('touchmove', e => {
            const currentX = e.changedTouches[0].screenX;
            const currentY = e.changedTouches[0].screenY;
            const dx = currentX - startX;
            const dy = currentY - startY;

            // Si aún no determinamos la dirección:
            if (isHorizontalSwipe === null) {
                isHorizontalSwipe = Math.abs(dx) > Math.abs(dy);
            }

            // Si es swipe horizontal, bloqueamos el scroll nativo
            if (isHorizontalSwipe) {
                e.preventDefault();
            }
            // Si es vertical, no hacemos nada para permitir el scroll de la página
        }, { passive: false });

        plansWrapper.addEventListener('touchend', e => {
            if (!isHorizontalSwipe) return; // no es nuestro carrusel, es scroll de página

            const endX = e.changedTouches[0].screenX;
            const diff = startX - endX;
            const minSwipeDistance = 50;

            if (Math.abs(diff) > minSwipeDistance) {
                if (diff > 0) {
                    plansWrapper.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
                } else {
                    plansWrapper.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
                }
            }
        });
    }
});