const projectDetails = {
    abot: {
        label: 'Full-Stack AI Application · Jul 2025 – Aug 2025',
        title: 'ABot — Multi-Provider AI Chat Application',
        description: 'A full-stack AI application with a Node.js/Express backend proxy that integrates and routes requests across four different AI providers, deployed via CI/CD.',
        focus: 'Implemented Firebase Authentication and Firestore-backed chat history storage, including a guest-to-registered-user migration flow that preserves conversation history across provider switches.',
        tags: ['Node.js', 'Express.js', 'Firebase (Auth & Firestore)', 'REST APIs', 'CI/CD', 'Tailwind CSS'],
        link: 'https://abot-eta.vercel.app/'
    },
    'price-trail': {
        label: 'Full-Stack Next.js App · Dec 2025 – Jan 2026',
        title: 'PriceTrail — Smart Amazon Price Tracker',
        description: 'A full-stack price tracking and alert platform built with Next.js 14 App Router, MongoDB Atlas, and Tailwind CSS. Monitors Amazon product prices and delivers automated email alerts when products reach target prices.',
        focus: 'Engineered periodic automated web scraping routines using Cheerio, scheduled via Vercel Cron jobs, coupled with Nodemailer email delivery, Google OAuth 2.0 authentication, and responsive product dashboard analytics.',
        tags: ['Next.js 14', 'MongoDB Atlas', 'Cheerio Web Scraping', 'Vercel Cron', 'Google OAuth', 'Tailwind CSS'],
        link: 'https://price-trail-ruddy.vercel.app/'
    },
    linkly: {
        label: 'Database & Serverless Service · Aug 2025',
        title: 'Linkly — Serverless URL Shortener',
        description: 'A high-performance serverless backend service on Vercel Functions with MongoDB Atlas, featuring an on-demand cached connection pooling utility to eliminate cold-start query latency.',
        focus: 'Engineered secure REST API endpoints for user-specific URL generation, dynamic redirects, and real-time click redirection with Firebase authentication.',
        tags: ['MongoDB Atlas', 'Mongoose', 'Vercel Functions', 'Node.js', 'Firebase Auth', 'REST APIs'],
        link: 'https://linkly-link.vercel.app/'
    },
    'house-price': {
        label: 'Machine Learning & Data Analysis · MCA Thesis 2023',
        title: 'House Price Prediction — ML & Analytics',
        description: 'Final Year MCA research project at The American College. Conducted extensive exploratory data analysis and predictive modeling on 13,320 Bangalore real estate listings from Kaggle.',
        focus: 'Engineered custom preprocessing pipelines in src/encoding.py with area-unit normalization, outlier trimming, and categorical encoding. Benchmarked Linear Regression and Ridge baselines (R² = 0.644) against an optimized Random Forest Regressor (R² = 0.787). Deployed a 4-page interactive Streamlit dashboard and containerized FastAPI REST prediction API with Docker.',
        tags: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit', 'FastAPI', 'Docker', 'NumPy'],
        link: 'https://house-price-prediction-using-machine-learning-algorithms-9qccn.streamlit.app/'
    },
    ngelo: {
        label: 'Digital Marketplace · Vue.js & Vite',
        title: 'N-Gelo — Digital Marketplace',
        description: 'A responsive digital marketplace and shopping cart application engineered with Vue.js 3, Vite, and component-driven architecture.',
        focus: 'Implemented reactive state management for dynamic cart calculations, instant item quantity adjustments, and modular catalogue display with mobile-first CSS styling.',
        tags: ['Vue.js 3', 'Vite', 'JavaScript', 'CSS3 / Flexbox', 'State Management'],
        link: 'https://ecom-seven-sand.vercel.app'
    },
    ecommerce: {
        label: 'Digital Marketplace · Vue.js & Vite',
        title: 'N-Gelo — Digital Marketplace',
        description: 'A responsive digital marketplace and shopping cart application engineered with Vue.js 3, Vite, and component-driven architecture.',
        focus: 'Implemented reactive state management for dynamic cart calculations, instant item quantity adjustments, and modular catalogue display with mobile-first CSS styling.',
        tags: ['Vue.js 3', 'Vite', 'JavaScript', 'CSS3 / Flexbox', 'State Management'],
        link: 'https://ecom-seven-sand.vercel.app'
    },
    covercraft: {
        label: 'AI Document Generator · React & TypeScript',
        title: 'CoverCraft — AI Cover Letter Builder',
        description: 'An AI-powered cover letter builder engineered with React, TypeScript, and OpenRouter AI. Bridges applicant resume bullet points with target job descriptions or posting URLs to produce custom, high-converting cover letters.',
        focus: 'Architected Vercel serverless proxy functions to secure API keys, implemented server-side URL scrapers to bypass CORS restrictions on job boards, and integrated Google OAuth 2.0 authentication.',
        tags: ['React', 'TypeScript', 'OpenRouter AI', 'Vercel Serverless', 'Google OAuth'],
        link: 'https://github.com/abustark/cover_letter_gen'
    }
};

