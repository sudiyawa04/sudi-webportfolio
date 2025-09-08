// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        }
    });
    
    // Active section highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Hero Text Animation
function animateHeroText() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, index * 200 + 500);
    });
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Parallax Effect for Floating Shapes
function parallaxShapes() {
    const shapes = document.querySelectorAll('.shape');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * speed * 0.1}deg)`;
    });
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation for stats section
            if (entry.target.classList.contains('about')) {
                setTimeout(animateCounters, 500);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.about, .portfolio, .skills, .contact, .education, .interests');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
    
    // Animate hero text on load
    setTimeout(animateHeroText, 1500);
});

// Scroll Events
window.addEventListener('scroll', () => {
    parallaxShapes();
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00d4ff' : type === 'error' ? '#ff6b35' : '#7209b7'};
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        transform: translateX(400px);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 350px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Cursor Effect (optional enhancement)
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #00d4ff, #7209b7);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(newCursor);
    }
    
    const actualCursor = document.querySelector('.custom-cursor');
    actualCursor.style.left = e.clientX - 10 + 'px';
    actualCursor.style.top = e.clientY - 10 + 'px';
    actualCursor.style.opacity = '1';
});

// Hide cursor when not moving
let cursorTimeout;
document.addEventListener('mousemove', function() {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.opacity = '1';
        clearTimeout(cursorTimeout);
        cursorTimeout = setTimeout(() => {
            cursor.style.opacity = '0';
        }, 3000);
    }
});

// Typing Effect for Hero Subtitle (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after hero animation
setTimeout(() => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const originalText = heroSubtitle.textContent;
    typeWriter(heroSubtitle, originalText, 30);
}, 2500);

// Smooth reveal animations for skill items
function animateSkillItems() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100 + 1000);
    });
}

// Trigger skill animation when about section is visible
const aboutSection = document.querySelector('.about');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillItems();
            skillObserver.unobserve(entry.target);
        }
    });
});

if (aboutSection) {
    skillObserver.observe(aboutSection);
}

// Service items animation
function animateServiceItems() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150 + 500);
    });
}

// Trigger service animation
const servicesSection = document.querySelector('.services');
const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateServiceItems();
            servicesObserver.unobserve(entry.target);
        }
    });
});

if (servicesSection) {
    servicesObserver.observe(servicesSection);
}

// Portfolio items stagger animation
function animatePortfolioItems() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, index * 100 + 300);
    });
}

// Trigger portfolio animation
const portfolioSection = document.querySelector('.portfolio');
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animatePortfolioItems();
            portfolioObserver.unobserve(entry.target);
        }
    });
});

if (portfolioSection) {
    portfolioObserver.observe(portfolioSection);
}

// Education section animation
function animateEducationItems() {
    const educationItems = document.querySelectorAll('.education-item');
    
    educationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200 + 500);
    });
}

// Trigger education animation
const educationSection = document.querySelector('.education');
const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateEducationItems();
            educationObserver.unobserve(entry.target);
        }
    });
});

if (educationSection) {
    educationObserver.observe(educationSection);
}

// CV download tracking
const cvDownloadBtn = document.querySelector('a[download]');
if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener('click', function() {
        showNotification('CV download started!', 'success');
        
        // Track download analytics (you can integrate with Google Analytics here)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download', {
                'event_category': 'CV',
                'event_label': 'PDF'
            });
        }
    });
}

// Interests section animation
const interestsSection = document.querySelector('.interests');
const interestsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateServiceItems(); // Reuse service animation for interests
            interestsObserver.unobserve(entry.target);
        }
    });
});

if (interestsSection) {
    interestsObserver.observe(interestsSection);
}

// Enhanced contact form with better validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Enhanced validation
        const errors = [];
        
        if (!name || name.trim().length < 2) {
            errors.push('Please enter a valid name (at least 2 characters)');
        }
        
        if (!email) {
            errors.push('Please enter your email address');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.push('Please enter a valid email address');
            }
        }
        
        if (!message || message.trim().length < 10) {
            errors.push('Please enter a message (at least 10 characters)');
        }
        
        if (errors.length > 0) {
            showNotification(errors[0], 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate server processing time
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }, 2000);
    });
}
