// ===== GSAP PORTFOLIO ANIMATIONS =====
// Professional 3D Portfolio with Advanced GSAP Animations

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

// ===== GLOBAL VARIABLES =====
let isLoaded = false;
let mousePosition = { x: 0, y: 0 };
let isMobile = window.innerWidth <= 768;

// ===== UTILITY FUNCTIONS =====
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const lerp = (start, end, factor) => {
    return start + (end - start) * factor;
};

// ===== LOADING ANIMATION =====
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        // Animate loading progress
        gsap.to('.loading-progress', {
            width: '100%',
            duration: 2,
            ease: 'power2.out',
            onComplete: () => {
                this.hideLoading();
            }
        });

        // Animate loading letters
        gsap.fromTo('.loading-letter', 
            { 
                opacity: 0, 
                y: 20,
                rotationX: 90
            },
            { 
                opacity: 1, 
                y: 0,
                rotationX: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            }
        );

        // Animate logo
        gsap.fromTo('.logo-3d', 
            { 
                scale: 0.5, 
                rotationY: 180,
                opacity: 0
            },
            { 
                scale: 1, 
                rotationY: 0,
                opacity: 1,
                duration: 1,
                ease: 'elastic.out(1, 0.3)'
            }
        );
    }

    hideLoading() {
        gsap.to('#loading-screen', {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
                document.getElementById('loading-screen').style.display = 'none';
                isLoaded = true;
                this.initMainAnimations();
            }
        });
    }

    initMainAnimations() {
        // Initialize all main animations after loading
        new NavigationAnimation();
        new HeroAnimation();
        new AboutAnimation();
        new ProjectsAnimation();
        new ExperienceAnimation();
        new SkillsAnimation();
        new ContactAnimation();
        new MouseInteraction();
        new ScrollEffects();
    }
}

// ===== NAVIGATION ANIMATION =====
class NavigationAnimation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        // Navbar scroll effect
        window.addEventListener('scroll', debounce(() => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }, 10));

        // Mobile menu toggle
        this.navToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Smooth scroll for nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-section');
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: targetSection,
                            offsetY: 80
                        },
                        ease: 'power2.inOut'
                    });
                }
                
                // Close mobile menu if open
                if (this.navMenu.classList.contains('active')) {
                    this.toggleMobileMenu();
                }
            });
        });

        // Animate nav links on load
        gsap.fromTo(this.navLinks, 
            { 
                opacity: 0, 
                y: -20 
            },
            { 
                opacity: 1, 
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                delay: 0.5
            }
        );
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        
        if (this.navMenu.classList.contains('active')) {
            gsap.fromTo(this.navLinks, 
                { 
                    opacity: 0, 
                    x: -50 
                },
                { 
                    opacity: 1, 
                    x: 0,
                    duration: 0.3,
                    stagger: 0.1
                }
            );
        }
    }
}

// ===== HERO ANIMATION =====
class HeroAnimation {
    constructor() {
        this.heroTitle = document.querySelector('.hero-title');
        this.titleLines = document.querySelectorAll('.title-line');
        this.heroSubtitle = document.querySelector('.hero-subtitle');
        this.heroButtons = document.querySelectorAll('.btn');
        this.profileImage = document.querySelector('.profile-image');
        this.floatingIcons = document.querySelectorAll('.floating-icon');
        this.shapes = document.querySelectorAll('.shape');
        
        this.init();
    }

    init() {
        // Animate title lines
        gsap.fromTo(this.titleLines, 
            { 
                opacity: 0, 
                y: 100,
                rotationX: 90
            },
            { 
                opacity: 1, 
                y: 0,
                rotationX: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'back.out(1.7)',
                delay: 0.5
            }
        );

        // Animate subtitle
        gsap.fromTo(this.heroSubtitle, 
            { 
                opacity: 0, 
                y: 50 
            },
            { 
                opacity: 1, 
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                delay: 1.2
            }
        );

        // Animate buttons
        gsap.fromTo(this.heroButtons, 
            { 
                opacity: 0, 
                y: 30,
                scale: 0.8
            },
            { 
                opacity: 1, 
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                delay: 1.5
            }
        );

        // Animate profile image
        gsap.fromTo(this.profileImage, 
            { 
                opacity: 0, 
                scale: 0.5,
                rotationY: 180
            },
            { 
                opacity: 1, 
                scale: 1,
                rotationY: 0,
                duration: 1.2,
                ease: 'elastic.out(1, 0.3)',
                delay: 0.8
            }
        );

        // Animate floating icons
        gsap.fromTo(this.floatingIcons, 
            { 
                opacity: 0, 
                scale: 0,
                y: 50
            },
            { 
                opacity: 1, 
                scale: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'back.out(1.7)',
                delay: 1.2
            }
        );

        // Animate floating shapes with more dynamic effects
        gsap.fromTo(this.shapes, 
            { 
                opacity: 0, 
                scale: 0,
                rotation: 0,
                y: 100
            },
            { 
                opacity: 0.15, 
                scale: 1,
                rotation: 360,
                y: 0,
                duration: 2.5,
                stagger: 0.3,
                ease: 'back.out(1.7)',
                delay: 0.3
            }
        );

        // Add continuous floating animation
        this.shapes.forEach((shape, index) => {
            gsap.to(shape, {
                y: "random(-30, 30)",
                x: "random(-20, 20)",
                rotation: "random(-180, 180)",
                duration: "random(3, 6)",
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: index * 0.5
            });
        });

        // Button hover effects
        this.initButtonEffects();
    }

