/**
 * Horizon Heights - Advanced UI Enhancements v2
 * 5 Premium Features: Floating Dock, Scroll-Snap, Video Modal, Gradient Text, Cursor Particles
 * 100% Vanilla JS - No React, No Dependencies
 */

(function() {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ============================================
    // FEATURE 1: Floating Navigation Dock (macOS-style)
    // ============================================
    function initFloatingDock() {
        // Check if dock already exists
        if (document.querySelector('.hh-floating-dock')) return;

        // Create dock HTML
        const dock = document.createElement('div');
        dock.className = 'hh-floating-dock';
        dock.setAttribute('aria-label', 'Quick navigation');

        const dockItems = [
            { label: 'Home', icon: '🏠', href: 'index.html' },
            { label: 'Services', icon: '✈️', href: 'services.html' },
            { label: 'Gallery', icon: '📸', href: 'gallery.html' },
            { label: 'Contact', icon: '📞', href: 'contact.html' },
            { label: 'Book Now', icon: '🚀', href: 'contact.html', highlight: true }
        ];

        dock.innerHTML = `
            <div class="hh-dock-container">
                ${dockItems.map(item => `
                    <a href="${item.href}" class="hh-dock-item ${item.highlight ? 'hh-dock-highlight' : ''}"
                       title="${item.label}" aria-label="${item.label}">
                        <span class="hh-dock-icon">${item.icon}</span>
                        <span class="hh-dock-label">${item.label}</span>
                    </a>
                `).join('')}
            </div>
        `;

        document.body.appendChild(dock);

        // Animate dock items on hover
        const dockItemsElements = dock.querySelectorAll('.hh-dock-item');
        dockItemsElements.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                // Scale up hovered item
                item.style.transform = 'translateY(-12px) scale(1.3)';

                // Slight scale up for neighbors
                if (dockItemsElements[index - 1]) {
                    dockItemsElements[index - 1].style.transform = 'translateY(-6px) scale(1.15)';
                }
                if (dockItemsElements[index + 1]) {
                    dockItemsElements[index + 1].style.transform = 'translateY(-6px) scale(1.15)';
                }
            });

            item.addEventListener('mouseleave', () => {
                dockItemsElements.forEach(el => {
                    el.style.transform = '';
                });
            });
        });

        // Hide dock when scrolling, show when stopped
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            dock.classList.add('hh-dock-hidden');
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                dock.classList.remove('hh-dock-hidden');
            }, 150);
        }, { passive: true });
    }

    // ============================================
    // FEATURE 2: Smooth Scroll-Snap Sections
    // ============================================
    function initScrollSnap() {
        // Only apply to homepage hero and major sections
        const sections = document.querySelectorAll('.hh-section, .hh-hero');

        if (sections.length === 0) return;

        // Add scroll-snap to main container
        const main = document.querySelector('main') || document.body;
        main.style.scrollSnapType = 'y proximity';

        sections.forEach(section => {
            section.style.scrollSnapAlign = 'start';
            section.style.scrollSnapStop = 'normal';
        });
    }

    // ============================================
    // FEATURE 3: Video Modal with Smooth Expansion
    // ============================================
    function initVideoModal() {
        // Check if modal already exists
        if (document.querySelector('.hh-video-modal')) return;

        // Create video modal
        const modal = document.createElement('div');
        modal.className = 'hh-video-modal';
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('role', 'dialog');
        modal.innerHTML = `
            <div class="hh-video-modal-backdrop"></div>
            <div class="hh-video-modal-content">
                <button class="hh-video-modal-close" aria-label="Close video">&times;</button>
                <div class="hh-video-modal-wrapper">
                    <iframe class="hh-video-modal-iframe" src="" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const iframe = modal.querySelector('.hh-video-modal-iframe');
        const closeBtn = modal.querySelector('.hh-video-modal-close');
        const backdrop = modal.querySelector('.hh-video-modal-backdrop');

        // Function to open modal
        function openVideoModal(videoUrl) {
            // Convert YouTube watch URLs to embed URLs
            let embedUrl = videoUrl;
            if (videoUrl.includes('youtube.com/watch')) {
                const videoId = videoUrl.split('v=')[1]?.split('&')[0];
                embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            } else if (videoUrl.includes('youtu.be/')) {
                const videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
                embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            }

            iframe.src = embedUrl;
            modal.classList.add('hh-video-modal-active');
            document.body.style.overflow = 'hidden';
        }

        // Function to close modal
        function closeVideoModal() {
            modal.classList.remove('hh-video-modal-active');
            setTimeout(() => {
                iframe.src = '';
                document.body.style.overflow = '';
            }, 300);
        }

        // Close button
        closeBtn.addEventListener('click', closeVideoModal);
        backdrop.addEventListener('click', closeVideoModal);

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('hh-video-modal-active')) {
                closeVideoModal();
            }
        });

        // Find all YouTube iframes and make them clickable
        document.querySelectorAll('iframe[src*="youtube.com"]').forEach(frame => {
            // Skip if already wrapped
            if (frame.parentNode.classList.contains('hh-video-thumbnail-wrapper')) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'hh-video-thumbnail-wrapper';
            wrapper.style.position = 'relative';
            wrapper.style.cursor = 'pointer';
            wrapper.title = 'Click to expand video';

            frame.parentNode.insertBefore(wrapper, frame);
            wrapper.appendChild(frame);

            wrapper.addEventListener('click', (e) => {
                e.preventDefault();
                openVideoModal(frame.src);
            });
        });

        // Expose globally for manual triggers
        window.hhOpenVideo = openVideoModal;
    }

    // ============================================
    // FEATURE 4: Gradient Animated Text
    // ============================================
    function initGradientText() {
        if (prefersReducedMotion) return;

        // Target the main hero title span only (not the whole h1)
        const heroTitle = document.querySelector('.hh-hero h1 span');
        if (!heroTitle) return;

        // Don't re-apply if already applied
        if (heroTitle.classList.contains('hh-gradient-text-animated')) return;

        heroTitle.classList.add('hh-gradient-text-animated');

        // Create gradient animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes hh-gradient-shift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }

            .hh-gradient-text-animated {
                background: linear-gradient(
                    120deg,
                    #FF7B2E 0%,
                    #FFB25C 25%,
                    #2EE6D5 50%,
                    #FFB25C 75%,
                    #FF7B2E 100%
                ) !important;
                background-size: 200% 200% !important;
                -webkit-background-clip: text !important;
                background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                color: transparent !important;
                animation: hh-gradient-shift 8s ease infinite;
                display: inline-block;
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // FEATURE 5: Cursor Particle Trails
    // ============================================
    function initCursorParticles() {
        if (prefersReducedMotion) return;
        if ('ontouchstart' in window) return; // Skip on mobile

        // Create canvas for particles
        const canvas = document.createElement('canvas');
        canvas.className = 'hh-particle-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Particle class
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.life = 1;
                this.decay = Math.random() * 0.02 + 0.01;

                // Brand colors: orange (#FF7B2E) and aqua (#2EE6D5)
                this.color = Math.random() > 0.5 ?
                    { r: 255, g: 123, b: 46 } :
                    { r: 46, g: 230, b: 213 };
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= this.decay;
                this.size *= 0.98;
            }

            draw() {
                ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.life})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particles = [];
        let mouseX = 0;
        let mouseY = 0;
        let lastTime = 0;

        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Animation loop
        function animate(currentTime) {
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Create new particles (throttled)
            if (deltaTime < 50 && particles.length < 150) {
                particles.push(new Particle(mouseX, mouseY));
            }

            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();

                // Remove dead particles
                if (particles[i].life <= 0 || particles[i].size <= 0.1) {
                    particles.splice(i, 1);
                }
            }

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }

    // ============================================
    // Initialize All Advanced Features
    // ============================================
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        console.log('🚀 Horizon Heights Advanced Enhancements v2 Active');

        // Initialize all features
        initFloatingDock();
        initScrollSnap();
        initVideoModal();
        initGradientText();
        initCursorParticles();
    }

    init();
})();
