document.addEventListener('DOMContentLoaded', function() {

    // Mobile Navbar Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Plans Carousel for Mobile
    const plansWrapper = document.querySelector('.plans-wrapper');
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');

    if (plansWrapper && prevButton && nextButton) {
        const scrollAmount = () => {
            // Scroll by the width of one card plus the gap
            const planCard = plansWrapper.querySelector('.plan-card');
            return planCard ? planCard.offsetWidth + 30 : 300;
        };

        nextButton.addEventListener('click', () => {
            plansWrapper.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });

        prevButton.addEventListener('click', () => {
            plansWrapper.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });

        // Hide/show arrows on mobile viewports only
        const toggleCarouselArrows = () => {
            if (window.innerWidth <= 768) {
                prevButton.style.display = 'block';
                nextButton.style.display = 'block';
            } else {
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
            }
        };

        // Initial check
        toggleCarouselArrows();
        // Check on window resize
        window.addEventListener('resize', toggleCarouselArrows);
    }
});