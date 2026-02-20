// Navbar scroll effect
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileOverlay');
const body = document.body;

// Update body padding based on navbar state
function updateBodyPadding() {
    const navbarHeight = navbar.classList.contains('scrolled') ? 60 : 80;
    body.style.paddingTop = navbarHeight + 'px';
    
    // Update hero section positioning
    const hero = document.querySelector('.hero');
    if (hero) {
        // Remove negative margin and set proper top positioning
        hero.style.marginTop = '0';
        hero.style.paddingTop = navbarHeight + 'px';
        hero.style.minHeight = '100vh';
    }
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateBodyPadding();
});

// Initialize on page load
window.addEventListener('load', updateBodyPadding);

// Mobile menu toggle
if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('mobile-open');
        navLinks.classList.toggle('active');
        if (mobileOverlay) {
            mobileOverlay.classList.toggle('active');
        }
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('active');
        }
        if (navLinks) {
            navLinks.classList.remove('active');
            navLinks.classList.remove('mobile-open');
        }
        if (mobileOverlay) {
            mobileOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('active');
        }
        if (navLinks) {
            navLinks.classList.remove('active');
            navLinks.classList.remove('mobile-open');
        }
        if (mobileOverlay) {
            mobileOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
});

// Active nav link highlighting
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
document.querySelectorAll('.feature-card, .reason-card, .stat-card, .service-card, .portfolio-card, .testimonial-card, .benefit-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Form submission handling (for contact page)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Service card expansion (for services page)
document.querySelectorAll('.service-header').forEach(header => {
    header.addEventListener('click', () => {
        const serviceCard = header.parentElement;
        const content = serviceCard.querySelector('.service-content');
        const chevron = header.querySelector('.chevron');
        
        // Close all other cards
        document.querySelectorAll('.service-card').forEach(card => {
            if (card !== serviceCard && card.classList.contains('expanded')) {
                card.classList.remove('expanded');
                card.querySelector('.service-content').style.maxHeight = '0';
                card.querySelector('.chevron').style.transform = 'rotate(0deg)';
            }
        });
        
        // Toggle current card
        serviceCard.classList.toggle('expanded');
        
        if (serviceCard.classList.contains('expanded')) {
            content.style.maxHeight = content.scrollHeight + 'px';
            chevron.style.transform = 'rotate(180deg)';
        } else {
            content.style.maxHeight = '0';
            chevron.style.transform = 'rotate(0deg)';
        }
    });
});

// Add animation delays for staggered effects
document.querySelectorAll('.fade-in').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
});

if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('active');
        }
        if (navLinks) {
            navLinks.classList.remove('active');
            navLinks.classList.remove('mobile-open');
        }
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number with + suffix if present
        const suffix = element.textContent.includes('+') ? '+' : '';
        const prefix = element.textContent.includes('%') ? '' : '';
        const postfix = element.textContent.includes('%') ? '%' : '';
        
        element.textContent = prefix + Math.floor(current) + postfix + suffix;
    }, 16);
};

// Animate counters when they come into view
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            animateCounter(entry.target, number);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Reveal on scroll observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // If it's a container with reveal items, animate them staggered
            const items = entry.target.querySelectorAll('.reveal-item');
            if (items.length > 0) {
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, index * 200);
                });
            }
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Also observe individual reveal items that aren't inside a .reveal container
document.querySelectorAll('.reveal-item').forEach(el => {
    if (!el.closest('.reveal')) {
        revealObserver.observe(el);
    }
});

console.log('MS Digital World - Website Loaded Successfully! 🚀');

// Scroll down indicator functionality
const scrollDownBtn = document.getElementById('scrollDownBtn');
if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
        // Scroll to the next section (about section)
        const nextSection = document.querySelector('.about-section');
        if (nextSection) {
            nextSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            // Fallback: scroll down by viewport height
            window.scrollBy({
                top: window.innerHeight - 100,
                behavior: 'smooth'
            });
        }
    });
}

// Also add scroll to top functionality for the same button when user scrolls down
let isScrolled = false;

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && scrollPosition > heroSection.offsetHeight / 2) {
        if (!isScrolled) {
            isScrolled = true;
            // Change the button to scroll to top
            if (scrollDownBtn) {
                scrollDownBtn.innerHTML = '<div class="wheel" style="transform: translateX(-50%) rotate(180deg);"></div>';
                scrollDownBtn.title = 'Scroll to top';
                
                // Update click handler
                scrollDownBtn.onclick = () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                };
            }
        }
    } else {
        if (isScrolled) {
            isScrolled = false;
            // Reset to scroll down functionality
            if (scrollDownBtn) {
                scrollDownBtn.innerHTML = '<div class="wheel"></div>';
                scrollDownBtn.title = 'Scroll down';
                
                // Reset click handler
                scrollDownBtn.onclick = () => {
                    const nextSection = document.querySelector('.about-section');
                    if (nextSection) {
                        nextSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    } else {
                        window.scrollBy({
                            top: window.innerHeight - 100,
                            behavior: 'smooth'
                        });
                    }
                };
            }
        }
    }
});
