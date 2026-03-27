document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. SCROLL HEADER (Sticky Effect)
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init on load

    // 2. MOBILE MENU LOGIC
    const menuBtn = document.querySelector('[data-menu-btn]');
    const nav = document.getElementById('header-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = (forceClose = false) => {
        if (!menuBtn || !nav) return;
        
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        const newState = forceClose ? false : !isExpanded;
        
        menuBtn.setAttribute('aria-expanded', newState);
        nav.classList.toggle('active', newState);
        menuBtn.classList.toggle('active', newState);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = newState ? 'hidden' : '';
    };

    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(true);
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (nav && nav.classList.contains('active')) {
            if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
                toggleMenu(true);
            }
        }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
            toggleMenu(true);
        }
    });

    // 3. SMOOTH SCROLL FOR ANCHOR LINKS
    const anchorLinks = document.querySelectorAll('a[href^="#"][data-nav-link], a[href^="#"].btn-hero-secondary');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                // Offset calculation for sticky header
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});