// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Tab functionality for eligibility section
function showTab(tabId) {
    // Hide all tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab pane
    document.getElementById(tabId).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Modal functionality
function openModal(modalType) {
    let modalId;
    
    switch(modalType) {
        case 'enquiry':
            modalId = 'enquiryModal';
            break;
        case 'brochure':
            modalId = 'brochureModal';
            break;
        case 'mbbs-details':
            showProgramDetails('MBBS');
            return;
        case 'bds-details':
            showProgramDetails('BDS');
            return;
        case 'video':
            showVideoModal();
            return;
        case 'welcome':
            modalId = 'welcomeModal';
            break;
        default:
            return;
    }
    
    const modal = document.getElementById(modalId);
    if (modal) {
        // Calculate scrollbar width to prevent layout shift
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = scrollbarWidth + 'px';
        document.body.style.overflow = 'hidden';

        modal.style.display = 'block';
        if (modalId === 'welcomeModal') {
            generateCaptcha();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        // Restore scrollbar and remove padding
        document.body.style.marginRight = '0';
        document.body.style.paddingRight = '0';
        document.body.style.overflow = 'auto';
        document.body.style.width = '100%';
        document.documentElement.style.overflowX = 'hidden';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '0';
        document.body.style.marginRight = '0';
        document.body.style.width = '100%';
        document.documentElement.style.overflowX = 'hidden';
    }
});

// Program details modal
function showProgramDetails(program) {
    const details = {
        'MBBS': {
            title: 'MBBS Program Details',
            content: `
                <h3>Bachelor of Medicine and Bachelor of Surgery</h3>
                <div class="program-details">
                    <div class="detail-section">
                        <h4>Program Overview</h4>
                        <p>The MBBS program at College of Medical Sciences Nepal is a comprehensive 5.5-year course designed to prepare students for a successful career in medicine.</p>
                    </div>
                    <div class="detail-section">
                        <h4>Course Structure</h4>
                        <ul>
                            <li>Pre-clinical Phase (1.5 years): Basic medical sciences</li>
                            <li>Para-clinical Phase (1 year): Pathology, Microbiology, Pharmacology</li>
                            <li>Clinical Phase (2 years): Clinical rotations in various departments</li>
                            <li>Internship (1 year): Hands-on clinical experience</li>
                        </ul>
                    </div>
                    <div class="detail-section">
                        <h4>Career Opportunities</h4>
                        <ul>
                            <li>General Practitioner</li>
                            <li>Specialist Doctor (after MD/MS)</li>
                            <li>Medical Researcher</li>
                            <li>Healthcare Administrator</li>
                        </ul>
                    </div>
                </div>
            `
        },
        'BDS': {
            title: 'BDS Program Details',
            content: `
                <h3>Bachelor of Dental Surgery</h3>
                <div class="program-details">
                    <div class="detail-section">
                        <h4>Program Overview</h4>
                        <p>The BDS program is a 5-year comprehensive course focusing on oral health, dental diseases, and surgical procedures.</p>
                    </div>
                    <div class="detail-section">
                        <h4>Course Structure</h4>
                        <ul>
                            <li>Pre-clinical Phase (2 years): Basic dental sciences</li>
                            <li>Clinical Phase (2 years): Clinical practice and patient care</li>
                            <li>Internship (1 year): Supervised clinical practice</li>
                        </ul>
                    </div>
                    <div class="detail-section">
                        <h4>Career Opportunities</h4>
                        <ul>
                            <li>General Dentist</li>
                            <li>Dental Specialist (after MDS)</li>
                            <li>Oral Surgeon</li>
                            <li>Dental Consultant</li>
                        </ul>
                    </div>
                </div>
            `
        }
    };
    
    // Create and show modal
    const modalHTML = `
        <div id="programModal" class="modal" style="display: block;">
            <div class="modal-content" style="max-width: 700px;">
                <span class="close" onclick="closeModal('programModal')">&times;</span>
                <div class="modal-header">
                    <h2>${details[program].title}</h2>
                </div>
                <div class="modal-body">
                    ${details[program].content}
                </div>
                <div style="text-align: center; margin-top: 2rem;">
                    <button class="btn btn-primary" onclick="openModal('enquiry'); closeModal('programModal');">
                        <i class="fas fa-user-graduate"></i>
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing program modal if any
    const existingModal = document.getElementById('programModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add new modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

// Video modal
function showVideoModal() {
    const videoModalHTML = `
        <div id="videoModal" class="modal" style="display: block;">
            <div class="modal-content" style="max-width: 800px;">
                <span class="close" onclick="closeModal('videoModal')">&times;</span>
                <div class="modal-header">
                    <h2>College Virtual Tour</h2>
                    <p>Take a virtual tour of our campus and facilities</p>
                </div>
                <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                    <iframe 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 10px;"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing video modal if any
    const existingModal = document.getElementById('videoModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add new modal to body
    document.body.insertAdjacentHTML('beforeend', videoModalHTML);
    document.body.style.overflow = 'hidden';
}

// Form submissions
document.addEventListener('DOMContentLoaded', function() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // In a real application, you would send this data to your server
            console.log('Contact form data:', data);
        });
    }
    
    // Enquiry form submission
    document.addEventListener('submit', function(e) {
        if (e.target.id === 'enquiryForm') {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            showNotification('Your enquiry has been submitted successfully! We will contact you soon.', 'success');
            
            e.target.reset();
            closeModal('enquiryModal');
            
            console.log('Enquiry form data:', data);
        }
        
        if (e.target.id === 'brochureForm') {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            showNotification('Brochure download link has been sent to your email!', 'success');
            
            e.target.reset();
            closeModal('brochureModal');
            
            console.log('Brochure form data:', data);
        }
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .program-details {
        text-align: left;
    }
    
    .detail-section {
        margin-bottom: 1.5rem;
    }
    
    .detail-section h4 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
    }
    
    .detail-section ul {
        list-style: none;
        padding-left: 0;
    }
    
    .detail-section li {
        padding: 0.25rem 0;
        position: relative;
        padding-left: 1.5rem;
    }
    
    .detail-section li::before {
        content: '•';
        color: var(--primary-color);
        position: absolute;
        left: 0;
        font-weight: bold;
    }
`;

document.head.appendChild(notificationStyles);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes('%')) {
                    counter.textContent = Math.ceil(current) + '%';
                } else if (counter.textContent.includes('+')) {
                    counter.textContent = Math.ceil(current) + '+';
                } else {
                    counter.textContent = Math.ceil(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent; // Reset to original
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(statsSection);
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Show welcome modal after page loads
    setTimeout(() => {
        showWelcomeModal();
    }, 3000); // Show after 3 seconds
});

// Add CSS for loading animation
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255,255,255,0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10000;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    body.loaded::before,
    body.loaded::after {
        display: none;
    }
`;

document.head.appendChild(loadingStyles);
// Welcome Modal Functions
let captchaAnswer = 0;

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = num1 + num2;
    
    const captchaQuestion = document.getElementById('captchaQuestion');
    if (captchaQuestion) {
        captchaQuestion.textContent = `${num1} + ${num2}`;
    }
}

function showWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
        // Calculate scrollbar width before hiding it
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
        
        // Prevent body scroll without layout shift
        document.body.style.paddingRight = scrollbarWidth + 'px';
        document.body.style.overflow = 'hidden';
        
        modal.classList.add('show');
        generateCaptcha();
        console.log('Welcome modal should be visible now'); // Debug log
    } else {
        console.log('Welcome modal not found!'); // Debug log
    }
}

function closeWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
        modal.classList.remove('show');
        // Restore body scroll without layout shift
        document.body.style.paddingRight = '';
        document.body.style.overflow = '';
        document.documentElement.style.removeProperty('--scrollbar-width');
    }
}

// Welcome form submission
document.addEventListener('DOMContentLoaded', function() {
    const welcomeForm = document.getElementById('welcomeForm');
    if (welcomeForm) {
        welcomeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate captcha
            const captchaInput = document.querySelector('input[name="captcha"]');
            if (parseInt(captchaInput.value) !== captchaAnswer) {
                showNotification('Please solve the captcha correctly!', 'error');
                generateCaptcha();
                captchaInput.value = '';
                return;
            }
            
            // Get form data
            const formData = new FormData(welcomeForm);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showNotification('Thank you! We will contact you soon for free consultation.', 'success');
            
            // Close modal
            closeWelcomeModal();
            
            // Reset form
            welcomeForm.reset();
            
            // In a real application, you would send this data to your server
            console.log('Welcome form data:', data);
        });
    }
    
    // Close modal when clicking outside
    const welcomeModal = document.getElementById('welcomeModal');
    if (welcomeModal) {
        welcomeModal.addEventListener('click', function(e) {
            if (e.target === welcomeModal || e.target.classList.contains('welcome-close')) {
                closeWelcomeModal();
            }
        });
    }
    
    // Also add click handler for close button
    const welcomeCloseBtn = document.querySelector('.welcome-close');
    if (welcomeCloseBtn) {
        welcomeCloseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeWelcomeModal();
        });
    }
    
    // Fix for other modals to prevent layout shift
    const originalOpenModal = window.openModal;
    window.openModal = function(modalType) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = scrollbarWidth + 'px';
        if (originalOpenModal) {
            originalOpenModal(modalType);
        }
    };
    
    const originalCloseModal = window.closeModal;
    window.closeModal = function(modalId) {
        document.body.style.paddingRight = '';
        if (originalCloseModal) {
            originalCloseModal(modalId);
        }
    };
});