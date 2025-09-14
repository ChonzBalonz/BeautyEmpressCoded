// Slideshow Functionality with Mobile Optimization
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let index = 0;
    let slideInterval;
    let isUserInteracting = false;

    function showSlide(i) {
        slides.forEach(slide => slide.style.display = 'none');
        slides[i].style.display = 'block';
    }

    function nextSlide() {
        if (!isUserInteracting) {
            index = (index + 1) % slides.length;
            showSlide(index);
        }
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 3000); // Slower for mobile
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    const slideshowContainer = document.querySelector('.slideshow-container');
    
    if (slideshowContainer) {
        slideshowContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isUserInteracting = true;
            stopSlideshow();
        });

        slideshowContainer.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only process horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    index = (index + 1) % slides.length;
                } else {
                    // Swipe right - previous slide
                    index = (index - 1 + slides.length) % slides.length;
                }
                showSlide(index);
            }
            
            // Restart slideshow after user interaction
            setTimeout(() => {
                isUserInteracting = false;
                startSlideshow();
            }, 2000);
        });

        // Pause slideshow on hover (desktop only)
        slideshowContainer.addEventListener('mouseenter', stopSlideshow);
        slideshowContainer.addEventListener('mouseleave', () => {
            if (!isUserInteracting) {
                startSlideshow();
            }
        });
    }

    // Initialize slideshow
    showSlide(index);
    startSlideshow();

    // Pause slideshow when page is not visible (mobile battery optimization)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopSlideshow();
        } else if (!isUserInteracting) {
            startSlideshow();
        }
    });
});

// Parallax Scrolling Effect with Mobile Optimization
document.addEventListener('DOMContentLoaded', function() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    const heroContent = document.querySelector('.hero-content');
    
    if (slideshowContainer) {
        // Detect if device is mobile/touch
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                        ('ontouchstart' in window) || 
                        (navigator.maxTouchPoints > 0);
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            
            // Reduce parallax effect on mobile for better performance
            const rate = isMobile ? scrolled * -0.2 : scrolled * -0.5;
            
            slideshowContainer.style.transform = `translateY(${rate}px)`;
            
            // Fade out hero content as user scrolls
            if (heroContent) {
                const heroHeight = document.querySelector('.hero').offsetHeight;
                const fadeStart = heroHeight * 0.3;
                const fadeEnd = heroHeight * 0.8;
                
                if (scrolled > fadeStart) {
                    const fadeProgress = Math.min((scrolled - fadeStart) / (fadeEnd - fadeStart), 1);
                    heroContent.style.opacity = 1 - fadeProgress;
                    heroContent.style.transform = `translateY(${fadeProgress * (isMobile ? 20 : 50)}px)`;
                } else {
                    heroContent.style.opacity = 1;
                    heroContent.style.transform = 'translateY(0)';
                }
            }
        }
        
        // Throttle scroll events for better performance
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        function handleScroll() {
            ticking = false;
            requestTick();
        }
        
        // Use passive listeners for better mobile performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial call
        updateParallax();
        
        // Disable parallax on very small screens for performance
        if (window.innerWidth < 360) {
            window.removeEventListener('scroll', handleScroll);
        }
    }
});

// FAQ Accordion Functionality with Mobile Optimization
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.faq-question').forEach(question => {
        // Add keyboard support for accessibility
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        const answer = question.nextElementSibling;
        answer.setAttribute('aria-hidden', 'true');
        
        function toggleFAQ() {
            const isActive = question.classList.contains('active');
            
            question.classList.toggle('active');
            answer.classList.toggle('open');
            
            // Update ARIA attributes
            question.setAttribute('aria-expanded', !isActive);
            answer.setAttribute('aria-hidden', isActive);
        }
        
        // Click/touch support
        question.addEventListener('click', toggleFAQ);
        
        // Keyboard support
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ();
            }
        });
        
        // Touch feedback for mobile
        question.addEventListener('touchstart', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        
        question.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 150);
        });
    });
});

