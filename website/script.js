/* ===================================
   Puri Local Tour Taxi - JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========== MOBILE NAV ==========
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    function openNav() {
        navMenu.classList.add('open');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        navMenu.classList.remove('open');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (navToggle) navToggle.addEventListener('click', openNav);
    if (navClose) navClose.addEventListener('click', closeNav);
    if (navOverlay) navOverlay.addEventListener('click', closeNav);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeNav();
            // Active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (currentScroll > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link based on scroll
        updateActiveNav();

        lastScroll = currentScroll;
    });

    // ========== ACTIVE NAV ON SCROLL ==========
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ========== BACK TO TOP ==========
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== STATS COUNTER ANIMATION ==========
    const statNumbers = document.querySelectorAll('.hero-stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        statsAnimated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }

                if (target >= 1000) {
                    stat.textContent = Math.floor(current).toLocaleString('en-IN') + '+';
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 16);
        });
    }

    // Trigger stats when hero section is in view
    const heroSection = document.getElementById('hero');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateStats, 500);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (heroSection) statsObserver.observe(heroSection);

    // ========== SCROLL REVEAL ANIMATION ==========
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========== FAQ ACCORDION ==========
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        // Set initial state for active items
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = '0';
            });

            // Open clicked if it was closed
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ========== TESTIMONIALS AUTO-SCROLL ==========
    const track = document.getElementById('testimonials-track');
    if (track) {
        let scrollAmount = 0;
        const cardWidth = 394; // card width + gap
        const totalCards = track.children.length;
        let autoScrollInterval;

        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                scrollAmount += cardWidth;
                if (scrollAmount >= cardWidth * (totalCards - 2)) {
                    scrollAmount = 0;
                }
                track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            }, 4000);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        // Enable horizontal scrolling
        track.style.overflowX = 'auto';
        track.style.scrollSnapType = 'x mandatory';
        track.style.scrollbarWidth = 'none';
        track.style.msOverflowStyle = 'none';

        // Hide scrollbar for Chrome/Safari
        const style = document.createElement('style');
        style.textContent = '.testimonials-track::-webkit-scrollbar { display: none; }';
        document.head.appendChild(style);

        // Snap each card
        Array.from(track.children).forEach(card => {
            card.style.scrollSnapAlign = 'start';
        });

        startAutoScroll();

        track.addEventListener('mouseenter', stopAutoScroll);
        track.addEventListener('mouseleave', startAutoScroll);
        track.addEventListener('touchstart', stopAutoScroll, { passive: true });
        track.addEventListener('touchend', () => {
            setTimeout(startAutoScroll, 3000);
        });
    }

    // ========== CONTACT FORM → WHATSAPP ==========
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value.trim();
            const phone = document.getElementById('contact-phone').value.trim();
            const service = document.getElementById('contact-service').value;
            const message = document.getElementById('contact-message').value.trim();

            if (!name || !phone) {
                alert('Please enter your name and phone number.');
                return;
            }

            // Build WhatsApp message
            let waMessage = `Hi, I'm ${name}.\n`;
            waMessage += `📞 Phone: ${phone}\n`;
            if (service) waMessage += `🚗 Service: ${service}\n`;
            if (message) waMessage += `💬 Message: ${message}\n`;
            waMessage += `\nSent from Puri Local Tour Taxi Website`;

            const waUrl = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(waMessage)}`;
            window.open(waUrl, '_blank');

            // Reset form
            contactForm.reset();
        });
    }

    // ========== PRELOADER EFFECT ==========
    // Add a slight delay for the hero content to load
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

});
