async function init() {
    await loadComponent('.site-header', 'components/header.html');
    await loadComponent('.site-footer', 'components/footer.html');
    
    initNavigation();
    initScroll();
    initThemeToggle();
    initReveal();
    initFrameLoop();
    initThemeImages();
}

async function loadComponent(selector, path) {
    const response = await fetch(path);
    const html = await response.text();
    const element = document.querySelector(selector);
    element.innerHTML = html;
}

function initNavigation() {
    const hamburger = document.querySelector('.site-nav__hamburger');
    const navLinks = document.querySelectorAll('.site-nav__link');
    
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isOpen);
        hamburger.setAttribute('aria-label', isOpen ? 'Navigation öffnen' : 'Navigation schließen');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Navigation öffnen');
        });
    });
}

function initScroll() {
    const header = document.querySelector('.site-header');
    
    // Transition initial deaktivieren
    header.classList.add('site-header--no-transition');
    
    function updateHeader() {
        if (window.scrollY > 0) {
            header.classList.add('site-header--scrolled');
        } else {
            header.classList.remove('site-header--scrolled');
        }
    }
    
    updateHeader();
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            header.classList.remove('site-header--no-transition');
        });
    });
    
    window.addEventListener('scroll', updateHeader);
}

init();


// THEME TOGGLE

const THEME_STORAGE_KEY = 'theme';

function getInitialTheme() {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) return stored;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);

    const toggle = document.querySelector('.theme-toggle');
    if (toggle) updateToggleState(toggle);
    
    updateThemeImages();
}

applyTheme(getInitialTheme());

function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    
    toggle.addEventListener('click', toggleTheme);
    
    // aria-pressed passend zum aktuellen Theme setzen
    updateToggleState(toggle);
}

function updateToggleState(toggle) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    toggle.setAttribute('aria-pressed', isDark);
    toggle.setAttribute('aria-label', isDark ? 'Zum hellen Farbschema wechseln' : 'Zum dunklen Farbschema wechseln');
}

function initReveal() {
    const heroReveals = document.querySelectorAll('.hero .reveal');
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            heroReveals.forEach(el => el.classList.add('reveal--visible'));
        });
    });

    const otherReveals = document.querySelectorAll('.reveal:not(.hero .reveal)');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    otherReveals.forEach(el => observer.observe(el));
}

function initFrameLoop() {
    const loops = document.querySelectorAll('.frame-loop');
    
    loops.forEach(loop => {
        const modal = loop.closest('dialog');
        if (!modal) return;
        
        const frames = loop.querySelectorAll('.frame-loop__frame');
        const images = loop.querySelectorAll('img');
        
        frames.forEach(frame => {
            frame.style.animationPlayState = 'paused';
        });
        
        modal.addEventListener('toggle', async (e) => {
            if (e.newState !== 'open') return;
            
            // Alle Bilder tatsächlich dekodieren
            await Promise.all(
                [...images].map(img => img.decode().catch(() => {}))
            );
            
            frames.forEach(frame => {
                frame.style.animationPlayState = 'running';
            });
        });
    });
}

function initThemeImages() {
    const elements = document.querySelectorAll('[data-src-dark]');
    if (!elements.length) return;

    // Ursprüngliche Werte als Light-Variante merken
    elements.forEach(el => {
        if (el.tagName === 'SOURCE') {
            el.dataset.srcLight = el.srcset;
        } else if (el.tagName === 'IMG') {
            el.dataset.srcLight = el.src;
        }
    });

    updateThemeImages();
}

function updateThemeImages() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const elements = document.querySelectorAll('[data-src-dark]');

    elements.forEach(el => {
        const newSrc = isDark ? el.dataset.srcDark : el.dataset.srcLight;
        if (!newSrc) return;
        
        if (el.tagName === 'SOURCE') {
            el.srcset = newSrc;
        } else if (el.tagName === 'IMG') {
            el.src = newSrc;
        }
    });
}