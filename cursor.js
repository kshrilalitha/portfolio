// Custom Cursor with trail & Magnetic Buttons
function initCursor() {
    // Check if the device is mobile/touch-only (no fine pointer support)
    const isTouchDevice = window.matchMedia('(hover: none)').matches || window.innerWidth < 1024;
    
    const cursor = document.getElementById('customCursor');
    const trail = document.getElementById('cursorTrail');
    
    if (isTouchDevice) {
        if (cursor) cursor.style.display = 'none';
        if (trail) trail.style.display = 'none';
        return;
    }

    if (!cursor || !trail) return;

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    // Track mouse coordinates
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Inner cursor immediately follows mouse
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    // Animate outer trail circle with interpolation (lerp)
    function animateCursor() {
        // Interpolate coordinates (0.15 represents lag/ease factor)
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;

        trail.style.left = `${trailX}px`;
        trail.style.top = `${trailY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Event listeners to handle interactive states
    const addHoverClass = () => {
        cursor.classList.add('cursor-hover');
        trail.classList.add('cursor-hover');
    };

    const removeHoverClass = () => {
        cursor.classList.remove('cursor-hover');
        trail.classList.remove('cursor-hover');
    };

    // Global delegation for hoverable items
    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        
        // Check if cursor is over clickable elements
        if (
            target.tagName === 'A' || 
            target.tagName === 'BUTTON' || 
            target.closest('a') || 
            target.closest('button') ||
            target.closest('.skills-tab-btn') ||
            target.classList.contains('magnetic') ||
            target.closest('[data-magnetic]') ||
            target.classList.contains('copy-email-btn')
        ) {
            addHoverClass();
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target;
        if (
            target.tagName === 'A' || 
            target.tagName === 'BUTTON' || 
            target.closest('a') || 
            target.closest('button') ||
            target.closest('.skills-tab-btn') ||
            target.classList.contains('magnetic') ||
            target.closest('[data-magnetic]') ||
            target.classList.contains('copy-email-btn')
        ) {
            removeHoverClass();
        }
    });

    // Magnetic Button Physics
    const magneticElements = document.querySelectorAll('[data-magnetic], .magnetic');
    
    magneticElements.forEach((el) => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            // Calculate center of element
            const elCenterX = rect.left + rect.width / 2;
            const elCenterY = rect.top + rect.height / 2;
            
            // Distance from mouse to center
            const distanceX = e.clientX - elCenterX;
            const distanceY = e.clientY - elCenterY;
            
            // Translate the button slightly (strength factor 0.35)
            const strength = 0.35;
            const pullX = distanceX * strength;
            const pullY = distanceY * strength;
            
            this.style.transform = `translate(${pullX}px, ${pullY}px)`;
            
            // Magnetize the trail cursor to pull coordinates slightly too
            trailX += (e.clientX - pullX * 0.5 - trailX) * 0.1;
            trailY += (e.clientY - pullY * 0.5 - trailY) * 0.1;
            
            // Pull children elements if magnetic text spans inside
            const innerSpan = this.querySelector('span');
            if (innerSpan) {
                innerSpan.style.transform = `translate(${pullX * 0.2}px, ${pullY * 0.2}px)`;
            }
        });
        
        el.addEventListener('mouseleave', function() {
            // Animate element back to normal
            this.style.transform = 'translate(0, 0)';
            this.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
            
            const innerSpan = this.querySelector('span');
            if (innerSpan) {
                innerSpan.style.transform = 'translate(0, 0)';
                innerSpan.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
            }
            
            setTimeout(() => {
                this.style.transition = '';
                if (innerSpan) innerSpan.style.transition = '';
            }, 500);
        });
    });
}
