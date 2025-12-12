# -*- coding: utf-8 -*-
import os
import glob
import re

print('=== ARREGLANDO SISTEMA DE CARRITO GLOBAL ===\n')

# Lista de archivos en detalles-varios con información de productos
productos_varios = {
    'jbl-go-3-4.html': {'id': 'jbl-go-3-4', 'name': 'JBL GO 3 & 4', 'price': 25075},
    'airpods-pro-2.html': {'id': 'airpods-pro-2', 'name': 'AirPods Pro 2', 'price': 450000},
    'airpods-max.html': {'id': 'airpods-max', 'name': 'AirPods Max', 'price': 750000},
    'a6s-tws.html': {'id': 'a6s-tws', 'name': 'A6S TWS Earbuds', 'price': 15000},
    'cascos-jbl.html': {'id': 'cascos-jbl', 'name': 'Cascos JBL', 'price': 45000},
    'apple-watch-2-ultra.html': {'id': 'apple-watch-ultra-2', 'name': 'Apple Watch Ultra 2', 'price': 950000},
    'battery-pack-iphone.html': {'id': 'battery-pack-iphone', 'name': 'Battery Pack iPhone MagSafe', 'price': 35000},
    'cargador-magsafe.html': {'id': 'cargador-magsafe', 'name': 'Cargador MagSafe', 'price': 25000},
    'combo-cargador-cable-c.html': {'id': 'combo-cargador-cable-c', 'name': 'Combo Cargador + Cable USB-C', 'price': 18000},
    'copa-stanley.html': {'id': 'copa-stanley', 'name': 'Copa Stanley', 'price': 35000},
    'crema-karseell.html': {'id': 'crema-karseell', 'name': 'Crema Karseell', 'price': 12000},
    'elfbar-iceking.html': {'id': 'elfbar-iceking', 'name': 'Elfbar Ice King', 'price': 8000},
    'fundas-silicona.html': {'id': 'fundas-silicona-iphone', 'name': 'Fundas Silicona iPhone', 'price': 8000},
    'fundas-anti-shock.html': {'id': 'fundas-anti-shock', 'name': 'Fundas Anti Shock', 'price': 9000},
    'fundas-anti-shock-magsafe.html': {'id': 'fundas-anti-shock-magsafe', 'name': 'Fundas Anti Shock MagSafe', 'price': 12000},
    'game-stick-5-000-juegos.html': {'id': 'game-stick-5000', 'name': 'Game Stick 5.000 Juegos', 'price': 25000},
    'joystick-ps5-original.html': {'id': 'joystick-ps5', 'name': 'Joystick PS5 Original', 'price': 85000},
    'masajeador-muscular.html': {'id': 'masajeador-muscular', 'name': 'Masajeador Muscular', 'price': 45000},
    'perfumes-arabes.html': {'id': 'perfumes-arabes', 'name': 'Perfumes Árabes Premium', 'price': 35000},
    'pistola-masajeadora.html': {'id': 'pistola-masajeadora', 'name': 'Pistola Masajeadora', 'price': 55000},
    'poco-c75-256gb.html': {'id': 'poco-c75-256gb', 'name': 'Poco C75 256GB', 'price': 320000},
    'proyector-con-juego.html': {'id': 'proyector-con-juego', 'name': 'Proyector con Juegos', 'price': 65000},
    'proyector-magis-tv.html': {'id': 'proyector-magis-tv', 'name': 'Proyector Magis TV', 'price': 75000},
    'ps5-1tb-joystick.html': {'id': 'ps5-1tb-joystick', 'name': 'PS5 1TB + Joystick', 'price': 950000},
    'redmi-14c.html': {'id': 'redmi-14c', 'name': 'Redmi 14C', 'price': 280000},
    'smartwatch-d20s.html': {'id': 'smartwatch-d20s', 'name': 'Smartwatch D20S', 'price': 25000},
    'smartwatch-hw22.html': {'id': 'smartwatch-hw22', 'name': 'Smartwatch HW22', 'price': 30000},
    'stanley-quencher.html': {'id': 'stanley-quencher', 'name': 'Stanley Quencher 1.18L', 'price': 45000},
    'templados-21d-iphone.html': {'id': 'templados-21d-iphone', 'name': 'Templados 21D iPhone', 'price': 8000},
    'termo-stanley-1-2l.html': {'id': 'termo-stanley-1-2l', 'name': 'Termo Stanley 1.2L', 'price': 38000},
    'tiras-nasales.html': {'id': 'tiras-nasales', 'name': 'Tiras Nasales Anti-Ronquidos', 'price': 5000},
    'tv-box-premium.html': {'id': 'tv-box-premium', 'name': 'TV Box Premium', 'price': 45000},
    'tv-stick-original.html': {'id': 'tv-stick-original', 'name': 'TV Stick 4K Original', 'price': 35000},
    'vasos-cafeteros-sensor-temperatura.html': {'id': 'vaso-cafetero-temp', 'name': 'Vaso Cafetero Sensor Temperatura', 'price': 28000},
    'x8-unique-combination.html': {'id': 'x8-unique', 'name': 'X8 Unique Combination', 'price': 450000},
}

archivos_varios = glob.glob('secciones/productos/detalles-varios/*.html')
actualizados = 0

for archivo in archivos_varios:
    try:
        nombre_archivo = os.path.basename(archivo)
        
        if nombre_archivo not in productos_varios:
            continue
        
        prod_info = productos_varios[nombre_archivo]
        
        with open(archivo, 'r', encoding='utf-8') as f:
            contenido = f.read()
        
        modificado = False
        
        # 1. Buscar función addToCart local
        if 'function addToCart()' in contenido:
            # Eliminar toda la función local
            patron_funcion = r'function addToCart\(\)\s*\{[^}]*(\{[^}]*\}[^}]*)*\}'
            contenido = re.sub(patron_funcion, '', contenido, flags=re.DOTALL)
            modificado = True
            print(f'  → Eliminada función addToCart local en {nombre_archivo}')
        
        # 2. Reemplazar onclick="addToCart()" por llamada a VapluxCart
        if 'onclick="addToCart()"' in contenido:
            nuevo_onclick = f"onclick=\"VapluxCart.addToCart({{ id: '{prod_info['id']}', name: '{prod_info['name']}', price: {prod_info['price']}, image: document.querySelector('.main-image, .product-image, img')?.src || 'assets/logo.PNG' }})\""
            contenido = contenido.replace('onclick="addToCart()"', nuevo_onclick)
            modificado = True
            print(f'  → Actualizado onclick en {nombre_archivo}')
        
        if modificado:
            with open(archivo, 'w', encoding='utf-8') as f:
                f.write(contenido)
            actualizados += 1
            print(f'✅ {nombre_archivo}: Actualizado correctamente\n')
        else:
            print(f'⏭️  {nombre_archivo}: No requiere cambios\n')
        
    except Exception as e:
        print(f'❌ {nombre_archivo}: Error - {str(e)}\n')

print(f'\n✨ Proceso completado! {actualizados} archivos actualizados')
