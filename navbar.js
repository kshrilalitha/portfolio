// Sticky Navigation, Scroll-Spy, and Mobile Hamburger
function initNavbar() {
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.nav-mobile');
    const mobileLinks = document.querySelectorAll('.nav-mobile .nav-link');
    const desktopLinks = document.querySelectorAll('.nav-desktop .nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // 1. Sticky Navigation on Scroll
    function checkHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkHeaderScroll);
    checkHeaderScroll(); // Init status check

    // 2. Mobile Menu Toggle
    function toggleMobileMenu() {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
        
        // Prevent body scrolling when menu is open
        if (mobileNav.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking mobile links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });

    // Close menu when clicking outside mobile drawer
    document.addEventListener('click', (e) => {
        if (
            mobileNav.classList.contains('open') && 
            !mobileNav.contains(e.target) && 
            !hamburger.contains(e.target)
        ) {
            toggleMobileMenu();
        }
    });

    // 3. Performant Scroll Spy using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the active reading area
        threshold: 0
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Update desktop links
                desktopLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });

                // Update mobile links
                mobileLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        scrollSpyObserver.observe(section);
    });

    // Back to Top button visibility control
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
    }
}
