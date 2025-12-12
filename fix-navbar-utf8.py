# -*- coding: utf-8 -*-
import os
import glob

# Navbar correcto con emojis
navbar_correcto = '''<nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="../../../index.html" class="nav-logo">
        <img src="../../../assets/logo.PNG" alt="Vaplux Logo">
        <span>Vaplux</span>
      </a>
      
      <ul class="nav-menu">
        <li class="nav-item"><a href="../../../index.html#inicio" class="nav-link">Inicio</a></li>
        
        <li class="nav-item">
          <a href="#productos" class="nav-link has-dropdown">Productos</a>
          <div class="dropdown-menu">
            <a href="../iPhones.html" class="dropdown-link">📱 iPhones</a>
            <a href="../vapes.html" class="dropdown-link">💨 Vapes Premium</a>
            <a href="../varios.html" class="dropdown-link">🔧 Tecnología</a>
            <div class="dropdown-divider"></div>
            <a href="#productos" class="dropdown-link">🛍️ Ver Todo</a>
          </div>
        </li>
        
        <li class="nav-item">
          <a href="#servicios" class="nav-link has-dropdown">Servicios</a>
          <div class="dropdown-menu">
            <a href="../../ReparacionIphones.html" class="dropdown-link">🔧 Reparación iPhones</a>
            <a href="../../TrabajacNosotros.html" class="dropdown-link">💼 Trabaja con Nosotros</a>
            <div class="dropdown-divider"></div>
            <a href="#servicios" class="dropdown-link">🎯 Todos los Servicios</a>
          </div>
        </li>
        
        <li class="nav-item"><a href="../../../index.html#nosotros" class="nav-link">Nosotros</a></li>
        <li class="nav-item"><a href="../../../index.html#contacto" class="nav-link nav-cta">Contacto</a></li>
      </ul>
      
      <div class="nav-toggle" id="navToggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>'''

# Obtener todos los archivos HTML en detalles-varios
archivos = glob.glob('secciones/productos/detalles-varios/*.html')

print(f'Encontrados {len(archivos)} archivos HTML')

for archivo in archivos:
    try:
        # Leer el archivo con UTF-8
        with open(archivo, 'r', encoding='utf-8') as f:
            contenido = f.read()
        
        # Buscar el inicio y fin del navbar
        inicio_navbar = contenido.find('<nav class="navbar"')
        if inicio_navbar == -1:
            print(f'⚠️  {os.path.basename(archivo)}: No se encontró <nav class="navbar"')
            continue
        
        # Buscar el cierre del nav
        fin_navbar = contenido.find('</nav>', inicio_navbar)
        if fin_navbar == -1:
            print(f'⚠️  {os.path.basename(archivo)}: No se encontró </nav>')
            continue
        
        fin_navbar += len('</nav>')
        
        # Reemplazar el navbar
        nuevo_contenido = contenido[:inicio_navbar] + navbar_correcto + contenido[fin_navbar:]
        
        # Escribir el archivo con UTF-8
        with open(archivo, 'w', encoding='utf-8') as f:
            f.write(nuevo_contenido)
        
        print(f'✅ {os.path.basename(archivo)}: Navbar actualizado')
        
    except Exception as e:
        print(f'❌ {os.path.basename(archivo)}: Error - {str(e)}')

print('\n✨ Proceso completado!')
