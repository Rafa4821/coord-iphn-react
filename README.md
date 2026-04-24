# 📱 Coordenadas Móviles - Herramienta de Extracción de Coordenadas

Una herramienta profesional y moderna para extraer coordenadas táctiles de screenshots de aplicaciones móviles, diseñada para automatización de pruebas con Appium. Soporta **iPhone** (SE hasta 16 Pro Max) y **Samsung Galaxy** (A54, A55, A56, S20).

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-7952B3?style=flat&logo=bootstrap)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat&logo=vite)

## ✨ Características

### 📥 Carga de Imágenes (3 formas)
- 🖼️ **Botón de Carga**: Sube screenshots desde tu dispositivo
- 🖱️ **Drag & Drop**: Arrastra y suelta imágenes directamente
- 📋 **Pegar desde Portapapeles**: Usa Ctrl+V (Cmd+V en Mac) para pegar capturas

### 🎯 Funcionalidades Principales
- ✂️ **Recorte de Imágenes**: Herramienta integrada para recortar áreas específicas
- 🗑️ **Borrar Imagen**: Botón para limpiar la imagen y empezar de nuevo
- 🎯 **Captura de Coordenadas**: Haz clic en cualquier punto de la imagen para obtener coordenadas precisas
- 📱 **Soporte Multi-Dispositivo**: 24 modelos iPhone + 4 modelos Samsung Galaxy
- 🔄 **Selector de Marca**: Tabs interactivos para cambiar entre iPhone y Samsung
- ⚙️ **Resolución Personalizada**: Ingresa width/height manualmente para cualquier dispositivo
- 🔄 **Sobreescritura Automática**: Pega/arrastra nueva imagen para reemplazar la actual
- 🎨 **Simulador de Gestos**: Crea gestos de swipe y flick interactivamente
- 🌙 **Modo Oscuro**: Interfaz adaptable con tema claro/oscuro
- 📋 **Gestión de Coordenadas**: Lista completa de todas las coordenadas capturadas
- 📄 **Copiar al Portapapeles**: Copia coordenadas individuales o todas a la vez
- 🧪 **Modo de Prueba**: Verifica visualmente cualquier coordenada en la imagen
- 🎨 **Interfaz Profesional**: Diseño moderno y responsive con Bootstrap
- ⚡ **Rendimiento Optimizado**: Construido con Vite para máxima velocidad
- 🔒 **Seguridad**: Cabeceras HTTP de seguridad implementadas

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 16+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Navegar al directorio
cd coordenadas-iphone-react

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en:
- **Sin VPN:** `http://localhost:5173`
- **Con VPN corporativa:** `http://127.0.0.1:5173` ⚠️ IMPORTANTE

> 💡 **Problemas con VPN?**
> - **Desarrollo local:** Ver `VPN_TROUBLESHOOTING.md`
> - **Vercel bloqueado:** Ver `VPN_VERCEL_TROUBLESHOOTING.md`
> - **Solución rápida:** Ver `QUICK_VPN_FIX.md`

## 📖 Uso

### 1. Cargar Imagen (3 Métodos)

#### Método 1: Botón de Carga
- Haz clic en el botón **"Cargar Imagen"**
- Selecciona un screenshot de tu aplicación móvil

#### Método 2: Drag & Drop 🖱️
- Arrastra una imagen desde tu explorador de archivos
- Suéltala en cualquier parte de la aplicación
- Verás un overlay azul indicando la zona de drop

#### Método 3: Pegar desde Portapapeles 📋
- Toma una captura de pantalla (Windows: `Win+Shift+S`, Mac: `Cmd+Shift+4`)
- En la aplicación, presiona `Ctrl+V` (Windows) o `Cmd+V` (Mac)
- La imagen se cargará automáticamente

### 2. Seleccionar Dispositivo

