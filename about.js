// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ===== Dropdown Menu Functionality =====
    const accountMenu = document.querySelector('.account-menu');
    const menuTrigger = document.querySelector('.menu-trigger');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Toggle dropdown menu on click (for mobile)
    menuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!accountMenu.contains(e.target)) {
            dropdownMenu.classList.remove('active');
        }
    });

    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Page Transition Effect =====
    const pageTransition = () => {
        const loader = document.createElement('div');
        loader.className = 'page-transition-loader';
        loader.style.position = 'fixed';
        loader.style.top = '0';
        loader.style.left = '0';
        loader.style.width = '100%';
        loader.style.height = '100%';
        loader.style.backgroundColor = 'white';
        loader.style.zIndex = '9999';
        loader.style.display = 'flex';
        loader.style.justifyContent = 'center';
        loader.style.alignItems = 'center';
        loader.style.transition = 'opacity 0.5s ease';
        loader.style.opacity = '1';
        
        const logo = document.createElement('div');
        logo.className = 'transition-logo';
        logo.style.fontSize = '2rem';
        logo.style.fontWeight = '700';
        logo.style.color = 'var(--primary-color)';
        logo.textContent = 'WeddingPlannerPro';
        
        loader.appendChild(logo);
        document.body.appendChild(loader);
        
        // Hide loader after page loads
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 500);
    };

    // Apply transition when page loads
    pageTransition();

    // ===== Logout Function =====
    window.logout = function() {
        // Show confirmation dialog
        if (confirm('Are you sure you want to log out?')) {
            // Here you would typically make an API call to log out
            // For now, we'll just redirect to the login page
            window.location.href = 'login.html';
        }
    };

    // ===== Active Link Highlighting =====
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        // Add click event to update active state
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ===== Team Member Hover Effect Enhancement =====
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            const img = this.querySelector('.member-image img');
            img.style.transform = 'scale(1.05)';
        });
        
        member.addEventListener('mouseleave', function() {
            const img = this.querySelector('.member-image img');
            img.style.transform = 'scale(1)';
        });
    });

    // ===== Map Interaction =====
    const locationMap = document.querySelector('.location-map iframe');
    if (locationMap) {
        locationMap.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.05)';
        });
        
        locationMap.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    }

    // ===== Mobile Menu Toggle (for smaller screens) =====
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // ===== Scroll Reveal Animation =====
    const scrollReveal = () => {
        const revealElements = document.querySelectorAll('.about-content, .team-member, .location-container');
        
        const revealOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);
        
        revealElements.forEach(element => {
            element.classList.add('reveal-element');
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(element);
        });
        
        document.addEventListener('scroll', function() {
            revealElements.forEach(element => {
                if (isElementInViewport(element)) {
                    element.classList.add('revealed');
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        });
    };
    
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    };
    
    scrollReveal();

    // ===== Current Year in Footer =====
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
});

// ===== Before Unload Transition =====
window.addEventListener('beforeunload', function() {
    document.body.classList.add('fade-out');
});

// ===== Image Lazy Loading =====
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('.about-image img, .member-image img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }
});

// ===== Social Media Link Handler =====
document.querySelectorAll('.social-links a, .footer-social-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.querySelector('i').className.split(' ')[1].split('-')[1];
        alert(`This would normally link to our ${platform} page.`);
        // In a real implementation, you would use: window.open(this.href, '_blank');
    });
});

// ===== Contact Form Simulation (if you add one later) =====
window.handleContactSubmit = function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
};