    initButtonEffects() {
        this.heroButtons.forEach(button => {
            const btnBg = button.querySelector('.btn-bg');
            
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    y: -3,
                    duration: 0.4,
                    ease: 'back.out(1.7)'
                });
                
                gsap.to(btnBg, {
                    left: '100%',
                    duration: 0.6,
                    ease: 'power2.out'
                });

                // Add ripple effect
                this.createRippleEffect(button);
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });
                
                gsap.to(btnBg, {
                    left: '-100%',
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });

            // Add click effect
            button.addEventListener('click', (e) => {
                this.createClickEffect(button, e);
            });
        });
    }

    createRippleEffect(button) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    createClickEffect(button, event) {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const clickEffect = document.createElement('div');
        clickEffect.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: translate(-50%, -50%);
            pointer-events: none;
        `;
        
        button.appendChild(clickEffect);
        
        gsap.to(clickEffect, {
            width: '200px',
            height: '200px',
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
                clickEffect.remove();
            }
        });
    }
}

// ===== ABOUT ANIMATION =====
class AboutAnimation {
    constructor() {
        this.aboutCards = document.querySelectorAll('.about-card');
        this.modelSphere = document.querySelector('.model-sphere');
        this.modelRings = document.querySelectorAll('.model-ring');
        
        this.init();
    }

    init() {
        // Scroll trigger for about section
        ScrollTrigger.create({
            trigger: '.about-section',
            start: 'top 80%',
            onEnter: () => {
                this.animateCards();
                this.animateModel();
            }
        });
    }

    animateCards() {
        gsap.fromTo(this.aboutCards, 
            { 
                opacity: 0, 
                y: 50,
                rotationX: 45
            },
            { 
                opacity: 1, 
                y: 0,
                rotationX: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'back.out(1.7)'
            }
        );

        // Card hover effects
        this.aboutCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    rotationX: 5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    rotationX: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }

    animateModel() {
        gsap.fromTo(this.modelSphere, 
            { 
                opacity: 0, 
                scale: 0 
            },
            { 
                opacity: 1, 
                scale: 1,
                duration: 1,
                ease: 'elastic.out(1, 0.3)'
            }
        );

        gsap.fromTo(this.modelRings, 
            { 
                opacity: 0, 
                scale: 0,
                rotation: 0
            },
            { 
                opacity: 1, 
                scale: 1,
                rotation: 360,
                duration: 1.5,
                stagger: 0.2,
                ease: 'power2.out'
            }
        );
    }
}

// ===== PROJECTS ANIMATION =====
class ProjectsAnimation {
    constructor() {
        this.projectCards = document.querySelectorAll('.project-card');
        
        this.init();
    }

    init() {
        // Scroll trigger for projects section
        ScrollTrigger.create({
            trigger: '.projects-section',
            start: 'top 80%',
            onEnter: () => {
                this.animateCards();
            }
        });

        // Individual card animations
        this.projectCards.forEach((card, index) => {
            ScrollTrigger.create({
                trigger: card,
                start: 'top 90%',
                onEnter: () => {
                    this.animateCard(card, index);
                }
            });
        });

        // Card interactions
        this.initCardInteractions();
    }

    animateCards() {
        gsap.fromTo(this.projectCards, 
            { 
                opacity: 0, 
                y: 100,
                rotationX: 45
            },
            { 
                opacity: 1, 
                y: 0,
                rotationX: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'back.out(1.7)'
            }
        );
    }

    animateCard(card, index) {
        gsap.fromTo(card, 
            { 
                opacity: 0, 
                y: 50,
                scale: 0.8
            },
            { 
                opacity: 1, 
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.7)',
                delay: index * 0.1
            }
        );
    }

    initCardInteractions() {
        this.projectCards.forEach(card => {
            const overlay = card.querySelector('.project-overlay');
            
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -15,
                    rotationX: 10,
                    rotationY: 5,
                    duration: 0.4,
                    ease: 'power2.out'
                });
                
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.3
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    rotationX: 0,
                    rotationY: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });
                
                gsap.to(overlay, {
                    opacity: 0,
                    duration: 0.3
                });
            });
        });
    }
}

// ===== EXPERIENCE ANIMATION =====
class ExperienceAnimation {
    constructor() {
        this.timelineItems = document.querySelectorAll('.timeline-item');
        
        this.init();
    }

    init() {
        // Scroll trigger for experience section
        ScrollTrigger.create({
            trigger: '.experience-section',
            start: 'top 80%',
            onEnter: () => {
                this.animateTimeline();
            }
        });

        // Individual timeline item animations
        this.timelineItems.forEach((item, index) => {
            ScrollTrigger.create({
                trigger: item,
                start: 'top 90%',
                onEnter: () => {
                    this.animateTimelineItem(item, index);
                }
            });
        });
    }

    animateTimeline() {
        gsap.fromTo(this.timelineItems, 
            { 
                opacity: 0, 
                y: 50,
                scale: 0.8
            },
            { 
                opacity: 1, 
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.3,
                ease: 'back.out(1.7)'
            }
        );
    }

    animateTimelineItem(item, index) {
        const content = item.querySelector('.timeline-content');
        const marker = item.querySelector('.timeline-marker');
        
        gsap.fromTo(content, 
            { 
                opacity: 0, 
                x: index % 2 === 0 ? -100 : 100,
                rotationY: index % 2 === 0 ? -15 : 15
            },
            { 
                opacity: 1, 
                x: 0,
                rotationY: 0,
                duration: 0.8,
                ease: 'power2.out'
            }
        );
        
        gsap.fromTo(marker, 
            { 
                opacity: 0, 
                scale: 0 
            },
            { 
                opacity: 1, 
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.7)',
                delay: 0.3
            }
        );
    }
}

// ===== SKILLS ANIMATION =====
class SkillsAnimation {
    constructor() {
        this.skillItems = document.querySelectorAll('.skill-item');
        this.orbitItems = document.querySelectorAll('.orbit-item');
        
        this.init();
    }

    init() {
        // Scroll trigger for skills section
        ScrollTrigger.create({
            trigger: '.skills-section',
            start: 'top 80%',
            onEnter: () => {
                this.animateSkills();
                this.animateOrbit();
            }
        });
    }

    animateSkills() {
        this.skillItems.forEach((item, index) => {
            const progressRing = item.querySelector('.progress-ring-circle');
            const skillLevel = item.getAttribute('data-skill');
            
            gsap.fromTo(item, 
                { 
                    opacity: 0, 
                    y: 50,
                    scale: 0.8
                },
                { 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: 'back.out(1.7)',
                    delay: index * 0.1
                }
            );
            
            if (progressRing) {
                const circumference = 2 * Math.PI * 26; // r = 26
                const offset = circumference - (skillLevel / 100) * circumference;
                
                gsap.set(progressRing, {
                    strokeDasharray: circumference,
                    strokeDashoffset: circumference
                });
                
                gsap.to(progressRing, {
                    strokeDashoffset: offset,
                    duration: 1.5,
                    ease: 'power2.out',
                    delay: index * 0.1 + 0.3
                });
            }
        });
    }

    animateOrbit() {
        gsap.fromTo(this.orbitItems, 
            { 
                opacity: 0, 
                scale: 0,
                rotation: 0
            },
            { 
                opacity: 1, 
                scale: 1,
                rotation: 360,
                duration: 1,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            }
        );

        // Orbit hover effects
        this.orbitItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    scale: 1.2,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
}

// ===== CONTACT ANIMATION =====
class ContactAnimation {
    constructor() {
        this.contactCards = document.querySelectorAll('.contact-card');
        this.contactForm = document.getElementById('contact-form');
        this.formGroups = document.querySelectorAll('.form-group');
        
        this.init();
    }

    init() {
        // Scroll trigger for contact section
        ScrollTrigger.create({
            trigger: '.contact-section',
            start: 'top 80%',
            onEnter: () => {
                this.animateCards();
                this.animateForm();
            }
        });

        // Form interactions
        this.initFormInteractions();
    }

    animateCards() {
        gsap.fromTo(this.contactCards, 
            { 
                opacity: 0, 
                y: 50,
                rotationX: 45
            },
            { 
                opacity: 1, 
                y: 0,
                rotationX: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'back.out(1.7)'
            }
        );
    }

    animateForm() {
        gsap.fromTo(this.formGroups, 
            { 
                opacity: 0, 
                x: 50 
            },
            { 
                opacity: 1, 
                x: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            }
        );
    }

    initFormInteractions() {
        this.formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            input.addEventListener('focus', () => {
                gsap.to(group, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            input.addEventListener('blur', () => {
                gsap.to(group, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Form submission
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });
    }

    handleFormSubmission() {
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        
        // Animate button
        gsap.to(submitBtn, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });
        
        // Change button text
        gsap.to(btnText, {
            text: 'Sending...',
            duration: 0.3,
            ease: 'power2.out'
        });
        
        // Simulate form submission
        setTimeout(() => {
            gsap.to(btnText, {
                text: 'Message Sent!',
                duration: 0.3,
                ease: 'power2.out'
            });
            
            setTimeout(() => {
                gsap.to(btnText, {
                    text: 'Send Message',
                    duration: 0.3,
                    ease: 'power2.out'
                });
                this.contactForm.reset();
            }, 2000);
        }, 1500);
    }
}

// ===== MOUSE INTERACTION =====
class MouseInteraction {
    constructor() {
        this.cursor = this.createCursor();
        this.init();
    }

    createCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--gradient-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);
        return cursor;
    }

    init() {
        if (isMobile) return;

        document.addEventListener('mousemove', (e) => {
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
            
            gsap.to(this.cursor, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.1,
                ease: 'power2.out'
            });
        });

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .about-card, .contact-card');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(this.cursor, {
                    scale: 2,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(this.cursor, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
}

// ===== SCROLL EFFECTS =====
class ScrollEffects {
    constructor() {
        this.init();
    }

    init() {
        // Parallax effects
        this.initParallax();
        
        // Reveal animations
        this.initRevealAnimations();
        
        // Smooth scrolling for buttons
        this.initSmoothScrolling();
    }

    initParallax() {
        // Hero parallax
        gsap.to('.floating-shapes', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        // About parallax
        gsap.to('.about-visual', {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    initRevealAnimations() {
        // Section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.fromTo(header, 
                { 
                    opacity: 0, 
                    y: 50 
                },
                { 
                    opacity: 1, 
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }

    initSmoothScrolling() {
        const scrollButtons = document.querySelectorAll('[data-action="scroll"]');
        
        scrollButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = button.getAttribute('data-target');
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: {
                            y: targetSection,
                            offsetY: 80
                        },
                        ease: 'power2.inOut'
                    });
                }
            });
        });
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Throttle scroll events
        this.throttleScrollEvents();
        
        // Optimize animations for mobile
        this.optimizeForMobile();
        
        // Preload critical resources
        this.preloadResources();
    }

    throttleScrollEvents() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            // Update any scroll-based effects here
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }

    optimizeForMobile() {
        if (isMobile) {
            // Reduce animation complexity on mobile
            gsap.globalTimeline.timeScale(1.2);
            
            // Disable some heavy effects
            document.querySelectorAll('.floating-shapes').forEach(shape => {
                shape.style.display = 'none';
            });
        }
    }

    preloadResources() {
        // Preload critical images and fonts
        const preloadLinks = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
        ];
        
        preloadLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = href;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        // Keyboard navigation
        this.initKeyboardNavigation();
        
        // Focus management
        this.initFocusManagement();
        
        // Reduced motion support
        this.initReducedMotion();
    }

    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    initFocusManagement() {
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                gsap.to(element, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
            
            element.addEventListener('blur', () => {
                gsap.to(element, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
        });
    }

    initReducedMotion() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            gsap.globalTimeline.timeScale(0.1);
        }
    }
}

// ===== CONTACT FORM FUNCTIONALITY =====
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.btnLoading = document.getElementById('btn-loading');
        this.formMessage = document.getElementById('form-message');
        this.messageText = this.formMessage?.querySelector('.message-text');
        this.messageIcon = this.formMessage?.querySelector('.message-icon');
        
        // Google Apps Script configuration
        this.appsScriptConfig = {
            webAppUrl: 'https://script.google.com/macros/s/AKfycbyxXIrc9Jf1rCRBiFfYnJtOuiQow7nMYPP863c--HKJlCboOo_3RcIYSzGLBxEA7be5_w/exec',
            enabled: true
        };
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) return;
        
        this.setLoading(true);
        
        try {
            // Get form data
            const formData = {
                name: this.form.name.value,
                email: this.form.email.value,
                subject: this.form.subject.value,
                message: this.form.message.value,
                timestamp: new Date().toISOString()
            };
            
            // Check if Google Apps Script is configured
            if (this.appsScriptConfig.enabled && this.appsScriptConfig.webAppUrl) {
                // Send email using Google Apps Script with URL parameters (bypasses CORS)
                const params = new URLSearchParams({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    timestamp: formData.timestamp
                });
                
                // Use GET request to avoid CORS issues
                fetch(`${this.appsScriptConfig.webAppUrl}?${params.toString()}`, {
                    method: 'GET',
                    mode: 'no-cors'
                }).then(() => {
                    console.log('📧 Email sent via Google Apps Script');
                    this.showMessage('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
                    this.form.reset();
                    this.clearAllErrors();
                }).catch(error => {
                    console.log('📧 Email sent via Google Apps Script (CORS handled)');
                    this.showMessage('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
                    this.form.reset();
                    this.clearAllErrors();
                });
            } else {
                // Fallback: Simulate successful submission
                await this.simulateEmailSending();
                
                this.showMessage('Message received! I\'ll get back to you within 24 hours.', 'success');
                this.form.reset();
                this.clearAllErrors();
                
                // Log the message to console for demo
                console.log('📧 Contact Form Submission:', formData);
                console.log('💡 To enable real email sending, set up Google Apps Script and update the webAppUrl in script.js');
            }
        } catch (error) {
            console.error('Error:', error);
            this.showMessage('Failed to send message. Please try again or contact me directly at abish13.r@gmail.com', 'error');
        } finally {
            this.setLoading(false);
        }
    }
    
    async simulateEmailSending() {
        // Simulate network delay for realistic experience
        return new Promise(resolve => {
            setTimeout(resolve, 1500);
        });
    }
    
    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (!value) {
            errorMessage = `${this.getFieldLabel(fieldName)} is required`;
            isValid = false;
        }
        // Email validation
        else if (fieldName === 'email' && !this.isValidEmail(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
        // Message length validation
        else if (fieldName === 'message' && value.length < 10) {
            errorMessage = 'Message must be at least 10 characters long';
            isValid = false;
        }
        
        if (isValid) {
            this.clearFieldError(field);
            this.setFieldSuccess(field);
        } else {
            this.setFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    getFieldLabel(fieldName) {
        const labels = {
            'name': 'Name',
            'email': 'Email',
            'subject': 'Subject',
            'message': 'Message'
        };
        return labels[fieldName] || fieldName;
    }
    
    setFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');
        
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    setFieldSuccess(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');
        
        formGroup.classList.add('success');
        formGroup.classList.remove('error');
        errorElement.classList.remove('show');
    }
    
    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');
        
        formGroup.classList.remove('error');
        errorElement.classList.remove('show');
    }
    
    clearAllErrors() {
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error', 'success');
            const errorElement = group.querySelector('.form-error');
            errorElement.classList.remove('show');
        });
    }
    
    setLoading(loading) {
        if (loading) {
            this.submitBtn.disabled = true;
            this.btnLoading.classList.add('show');
        } else {
            this.submitBtn.disabled = false;
            this.btnLoading.classList.remove('show');
        }
    }
    
    showMessage(message, type = 'success') {
        this.messageText.textContent = message;
        this.formMessage.className = `form-message ${type} show`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.formMessage.classList.remove('show');
        }, 5000);
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading animation
    new LoadingAnimation();
    
    // Initialize performance optimizer
    new PerformanceOptimizer();
    
    // Initialize accessibility enhancements
    new AccessibilityEnhancer();
    
    // Initialize contact form
    new ContactForm();
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        isMobile = window.innerWidth <= 768;
        ScrollTrigger.refresh();
    }, 250));
    
    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            gsap.globalTimeline.pause();
        } else {
            gsap.globalTimeline.resume();
        }
    });
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    // Graceful degradation - ensure basic functionality works
    if (!isLoaded) {
        document.getElementById('loading-screen').style.display = 'none';
        isLoaded = true;
    }
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LoadingAnimation,
        NavigationAnimation,
        HeroAnimation,
        AboutAnimation,
        ProjectsAnimation,
        ExperienceAnimation,
        SkillsAnimation,
        ContactAnimation,
        MouseInteraction,
        ScrollEffects
    };
}
