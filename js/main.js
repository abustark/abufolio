/**
 * Main JavaScript for Basith AbuSyed Portfolio
 * Handles: Preloader, Typed.js, Theme Toggle, Smooth Scrolling,
 * Scroll Animations, Project Modal, Contact Form, Mobile Menu, Back to Top
 */

document.addEventListener('DOMContentLoaded', function () {

    // Preloader logic
    window.addEventListener('load', function () {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');
    });

    // Typed.js Typewriter Effect
    if (document.getElementById('typed-text')) {
        var typed = new Typed('#typed-text', {
            strings: ["Frontend Developer", "Web Designer", "ML Data Associate", "Database Expert"],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            smartBackspace: true,
        });
    }

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Function to update scrollbar colors dynamically
    const updateScrollbarColors = (isLightMode) => {
        let scrollbarStyle = document.getElementById('dynamic-scrollbar-style');
        if (!scrollbarStyle) {
            scrollbarStyle = document.createElement('style');
            scrollbarStyle.id = 'dynamic-scrollbar-style';
            document.head.appendChild(scrollbarStyle);
        }

        if (isLightMode) {
            scrollbarStyle.textContent = `
                ::-webkit-scrollbar-track { background: #e5e7eb !important; }
                ::-webkit-scrollbar-thumb { background: #10b981 !important; }
                ::-webkit-scrollbar-thumb:hover { background: #059669 !important; }
                html { scrollbar-color: #10b981 #e5e7eb; }
            `;
        } else {
            scrollbarStyle.textContent = `
                ::-webkit-scrollbar-track { background: #0a192f !important; }
                ::-webkit-scrollbar-thumb { background: #f5a623 !important; }
                ::-webkit-scrollbar-thumb:hover { background: #ffd700 !important; }
                html { scrollbar-color: #f5a623 #0a192f; }
            `;
        }
    };

    // Apply scrollbar colors on page load based on saved theme
    updateScrollbarColors(body.classList.contains('light-mode'));

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        body.classList.toggle('dark-mode');

        if (body.classList.contains('light-mode')) {
            body.classList.remove('bg-darkBg', 'text-darkText');
            body.classList.add('bg-lightBg', 'text-lightText');
            localStorage.setItem('theme', 'light');
            updateScrollbarColors(true);
        } else {
            body.classList.remove('bg-lightBg', 'text-lightText');
            body.classList.add('bg-darkBg', 'text-darkText');
            localStorage.setItem('theme', 'dark');
            updateScrollbarColors(false);
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Animation (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(element => observer.observe(element));

    // Project Modal Logic
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalTags = document.getElementById('modal-tags');
    const modalLinks = document.getElementById('modal-links');

    const openModal = (card) => {
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        const imageSrc = card.querySelector('img').src;
        const tags = Array.from(card.querySelectorAll('.glass-dark')).map(tag => tag.textContent);
        const link = card.querySelector('a').href;
        const linkText = card.querySelector('a').textContent;

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImage.src = imageSrc;

        modalTags.innerHTML = '';
        modalLinks.innerHTML = '';

        tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium';
            span.textContent = tag;
            modalTags.appendChild(span);
        });

        if (link && link !== "#" && !link.includes("Asset")) {
            const a = document.createElement('a');
            a.href = link;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.className = "px-6 py-2 rounded-lg bg-accent text-darkBg font-bold hover:opacity-90 transition-opacity";
            a.textContent = linkText;
            modalLinks.appendChild(a);
        }

        modal.classList.remove('opacity-0', 'invisible');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.add('opacity-0', 'invisible');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        document.body.style.overflow = '';
    };

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') return;
            openModal(card);
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('invisible')) {
            closeModal();
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.classList.remove('hidden', 'bg-red-500', 'bg-green-500', 'bg-blue-500');
        if (type === 'error') formMessage.classList.add('bg-red-500');
        else if (type === 'success') formMessage.classList.add('bg-green-500');
        else if (type === 'loading') formMessage.classList.add('bg-blue-500');
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const formAction = this.getAttribute('action');

            showMessage('Sending your message...', 'loading');

            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    showMessage('Your message has been sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            const errorMsg = data["errors"].map(error => error["message"]).join(", ");
                            showMessage(`Oops! ${errorMsg}`, 'error');
                        } else {
                            showMessage('Oops! There was a problem sending your message.', 'error');
                        }
                    })
                }
            }).catch(error => {
                showMessage('Oops! There was a network error. Please try again.', 'error');
            });
        });
    }

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const menuIcon = document.getElementById('menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        const isOpen = mobileMenu.classList.toggle('open');
        if (isOpen) {
            mobileMenu.style.right = '0';
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            mobileMenu.style.right = '-100%';
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    };

    menuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Back to Top Button Logic
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
        } else {
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== UI/UX ENHANCEMENTS ==========

    // Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    const updateScrollProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
    };
    window.addEventListener('scroll', updateScrollProgress);

    // Active Nav Indicator
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveNav = () => {
        const scrollPos = window.scrollY + 150; // Offset for header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Run on load
});
