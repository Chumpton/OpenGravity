// Starfield background
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const stars = [];
for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        speed: Math.random() * 0.05 + 0.01
    });
}

// Mouse/Touch Interaction
let pointer = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', (e) => {
    pointer.x = e.x;
    pointer.y = e.y;
});

window.addEventListener('touchmove', (e) => {
    pointer.x = e.touches[0].clientX;
    pointer.y = e.touches[0].clientY;
});

window.addEventListener('mouseout', () => {
    pointer.x = null;
    pointer.y = null;
});

window.addEventListener('touchend', () => {
    pointer.x = null;
    pointer.y = null;
});

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    
    stars.forEach(star => {
        // Normal movement
        star.y += star.speed;
        
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }

        // Calculate warp offset
        let warpX = 0;
        let warpY = 0;
        
        if (pointer.x !== null && pointer.y !== null) {
            let dx = pointer.x - star.x;
            let dy = pointer.y - star.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < pointer.radius) {
                // Calculate push force based on distance
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let force = (pointer.radius - distance) / pointer.radius;
                
                // Max warp distance of 15px
                let warpAmount = 15;
                warpX = -forceDirectionX * force * warpAmount;
                warpY = -forceDirectionY * force * warpAmount;
            }
        }

        ctx.beginPath();
        // Draw star with temporary warp offset
        ctx.arc(star.x + warpX, star.y + warpY, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
    
    requestAnimationFrame(drawStars);
}
drawStars();

// Modal Logic
const modal = document.getElementById('dimension-modal');
const btnOpen = document.getElementById('menu-dimension');
const btnClose = document.getElementById('close-modal');

btnOpen.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
});

btnClose.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Close dimension modal when clicking outside of it
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// Submit Modal Logic
const submitModal = document.getElementById('submit-modal');
const btnOpenSubmit = document.getElementById('btn-submit-research');
const btnCloseSubmit = document.getElementById('close-submit-modal');

btnOpenSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    submitModal.classList.remove('hidden');
});

btnCloseSubmit.addEventListener('click', () => {
    submitModal.classList.add('hidden');
});

// Close submit modal when clicking outside of it
submitModal.addEventListener('click', (e) => {
    if (e.target === submitModal) {
        submitModal.classList.add('hidden');
    }
});

// Nav Scroll Logic
let lastScrollY = window.scrollY;
const topNav = document.querySelector('.top-nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Scrolling down
        topNav.classList.add('nav-hidden');
    } else {
        // Scrolling up
        topNav.classList.remove('nav-hidden');
    }
    lastScrollY = window.scrollY;
});
