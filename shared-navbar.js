// ===== FUNCIONALIDAD DE NAVEGACIÓN ===== 
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');

  // Cambio de apariencia del navbar al hacer scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Toggle del menú móvil
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // Cerrar el menú móvil cuando se hace clic en un enlace
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    });
  });

  // Cerrar el menú móvil al hacer clic fuera de él
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navbar.contains(event.target);
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    }
  });
});