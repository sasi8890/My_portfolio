// Handle Scroll Reveal Animations
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        let windowHeight = window.innerHeight;
        let elementVisible = 150;

        reveals.forEach((reveal) => {
            let elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    // trigger once on load
    revealOnScroll();

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    const activeClass = 'active';

    const closeNavMenu = () => {
        if (!navMenu) return;
        navMenu.classList.remove(activeClass);
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
        }
    };

    const openNavMenu = () => {
        if (!navMenu) return;
        navMenu.classList.add(activeClass);
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'true');
        }
    };

    const toggleNavMenu = () => {
        if (!navMenu) return;
        navMenu.classList.toggle(activeClass);
        if (navToggle) {
            const expanded = navMenu.classList.contains(activeClass);
            navToggle.setAttribute('aria-expanded', String(expanded));
        }
    };

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleNavMenu();
        });

        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                closeNavMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeNavMenu();
            }
        });
    }

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            closeNavMenu();
        });
    });

    // Mock functionality for Play With Me button
    const playBtn = document.getElementById('playBtn');
    if(playBtn) {
        playBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Create particle explosion
            for(let i=0; i<30; i++) {
                createParticle(e.clientX, e.clientY);
            }
        });
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.background = '#BF5AF2';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 5;
    const tx = Math.cos(angle) * velocity * 20;
    const ty = Math.sin(angle) * velocity * 20;

    particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
    ], {
        duration: 800 + Math.random() * 500,
        easing: 'cubic-bezier(0, .9, .57, 1)'
    }).onfinish = () => {
        particle.remove();
    };
}