#### Opción A: Dispositivos Predefinidos
- Usa los tabs 🍎 **iPhone** o 📱 **Samsung** para elegir la marca
- Selecciona el modelo específico del dropdown
- Las coordenadas se calcularán según el dispositivo elegido

#### Opción B: Resolución Personalizada ⚙️
- Marca el checkbox **"Custom"** en el toolbar
- Ingresa el **Width** (ancho) y **Height** (alto) de tu dispositivo
- Ejemplo: Para un Xiaomi Redmi Note 12 (393×851), ingresa:
  - Width: `393`
  - Height: `851`
- Las coordenadas se calcularán con escala 1:1
- **Útil para:** Dispositivos no listados, tablets, o resoluciones específicas

### 3. Recortar (Opcional)
- Haz clic en **"Recortar"**
- Selecciona el área deseada
- Confirma o cancela el recorte

### 4. Capturar Coordenadas
- Haz clic en cualquier punto de la imagen
- Las coordenadas se agregarán automáticamente a la lista
- El formato generado es compatible con Appium: `clickPantalla = driver.tap([(x, y)], 100)`

### 5. Gestionar Coordenadas
- **Copiar Individual**: Haz clic en cualquier coordenada de la lista
- **Copiar Todo**: Usa el botón "Copiar Todo" para copiar todas las coordenadas
- **Limpiar**: Elimina todas las coordenadas con el botón "Limpiar Todo"

### 6. Probar Coordenadas
- Ingresa valores X e Y en la sección "Probar Coordenada"
- Haz clic en **"Probar Coordenada"**
- Un marcador rojo aparecerá en la posición exacta durante 3 segundos

## 🏗️ Estructura del Proyecto

```
src/
├── features/
│   └── coordinate-extractor/
│       ├── components/
│       │   ├── CoordinateList.jsx      # Lista de coordenadas
│       │   ├── CoordinatesPanel.jsx    # Panel derecho completo
│       │   ├── ImageContainer.jsx      # Contenedor de imagen con cropper
│       │   ├── ImagePanel.jsx          # Panel izquierdo completo
│       │   ├── StatusBar.jsx           # Barra de estado con coordenadas live
│       │   └── Toolbar.jsx             # Barra de herramientas
│       ├── constants/
│       │   └── deviceConfig.js         # Configuración de dispositivos
│       ├── CoordinateExtractor.jsx     # Componente principal
│       └── CoordinateExtractor.css     # Estilos principales
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## 🎯 Configuración de Dispositivos

La aplicación soporta **28 dispositivos móviles** con sus resoluciones lógicas correctas:

### 🍎 iPhone (24 modelos)

| Modelo | Resolución | Scale Factor | Tamaño |
|--------|------------|--------------|--------|
| iPhone SE/8 | 375×667 pt | @2x | 4.7" |
| iPhone 8 Plus | 414×736 pt | @3x | 5.5" |
| iPhone X/11 Pro | 375×812 pt | @3x | 5.8" |
| iPhone 11 | 414×896 pt | @2x | 6.1" |
| iPhone 12 Mini | 375×812 pt | @3x | 5.4" |
| iPhone 12/13 | 390×844 pt | @3x | 6.1" |
| iPhone 14 Pro | 393×852 pt | @3x | 6.1" |
| iPhone 15 Pro Max | 430×932 pt | @3x | 6.7" |
| iPhone 16 Pro Max | 440×956 pt | @3x | 6.9" |

Ver `IPHONE_RESOLUTIONS.md` para la lista completa de todos los modelos iPhone.

### 📱 Samsung Galaxy (4 modelos)

| Modelo | Resolución Física (px) | Scale Factor | Tamaño |
|--------|------------------------|--------------|--------|
| Galaxy A54 | 1080×2340 px | 1.0x | 6.4" |
| Galaxy A55 | 1080×2340 px | 1.0x | 6.6" |
| Galaxy A56 | 1080×2340 px | 1.0x | 6.7" |
| Galaxy S20 | 1440×3200 px | 1.0x | 6.2" |

**Nota:** Samsung/Android usa **resolución física** (pixels) en Appium, no resolución lógica (DP).

Ver `SAMSUNG_RESOLUTIONS.md` para especificaciones técnicas detalladas de Samsung.

### Cambiar Dispositivo

1. **Selecciona la marca** usando los tabs 🍎 iPhone o 📱 Samsung
2. **Elige el modelo** del dropdown que aparece
3. Las coordenadas se calcularán automáticamente según el dispositivo seleccionado

**Dispositivo por defecto:** iPhone 12 (390×844 @3x)

## 🛠️ Tecnologías

- **React 19.2.0**: Framework principal
- **Vite 7.2.4**: Build tool y dev server
- **Bootstrap 5.3.2**: Framework CSS
- **React Bootstrap 2.10.0**: Componentes React de Bootstrap
- **Cropper.js 1.6.1**: Librería de recorte de imágenes
- **React Cropper 2.3.3**: Wrapper de React para Cropper.js
- **Lucide React**: Iconos modernos

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 🚀 Deployment

### GitHub

```bash
# Inicializar repositorio (si no existe)
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "Initial commit: iPhone Coordinates Tool"

