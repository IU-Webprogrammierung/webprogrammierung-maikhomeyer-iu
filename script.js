async function init() {
    await loadComponent('.site-header', 'components/header.html');
    await loadComponent('.site-footer', 'components/footer.html');
    
    initNavigation();
    initScroll();
    initThemeToggle();
    initReveal();
    initThemeImages();
    initModalScrollLock();
    initModalPreload();
    initVideoToggles();
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

function initThemeImages() {
    const elements = document.querySelectorAll('[data-src-dark]');
    if (!elements.length) return;

    elements.forEach(el => {
        if (el.tagName === 'SOURCE') {
            el.dataset.srcLight = el.srcset || el.src;
        } else if (el.tagName === 'IMG') {
            el.dataset.srcLight = el.src;
        } else if (el.tagName === 'VIDEO') {
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
            if (el.parentElement.tagName === 'PICTURE') {
                el.srcset = newSrc;
            } else if (el.parentElement.tagName === 'VIDEO') {
                el.src = newSrc;
            }
        } else if (el.tagName === 'IMG') {
            el.src = newSrc;
        }
    });
    
    document.querySelectorAll('video').forEach(video => {
        if (video.querySelector('source[data-src-dark]')) {
            video.load();
            video.play().catch(() => {});
        }
    });
}

function initModalScrollLock() {
    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('beforetoggle', (e) => {
            if (e.newState === 'open') {
                document.documentElement.classList.add('is-modal-open');
            }
        });
        
        dialog.addEventListener('toggle', (e) => {
            if (e.newState === 'closed') {
                setTimeout(() => {
                    document.documentElement.classList.remove('is-modal-open');
                }, 480);
            }
        });
    });
}

function initModalPreload() {
    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('beforetoggle', async (e) => {
            if (e.newState !== 'open') return;
            
            const images = dialog.querySelectorAll('img');
            await Promise.all(
                [...images].map(img => img.decode().catch(() => {}))
            );
        });
    });
}

function initVideoToggles() {
    document.querySelectorAll('.video-player').forEach(player => {
        const video = player.querySelector('video');
        const toggle = player.querySelector('.video-player__toggle');
        if (!video || !toggle) return;

        toggle.addEventListener('click', () => {
            if (video.paused) {
                video.play().catch(() => {});
                player.setAttribute('data-paused', 'false');
                toggle.setAttribute('aria-label', 'Video pausieren');
                toggle.setAttribute('aria-pressed', 'false');
            } else {
                video.pause();
                player.setAttribute('data-paused', 'true');
                toggle.setAttribute('aria-label', 'Video abspielen');
                toggle.setAttribute('aria-pressed', 'true');
            }
        });
    });
}