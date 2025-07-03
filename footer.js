// load-footer.js
document.addEventListener('DOMContentLoaded', function() {
    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
            
            // Update current year
            document.getElementById('current-year').textContent = new Date().getFullYear();
            
            // Add footer functionality
            initFooter();
        });
});

function initFooter() {
    // Social media links
    document.querySelectorAll('.footer-social-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert(`Redirecting to ${this.querySelector('i').className.split('-')[1]} page`);
            // In production: window.open(this.href, '_blank');
        });
    });

    // Smooth page transitions
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').endsWith('.html')) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = this.getAttribute('href');
                }, 500);
            }
        });
    });

    // Copy contact info
    document.querySelectorAll('.footer-contact p').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const textToCopy = this.textContent.trim();
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    const original = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    setTimeout(() => this.innerHTML = original, 2000);
                });
        });
    });
}