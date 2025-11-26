const header = document.querySelector('.hh-header');
const nav = document.querySelector('.hh-nav');
const burger = document.querySelector('.hh-burger');
const subs = document.querySelectorAll('.hh-has-sub');
const canvas = document.getElementById('hh-constellation');
const yearEl = document.getElementById('year');
const starfield = document.querySelector('.hh-starfield');
const shootingStars = document.querySelector('.hh-shooting-stars');
const sparkles = document.querySelector('.hh-sparkles');
const skyline = document.querySelector('.hh-skyline');

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const closeAllSubmenus = () => {
    subs.forEach(sub => {
        sub.classList.remove('open');
        const trigger = sub.querySelector('.hh-link');
        if (trigger) {
            trigger.setAttribute('aria-expanded', 'false');
        }
    });
};

const closeMobileNav = () => {
    if (!nav) {
        return;
    }
    nav.classList.remove('open');
    burger?.setAttribute('aria-expanded', 'false');
    burger?.classList.remove('is-active');
    closeAllSubmenus();
};

const onScroll = () => {
    const root = document.documentElement;
    if (window.scrollY > 60) {
        root.classList.add('hh-scrolled');
    } else {
        root.classList.remove('hh-scrolled');
    }

    if (skyline && !prefersReducedMotion) {
        const offset = Math.min(window.scrollY * 0.18, 90);
        skyline.style.transform = `translateX(-50%) translateY(${offset}px)`;
    }
};

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

if (burger && nav) {
    burger.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        burger.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) {
            burger.classList.add('is-active');
        } else {
            closeMobileNav();
        }
    });
}

subs.forEach(sub => {
    const trigger = sub.querySelector('.hh-link');
    if (!trigger) {
        return;
    }
    trigger.setAttribute('aria-expanded', 'false');
    const setExpanded = value => trigger.setAttribute('aria-expanded', String(value));

    // Mobile toggle
    trigger.addEventListener('click', event => {
        if (window.innerWidth <= 980) {
            event.preventDefault();
            const nowOpen = sub.classList.toggle('open');
            setExpanded(nowOpen);
        }
    });

    // Desktop hover
    sub.addEventListener('mouseenter', () => {
        if (window.innerWidth > 980) {
            setExpanded(true);
        }
    });

    sub.addEventListener('mouseleave', () => {
        if (window.innerWidth > 980) {
            setExpanded(false);
        }
    });

    // Keyboard accessibility
    sub.addEventListener('focusin', () => {
        if (window.innerWidth > 980) {
            sub.classList.add('open'); // Ensure class is added for visual state if needed
            setExpanded(true);
        }
    });

    sub.addEventListener('focusout', event => {
        if (window.innerWidth > 980) {
            const nextTarget = event.relatedTarget;
            if (!nextTarget || !sub.contains(nextTarget)) {
                sub.classList.remove('open');
                setExpanded(false);
            }
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
        const id = link.getAttribute('href');
        if (!id || id === '#') {
            return;
        }
        const target = document.querySelector(id);
        if (!target) {
            return;
        }
        event.preventDefault();
        const behavior = prefersReducedMotion ? 'auto' : 'smooth';
        target.scrollIntoView({ behavior });
        if (!target.hasAttribute('tabindex')) {
            target.setAttribute('tabindex', '-1');
        }
        target.focus({ preventScroll: true });
        if (nav && nav.classList.contains('open') && window.innerWidth <= 980) {
            closeMobileNav();
        }
    });
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        if (nav?.classList.contains('open')) {
            closeMobileNav();
            burger?.focus();
        } else {
            closeAllSubmenus();
        }
    }
});

let atmosphereResizeTimeout;

const createStars = () => {
    if (!starfield || prefersReducedMotion) {
        return;
    }
    const starDisplay = window.getComputedStyle(starfield).display;
    if (starDisplay === "none") {
        starfield.innerHTML = "";
        return;
    }
    starfield.innerHTML = '';
    const starTotal = window.innerWidth < 768 ? 85 : 180;
    for (let i = 0; i < starTotal; i += 1) {
        const node = document.createElement('span');
        const size = Math.random() * 1.4 + 0.4;
        node.style.top = `${Math.random() * 100}%`;
        node.style.left = `${Math.random() * 100}%`;
        node.style.width = `${size}px`;
        node.style.height = `${size}px`;
        node.style.animationDelay = `${Math.random() * 10}s`;
        node.style.animationDuration = `${6 + Math.random() * 6}s`;
        starfield.appendChild(node);
    }
};

