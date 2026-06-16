document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const langToggle = document.getElementById('lang-toggle');
    const htmlElement = document.documentElement;
    
    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // LTR/RTL Toggle
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentDir = htmlElement.getAttribute('dir');
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            htmlElement.setAttribute('dir', newDir);
            updateLangText(newDir);
        });
    }

    // Add animation classes to feature cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });

    // --- Dashboard Specific Logic ---
    const sidebar = document.getElementById('dash-sidebar');
    const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const sidebarScrim = document.getElementById('dash-sidebar-scrim');

    // Helper: open/close sidebar with scrim
    function openSidebar() {
        if (sidebar) sidebar.classList.add('open');
        if (sidebarScrim) sidebarScrim.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('open');
        if (sidebarScrim) sidebarScrim.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close sidebar when scrim is clicked
    if (sidebarScrim) {
        sidebarScrim.addEventListener('click', closeSidebar);
    }

    // Desktop Sidebar Toggle
    if (toggleSidebarBtn && sidebar) {
        toggleSidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // Mobile Menu Slide-down
    const menuBtns = document.querySelectorAll('.menu-btn');
    
    menuBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // For public pages (no sidebar)
            if (mobileNavOverlay && !sidebar) {
                mobileNavOverlay.classList.toggle('open');
            }
            // For dashboards — use sidebar as mobile menu
            if (sidebar) {
                const isOpen = sidebar.classList.contains('open');
                if (isOpen) {
                    closeSidebar();
                } else {
                    openSidebar();
                }
            }
        });
    });

    // Theme Toggle (Dark/Light Mode)
    const rtlToggleBtn = document.getElementById('rtl-toggle-btn');
    if (rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', () => {
            const currentDir = htmlElement.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            htmlElement.setAttribute('dir', newDir);
            updateLangText(newDir);
        });
    }

    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('dash-theme') || 'light';
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('dash-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.className = 'fa-solid fa-sun';
            } else {
                icon.className = 'fa-solid fa-moon';
            }
        }
    }

    function updateLangText(dir) {
        const textHTML = `<span style="font-size: 0.85rem; font-weight: 700; font-family: 'Outfit', sans-serif; line-height: 1; display: flex; align-items: center; justify-content: center; height: 100%; width: 100%;">${dir.toUpperCase()}</span>`;
        if (langToggle) langToggle.innerHTML = textHTML;
        if (rtlToggleBtn) rtlToggleBtn.innerHTML = textHTML;
    }

    // Initialize lang text on load
    updateLangText(htmlElement.getAttribute('dir') || 'ltr');

    // Highlight Active Nav Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            if (link.classList.contains('dropdown-link')) {
                const parentItem = link.closest('.nav-item.has-dropdown');
                if (parentItem) {
                    const parentLink = parentItem.querySelector('.nav-link');
                    if (parentLink) parentLink.classList.add('active');
                }
            }
        }
    });

    // Dashboard Scrollspy & Smooth Scrolling
    const dashSections = document.querySelectorAll('.dash-section');
    const dashNavLinks = document.querySelectorAll('.dash-nav-link');

    if (dashSections.length > 0 && dashNavLinks.length > 0) {
        // Smooth scroll on click
        dashNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    
                    // Immediately update active state
                    dashNavLinks.forEach(nav => nav.classList.remove('active'));
                    dashNavLinks.forEach(nav => {
                        if (nav.getAttribute('href') === targetId) {
                            nav.classList.add('active');
                        }
                    });

                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        // Close mobile menu if open
                        if (mobileNavOverlay) {
                            mobileNavOverlay.classList.remove('open');
                        }
                        closeSidebar();
                        
                        // Scroll to section (offset for header)
                        const headerOffset = 100;
                        const elementPosition = targetSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                    }
                }
            });
        });

        // Bulletproof Scrollspy using IntersectionObserver and Intersection Ratio
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
        };
        
        let visibleSections = {};

        const scrollSpyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                visibleSections[entry.target.getAttribute('id')] = entry.intersectionRatio;
            });
            
            // Find section with the highest intersection ratio
            let maxRatio = 0;
            let currentId = '';
            
            for (const id in visibleSections) {
                if (visibleSections[id] > maxRatio) {
                    maxRatio = visibleSections[id];
                    currentId = id;
                }
            }
            
            // If we have a visible section, update the nav links
            if (currentId && maxRatio > 0) {
                dashNavLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href') || link.href;
                    // Use endsWith to ensure it matches even if browser converts href to absolute URL
                    if (href && href.endsWith(`#${currentId}`)) {
                        link.classList.add('active');
                    }
                });
            }
        }, observerOptions);

        // Observe all sections
        dashSections.forEach(section => {
            scrollSpyObserver.observe(section);
        });
    }

    // Toggle dropdowns on touch devices & click fallback
    const dropdownToggles = document.querySelectorAll('.has-dropdown > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth > 768) {
                const parent = toggle.parentElement;
                const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
                const isPlaceholder = toggle.getAttribute('href') === '#';
                
                if (isPlaceholder || isTouch) {
                    const isAlreadyActive = parent.classList.contains('active');
                    
                    if (!isAlreadyActive || isPlaceholder) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        dropdownToggles.forEach(otherToggle => {
                            if (otherToggle !== toggle) {
                                otherToggle.parentElement.classList.remove('active');
                            }
                        });
                        
                        parent.classList.add('active');
                    }
                }
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        dropdownToggles.forEach(toggle => {
            if (!toggle.parentElement.contains(e.target)) {
                toggle.parentElement.classList.remove('active');
            }
        });
    });
});
