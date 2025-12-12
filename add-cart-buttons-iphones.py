# -*- coding: utf-8 -*-
import os
import glob
import re

# Obtener todas las páginas de detalles de iPhones
archivos_iphone = glob.glob('secciones/productos/detalles/*.html')

# Mapeo de archivos a nombre de producto y precio
productos = {
    'iphone13-midnight.html': ('iPhone 13 Midnight 128GB', 950000),
    'iphone13-pink.html': ('iPhone 13 Pink 128GB', 950000),
    'iphone14.html': ('iPhone 14 128GB', 1100000),
    'iphone14pro.html': ('iPhone 14 Pro 256GB', 1250000),
    'iphone14pm-space-black.html': ('iPhone 14 Pro Max Space Black 256GB', 1320000),
    'iphone15p-natural-titanium.html': ('iPhone 15 Pro Natural Titanium 256GB', 1180000),
    'iphone16-blue.html': ('iPhone 16 Blue 128GB', 1250000),
    'iphone16-blue-standard.html': ('iPhone 16 Blue 128GB', 1250000),
    'iphone16p-titanium-black.html': ('iPhone 16 Pro Titanium Black 256GB', 1400000),
    'iphone16pm-desert-gold.html': ('iPhone 16 Pro Max Desert Gold 512GB', 1850000),
}

print(f'Encontrados {len(archivos_iphone)} archivos de detalles de iPhones')

for archivo in archivos_iphone:
    try:
        nombre_archivo = os.path.basename(archivo)
        
        if nombre_archivo not in productos:
            print(f'⚠️  {nombre_archivo}: No hay información de producto')
            continue
        
        producto_nombre, producto_precio = productos[nombre_archivo]
        
        # Leer el archivo
        with open(archivo, 'r', encoding='utf-8') as f:
            contenido = f.read()
        
        # Buscar el botón de WhatsApp en product-actions
        patron_whatsapp = r'(<div class="product-actions">[\s\S]*?<a href="https://wa\.me/[^"]*"[\s\S]*?target="_blank" class="btn btn-primary">[\s\S]*?<i class="fab fa-whatsapp"></i>[\s\S]*?Comprar por WhatsApp[\s\S]*?</a>)'
        
        match = re.search(patron_whatsapp, contenido)
        
        if match:
            # Crear el nuevo HTML con ambos botones
            nuevo_html = f'''<div class="product-actions">
          <button class="btn btn-primary" onclick="VapluxCart.addToCart({{ name: '{producto_nombre}', price: {producto_precio}, quantity: 1, image: document.querySelector('.main-image').src }})">
            <i class="fas fa-shopping-cart"></i>
            Agregar al Carrito
          </button>
          <a href="https://wa.me/5492216703630?text=Hola! Me interesa el {producto_nombre} - ${producto_precio:,.0f}" 
             target="_blank" class="btn btn-secondary">
            <i class="fab fa-whatsapp"></i>
            Consultar
          </a>'''
            
            # Reemplazar solo la parte de product-actions
            contenido = re.sub(
                r'<div class="product-actions">[\s\S]*?</div>\s*</div>\s*</div>\s*</div>',
                nuevo_html + '\n        </div>\n      </div>\n    </div>\n  </div>',
                contenido,
                count=1
            )
            
            # Guardar
            with open(archivo, 'w', encoding='utf-8') as f:
                f.write(contenido)
            
            print(f'✅ {nombre_archivo}: Botón de carrito agregado')
        else:
            print(f'⚠️  {nombre_archivo}: No se encontró el patrón de WhatsApp')
        
    except Exception as e:
        print(f'❌ {nombre_archivo}: Error - {str(e)}')

print('\n✨ Proceso completado!')
