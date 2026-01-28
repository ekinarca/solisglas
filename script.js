// SolisGlas - Language Switcher and UI Interactions

(function() {
    'use strict';

    // Language Management
    const LanguageManager = {
        currentLang: 'en',
        
        init() {
            // Check for saved language preference
            const savedLang = localStorage.getItem('solisglas-lang');
            if (savedLang && (savedLang === 'en' || savedLang === 'nl')) {
                this.currentLang = savedLang;
            } else {
                // Detect browser language
                const browserLang = navigator.language.toLowerCase();
                if (browserLang.startsWith('nl')) {
                    this.currentLang = 'nl';
                }
            }
            
            this.setLanguage(this.currentLang);
            this.bindEvents();
        },
        
        bindEvents() {
            const langButtons = document.querySelectorAll('.lang-btn');
            langButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const lang = e.target.dataset.lang;
                    this.setLanguage(lang);
                });
            });
        },
        
        setLanguage(lang) {
            this.currentLang = lang;
            localStorage.setItem('solisglas-lang', lang);
            
            // Update HTML lang attribute
            document.documentElement.lang = lang;
            
            // Update page title
            const titles = {
                en: 'SolisGlas - Stained Glass Art Patterns',
                nl: 'SolisGlas - Glas-in-lood Kunstpatronen'
            };
            document.title = titles[lang];
            
            // Update all translatable elements
            const elements = document.querySelectorAll('[data-en][data-nl]');
            elements.forEach(el => {
                el.textContent = el.dataset[lang];
            });
            
            // Update active state on language buttons
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === lang);
            });
        }
    };

    // Image Gallery Management
    const GalleryManager = {
        init() {
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const thumbnails = card.querySelectorAll('.thumbnail');
                const mainImage = card.querySelector('.main-image img');
                
                thumbnails.forEach((thumb, index) => {
                    thumb.addEventListener('click', () => {
                        // Skip if placeholder
                        if (thumb.classList.contains('placeholder')) return;
                        
                        // Update active state
                        thumbnails.forEach(t => t.classList.remove('active'));
                        thumb.classList.add('active');
                        
                        // Update main image
                        const thumbImg = thumb.querySelector('img');
                        if (thumbImg && mainImage) {
                            mainImage.src = thumbImg.src;
                            mainImage.alt = thumbImg.alt;
                        }
                    });
                });
            });
        }
    };

    // Etsy Links Configuration
    // Replace these URLs with actual Etsy listing URLs
    const EtsyLinks = {
        digital: '#', // Replace with actual Etsy URL
        printed: '#', // Replace with actual Etsy URL
        finished: '#', // Replace with actual Etsy URL
        shop: '#' // Replace with actual Etsy shop URL
    };

    // Initialize Etsy links
    const initEtsyLinks = () => {
        document.querySelectorAll('.etsy-link').forEach(link => {
            const product = link.dataset.product;
            if (product && EtsyLinks[product]) {
                link.href = EtsyLinks[product];
            }
        });
        
        document.querySelectorAll('.etsy-shop-link').forEach(link => {
            link.href = EtsyLinks.shop;
        });
    };

    // Smooth scroll for anchor links
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // Navbar scroll effect
    const initNavbarScroll = () => {
        const header = document.querySelector('header');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
            
            lastScroll = currentScroll;
        });
    };

    // Initialize everything when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        LanguageManager.init();
        GalleryManager.init();
        initEtsyLinks();
        initSmoothScroll();
        initNavbarScroll();
    });
})();
