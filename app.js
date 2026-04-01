// ==========================================
// Din Kulturu ve Ahlak Bilgisi - App JS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initAccordion();
    initQuestions();
    initScrollProgress();
    initBackToTop();
    initScrollAnimations();
    registerServiceWorker();
});

// ==========================================
// Theme Toggle
// ==========================================
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    const saved = localStorage.getItem('theme');

    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.innerHTML = '&#9788;';
    }

    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            icon.innerHTML = '&#9790;';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.innerHTML = '&#9788;';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ==========================================
// Navbar
// ==========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScroll = 0;

    // Show/hide navbar on scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }

        lastScroll = currentScroll;
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ==========================================
// Accordion
// ==========================================
function initAccordion() {
    const items = document.querySelectorAll('.accordion-item');

    items.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            items.forEach(i => i.classList.remove('active'));

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ==========================================
// Questions
// ==========================================
function initQuestions() {
    const cards = document.querySelectorAll('.question-card');

    cards.forEach(card => {
        const btn = card.querySelector('.question-toggle');
        const answer = card.querySelector('.question-answer');
        btn.addEventListener('click', () => {
            card.classList.toggle('revealed');
            const span = btn.querySelector('span:first-child');
            if (card.classList.contains('revealed')) {
                span.textContent = 'Gizle';
                card.style.borderColor = 'var(--accent)';
                card.style.background = 'var(--accent-bg)';
                if (answer) {
                    answer.style.paddingTop = '1rem';
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.opacity = '1';
                }
            } else {
                span.textContent = 'Düşün';
                card.style.borderColor = '';
                card.style.background = '';
                if (answer) {
                    answer.style.maxHeight = '0';
                    answer.style.opacity = '0';
                    answer.style.paddingTop = '0';
                }
            }
        });
    });
}

// ==========================================
// Scroll Progress
// ==========================================
function initScrollProgress() {
    const fill = document.getElementById('progressFill');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        fill.style.width = progress + '%';
    });
}

// ==========================================
// Back to Top
// ==========================================
function initBackToTop() {
    const btn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================================
// Scroll Animations
// ==========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe cards and sections
    const elements = document.querySelectorAll(
        '.kazanim-card, .kavram-card, .content-card, .accordion-item, .question-card, .info-card, .quran-card'
    );

    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(el);
    });
}

// ==========================================
// Service Worker Registration
// ==========================================
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => {
                console.log('Service Worker registered:', reg.scope);
            })
            .catch(err => {
                console.log('Service Worker registration failed:', err);
            });
    }
}
