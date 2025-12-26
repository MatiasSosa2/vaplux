/**
 * Sistema de Navegación Centralizado - Vaplux
 * Este script genera automáticamente la navegación del sitio con rutas relativas adaptativas
 */

class VapluxNavigation {
  constructor() {
    this.basePath = this.calculateBasePath();
    this.init();
  }

  /**
   * Calcula la ruta base relativa según la ubicación del archivo actual
   */
  calculateBasePath() {
    const path = window.location.pathname;
    
    // Si estamos en la raíz
    if (path.endsWith('index.html') || path === '/' || !path.includes('/secciones/')) {
      return './';
    }
    
    // Si estamos en secciones/ (depth 1)
    if (path.includes('/secciones/') && !path.includes('/productos/')) {
      return '../';
    }
    
    // Si estamos en secciones/productos/ (depth 2)
    if (path.includes('/secciones/productos/') && !path.includes('/detalles')) {
      return '../../';
    }
    
    // Si estamos en secciones/productos/detalles*/ (depth 3)
    if (path.includes('/detalles')) {
      return '../../../../';
    }
    
    return './';
  }

  /**
   * Genera el HTML de la navegación
   */
  getNavHTML() {
    return `
      <nav class="navbar" id="navbar">
        <div class="nav-container">
          <a href="${this.basePath}index.html" class="nav-logo">
            <img src="${this.basePath}assets/logo.PNG" alt="Vaplux Logo">
            <span>Vaplux</span>
          </a>
          
          <ul class="nav-menu">
            <li class="nav-item"><a href="${this.basePath}index.html#inicio" class="nav-link">Inicio</a></li>
            
            <li class="nav-item">
              <a href="${this.basePath}index.html#productos" class="nav-link has-dropdown">Productos</a>
              <div class="dropdown-menu">
                <a href="${this.basePath}secciones/productos/iPhones.html" class="dropdown-link">📱 iPhones</a>
                <a href="${this.basePath}secciones/productos/vapes.html" class="dropdown-link">💨 Vapes Premium</a>
                <a href="${this.basePath}secciones/productos/varios.html" class="dropdown-link">🔧 Tecnología</a>
                <div class="dropdown-divider"></div>
                <a href="${this.basePath}index.html#productos" class="dropdown-link">🛍️ Ver Todo</a>
              </div>
            </li>
            
            <li class="nav-item">
              <a href="${this.basePath}index.html#servicios" class="nav-link has-dropdown">Servicios</a>
              <div class="dropdown-menu">
                <a href="${this.basePath}secciones/ReparacionIphones.html" class="dropdown-link">🔧 Reparación iPhones</a>
                <a href="${this.basePath}secciones/TrabajacNosotros.html" class="dropdown-link">💼 Trabaja con Nosotros</a>
                <div class="dropdown-divider"></div>
                <a href="${this.basePath}index.html#servicios" class="dropdown-link">🎯 Todos los Servicios</a>
              </div>
            </li>
            
            <li class="nav-item"><a href="${this.basePath}index.html#nosotros" class="nav-link">Nosotros</a></li>
            <li class="nav-item"><a href="${this.basePath}index.html#contacto" class="nav-link nav-cta">Contacto</a></li>
          </ul>
          
          <div class="nav-toggle" id="navToggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    `;
  }

  /**
   * Inicializa la navegación
   */
  init() {
    // Inyectar el HTML del navbar
    const navPlaceholder = document.getElementById('vaplux-nav');
    if (navPlaceholder) {
      navPlaceholder.innerHTML = this.getNavHTML();
      this.attachEventListeners();
    }
  }

  /**
   * Adjunta los event listeners necesarios
   */
  attachEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    });

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
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
      document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          const spans = navToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        });
      });
    }
  }
}

// Inicializar automáticamente cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new VapluxNavigation());
} else {
  new VapluxNavigation();
}
