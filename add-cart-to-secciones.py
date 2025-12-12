# -*- coding: utf-8 -*-
import os
import glob

# Elementos del carrito
cart_css = '''  <!-- Cart System CSS -->
  <link rel="stylesheet" href="../design-system/cart-system.css">'''

cart_css_root = '''  <!-- Cart System CSS -->
  <link rel="stylesheet" href="design-system/cart-system.css">'''

cart_html = '''
  <!-- Floating Cart Button -->
  <button class="cart-float-btn" id="cart-float-btn" aria-label="Abrir carrito de compras">
    <i class="fas fa-shopping-cart"></i>
    <span class="cart-float-badge" id="cart-float-badge" style="display: none;">0</span>
  </button>

  <!-- Cart Overlay -->
  <div class="cart-overlay" id="cart-overlay"></div>

  <!-- Cart Sidebar -->
  <div class="cart-sidebar" id="cart-sidebar">
    <div class="cart-header">
      <h3 class="cart-title">
        <i class="fas fa-shopping-cart"></i>
        Mi Carrito
      </h3>
      <button class="cart-close" id="cart-close" aria-label="Cerrar carrito">
        <i class="fas fa-times"></i>
      </button>
    </div>
    
    <div class="cart-empty" id="cart-empty">
      <div class="cart-empty-icon">🛒</div>
      <h4>Tu carrito está vacío</h4>
      <p>Agrega productos para comenzar tu compra</p>
    </div>
    
    <div class="cart-items" id="cart-items"></div>
    
    <div class="cart-footer" id="cart-footer" style="display: none;">
      <div class="cart-total">
        <div class="total-line">
          <span>Subtotal:</span>
          <span id="cart-subtotal">$0</span>
        </div>
        <div class="total-line grand-total">
          <span>Total:</span>
          <span id="cart-total">$0</span>
        </div>
      </div>
      <button class="cart-checkout-btn" id="cart-checkout-btn">
        <i class="fab fa-whatsapp"></i>
        Comprar por WhatsApp
      </button>
    </div>
  </div>

'''

cart_js_secciones = '''  <!-- Cart System JS -->
  <script src="../design-system/cart-system.js"></script>'''

cart_js_root = '''  <!-- Cart System JS -->
  <script src="design-system/cart-system.js"></script>'''

# Páginas en la carpeta secciones
archivos_secciones = glob.glob('secciones/*.html')

print(f'Procesando {len(archivos_secciones)} archivos en secciones/')

for archivo in archivos_secciones:
    try:
        with open(archivo, 'r', encoding='utf-8') as f:
            contenido = f.read()
        
        if 'cart-system' in contenido:
            print(f'⏭️  {os.path.basename(archivo)}: Ya tiene el carrito')
            continue
        
        modificado = False
        
        # Agregar CSS
        if '</head>' in contenido:
            contenido = contenido.replace('</head>', f'{cart_css}\n</head>')
            modificado = True
        
        # Agregar HTML del carrito
        if '</body>' in contenido:
            contenido = contenido.replace('</body>', f'{cart_html}</body>')
            modificado = True
        
        # Agregar JS
        if '</body>' in contenido:
            contenido = contenido.replace('</body>', f'{cart_js_secciones}\n</body>')
            modificado = True
        
        if modificado:
            with open(archivo, 'w', encoding='utf-8') as f:
                f.write(contenido)
            print(f'✅ {os.path.basename(archivo)}: Carrito agregado')
        
    except Exception as e:
        print(f'❌ {os.path.basename(archivo)}: Error - {str(e)}')

print('\n✨ Proceso completado!')
