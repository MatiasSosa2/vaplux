/* ===== VAPLUX SHARED NAVBAR JAVASCRIPT ===== */
/* Funcionalidad extraída directamente de index.html para garantizar uniformidad total */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ===== MOBILE MENU TOGGLE =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animación del botón hamburguesa
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Cerrar menú móvil al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                // Reset hamburger animation
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ===== SMOOTH SCROLLING PARA ENLACES INTERNOS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== DROPDOWN MENUS MÓVILES =====
    // En móvil, los dropdowns se abren con click en lugar de hover
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.nav-link.has-dropdown').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const navItem = this.closest('.nav-item');
                const dropdown = navItem.querySelector('.dropdown-menu');
                
                // Cerrar otros dropdowns
                document.querySelectorAll('.nav-item').forEach(item => {
                    if (item !== navItem) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle del dropdown actual
                navItem.classList.toggle('active');
            });
        });
    }

    // ===== CERRAR DROPDOWN AL HACER CLICK FUERA =====
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item')) {
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // ===== EFECTO DE ENTRADA PARA ELEMENTOS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones (si existen)
    document.querySelectorAll('.product-card, .service-card, .contact-card').forEach(el => {
        observer.observe(el);
    });

    // ===== ACTUALIZAR COMPORTAMIENTO EN RESIZE =====
    window.addEventListener('resize', function() {
        // Resetear menú móvil si se cambia a desktop
        if (window.innerWidth > 768) {
            navMenu?.classList.remove('active');
            const spans = navToggle?.querySelectorAll('span');
            if (spans) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
            
            // Resetear dropdowns móviles
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // ===== INICIALIZAR AOS SI ESTÁ DISPONIBLE =====
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }

    // ===== DESTACAR ENLACE ACTIVO BASADO EN LA URL =====
    function highlightActiveLink() {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href) {
                // Para enlaces internos (hash)
                if (href.startsWith('#') && href === currentHash) {
                    link.classList.add('active');
                }
                // Para enlaces de páginas
                else if (href.includes('.html') && currentPath.includes(href.split('/').pop())) {
                    link.classList.add('active');
                }
                // Para la página principal
                else if (href === '#inicio' && (currentPath === '/' || currentPath.includes('index.html'))) {
                    link.classList.add('active');
                }
            }
        });
    }

    // Ejecutar al cargar y en cambios de hash
    highlightActiveLink();
    window.addEventListener('hashchange', highlightActiveLink);

    // ===== MEJORAR ACCESIBILIDAD =====
    // Navegación con teclado para dropdowns
    document.querySelectorAll('.nav-item').forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');
        
        if (dropdown) {
            link.setAttribute('aria-haspopup', 'true');
            link.setAttribute('aria-expanded', 'false');
            
            // Abrir dropdown con Enter o Espacio
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.classList.toggle('active');
                    link.setAttribute('aria-expanded', 
                        item.classList.contains('active') ? 'true' : 'false'
                    );
                }
            });
            
            // Cerrar dropdown con Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    item.classList.remove('active');
                    link.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    console.log('🎯 Vaplux Shared Navbar System cargado correctamente');
});

// ===== FUNCIONES PÚBLICAS PARA USO EXTERNO =====
window.VapluxNavbar = {
    // Cerrar menú móvil programáticamente
    closeMenu: function() {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        
        if (navToggle) {
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    },
    
    // Resaltar enlace específico
    setActiveLink: function(selector) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const targetLink = document.querySelector(selector);
        if (targetLink) {
            targetLink.classList.add('active');
        }
    },
    
    // Obtener estado del menú
    isMenuOpen: function() {
        const navMenu = document.querySelector('.nav-menu');
        return navMenu ? navMenu.classList.contains('active') : false;
    }
};