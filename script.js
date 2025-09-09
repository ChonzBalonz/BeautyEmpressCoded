// Slideshow Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let index = 0;

    function showSlide(i) {
        slides.forEach(slide => slide.style.display = 'none');
        slides[i].style.display = 'block';
    }

    function nextSlide() {
        index = (index + 1) % slides.length;
        showSlide(index);
    }

    // Initialize slideshow
    showSlide(index);
    setInterval(nextSlide, 1500); // Change every 1.5 seconds
});

// FAQ Accordion Functionality - Exact match to provided code
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            question.classList.toggle('active');
            question.nextElementSibling.classList.toggle('open');
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const firstName = formData.get('firstName');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!firstName || !email || !message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showLoadingState();
        
        setTimeout(() => {
            showSuccessMessage(firstName);
            this.reset();
        }, 2000);
    });
}

// Book Service Button
const bookButton = document.querySelector('.book-button');
if (bookButton) {
    bookButton.addEventListener('click', function() {
        // Scroll to contact form
        const contactSection = document.querySelector('.contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

function showLoadingState() {
    const submitBtn = document.querySelector('.submit-button');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Store original text for restoration
    submitBtn.dataset.originalText = originalText;
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#dc3545' : '#28a745'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 300px;
        font-weight: 500;
    `;
    
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 4000);
}

function showSuccessMessage(name) {
    const submitBtn = document.querySelector('.submit-button');
    
    // Restore button
    submitBtn.textContent = submitBtn.dataset.originalText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        color: black;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        max-width: 400px;
        width: 90%;
        border: 2px solid black;
    `;
    
    successMessage.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: black;">Message Sent!</h3>
        <p style="margin-bottom: 1rem; color: #666;">Thank you, ${name}!</p>
        <p style="font-size: 0.9rem; color: #999;">We'll get back to you soon.</p>
        <button onclick="this.parentElement.remove()" style="
            background: black;
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 1rem;
            font-weight: 600;
        ">Close</button>
    `;
    
    document.body.appendChild(successMessage);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (successMessage.parentElement) {
            successMessage.remove();
        }
    }, 5000);
}

// Smooth scrolling for internal links
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

// Add hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Button hover effects
    const buttons = document.querySelectorAll('.book-button, .submit-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add CSS for smooth transitions
const style = document.createElement('style');
style.textContent = `
    .book-button, .submit-button {
        transition: all 0.3s ease;
    }
    
    .faq-answer {
        transition: max-height 0.4s ease, padding 0.4s ease;
    }
    
    .faq-question {
        transition: opacity 0.3s ease;
    }
    
    .faq-question::after {
        transition: transform 0.3s ease;
    }
    
    .slide {
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);
