const hamburger = document.querySelector('.site-nav__hamburger');

hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    
    hamburger.setAttribute('aria-expanded', !isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Navigation öffnen' : 'Navigation schließen');
});

const navLinks = document.querySelectorAll('.site-nav__link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Menü öffnen');
    });
});