# -*- coding: utf-8 -*-
import os
import glob
import re

# Función para crear ID único a partir del nombre
def create_product_id(name):
    # Convertir a minúsculas y reemplazar espacios
    return name.lower().replace(' ', '-').replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')

# 1. Arreglar páginas de detalles de iPhones
archivos_iphone = glob.glob('secciones/productos/detalles/*.html')

productos_iphone = {
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

print('=== Arreglando páginas de detalles de iPhones ===\n')

for archivo in archivos_iphone:
    try:
        nombre_archivo = os.path.basename(archivo)
        
        if nombre_archivo not in productos_iphone:
            continue
        
        producto_nombre, producto_precio = productos_iphone[nombre_archivo]
        product_id = create_product_id(producto_nombre)
        
        with open(archivo, 'r', encoding='utf-8') as f:
            contenido = f.read()
        
        # Buscar el botón de agregar al carrito SIN id
        patron_sin_id = r"VapluxCart\.addToCart\(\{\s*name:\s*['\"]" + re.escape(producto_nombre) + r"['\"],\s*price:\s*\d+,\s*quantity:\s*1,\s*image:\s*document\.querySelector\(['\"]\.main-image['\"]\)\.src\s*\}\)"
        
        # Reemplazar con versión CON id
        nuevo_codigo = f"VapluxCart.addToCart({{ id: '{product_id}', name: '{producto_nombre}', price: {producto_precio}, image: document.querySelector('.main-image').src }})"
        
        if re.search(patron_sin_id, contenido):
            contenido = re.sub(patron_sin_id, nuevo_codigo, contenido)
            
            with open(archivo, 'w', encoding='utf-8') as f:
                f.write(contenido)
            
            print(f'✅ {nombre_archivo}: ID agregado ({product_id})')
        else:
            print(f'⏭️  {nombre_archivo}: No se encontró el patrón o ya tiene ID')
        
    except Exception as e:
        print(f'❌ {nombre_archivo}: Error - {str(e)}')

# 2. Verificar y arreglar detalles-varios
print('\n=== Verificando detalles-varios ===\n')
archivos_varios = glob.glob('secciones/productos/detalles-varios/*.html')

for archivo in archivos_varios:
    try:
        with open(archivo, 'r', encoding='utf-8') as f:
            contenido = f.read()
        
        # Buscar llamadas a VapluxCart.addToCart
        if 'VapluxCart.addToCart' in contenido:
            # Verificar si tiene 'id:'
            if "id: '" not in contenido and 'id: "' not in contenido:
                print(f'⚠️  {os.path.basename(archivo)}: Falta ID en addToCart')
            else:
                print(f'✅ {os.path.basename(archivo)}: Tiene ID')
        else:
            print(f'⏭️  {os.path.basename(archivo)}: No tiene addToCart')
        
    except Exception as e:
        print(f'❌ {os.path.basename(archivo)}: Error - {str(e)}')

print('\n✨ Verificación completada!')