# Agregar remote (reemplaza con tu URL)
git remote add origin https://github.com/tu-usuario/coordenadas-iphone-react.git

# Push a GitHub
git push -u origin main
```

### Vercel

#### Opción 1: Desde la interfaz web

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Click en **"Add New Project"**
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Vite
5. Click en **"Deploy"**

#### Opción 2: Desde la CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

#### Configuración Automática

El archivo `vercel.json` ya está configurado con:
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing (todas las rutas redirigen a index.html)

### Variables de Entorno

No se requieren variables de entorno para esta aplicación.

### Cabeceras de Seguridad

Las cabeceras HTTP de seguridad están configuradas en:
- **Desarrollo:** `vite.config.js` (server.headers)
- **Producción:** `public/_headers` (Netlify/Vercel)
- **Apache:** `.htaccess`
- **Nginx:** `nginx.conf`

Ver `SECURITY.md` para más detalles.

## 🎨 Personalización

### Colores

Los colores principales se definen en `src/index.css`:

```css
:root {
  --primary-color: #0d6efd;
  --secondary-color: #6c757d;
  --success-color: #198754;
  --danger-color: #dc3545;
}
```

### Estilos de Componentes

Cada componente tiene su propio archivo CSS para facilitar la personalización.

## 🔒 Seguridad

Esta aplicación implementa **9 cabeceras de seguridad HTTP** y **0 vulnerabilidades** detectadas.

### Headers de Seguridad
✅ X-Content-Type-Options  
✅ X-Frame-Options: SAMEORIGIN  
✅ X-XSS-Protection  
✅ X-Download-Options  
✅ Strict-Transport-Security (HSTS)  
✅ Content-Security-Policy  
✅ Permissions-Policy  
✅ Referrer-Policy  
✅ X-Permitted-Cross-Domain-Policies  

### Auditoría
```bash
# Verificar vulnerabilidades
npm audit

# Corregir vulnerabilidades
npm audit fix
```

**Documentación completa:** Ver `SECURITY.md`

### Mejoras Recientes (Abril 2026)
- ✅ 8 vulnerabilidades corregidas
- ✅ Soporte para VPN corporativa
- ✅ HTTPS enforcement
- ✅ Compresión GZIP
- ✅ Caché optimizado

**Changelog:** Ver `CHANGELOG_SEGURIDAD.md`

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de uso interno para automatización de pruebas móviles.

## 👥 Autor

Desarrollado con dedicación para mejorar el flujo de trabajo de automatización de pruebas móviles.

---

**Nota**: Esta herramienta está optimizada para trabajar con screenshots de aplicaciones iOS y generar comandos compatibles con Appium para automatización de pruebas.
