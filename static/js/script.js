document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "-1";

    let particles = [];
    let width, height;
    const MIN_SPEED = 0.1;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createParticles(num) {
        for (let i = 0; i < num; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 5 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                friction: 0.98,
                hue: Math.random() * 360, // Assign a random color hue
                hueSpeed: Math.random() * 2 + 0.5, // Controls how fast the color changes
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.speedX *= p.friction;
            p.speedY *= p.friction;

            if (Math.abs(p.speedX) < MIN_SPEED) p.speedX = Math.sign(p.speedX) * MIN_SPEED;
            if (Math.abs(p.speedY) < MIN_SPEED) p.speedY = Math.sign(p.speedY) * MIN_SPEED;

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > width) p.speedX *= -1;
            if (p.y < 0 || p.y > height) p.speedY *= -1;

            // Update the hue to create a rainbow effect
            p.hue = (p.hue + p.hueSpeed) % 360;
            ctx.fillStyle = `hsl(${p.hue}, 100%, 70%)`; // Set color dynamically

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    function updateMousePosition(e) {
        particles.forEach(p => {
            let dx = p.x - e.clientX;
            let dy = p.y - e.clientY;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                p.speedX += dx * 0.01;
                p.speedY += dy * 0.01;
            }
        });
    }

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", updateMousePosition);

    resizeCanvas();
    createParticles(500);
    animateParticles();
});
