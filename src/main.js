/* import './style.css'

// Mobile Menu Functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

function openMobileMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
closeMenuBtn.addEventListener('click', closeMobileMenu);

// Close menu when clicking on links
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        closeMobileMenu();
    }
});

// Contact Button Functionality
const contactBtn = document.getElementById('contact-btn');
contactBtn.addEventListener('click', () => {
    // You can replace this with actual contact functionality
    const phoneNumber = '1234567890'; // Replace with actual phone number
    const message = 'Hola! Me interesa conocer más sobre Gorila Roots.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('bg-slate-900');
        header.classList.remove('bg-slate-900/95');
    } else {
        header.classList.add('bg-slate-900/95');
        header.classList.remove('bg-slate-900');
    }
});

// Sport items click effect
document.querySelectorAll('.sport-item').forEach(item => {
    item.addEventListener('click', () => {
        // Add a pulse effect
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 150);
    });
});

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
});

// Document ready event
document.addEventListener('DOMContentLoaded', () => {
    console.log('Gorila Roots website loaded successfully!');
});



// Script para animaciones de la sección Visión y Misión

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer para animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('#vision-mision h2, #vision-mision p, #vision-mision img');
    animatedElements.forEach(el => observer.observe(el));
    
    // Efecto parallax suave para elementos de fondo
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Efecto hover mejorado para las imágenes
    const imageContainers = document.querySelectorAll('#vision-mision .relative');
    
    imageContainers.forEach(container => {
        const img = container.querySelector('img');
        
        container.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'transform 0.3s ease';
        });
        
        container.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
    
    // Animación de escritura para el texto destacado
    const highlightedQuote = document.querySelector('#vision-mision .bg-gradient-to-r p');
    
    if (highlightedQuote) {
        const text = highlightedQuote.textContent;
        highlightedQuote.textContent = '';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(highlightedQuote, text, 50);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(highlightedQuote);
    }
    
    function typeWriter(element, text, speed) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
}); */