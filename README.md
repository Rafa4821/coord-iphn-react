# 📱 Coordenadas iPhone - Herramienta de Extracción de Coordenadas

Una herramienta profesional y moderna para extraer coordenadas táctiles de screenshots de aplicaciones móviles, diseñada para automatización de pruebas con Appium. Soporta todos los modelos de iPhone desde SE hasta iPhone 16 Pro Max.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-7952B3?style=flat&logo=bootstrap)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat&logo=vite)

## ✨ Características

- 🖼️ **Carga de Imágenes**: Sube screenshots directamente desde tu dispositivo
- ✂️ **Recorte de Imágenes**: Herramienta integrada para recortar áreas específicas
- 🎯 **Captura de Coordenadas**: Haz clic en cualquier punto de la imagen para obtener coordenadas precisas
- 📱 **Soporte Multi-Dispositivo**: 24 modelos de iPhone (SE hasta iPhone 16 Pro Max)
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

La aplicación estará disponible en `http://localhost:5173`

## 📖 Uso

### 1. Cargar Imagen
- Haz clic en el botón **"Cargar Imagen"**
- Selecciona un screenshot de tu aplicación móvil

### 2. Recortar (Opcional)
- Haz clic en **"Recortar"**
- Selecciona el área deseada
- Confirma o cancela el recorte

### 3. Capturar Coordenadas
- Haz clic en cualquier punto de la imagen
- Las coordenadas se agregarán automáticamente a la lista
- El formato generado es compatible con Appium: `clickPantalla = driver.tap([(x, y)], 100)`

### 4. Gestionar Coordenadas
- **Copiar Individual**: Haz clic en cualquier coordenada de la lista
- **Copiar Todo**: Usa el botón "Copiar Todo" para copiar todas las coordenadas
- **Limpiar**: Elimina todas las coordenadas con el botón "Limpiar Todo"

### 5. Probar Coordenadas
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

La aplicación soporta **24 modelos de iPhone** con sus resoluciones lógicas correctas:

### Dispositivos Soportados

| Modelo | Resolución | Scale Factor | Tamaño |
|--------|------------|--------------|--------|
| iPhone SE/8 | 375×667 | @2x | 4.7" |
| iPhone 8 Plus | 414×736 | @3x | 5.5" |
| iPhone X/11 Pro | 375×812 | @3x | 5.8" |
| iPhone 11 | 414×896 | @2x | 6.1" |
| iPhone 12 Mini | 375×812 | @3x | 5.4" |
| iPhone 12/13 | 390×844 | @3x | 6.1" |
| iPhone 14 Pro | 393×852 | @3x | 6.1" |
| iPhone 15 Pro Max | 430×932 | @3x | 6.7" |
| iPhone 16 Pro Max | 440×956 | @3x | 6.9" |

**Dispositivo por defecto:** iPhone 12 (390×844 @3x)

Ver `IPHONE_RESOLUTIONS.md` para la lista completa de todos los modelos y especificaciones técnicas detalladas.

### Cambiar Dispositivo

Usa el selector de dispositivos en la barra de herramientas para cambiar entre diferentes modelos de iPhone. Las coordenadas se calcularán automáticamente según el scale factor del dispositivo seleccionado.

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
