/* ===== VAPLUX SHOPPING CART SYSTEM - JAVASCRIPT ===== */
/* Sistema de carrito compartido para todo el sitio web */

// Inicializar carrito desde localStorage
const VapluxCart = {
  storageKey: 'vaplux-cart',
  
  // Obtener carrito actual
  getCart() {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  },
  
  // Guardar carrito
  saveCart(cart) {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    this.updateCartUI();
  },
  
  // Agregar producto al carrito
  addToCart(product) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        priceUSD: product.priceUSD || null,
        image: product.image,
        quantity: 1
      });
    }
    
    this.saveCart(cart);
    this.showNotification(`✅ ${product.name} agregado al carrito`);
    this.animateCartIcon();
  },
  
  // Remover producto del carrito
  removeFromCart(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
  },
  
  // Actualizar cantidad
  updateQuantity(productId, newQuantity) {
    const cart = this.getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
      if (newQuantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = newQuantity;
        this.saveCart(cart);
      }
    }
  },
  
  // Vaciar carrito
  clearCart() {
    localStorage.removeItem(this.storageKey);
    this.updateCartUI();
  },
  
  // Calcular total
  getTotal() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },
  
  // Calcular cantidad total de items
  getTotalItems() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },
  
  // Actualizar UI del carrito
  updateCartUI() {
    const cart = this.getCart();
    const totalItems = this.getTotalItems();
    
    // Actualizar badges (navbar y botón flotante)
    const badges = [
      document.getElementById('cart-badge'),
      document.getElementById('cart-float-badge')
    ];
    
    badges.forEach(badge => {
      if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'block' : 'none';
      }
    });
    
    // Actualizar sidebar
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartFooter = document.getElementById('cart-footer');
    
    if (cartItemsContainer) {
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (cartFooter) cartFooter.style.display = 'none';
      } else {
        if (cartEmpty) cartEmpty.style.display = 'none';
        if (cartFooter) cartFooter.style.display = 'block';
        
        cartItemsContainer.innerHTML = cart.map(item => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%23999%22 font-family=%22Arial%22 font-size=%2214%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo img%3C/text%3E%3C/svg%3E'">
            <div class="cart-item-details">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">$${item.price.toLocaleString('es-AR')}</div>
              <div class="cart-item-quantity">
                <button onclick="VapluxCart.updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
                <span>${item.quantity}</span>
                <button onclick="VapluxCart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
              </div>
            </div>
            <button class="cart-item-remove" onclick="VapluxCart.removeFromCart('${item.id}')">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `).join('');
      }
    }
    
    // Actualizar totales
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    const total = this.getTotal();
    
    if (subtotalEl) subtotalEl.textContent = `$${total.toLocaleString('es-AR')}`;
    if (totalEl) totalEl.textContent = `$${total.toLocaleString('es-AR')}`;
  },
  
  // Abrir/Cerrar sidebar
  toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    if (sidebar && overlay) {
      const isActive = sidebar.classList.contains('active');
      
      if (isActive) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  },
  
  // Cerrar carrito
  closeCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  },
  
  // Checkout via WhatsApp
  checkout() {
    const cart = this.getCart();
    
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    
    const total = this.getTotal();
    const phoneNumber = '5492216703630'; // Número de WhatsApp de Vaplux
    
    // Construir mensaje
    let message = '🛍️ *Nuevo Pedido - Vaplux*\n\n';
    message += '📦 *Productos:*\n';
    
    cart.forEach((item, index) => {
      message += `\n${index + 1}. ${item.name}\n`;
      message += `   • Cantidad: ${item.quantity}\n`;
      message += `   • Precio unitario: $${item.price.toLocaleString('es-AR')}\n`;
      message += `   • Subtotal: $${(item.price * item.quantity).toLocaleString('es-AR')}\n`;
    });
    
    message += `\n💰 *Total: $${total.toLocaleString('es-AR')}*\n\n`;
    message += '📍 Por favor, confirmame tu dirección de envío y medio de pago preferido.';
    
    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
  },
  
  // Animación del icono del carrito
  animateCartIcon() {
    const cartElements = [
      document.getElementById('cart-icon'),
      document.getElementById('cart-float-btn')
    ];
    
    cartElements.forEach(element => {
      if (element) {
        element.classList.add('cart-animation');
        setTimeout(() => {
          element.classList.remove('cart-animation');
        }, 600);
      }
    });
  },
  
  // Mostrar notificación
  showNotification(message) {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
      z-index: 10001;
      font-weight: 600;
      animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Actualizar UI inicial
  VapluxCart.updateCartUI();
  
  // Event listeners
  const cartIcon = document.getElementById('cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', () => VapluxCart.toggleCart());
  }
  
  const cartFloatBtn = document.getElementById('cart-float-btn');
  if (cartFloatBtn) {
    cartFloatBtn.addEventListener('click', () => VapluxCart.toggleCart());
  }
  
  const cartClose = document.getElementById('cart-close');
  if (cartClose) {
    cartClose.addEventListener('click', () => VapluxCart.closeCart());
  }
  
  const cartOverlay = document.getElementById('cart-overlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', () => VapluxCart.closeCart());
  }
  
  const checkoutBtn = document.getElementById('cart-checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => VapluxCart.checkout());
  }
});

// Agregar animaciones CSS si no existen
if (!document.getElementById('cart-animations')) {
  const style = document.createElement('style');
  style.id = 'cart-animations';
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Exportar para uso global
window.VapluxCart = VapluxCart;
