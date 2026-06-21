async function init() {
    await loadComponent('.site-header', 'components/header.html');
    await loadComponent('.site-footer', 'components/footer.html');
    
    initNavigation();
    initScroll();
}

async function loadComponent(selector, path) {
    const response = await fetch(path);
    const html = await response.text();
    const element = document.querySelector(selector);
    element.innerHTML = html;
}

function initNavigation() {
    const hamburger = document.querySelector('.site-nav__hamburger');
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isOpen);
        hamburger.setAttribute('aria-label', isOpen ? 'Navigation öffnen' : 'Navigation schließen');
    });
}

function initScroll() {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('site-header--scrolled');
        } else {
            header.classList.remove('site-header--scrolled');
        }
    });
}

init();