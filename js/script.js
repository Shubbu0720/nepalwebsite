// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Welcome Modal Variables
let captchaAnswer = 0;

// Generate Math Captcha
function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let question, answer;
    
    switch(operator) {
        case '+':
            question = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
        case '-':
            question = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;
            answer = Math.max(num1, num2) - Math.min(num1, num2);
            break;
        case '*':
            const smallNum1 = Math.floor(Math.random() * 5) + 1;
            const smallNum2 = Math.floor(Math.random() * 5) + 1;
            question = `${smallNum1} × ${smallNum2}`;
            answer = smallNum1 * smallNum2;
            break;
    }
    
    document.getElementById('captchaQuestion').textContent = question;
    captchaAnswer = answer;
}

// Show Welcome Modal on Page Load
window.addEventListener('load', function() {
    setTimeout(() => {
        const welcomeModal = document.getElementById('welcomeModal');
        if (welcomeModal) {
            welcomeModal.style.display = 'block';
            // Add animated background class
            welcomeModal.classList.add('welcome-modal-animated');
            generateCaptcha();
        }
    }, 3000); // Show after 1 second
});

// Close Welcome Modal
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('welcome-close')) {
        document.getElementById('welcomeModal').style.display = 'none';
    }
});

// Welcome Form Submission
document.getElementById('welcomeForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const captchaInput = parseInt(formData.get('captcha'));
    
    // Validate captcha
    if (captchaInput !== captchaAnswer) {
        alert('Please solve the math equation correctly!');
        generateCaptcha(); // Generate new captcha
        return;
    }
    
    // Validate agreement checkbox
    if (!formData.get('agreement')) {
        alert('Please agree to receive updates via Call/Email');
        return;
    }
    
    // Show success message
    alert('Thank you! We will contact you soon with personalized guidance for your MBBS journey in Nepal.');
    
    // Close modal
    document.getElementById('welcomeModal').style.display = 'none';
    
    // Log form data (in real implementation, send to server)
    console.log('Welcome form submitted:', Object.fromEntries(formData));
});

// Close welcome modal when clicking outside
document.getElementById('welcomeModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
    }
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add scroll event listeners for navigation
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Hero scroll functionality
document.querySelector('.hero-scroll')?.addEventListener('click', () => {
    scrollToSection('why-nepal');
});

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (i === index) {
            testimonial.classList.add('active');
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// Testimonial navigation buttons
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

if (nextBtn) {
    nextBtn.addEventListener('click', nextTestimonial);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
}

// Auto-advance testimonials
setInterval(nextTestimonial, 5000);

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't already active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Modal functionality
const modals = {
    enquiry: document.getElementById('enquiryModal'),
    callback: document.getElementById('callbackModal'),
    prospectus: document.getElementById('prospectusModal')
};

function openModal(type) {
    const modal = modals[type];
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Make openModal globally available
window.openModal = openModal;

// Download prospectus function
function downloadProspectus() {
    openModal('prospectus');
}
window.downloadProspectus = downloadProspectus;

// Close modal events
Object.values(modals).forEach(modal => {
    if (modal) {
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    }
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        Object.values(modals).forEach(modal => {
            if (modal && modal.style.display === 'block') {
                closeModal(modal);
            }
        });
    }
});

// Form submissions
document.getElementById('enquiryForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show success message
    alert('Thank you for your enquiry! We will contact you soon.');
    
    // Close modal and reset form
    closeModal(modals.enquiry);
    this.reset();
    
    // Here you would typically send the data to your server
    console.log('Enquiry submitted:', data);
});

document.getElementById('callbackForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show success message
    alert('Callback request submitted! We will call you at your preferred time.');
    
    // Close modal and reset form
    closeModal(modals.callback);
    this.reset();
    
    // Here you would typically send the data to your server
    console.log('Callback requested:', data);
});

document.getElementById('prospectusForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show success message
    alert('Thank you! Your prospectus download will begin shortly.');
    
    // Close modal and reset form
    closeModal(modals.prospectus);
    this.reset();
    
    // Here you would typically send the data to your server and trigger download
    console.log('Prospectus requested:', data);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.benefit-card, .college-card, .eligibility-card, .living-card, .testimonial-card, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// College card hover effects
document.querySelectorAll('.college-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Benefit card hover effects
document.querySelectorAll('.benefit-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button (optional)
let scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: white;
    border: none;
    font-size: 18px;
    cursor: pointer;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
`;

scrollToTopBtn.addEventListener('click', scrollToTop);
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
});

// Loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// Form validation enhancement
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Enhanced form validation for all forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const emailInputs = this.querySelectorAll('input[type="email"]');
        const phoneInputs = this.querySelectorAll('input[type="tel"]');
        
        let isValid = true;
        
        emailInputs.forEach(input => {
            if (input.value && !validateEmail(input.value)) {
                e.preventDefault();
                input.style.borderColor = '#ef4444';
                alert('Please enter a valid email address.');
                isValid = false;
            } else {
                input.style.borderColor = '#e5e7eb';
            }
        });
        
        phoneInputs.forEach(input => {
            if (input.value && !validatePhone(input.value)) {
                e.preventDefault();
                input.style.borderColor = '#ef4444';
                alert('Please enter a valid phone number.');
                isValid = false;
            } else {
                input.style.borderColor = '#e5e7eb';
            }
        });
        
        return isValid;
    });
});

// Add loading states to buttons
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        this.disabled = true;
        
        // Reset after 2 seconds (adjust based on your needs)
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
        }, 2000);
    });
});

console.log('MBBS Nepal website loaded successfully!');