const EMAIL_ADDRESS = 'bas.abu0802@gmail.com';

const PALETTES = [
    { id: 'emerald', name: 'Cyber Emerald', desc: 'Mint & Emerald dual-tone', isDefault: true },
    { id: 'violet', name: 'Electric Violet', desc: 'Neon Purple & Indigo dual-tone' },
    { id: 'blue', name: 'Electric Blue', desc: 'Cobalt & Sapphire dual-tone' },
    { id: 'amber', name: 'Sunset Amber', desc: 'Amber Gold & Rose Coral dual-tone' }
];

const COMMAND_ACTIONS = [
    { type: 'nav', title: 'Home / Hero', subtitle: 'Data & Analytics Engineer Portfolio', target: '#home', badge: 'Section' },
    { type: 'nav', title: 'About / Role Fit', subtitle: 'Target roles: Data & Analytics, SQL, Applied AI', target: '#about', badge: 'Section' },
    { type: 'nav', title: 'Projects & Work', subtitle: 'PriceTrail, House Price ML, ABot, Linkly, N-Gelo, CoverCraft', target: '#work', badge: 'Section' },
    { type: 'nav', title: 'Technical Skills', subtitle: 'SQL, Python, Scikit-learn, Power BI, MongoDB', target: '#skills', badge: 'Section' },
    { type: 'nav', title: 'Experience (Amazon)', subtitle: 'Amazon ML Data Associate II (Aug 2023 – Present)', target: '#experience', badge: 'Section' },
    { type: 'nav', title: 'Contact', subtitle: 'Open to Remote & Hybrid (Madurai, Coimbatore, Chennai)', target: '#contact', badge: 'Section' },
    
    // Palettes
    { type: 'palette', title: 'Theme: Cyber Emerald [Default]', subtitle: 'Mint & Emerald dual-tone', palette: 'emerald', badge: 'Default' },
    { type: 'palette', title: 'Theme: Electric Violet', subtitle: 'Neon Purple & Indigo dual-tone', palette: 'violet', badge: 'Color' },
    { type: 'palette', title: 'Theme: Electric Blue', subtitle: 'Cobalt & Sapphire dual-tone', palette: 'blue', badge: 'Color' },
    { type: 'palette', title: 'Theme: Sunset Amber', subtitle: 'Amber Gold & Rose Coral dual-tone', palette: 'amber', badge: 'Color' },

    // Actions
    { type: 'action', title: 'Copy Email Address', subtitle: 'Copy bas.abu0802@gmail.com', action: 'copy-email', badge: 'Action' },
    { type: 'action', title: 'Toggle Dark / Light Theme', subtitle: 'Switch color theme', action: 'toggle-theme', badge: 'Action' },
    { type: 'action', title: 'Open Resume (PDF)', subtitle: 'View resume in new tab', action: 'open-resume', badge: 'Action' },
    { type: 'action', title: 'Copy Portfolio Link', subtitle: 'Share this website link', action: 'copy-link', badge: 'Action' },

    // Projects
    { type: 'project', title: 'ABot — AI Chat Application', subtitle: 'Multi-Provider AI Assistant', target: 'https://abot-eta.vercel.app/', badge: 'Live App' },
    { type: 'project', title: 'PriceTrail — Smart Price Tracker', subtitle: 'Next.js 14, MongoDB Atlas & Vercel Cron', target: 'https://price-trail-ruddy.vercel.app/', badge: 'Live App' },
    { type: 'project', title: 'Linkly — URL Shortener', subtitle: 'Serverless Vercel & MongoDB Atlas', target: 'https://linkly-link.vercel.app/', badge: 'Live Utility' },
    { type: 'project', title: 'House Price Prediction', subtitle: 'Streamlit Random Forest ML App (R² = 0.787)', target: 'https://house-price-prediction-using-machine-learning-algorithms-9qccn.streamlit.app/', badge: 'Live ML' },
    { type: 'project', title: 'N-Gelo — Digital Marketplace', subtitle: 'Vue.js 3 & Vite Shopping Cart', target: 'https://ecom-seven-sand.vercel.app', badge: 'Live App' },
    { type: 'project', title: 'CoverCraft — AI Cover Letter Builder', subtitle: 'GitHub Repository (React + TypeScript)', target: 'https://github.com/abustark/cover_letter_gen', badge: 'GitHub' }
];

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const body = document.body;
    const header = document.getElementById('site-header');
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const navPanel = document.getElementById('nav-links');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileScrim = document.getElementById('mobile-scrim');
    const themeToggle = document.getElementById('theme-toggle');
    const dynamicRole = document.getElementById('dynamic-role');
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    const commandMenu = document.getElementById('command-menu');
    const commandSearchInput = document.getElementById('command-search-input');
    const commandResults = document.getElementById('command-results');
    const cmdKeycap = document.getElementById('cmd-keycap');
    const projectDialog = document.getElementById('project-dialog');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    // -------------------------------------------------------------
    // 1. Toast Notifications
    // -------------------------------------------------------------
    let toastTimer = null;
    const showToast = (message, isHtml = false) => {
        if (!toast || !toastText) return;
        if (isHtml) {
            toastText.innerHTML = message;
        } else {
            toastText.textContent = message;
        }
        toast.classList.add('show');
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    };

    // -------------------------------------------------------------
    // 2. Dynamic Theme Mouse Cursor (Desktop)
    // -------------------------------------------------------------
    function updateDynamicCursor() {
        try {
            if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

            const computed = getComputedStyle(document.documentElement);
            const accent = computed.getPropertyValue('--accent').trim() || '#10b981';
            const cool = computed.getPropertyValue('--accent-cool').trim() || '#34d399';
            const isLight = document.body.classList.contains('light-mode');
            const strokeColor = isLight ? '%23ffffff' : '%2305080c';

            const encAccent = encodeURIComponent(accent);
            const encCool = encodeURIComponent(cool);

            const defaultCursor = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'><polygon points='3,2 3,21 8.5,16.5 13.5,23 16.5,21 11.5,14.5 19,14.5' fill='${encAccent}' stroke='${strokeColor}' stroke-width='1.5' stroke-linejoin='round'/></svg>`;

            const pointerCursor = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'><polygon points='3,2 3,21 8.5,16.5 13.5,23 16.5,21 11.5,14.5 19,14.5' fill='${encCool}' stroke='${strokeColor}' stroke-width='1.5' stroke-linejoin='round'/><circle cx='18' cy='18' r='3.5' fill='${encAccent}' stroke='${strokeColor}' stroke-width='1'/></svg>`;

            let styleEl = document.getElementById('dynamic-cursor-style');
            if (!styleEl) {
                styleEl = document.createElement('style');
                styleEl.id = 'dynamic-cursor-style';
                document.head.appendChild(styleEl);
            }

            styleEl.textContent = `
                @media (hover: hover) and (pointer: fine) {
                    html, body {
                        cursor: url("${defaultCursor}") 3 2, auto !important;
                    }
                    a, button, input[type="submit"], input[type="button"], select, [role="button"], [role="tab"], .filter-chip, .palette-option, .command-item, .project-card, .skills-card, .status-pill, summary {
                        cursor: url("${pointerCursor}") 3 2, pointer !important;
                    }
                }
            `;
        } catch (e) {
            console.warn('Cursor styling error:', e);
        }
    }

    // -------------------------------------------------------------
    // 3. Interactive Dual-Tone Color Palette Switcher
    // -------------------------------------------------------------
    const paletteTrigger = document.getElementById('palette-trigger');
    let currentPaletteIndex = 0;

    const setPalette = (paletteName, notify = false) => {
        const foundIdx = PALETTES.findIndex(p => p.id === paletteName);
        currentPaletteIndex = foundIdx >= 0 ? foundIdx : 0;
        const activePal = PALETTES[currentPaletteIndex];

        root.setAttribute('data-palette', activePal.id);
        body.setAttribute('data-palette', activePal.id);

        try {
            localStorage.setItem('portfolio-palette', activePal.id);
        } catch {}

        updateDynamicCursor();

        if (notify) {
            if (activePal.isDefault) {
                showToast(`Theme: ${activePal.name} · ${activePal.desc} <span class="toast-default-badge">DEFAULT</span>`, true);
            } else {
                showToast(`Theme: ${activePal.name} · ${activePal.desc}`);
            }
        }
    };

    try {
        const savedPalette = localStorage.getItem('portfolio-palette') || 'emerald';
        setPalette(savedPalette, false);
    } catch {
        setPalette('emerald', false);
    }

    // Instant cycle on click
    paletteTrigger?.addEventListener('click', (e) => {
        e.preventDefault();
        const nextIndex = (currentPaletteIndex + 1) % PALETTES.length;
        setPalette(PALETTES[nextIndex].id, true);
    });

    // -------------------------------------------------------------
    // 3. Dynamic Headline Typewriter
    // -------------------------------------------------------------
    const initDynamicRole = () => {
        if (!dynamicRole) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const roles = (dynamicRole.dataset.roles || '')
            .split(',')
            .map((role) => role.trim())
            .filter(Boolean);
        if (!roles.length) return;

        let roleIndex = 0;
        let letterIndex = roles[0].length;
        let deleting = true;

        const tick = () => {
            const word = roles[roleIndex];
            const currentSlice = word.slice(0, letterIndex);
            dynamicRole.textContent = currentSlice || '\u00A0';

            if (deleting) {
                letterIndex -= 1;
                if (letterIndex <= 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            } else {
                letterIndex += 1;
                if (letterIndex >= roles[roleIndex].length) {
                    deleting = true;
                    window.setTimeout(tick, 1600);
                    return;
                }
            }

            window.setTimeout(tick, deleting ? 45 : 85);
        };

        window.setTimeout(tick, 1000);
    };

    initDynamicRole();

    // -------------------------------------------------------------
    // 4. Theme Toggle & State
    // -------------------------------------------------------------
    const applyTheme = (theme) => {
        const light = theme === 'light';
        body.classList.toggle('light-mode', light);
        body.classList.toggle('dark-mode', !light);
        root.classList.toggle('light-mode', light);
        root.classList.toggle('dark-mode', !light);
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f8fafc' : '#090e14');
        themeToggle?.setAttribute('aria-pressed', String(light));
        updateDynamicCursor();
    };

    try {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            applyTheme('light');
        } else {
            applyTheme('dark');
        }
    } catch {
        applyTheme('dark');
    }

    const toggleTheme = () => {
        const nextTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
        applyTheme(nextTheme);
        try {
            localStorage.setItem('portfolio-theme', nextTheme);
        } catch {}
        showToast(`Switched to ${nextTheme} mode`);
    };

    themeToggle?.addEventListener('click', toggleTheme);

    // -------------------------------------------------------------
    // 5. Mobile Navigation Drawer & Scrim
    // -------------------------------------------------------------
    const closeMobileMenu = () => {
        navPanel?.classList.remove('open');
        mobileScrim?.classList.remove('open');
        body.classList.remove('menu-open');
        menuToggle?.setAttribute('aria-expanded', 'false');
        menuToggle?.setAttribute('aria-label', 'Open mobile navigation menu');
    };

    menuToggle?.addEventListener('click', () => {
        const isOpen = navPanel?.classList.toggle('open');
        mobileScrim?.classList.toggle('open', Boolean(isOpen));
        body.classList.toggle('menu-open', Boolean(isOpen));
        menuToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close mobile navigation menu' : 'Open mobile navigation menu');
    });

    mobileScrim?.addEventListener('click', closeMobileMenu);
    mobileScrim?.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && body.classList.contains('menu-open')) {
            closeMobileMenu();
            menuToggle?.focus();
        }
    });

    // -------------------------------------------------------------
    // 6. Smooth Scroll & Active Nav Pill Sliding Indicator
    // -------------------------------------------------------------
    const navIndicator = document.getElementById('nav-indicator');

    const updateNavIndicator = () => {
        if (!navIndicator || window.innerWidth <= 960) {
            if (navIndicator) navIndicator.style.opacity = '0';
            return;
        }
        const activeLink = navLinks.find((link) => link.classList.contains('active'));
        if (activeLink && activeLink.offsetParent !== null) {
            navIndicator.style.transform = `translateX(${activeLink.offsetLeft}px)`;
            navIndicator.style.width = `${activeLink.offsetWidth}px`;
            navIndicator.style.opacity = '1';
        } else {
            navIndicator.style.opacity = '0';
        }
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            closeMobileMenu();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            if (anchor.classList.contains('nav-link')) {
                navLinks.forEach((link) => link.classList.toggle('active', link === anchor));
                updateNavIndicator();
            }
        });
    });

    const updateScrollState = () => {
        header?.classList.toggle('is-scrolled', window.scrollY > 20);
    };

    let scrollTicking = false;
    const onScroll = () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                updateScrollState();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    let resizeTicking = false;
    window.addEventListener('resize', () => {
        if (!resizeTicking) {
            window.requestAnimationFrame(() => {
                if (window.innerWidth > 960 && body.classList.contains('menu-open')) {
                    closeMobileMenu();
                }
                updateNavIndicator();
                resizeTicking = false;
            });
            resizeTicking = true;
        }
    }, { passive: true });
    updateScrollState();

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
            updateNavIndicator();
        });
    }, {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0
    });

    document.querySelectorAll('main section[id]').forEach((section) => {
        sectionObserver.observe(section);
    });

    // Initial positioning
    setTimeout(updateNavIndicator, 200);

    // -------------------------------------------------------------
    // 7. Scroll Reveal Animations
    // -------------------------------------------------------------
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08
    });

    document.querySelectorAll('.reveal').forEach((item) => {
        revealObserver.observe(item);
    });

    // -------------------------------------------------------------
    // 8. Interactive Animated Sparkline Chart
    // -------------------------------------------------------------
    const sparkLine = document.getElementById('spark-line');
    if (sparkLine) {
        const sparkObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    sparkLine.style.strokeDashoffset = '0';
                }
            });
        }, { threshold: 0.2 });
        sparkObserver.observe(sparkLine);
    }

    // -------------------------------------------------------------
    // 9. Clipboard Actions (Email & Links)
    // -------------------------------------------------------------
    document.querySelectorAll('[data-copy-email]').forEach((button) => {
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(EMAIL_ADDRESS);
                showToast(`Copied ${EMAIL_ADDRESS} to clipboard`);
            } catch {
                showToast(`Email: ${EMAIL_ADDRESS}`);
            }
        });
    });

    document.querySelectorAll('[data-copy-link]').forEach((button) => {
        button.addEventListener('click', async () => {
            const url = window.location.href.split('#')[0];
            try {
                await navigator.clipboard.writeText(url);
                showToast('Portfolio link copied to clipboard');
            } catch {
                showToast('Could not copy link');
            }
        });
    });

    // -------------------------------------------------------------
    // 10. Fluid Project Filter with Animation
    // -------------------------------------------------------------
    const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
    const projectCards = Array.from(document.querySelectorAll('.project-card[data-category]'));

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter || 'all';
            filterButtons.forEach((item) => {
                const isActive = item === button;
                item.classList.toggle('active', isActive);
                item.setAttribute('aria-pressed', String(isActive));
            });

            projectCards.forEach((card) => {
                const categories = card.dataset.category?.split(' ') || [];
                const match = filter === 'all' || categories.includes(filter);
                card.classList.toggle('is-hidden', !match);
            });
        });
    });

    // -------------------------------------------------------------
    // 11. Project Case Notes Modal (<dialog>)
    // -------------------------------------------------------------
    const setDialogText = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    };

    let lastDialogFocus = null;

    const openProjectDialog = (projectId) => {
        const project = projectDetails[projectId];
        if (!project || !projectDialog) return;

        lastDialogFocus = document.activeElement;
        setDialogText('dialog-label', project.label);
        setDialogText('dialog-title', project.title);
        setDialogText('dialog-description', project.description);
        setDialogText('dialog-focus', project.focus);

        const tagContainer = document.getElementById('dialog-tags');
        if (tagContainer) {
            tagContainer.innerHTML = '';
            project.tags.forEach((tag) => {
                const pill = document.createElement('span');
                pill.textContent = tag;
                tagContainer.appendChild(pill);
            });
        }

        const link = document.getElementById('dialog-link');
        if (link) {
            link.href = project.link;
            link.querySelector('span').textContent = project.link.includes('github.com') ? 'Open repository' : 'Open live project';
        }

        projectDialog.showModal();
        body.classList.add('modal-open');
    };

    const closeProjectDialog = () => {
        if (!projectDialog) return;
        projectDialog.close();
        body.classList.remove('modal-open');
        if (lastDialogFocus && typeof lastDialogFocus.focus === 'function') {
            lastDialogFocus.focus();
        }
    };

    document.querySelectorAll('[data-open-project]').forEach((button) => {
        button.addEventListener('click', () => {
            openProjectDialog(button.dataset.openProject);
        });
    });

    document.querySelector('[data-close-dialog]')?.addEventListener('click', closeProjectDialog);

    projectDialog?.addEventListener('click', (event) => {
        const rect = projectDialog.getBoundingClientRect();
        const clickedOutside = event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;
        if (clickedOutside) closeProjectDialog();
    });

    // -------------------------------------------------------------
    // 12. Spotlight Command Palette (Ctrl+K / Cmd+K)
    // -------------------------------------------------------------
    const isMac = navigator.platform.toUpperCase().includes('MAC');
    if (cmdKeycap) {
        cmdKeycap.textContent = isMac ? '⌘K' : 'Ctrl K';
    }

    let selectedCommandIndex = 0;
    let currentFilteredCommands = [...COMMAND_ACTIONS];

    const renderCommandResults = (items) => {
        if (!commandResults) return;
        currentFilteredCommands = items;
        selectedCommandIndex = 0;

        if (!items.length) {
            commandResults.innerHTML = '<div style="padding: 1.5rem; text-align: center; color: var(--muted);">No matching actions found</div>';
            return;
        }

        commandResults.innerHTML = items.map((item, index) => `
            <div class="command-item ${index === 0 ? 'is-selected' : ''}" data-command-index="${index}" role="option">
                <div class="command-item-left">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <div>
                        <div style="color: var(--text); font-weight: 700;">${item.title}</div>
                        <div style="font-size: 0.78rem; color: var(--muted); font-weight: 500;">${item.subtitle}</div>
                    </div>
                </div>
                <span class="command-item-badge">${item.badge}</span>
            </div>
        `).join('');
    };

    commandResults?.addEventListener('click', (e) => {
        const itemEl = e.target.closest('.command-item');
        if (!itemEl) return;
        const idx = parseInt(itemEl.dataset.commandIndex, 10);
        if (!isNaN(idx) && currentFilteredCommands[idx]) {
            executeCommand(currentFilteredCommands[idx]);
        }
    });

    const updateCommandSelection = () => {
        const items = commandResults?.querySelectorAll('.command-item');
        if (!items) return;
        items.forEach((item, index) => {
            item.classList.toggle('is-selected', index === selectedCommandIndex);
            if (index === selectedCommandIndex) {
                item.scrollIntoView({ block: 'nearest' });
            }
        });
    };

    const executeCommand = (item) => {
        if (!item) return;
        closeCommandPalette();

        if (item.type === 'nav' && item.target) {
            const el = document.querySelector(item.target);
            el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (item.type === 'palette' && item.palette) {
            setPalette(item.palette, true);
        } else if (item.type === 'project' && item.target) {
            window.open(item.target, '_blank', 'noopener,noreferrer');
        } else if (item.action === 'copy-email') {
            navigator.clipboard.writeText(EMAIL_ADDRESS);
            showToast(`Copied ${EMAIL_ADDRESS} to clipboard`);
        } else if (item.action === 'toggle-theme') {
            toggleTheme();
        } else if (item.action === 'open-resume') {
            window.open('assets/Basith_AbuSyed_Resume.pdf', '_blank');
        } else if (item.action === 'copy-link') {
            navigator.clipboard.writeText(window.location.href.split('#')[0]);
            showToast('Portfolio link copied');
        }
    };

    let lastCommandFocus = null;
    const openCommandPalette = () => {
        if (!commandMenu) return;
        lastCommandFocus = document.activeElement;
        renderCommandResults(COMMAND_ACTIONS);
        if (commandSearchInput) commandSearchInput.value = '';
        commandMenu.showModal();
        body.classList.add('modal-open');
        commandSearchInput?.focus();
    };

    const closeCommandPalette = () => {
        if (!commandMenu) return;
        commandMenu.close();
        body.classList.remove('modal-open');
        if (lastCommandFocus && typeof lastCommandFocus.focus === 'function') {
            lastCommandFocus.focus();
        }
    };

    document.querySelectorAll('[data-open-command]').forEach((btn) => {
        btn.addEventListener('click', openCommandPalette);
    });

    document.querySelector('[data-close-command]')?.addEventListener('click', closeCommandPalette);

    commandMenu?.addEventListener('click', (event) => {
        const rect = commandMenu.getBoundingClientRect();
        const clickedOutside = event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;
        if (clickedOutside) closeCommandPalette();
    });

    commandSearchInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) {
            renderCommandResults(COMMAND_ACTIONS);
            return;
        }
        const filtered = COMMAND_ACTIONS.filter((item) =>
            item.title.toLowerCase().includes(query) ||
            item.subtitle.toLowerCase().includes(query) ||
            item.badge.toLowerCase().includes(query)
        );
        renderCommandResults(filtered);
    });

    commandMenu?.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedCommandIndex = (selectedCommandIndex + 1) % currentFilteredCommands.length;
            updateCommandSelection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedCommandIndex = (selectedCommandIndex - 1 + currentFilteredCommands.length) % currentFilteredCommands.length;
            updateCommandSelection();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentFilteredCommands[selectedCommandIndex]) {
                executeCommand(currentFilteredCommands[selectedCommandIndex]);
            }
        }
    });

    // -------------------------------------------------------------
    // 13. Global Keyboard Shortcuts
    // -------------------------------------------------------------
    document.addEventListener('keydown', (event) => {
        const commandPressed = isMac ? event.metaKey : event.ctrlKey;
        if (commandPressed && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            if (commandMenu?.open) {
                closeCommandPalette();
            } else {
                openCommandPalette();
            }
        }

        if (event.key === 'Escape') {
            closeMobileMenu();
            if (commandMenu?.open) closeCommandPalette();
            if (projectDialog?.open) closeProjectDialog();
        }
    });

    // -------------------------------------------------------------
    // 14. Contact Form Submission
    // -------------------------------------------------------------
    const setFormMessage = (message, type = '') => {
        if (!formMessage) return;
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`.trim();
    };

    contactForm?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const submitButton = document.getElementById('contact-submit');
        const action = contactForm.getAttribute('action');

        if (!action) {
            setFormMessage('Contact form is not configured yet.', 'error');
            return;
        }

        setFormMessage('Sending message...');
        submitButton?.setAttribute('disabled', 'true');

        try {
            const response = await fetch(action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) throw new Error('Submission failed');

            contactForm.reset();
            setFormMessage('Message sent successfully. I will get back to you soon!', 'success');
            showToast('Message delivered successfully');
        } catch (error) {
            console.error('Contact form submission error:', error);
            setFormMessage('Message could not be sent. Please connect on LinkedIn or email bas.abu0802@gmail.com', 'error');
        } finally {
            submitButton?.removeAttribute('disabled');
        }
    });
});
