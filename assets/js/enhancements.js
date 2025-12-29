/**
 * Horizon Heights - UI Enhancements
 * Safe, progressive enhancements that layer on top of existing functionality
 * Can be removed by deleting the script tag - no dependencies on main code
 */

(function() {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // Respect accessibility preferences

    // ============================================
    // ENHANCEMENT 1: Parallax Hero Video
    // ============================================
    function initParallaxHero() {
        const heroVideo = document.querySelector('.hh-hero-video');
        const heroOverlay = document.querySelector('.hh-hero-overlay');

        if (!heroVideo || !heroOverlay) return;

        let ticking = false;

        function updateParallax() {
            const scrolled = window.scrollY;
            const heroHeight = window.innerHeight;

            if (scrolled < heroHeight) {
                // Video moves slower than scroll (creates depth)
                heroVideo.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;

                // Overlay moves at normal speed but fades
                heroOverlay.style.transform = `translateY(${scrolled * 0.15}px)`;
                heroOverlay.style.opacity = 1 - (scrolled / heroHeight) * 0.3;
            }

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });

        // Initial state
        updateParallax();
    }

    // ============================================
    // ENHANCEMENT 2: Magnetic CTA Buttons
    // ============================================
    function initMagneticButtons() {
        const ctaButtons = document.querySelectorAll('.hh-cta, .hh-ghost');

        ctaButtons.forEach(button => {
            let buttonRect = button.getBoundingClientRect();

            // Recalculate on resize
            window.addEventListener('resize', () => {
                buttonRect = button.getBoundingClientRect();
            });

            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Subtle pull toward cursor (max 8px movement)
                const moveX = (x / rect.width) * 8;
                const moveY = (y / rect.height) * 8;

                button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }

    // ============================================
    // ENHANCEMENT 3: Staggered Gallery Reveal
    // ============================================
    function initStaggeredGallery() {
        const galleryCards = document.querySelectorAll('.hh-gallery-card, .hh-gallery-item');

        if (galleryCards.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Calculate delay based on position in grid
                    const card = entry.target;
                    const delay = Array.from(galleryCards).indexOf(card) * 80; // 80ms between each

                    setTimeout(() => {
                        card.classList.add('hh-enhanced-revealed');
                    }, delay);

                    observer.unobserve(card);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Add initial hidden state
        galleryCards.forEach(card => {
            card.classList.add('hh-enhanced-gallery-item');
            observer.observe(card);
        });
    }

    // ============================================
    // ENHANCEMENT 4: 3D Card Tilt on Hover
    // ============================================
    function init3DCardTilt() {
        const cards = document.querySelectorAll('.hh-card:not(.hh-testimonial-card)');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // Mouse position within card
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Calculate rotation (max 8 degrees)
                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ============================================
    // ENHANCEMENT 5: Animated Stats Counter (NEW SECTION)
    // ============================================
    function initStatsCounter() {
        // Check if stats section already exists
        if (document.querySelector('.hh-stats-section')) return;

        // Find the testimonials section
        const testimonialsSection = document.getElementById('testimonials');
        if (!testimonialsSection) return;

        // Create stats section
        const statsSection = document.createElement('section');
        statsSection.className = 'hh-section hh-stats-section reveal';
        statsSection.setAttribute('aria-label', 'Statistics');
        statsSection.innerHTML = `
            <div class="hh-container">
                <div class="hh-stats-grid">
                    <div class="hh-stat-card">
                        <div class="hh-stat-number" data-target="500">0</div>
                        <div class="hh-stat-label">Properties Photographed</div>
                    </div>
                    <div class="hh-stat-card">
                        <div class="hh-stat-number" data-target="48">0</div>
                        <div class="hh-stat-label">Hour Delivery Time</div>
                    </div>
                    <div class="hh-stat-card">
                        <div class="hh-stat-number" data-target="100">0</div>
                        <div class="hh-stat-label">Client Satisfaction</div>
                        <span class="hh-stat-suffix">%</span>
                    </div>
                    <div class="hh-stat-card">
                        <div class="hh-stat-number" data-target="3">0</div>
                        <div class="hh-stat-label">Year Experience</div>
                    </div>
                </div>
            </div>
        `;

        // Insert after testimonials
        testimonialsSection.parentNode.insertBefore(statsSection, testimonialsSection.nextSibling);

        // Animate numbers when visible
        const statNumbers = statsSection.querySelectorAll('.hh-stat-number');
        let hasAnimated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    animateStats();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);

        function animateStats() {
            statNumbers.forEach(numberEl => {
                const target = parseInt(numberEl.dataset.target);
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        numberEl.textContent = target.toLocaleString();
                        clearInterval(timer);
                    } else {
                        numberEl.textContent = Math.floor(current).toLocaleString();
                    }
                }, 16);
            });
        }
    }

    // ============================================
    // BONUS: Enhanced Image Hover Effects
    // ============================================
    function initEnhancedImageHover() {
        const galleryCards = document.querySelectorAll('.hh-gallery-card, .hh-gallery-item');

        galleryCards.forEach(card => {
            const img = card.querySelector('img');
            if (!img) return;

            card.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.08)';
                img.style.filter = 'brightness(1.15) saturate(1.2)';
            });

            card.addEventListener('mouseleave', () => {
                img.style.transform = '';
                img.style.filter = '';
            });
        });
    }

    // ============================================
    // Initialize All Enhancements
    // ============================================
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        console.log('🚀 Horizon Heights Enhancements Active');

        // Initialize features
        initParallaxHero();
        initMagneticButtons();
        initStaggeredGallery();
        init3DCardTilt();
        initStatsCounter();
        initEnhancedImageHover();
    }

    init();
})();