const createShootingStars = () => {
    if (!shootingStars || prefersReducedMotion) {
        return;
    }
    const shootingDisplay = window.getComputedStyle(shootingStars).display;
    if (shootingDisplay === "none") {
        shootingStars.innerHTML = "";
        return;
    }
    shootingStars.innerHTML = '';
    const count = window.innerWidth < 768 ? 4 : 7;
    for (let i = 0; i < count; i += 1) {
        const span = document.createElement('span');
        const delay = Math.random() * 4;
        span.style.top = `${Math.random() * 55}%`;
        span.style.left = `${Math.random() * 40 - 20}%`;
        span.style.animationDelay = `${delay}s`;
        span.style.animationDuration = `${2 + Math.random() * 1.2}s`;
        shootingStars.appendChild(span);
    }
};

const createSparkles = () => {
    if (!sparkles || prefersReducedMotion) {
        return;
    }
    sparkles.innerHTML = '';
    const palette = ['rgba(255,123,46,0.95)', 'rgba(255,189,125,0.9)', 'rgba(46,230,213,0.85)'];
    const count = window.innerWidth < 768 ? 20 : 36;
    for (let i = 0; i < count; i += 1) {
        const span = document.createElement('span');
        const tone = palette[Math.floor(Math.random() * palette.length)];
        span.style.top = `${Math.random() * 100}%`;
        span.style.left = `${Math.random() * 100}%`;
        span.style.animationDelay = `${Math.random() * 4}s`;
        span.style.animationDuration = `${5 + Math.random() * 4}s`;
        span.style.background = tone;
        span.style.boxShadow = `0 0 16px ${tone}`;
        sparkles.appendChild(span);
    }
};

const initCosmic = () => {
    createStars();
    createShootingStars();
    createSparkles();
};

if (!prefersReducedMotion) {
    initCosmic();
}

window.addEventListener('resize', () => {
    clearTimeout(atmosphereResizeTimeout);
    atmosphereResizeTimeout = setTimeout(() => {
        initCosmic();
    }, 200);
});

let ctx = null;
if (canvas && canvas.getContext && !prefersReducedMotion) {
    ctx = canvas.getContext('2d', { alpha: true });
}

let rafId;
let hoveredLink = null;

const resizeCanvas = () => {
    if (!canvas || !ctx || !header) {
        return;
    }
    const rect = header.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
};

const clearCanvas = () => {
    if (!ctx || !canvas) {
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const drawConstellation = () => {
    if (!ctx || !hoveredLink || !header) {
        return;
    }

    clearCanvas();

    const logo = document.querySelector('.hh-logo');
    if (!logo) {
        return;
    }

    const headerRect = header.getBoundingClientRect();
    const linkRect = hoveredLink.getBoundingClientRect();
    const logoRect = logo.getBoundingClientRect();

    const linkX = linkRect.left + linkRect.width / 2 - headerRect.left;
    const linkY = linkRect.top + linkRect.height / 2 - headerRect.top;
    const logoX = logoRect.left + logoRect.width / 2 - headerRect.left;
    const logoY = logoRect.top + logoRect.height / 2 - headerRect.top;

    const grad = ctx.createLinearGradient(logoX, logoY, linkX, linkY);
    grad.addColorStop(0, 'rgba(46,106,168,0.0)');
    grad.addColorStop(0.25, 'rgba(46,106,168,0.4)');
    grad.addColorStop(0.75, 'rgba(205,165,72,0.6)');
    grad.addColorStop(1, 'rgba(205,165,72,0.0)');

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(logoX, logoY);
    ctx.lineTo(linkX, linkY);
    ctx.stroke();

    const time = Date.now() / 400;
    const cometX = logoX + (linkX - logoX) * 0.65 + Math.cos(time) * 4;
    const cometY = logoY + (linkY - logoY) * 0.65 + Math.sin(time) * 4;

    ctx.beginPath();
    ctx.arc(cometX, cometY, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(205,165,72,0.9)';
    ctx.fill();

    rafId = requestAnimationFrame(drawConstellation);
};

const startConstellation = link => {
    if (!ctx || prefersReducedMotion) {
        return;
    }
    hoveredLink = link;
    cancelAnimationFrame(rafId);
    drawConstellation();
};

const stopConstellation = () => {
    hoveredLink = null;
    cancelAnimationFrame(rafId);
    clearCanvas();
};

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

document.querySelectorAll('.hh-link').forEach(link => {
    link.addEventListener('mouseenter', () => startConstellation(link));
    link.addEventListener('mouseleave', stopConstellation);
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopConstellation();
    }
});

// Scroll Reveal
// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
// Initial hide (fallback support)
revealElements.forEach(el => el.classList.add('reveal-hidden'));

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-hidden');
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// Lightbox logic consolidated below

window.hhMainLoaded = true;

/* ===== SCROLL INDICATOR ===== */
const scrollIndicator = document.querySelector('.hh-scroll-down');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    }, { passive: true });
}

