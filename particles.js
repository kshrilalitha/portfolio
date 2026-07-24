// Canvas Particle Network Background
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let animationId = null;

    // Mouse coordinates
    const mouse = {
        x: null,
        y: null,
        radius: 120 // Radius of interaction
    };

    // Listeners
    window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    }

    window.addEventListener('resize', () => {
        // Debounce resize
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(resizeCanvas, 250);
    });

    // Particle Class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        // Draw individual particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        // Update particle physics
        update() {
            // Check boundaries
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Mouse collision physics (subtle push)
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    // Push particles away slightly
                    this.x -= dx / distance * force * 2;
                    this.y -= dy / distance * force * 2;
                }
            }

            // Normal movement
            this.x += this.directionX;
            this.y += this.directionY;

            this.draw();
        }
    }

    // Initialize particles array based on screen density
    function init() {
        particlesArray = [];
        // Fewer particles on mobile to preserve CPU performance
        const numberOfParticles = window.innerWidth < 768 ? 35 : 75;
        
        // Color selection matching dark neon design
        const particleColor = 'rgba(20, 216, 255, 0.2)'; // Semitransparent cyan

        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * 2 + 1; // 1px to 3px
            const x = Math.random() * (canvas.width - size * 2) + size;
            const y = Math.random() * (canvas.height - size * 2) + size;
            
            // Slow, smooth movement speeds (0.15 to 0.45 px per frame)
            const directionX = (Math.random() * 0.3) - 0.15;
            const directionY = (Math.random() * 0.3) - 0.15;

            particlesArray.push(new Particle(x, y, directionX, directionY, size, particleColor));
        }
    }

    // Check connections and draw linking lines
    function connect() {
        let maxDistance = window.innerWidth < 768 ? 85 : 125;
        
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    // Line opacity scales based on proximity
                    let opacity = 1 - (distance / maxDistance);
                    ctx.strokeStyle = `rgba(20, 216, 255, ${opacity * 0.1})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        
        connect();
        animationId = requestAnimationFrame(animate);
    }

    // Initial load and run
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    animate();
}
