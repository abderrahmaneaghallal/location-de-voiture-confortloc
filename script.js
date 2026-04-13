/* ========================================
   CONFORTLOC — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Header scroll effect ----
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    const handleScroll = () => {
        const scrollY = window.scrollY;
        header.classList.toggle('scrolled', scrollY > 50);
        scrollTopBtn.classList.toggle('visible', scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll to top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Mobile menu ----
    const burgerBtn = document.getElementById('burgerBtn');
    const mainNav = document.getElementById('mainNav');

    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('active');
        mainNav.classList.toggle('open');
        document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mainNav.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            burgerBtn.classList.remove('active');
            mainNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ---- Active nav link on scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    const activateNavOnScroll = () => {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', activateNavOnScroll, { passive: true });

    // ---- Fleet filters ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            carCards.forEach((card, i) => {
                const category = card.dataset.category;
                const show = filter === 'all' || category === filter;

                if (show) {
                    card.classList.remove('hidden');
                    card.style.transitionDelay = `${i * 0.05}s`;
                    // Re-trigger animation
                    card.classList.add('animate-ready');
                    card.classList.remove('visible');
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            card.classList.add('visible');
                        });
                    });
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('visible');
                }
            });
        });
    });

    // ---- Scroll reveal / Intersection Observer ----
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = getComputedStyle(entry.target).getPropertyValue('--delay') || '0s';
                const delayMs = parseFloat(delay) * 1000;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delayMs);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Mark elements as animate-ready THEN observe — keeps them visible if JS fails
    document.querySelectorAll('.car-card, .service-card, .testimonial-card').forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });

    // ---- Animated counters ----
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat__number[data-target]').forEach(counter => {
        counterObserver.observe(counter);
    });

    function animateCounter(el, target) {
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = current.toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    // ---- Contact form ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('formName').value;
            const phone = document.getElementById('formPhone').value;
            const email = document.getElementById('formEmail').value;
            const vehicle = document.getElementById('formVehicle').value;
            const dateStart = document.getElementById('formDateStart').value;
            const dateEnd = document.getElementById('formDateEnd').value;
            const message = document.getElementById('formMessage').value;

            // Build WhatsApp message
            let waMessage = `Bonjour, je souhaite faire une demande de devis :\n\n`;
            waMessage += `👤 Nom : ${name}\n`;
            waMessage += `📞 Tél : ${phone}\n`;
            if (email) waMessage += `✉️ Email : ${email}\n`;
            if (vehicle) waMessage += `🚗 Véhicule : ${vehicle}\n`;
            if (dateStart) waMessage += `📅 Du : ${dateStart}\n`;
            if (dateEnd) waMessage += `📅 Au : ${dateEnd}\n`;
            if (message) waMessage += `💬 Message : ${message}\n`;

            const waUrl = `https://wa.me/212661240710?text=${encodeURIComponent(waMessage)}`;
            window.open(waUrl, '_blank');

            // Show confirmation
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = '✓ Envoyé !';
            btn.style.background = 'var(--whatsapp)';
            btn.style.color = '#fff';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 3000);
        });
    }

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = header.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Parallax-like effect on hero shapes ----
    const shapes = document.querySelectorAll('.shape');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                shapes.forEach((shape, i) => {
                    const speed = 0.05 * (i + 1);
                    shape.style.transform = `translateY(${scrollY * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ---- Thumbnail gallery interaction ----
    document.querySelectorAll('.car-card').forEach(card => {
        const mainImg = card.querySelector('.car-card__main-img');
        const thumbs = card.querySelectorAll('.gallery-thumb');
        
        if (mainImg && thumbs.length > 0) {
            thumbs.forEach(thumb => {
                thumb.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    // Remove active class from all thumbs in this card
                    thumbs.forEach(t => t.classList.remove('active'));
                    
                    // Add active to clicked thumb
                    thumb.classList.add('active');
                    
                    // Update main image source with a fade effect
                    mainImg.style.opacity = '0';
                    setTimeout(() => {
                        mainImg.src = thumb.dataset.src;
                        mainImg.style.opacity = '1';
                    }, 200);
                });
            });
        }
    });

    // ---- Lightbox for full car image ----
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentImages = [];
    let currentIndex = 0;

    if (lightbox && lightboxImg && lightboxClose) {
        document.querySelectorAll('.car-card').forEach(card => {
            const mainImg = card.querySelector('.car-card__main-img');
            const thumbs = card.querySelectorAll('.gallery-thumb');

            if (mainImg) {
                mainImg.addEventListener('click', () => {
                    // Get all images for this car
                    currentImages = Array.from(thumbs).map(t => t.dataset.src);
                    if (currentImages.length === 0) currentImages = [mainImg.src];
                    
                    // Find index of current main image
                    currentIndex = currentImages.indexOf(mainImg.getAttribute('src')) || 0;
                    if (currentIndex === -1) currentIndex = 0;

                    updateLightbox();
                    lightbox.classList.add('active');
                });
            }
        });

        const updateLightbox = () => {
            lightboxImg.style.opacity = '0.5';
            setTimeout(() => {
                lightboxImg.src = currentImages[currentIndex];
                lightboxImg.style.opacity = '1';
            }, 150);
        };

        const showNext = (e) => {
            if (e) e.stopPropagation();
            currentIndex = (currentIndex + 1) % currentImages.length;
            updateLightbox();
        };

        const showPrev = (e) => {
            if (e) e.stopPropagation();
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            updateLightbox();
        };

        lightboxNext.addEventListener('click', showNext);
        lightboxPrev.addEventListener('click', showPrev);

        // Close lightbox
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        // Close when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
        
        // Key controls
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') lightbox.classList.remove('active');
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });
    }

});
