# Vaplux Premium Design System
## Guidelines de Branding UI - Versión 1.0

---

## 📋 Índice

1. [Visión de Diseño](#visión-de-diseño)
2. [Sistema de Color](#sistema-de-color)
3. [Tipografía](#tipografía)
4. [Componentes](#componentes)
5. [Layout y Espaciado](#layout-y-espaciado)
6. [Iconografía](#iconografía)
7. [Animaciones](#animaciones)
8. [Responsive Design](#responsive-design)
9. [Estados de UI](#estados-de-ui)
10. [Buenas Prácticas](#buenas-prácticas)

---

## 🎯 Visión de Diseño

### Filosofía
Vaplux representa la convergencia entre **tecnología premium** y **experiencia futurista**. Nuestro diseño debe evocar:

- **Confianza tecnológica** (como Apple)
- **Modularidad escalable** (como Stripe)
- **Futurismo minimal** (como Nothing Phone)

### Personalidad de Marca
- ✨ **Premium**: Calidad sin compromisos
- 🚀 **Innovador**: Siempre a la vanguardia
- 💎 **Confiable**: Transparencia total
- 🌐 **Accesible**: Fácil para todos

### Audiencia Objetivo
- **Demográfico**: 25-45 años, nivel socioeconómico medio-alto
- **Psicográfico**: Early adopters, tech enthusiasts, profesionales
- **Comportamiento**: Valoran calidad, conveniencia y status

---

## 🎨 Sistema de Color

### Colores Primarios
```css
--primary-blue: #0066FF;        /* Azul tecnológico principal */
--primary-cyan: #00D4FF;        /* Celeste vibrante premium */
--primary-violet: #6B46C1;      /* Violeta futurista profundo */
```

### Colores Auxiliares
```css
--auxiliary-emerald: #10B981;   /* Verde éxito/confirmación */
--auxiliary-amber: #F59E0B;     /* Naranja alertas/destacados */
--auxiliary-rose: #F43F5E;      /* Rosa errores/urgencia */
```

### Escala de Grises
```css
--gray-50: #F8FAFC;    /* Backgrounds ultra light */
--gray-100: #F1F5F9;   /* Backgrounds light */
--gray-200: #E2E8F0;   /* Borders suaves */
--gray-300: #CBD5E1;   /* Borders definidos */
--gray-400: #94A3B8;   /* Text disabled */
--gray-500: #64748B;   /* Text secondary */
--gray-600: #475569;   /* Text primary light */
--gray-700: #334155;   /* Text primary */
--gray-800: #1E293B;   /* Text heading */
--gray-900: #0F172A;   /* Text hero/emphasis */
```

### Gradientes Premium
```css
--gradient-primary: linear-gradient(135deg, #0066FF 0%, #00D4FF 100%);
--gradient-secondary: linear-gradient(135deg, #6B46C1 0%, #0066FF 100%);
--gradient-accent: linear-gradient(135deg, #00D4FF 0%, #10B981 100%);
```

### Uso de Color

#### ✅ Hacer
- Usar azul primario para CTAs principales
- Aplicar gradientes en elementos hero
- Mantener contraste WCAG AA (4.5:1 mínimo)
- Usar colores semánticos consistentemente

#### ❌ Evitar
- Mezclar más de 3 colores primarios en una vista
- Usar colores saturados en texto largo
- Aplicar gradientes en texto pequeño

---

## ✍️ Tipografía

### Familias Tipográficas
```css
--font-primary: 'Inter';        /* Para cuerpo y UI */
--font-display: 'Space Grotesk'; /* Para títulos y hero */
--font-mono: 'JetBrains Mono';   /* Para código y datos */
```

### Jerarquía Tipográfica

#### Display (Hero y Destacados)
- **Display 2XL**: 72px / 1.0 line-height - Hero principal
- **Display XL**: 60px / 1.25 line-height - Hero secundario  
- **Display LG**: 48px / 1.25 line-height - Section headers
- **Display MD**: 36px / 1.375 line-height - Page titles
- **Display SM**: 30px / 1.375 line-height - Card titles

#### Headlines (Títulos de Sección)
- **H1**: 36px / 1.375 line-height
- **H2**: 30px / 1.375 line-height
- **H3**: 24px / 1.375 line-height
- **H4**: 20px / 1.5 line-height
- **H5**: 18px / 1.5 line-height
- **H6**: 16px / 1.5 line-height (uppercase)

#### Body Text
- **Lead**: 18px / 1.625 line-height - Texto introductorio
- **Body**: 16px / 1.5 line-height - Texto principal
- **Small**: 14px / 1.5 line-height - Texto secundario
- **Caption**: 12px / 1.5 line-height - Metadatos (uppercase)

### Uso Tipográfico

#### ✅ Hacer
- Usar Space Grotesk para títulos impactantes
- Aplicar Inter para legibilidad en cuerpo
- Mantener jerarquía visual clara
- Utilizar letter-spacing en títulos grandes

#### ❌ Evitar
- Mezclar más de 2 familias en una vista
- Usar pesos extremos (100, 900) en texto pequeño
- Aplicar efectos tipográficos en texto crítico

---

## 🧩 Componentes

### Botones

#### Variantes
- **Primary**: Gradiente azul, acciones principales
- **Secondary**: Border azul, acciones secundarias  
- **Ghost**: Transparente, acciones sutiles
- **Gradient**: Gradiente accent, destacados especiales
- **Glass**: Efecto glassmorphism, elementos flotantes

#### Tamaños
- **XS**: 28px height - Contextos muy compactos
- **SM**: 36px height - Elementos secundarios
- **MD**: 44px height - Estándar principal
- **LG**: 52px height - CTAs principales
- **XL**: 60px height - Hero actions

#### Estados
- **Default**: Estado base
- **Hover**: Elevación y cambio de color
- **Active/Pressed**: Reducción visual
- **Disabled**: Opacidad 38%
- **Loading**: Spinner centrado

### Cards

#### Variantes
- **Base**: Fondo blanco, shadow suave
- **Glass**: Glassmorphism, semi-transparente
- **Gradient**: Fondo gradiente sutil
- **Compact**: Padding reducido

#### Anatomía
- **Header**: Título y metadata
- **Body**: Contenido principal
- **Footer**: Acciones y enlaces

### Inputs

#### Variantes
- **Standard**: Border estándar
- **Floating**: Label flotante
- **Glass**: Efecto glassmorphism

#### Estados
- **Default**: Border gris neutro
- **Focus**: Border azul + shadow
- **Error**: Border rojo + mensaje
- **Disabled**: Opacidad reducida

---

## 📐 Layout y Espaciado

### Sistema de Spacing
Basado en múltiplos de 4px para consistencia:

```css
--space-1: 4px     --space-8: 32px
--space-2: 8px     --space-10: 40px
--space-3: 12px    --space-12: 48px
--space-4: 16px    --space-16: 64px
--space-5: 20px    --space-20: 80px
--space-6: 24px    --space-24: 96px
```

### Contenedores
```css
--container-sm: 640px
--container-md: 768px
--container-lg: 1024px
--container-xl: 1280px
--container-2xl: 1536px
```

### Grid System
- **Base**: CSS Grid con gap consistente
- **Responsive**: Auto-fit para escalabilidad
- **Jerarquía**: Contenido principal + sidebar

### Espaciado Semántico
- **Micro spacing**: 4-8px (elementos inline)
- **Component spacing**: 16-24px (entre componentes)
- **Section spacing**: 48-96px (entre secciones)
- **Page spacing**: 128px+ (entre páginas)

---

## 🎭 Iconografía

### Estilo
- **Outline**: Líneas de 2px de grosor
- **Rounded**: Esquinas redondeadas
- **Consistent**: Misma familia (Heroicons/Lucide)

### Tamaños
- **XS**: 12px - Indicadores
- **SM**: 16px - Texto inline
- **MD**: 20px - Botones estándar
- **LG**: 24px - Navegación
- **XL**: 32px+ - Hero elements

### Uso
- Preferir iconos universales
- Acompañar con texto cuando sea posible
- Mantener consistencia de estilo

---

## ⚡ Animaciones

### Principios
- **Sutileza**: Enhanzar, no distraer
- **Propósito**: Guiar atención y feedback
- **Performance**: 60fps consistente

### Duraciones
```css
--transition-fast: 0.15s ease
--transition-base: 0.2s ease
--transition-slow: 0.3s ease
--transition-smooth: 0.4s cubic-bezier(0.4, 0, 0.2, 1)
```

### Tipos de Animación
- **Micro-interactions**: Hovers, clicks (0.15s)
- **Transitions**: Cambios de estado (0.2s)
- **Loading states**: Feedback de progreso (0.3s+)
- **Page transitions**: Navegación (0.4s)

### Efectos Comunes
- **Hover lift**: translateY(-2px) + shadow
- **Scale**: scale(1.05) en imágenes
- **Fade**: opacity + translateY(20px)
- **Glow**: box-shadow con color

---

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
@media (max-width: 480px)  /* Mobile */
@media (max-width: 768px)  /* Tablet */
@media (max-width: 1024px) /* Desktop S */
@media (max-width: 1280px) /* Desktop M */
@media (min-width: 1281px) /* Desktop L */
```

### Estrategia
- **Mobile First**: Diseñar para móvil primero
- **Progressive Enhancement**: Agregar funcionalidad en pantallas grandes
- **Content Parity**: Mismo contenido en todos los dispositivos

### Adaptaciones por Dispositivo

#### Mobile (≤480px)
- Grid: 1 columna
- Typography: Escalas reducidas
- Spacing: Padding compacto
- Navigation: Hamburger menu

#### Tablet (481-768px)
- Grid: 2 columnas máximo
- Typography: Escalas intermedias
- Touch targets: 44px mínimo

#### Desktop (≥769px)
- Grid: Múltiples columnas
- Typography: Escalas completas
- Hover states: Totalmente funcionales
- Sticky elements: Sidebars, navegación

---

## 🔄 Estados de UI

### Loading States
- **Skeleton**: Para contenido estructurado
- **Spinner**: Para acciones puntuales
- **Progress bar**: Para procesos largos
- **Shimmer**: Para listas dinámicas

### Empty States
- **Ilustración**: Coherente con marca
- **Mensaje**: Claro y alentador
- **CTA**: Acción siguiente obvia

### Error States
- **Mensaje**: Descriptivo, no técnico
- **Acción**: Cómo resolver el problema
- **Visual**: Color error consistente

### Success States
- **Confirmación**: Clara y celebratoria
- **Next steps**: Qué hacer después
- **Visual**: Color success consistente

---

## ✅ Buenas Prácticas

### Performance
- **Optimizar imágenes**: WebP, lazy loading
- **Minificar CSS**: Remover código no usado
- **Lazy load**: Componentes no críticos
- **Critical CSS**: Inline para above-the-fold

### Accesibilidad
- **Contraste**: WCAG AA mínimo (4.5:1)
- **Focus states**: Visibles y consistentes
- **Alt text**: Descriptivo para imágenes
- **ARIA labels**: Para elementos complejos
- **Keyboard navigation**: Totalmente funcional

### SEO
- **Semantic HTML**: h1, h2, nav, main, etc.
- **Meta tags**: title, description optimizados
- **Structured data**: Schema markup
- **Performance**: Core Web Vitals optimizados

### Mantenibilidad
- **CSS custom properties**: Para tokens de diseño
- **Naming conventions**: BEM o similar
- **Component library**: Reutilización máxima
- **Documentation**: Casos de uso claros

---

## 🚀 Implementación

### Para React + Vite
```jsx
// Importar sistema base
import './design-system/colors.css'
import './design-system/typography.css'
import './design-system/components.css'

// Usar clases utilitarias
<button className="btn btn-primary btn-lg">
  Comprar Ahora
</button>
```

### Variables CSS
```css
/* Usar custom properties siempre */
.custom-component {
  color: var(--primary-blue);
  padding: var(--space-4);
  border-radius: var(--border-radius-base);
}
```

### Componentes Reutilizables
- Card: 15+ variantes
- Button: 5+ tamaños, 5+ variantes
- Input: 3+ tipos, 4+ estados
- Badge: 6+ variantes semánticas

---

## 📊 Métricas de Éxito

### Performance
- **LCP**: < 2.5s (Core Web Vitals)
- **FID**: < 100ms (Interactividad)
- **CLS**: < 0.1 (Estabilidad visual)

### Conversión
- **Cart abandonment**: < 30%
- **Checkout completion**: > 85%
- **Product page engagement**: > 3min

### Usabilidad
- **Task completion**: > 90%
- **Error rate**: < 5%
- **User satisfaction**: > 8/10

---

## 🔄 Versionado

**Versión 1.0** - Enero 2025
- Sistema de color base
- Tipografía futurista
- Componentes modulares
- 6 vistas principales

**Próximas versiones**:
- Dark mode (v1.1)
- Componentes avanzados (v1.2)
- Micro-animations library (v1.3)

---

## 📞 Contacto

Para dudas sobre implementación o nuevos componentes:
- **Design System Lead**: [Tu nombre]
- **Repository**: [URL del repo]
- **Documentation**: [URL de docs]

---

*Este documento es una guía viva que debe actualizarse con cada iteración del producto.*