// Contact Form Handling with Mobile Optimization
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Add mobile-optimized input handling
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            // Prevent zoom on iOS when focusing inputs
            if (input.type === 'email' || input.type === 'tel') {
                input.addEventListener('focus', function() {
                    if (window.innerWidth < 768) {
                        document.querySelector('meta[name="viewport"]').setAttribute('content', 
                            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                    }
                });
                
                input.addEventListener('blur', function() {
                    if (window.innerWidth < 768) {
                        document.querySelector('meta[name="viewport"]').setAttribute('content', 
                            'width=device-width, initial-scale=1.0');
                    }
                });
            }
            
            // Add real-time validation feedback
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const firstName = formData.get('firstName');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Clear previous validation errors
            clearValidationErrors();
            
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
                clearValidationErrors();
            }, 2000);
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        // Remove existing error styling
        field.classList.remove('error');
        
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('error');
            }
        }
        
        if (field.required && !value) {
            field.classList.add('error');
        }
    }
    
    function clearValidationErrors() {
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('error');
        });
    }
});

// Book Service Button - Now handled by direct link to scheduling URL
// No JavaScript needed as buttons are now anchor tags with href

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

// Mobile Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navBookButton = document.querySelector('.nav-book-button');
    
    if (navToggle && navMenu) {
        // Toggle mobile menu
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Handle nav book button - Now handled by direct link to scheduling URL
    // No JavaScript needed as button is now anchor tag with href
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for mobile nav height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Mobile Service Items Viewport Animation
document.addEventListener('DOMContentLoaded', function() {
    // Only run on mobile devices
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile) {
        const serviceItems = document.querySelectorAll('.service-item');
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -10% 0px', // Trigger when 10% visible
            threshold: 0.1
        };
        
        function handleIntersection(entries) {
            entries.forEach(entry => {
                const item = entry.target;
                
                if (entry.isIntersecting) {
                    // Card enters viewport - add pop-up effect
                    item.classList.add('in-view');
                } else {
                    // Card leaves viewport - remove pop-up effect
                    item.classList.remove('in-view');
                }
            });
        }
        
        // Create intersection observer
        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        
        // Observe all service items
        serviceItems.forEach(item => {
            observer.observe(item);
        });
        
        // Handle orientation change
        window.addEventListener('orientationchange', function() {
            // Re-observe items after orientation change
            setTimeout(() => {
                serviceItems.forEach(item => {
                    observer.unobserve(item);
                    observer.observe(item);
                });
            }, 100);
        });
        
        // Handle resize events
        window.addEventListener('resize', function() {
            // Re-observe items after resize
            serviceItems.forEach(item => {
                observer.unobserve(item);
                observer.observe(item);
            });
        });
        
        // Clean up on page unload
        window.addEventListener('beforeunload', function() {
            observer.disconnect();
        });
    }
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
    
    .nav-toggle {
        transition: all 0.3s ease;
    }
    
    .nav-menu {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Instagram Carousel Functionality - Auto-scrolling horizontal feed
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.instagram-carousel');
    if (!carousel) return;
    
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    
    // Remove any existing indicators
    const existingIndicators = carousel.querySelector('.carousel-indicators');
    if (existingIndicators) {
        existingIndicators.remove();
    }
    
    let scrollPosition = 0;
    let scrollSpeed = 2; // pixels per frame - increased speed
    const slideWidth = 370; // width of each slide (340px) + gap (30px)
    const totalWidth = slides.length * slideWidth;
    let isPaused = false;
    
    function autoScroll() {
        if (!isPaused) {
            scrollPosition += scrollSpeed;
            
            // Reset position when we've scrolled past all slides
            if (scrollPosition >= totalWidth) {
                scrollPosition = 0;
            }
            
            track.style.transform = `translateX(-${scrollPosition}px)`;
        }
        requestAnimationFrame(autoScroll);
    }
    
    // Start auto-scrolling
    autoScroll();
    
    // Pause scrolling on hover
    carousel.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    carousel.addEventListener('mouseleave', () => {
        isPaused = false;
    });
});