/* ===== BUTTON RIPPLE EFFECT ===== */
document.querySelectorAll('.hh-cta, .hh-ghost').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.classList.add('hh-ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

/* ===== HERO ENTRANCE ANIMATIONS ===== */
document.addEventListener('DOMContentLoaded', () => {
    const heroElements = [
        { sel: '.hh-hero h1', delay: '0.6s' },
        { sel: '.hh-hero-sub', delay: '0.8s' },
        { sel: '.hh-hero-ctas', delay: '1.3s' }
    ];

    heroElements.forEach(item => {
        const el = document.querySelector(item.sel);
        if (el) {
            el.classList.add('hh-hero-animate');
            el.style.animationDelay = item.delay;
        }
    });

    // Stagger highlights
    const highlights = document.querySelectorAll('.hh-hero-highlights li');
    highlights.forEach((li, index) => {
        li.classList.add('hh-hero-animate');
        li.style.animationDelay = `${1 + (index * 0.1)}s`;
    });
});

/* ===== LIGHTBOX NAVIGATION ===== */
const lightbox = document.getElementById('hh-lightbox');
const lightboxImg = document.getElementById('hh-lightbox-img');
const galleryImages = document.querySelectorAll('.hh-gallery-card img, .hh-gallery-item img');
let currentImageIndex = 0;

if (lightbox && galleryImages.length > 0) {
    const updateLightbox = (index) => {
        currentImageIndex = (index + galleryImages.length) % galleryImages.length;
        const img = galleryImages[currentImageIndex];

        // Fade out
        lightboxImg.style.opacity = '0';

        setTimeout(() => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            document.querySelector('.hh-lightbox-counter').textContent =
                `${currentImageIndex + 1} / ${galleryImages.length}`;
            // Fade in
            lightboxImg.style.opacity = '1';
        }, 200);
    };

    // Controls
    document.querySelector('.hh-lightbox-prev')?.addEventListener('click', (e) => {
        e.stopPropagation();
        updateLightbox(currentImageIndex - 1);
    });

    document.querySelector('.hh-lightbox-next')?.addEventListener('click', (e) => {
        e.stopPropagation();
        updateLightbox(currentImageIndex + 1);
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'ArrowLeft') updateLightbox(currentImageIndex - 1);
        if (e.key === 'ArrowRight') updateLightbox(currentImageIndex + 1);
    });

    // Swipe
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, { passive: true });
    lightbox.addEventListener('touchend', e => {
        if (touchStartX - e.changedTouches[0].screenX > 50) updateLightbox(currentImageIndex + 1);
        if (e.changedTouches[0].screenX - touchStartX > 50) updateLightbox(currentImageIndex - 1);
    }, { passive: true });

    // Override existing click handlers to track index
    galleryImages.forEach((img, index) => {
        img.parentElement.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightbox(index);
        });
    });
}

/* ===== IMAGE LAZY LOADING ===== */
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.onload = () => {
                img.parentElement.classList.remove('hh-img-loading');
                img.classList.add('hh-img-loaded');
            };
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('.hh-gallery-card img').forEach(img => {
    const src = img.src;
    img.removeAttribute('src');
    img.dataset.src = src;
    img.parentElement.classList.add('hh-img-loading');
    imageObserver.observe(img);
});

/* ===== TESTIMONIAL CAROUSEL ===== */
const slides = document.querySelectorAll('.hh-testimonial-card');
const dotsContainer = document.querySelector('.hh-carousel-dots');
let activeSlide = 0;
let slideInterval;

if (slides.length > 0 && dotsContainer) {
    // Create dots
    slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `hh-dot ${idx === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });

    const goToSlide = (n) => {
        slides[activeSlide].classList.remove('active');
        document.querySelectorAll('.hh-dot')[activeSlide].classList.remove('active');

        activeSlide = (n + slides.length) % slides.length;

        slides[activeSlide].classList.add('active');
        document.querySelectorAll('.hh-dot')[activeSlide].classList.add('active');
    };

    const startSlideShow = () => {
        slideInterval = setInterval(() => goToSlide(activeSlide + 1), 8000);
    };

    const stopSlideShow = () => clearInterval(slideInterval);

    document.querySelector('.hh-carousel').addEventListener('mouseenter', stopSlideShow);
    document.querySelector('.hh-carousel').addEventListener('mouseleave', startSlideShow);

    startSlideShow();
}
