# 🚀 Guía de Deployment - GitHub y Vercel

Esta guía te llevará paso a paso para subir tu aplicación a GitHub y deployarla en Vercel.

---

## 📋 Pre-requisitos

- ✅ Git instalado en tu sistema
- ✅ Cuenta de GitHub ([crear aquí](https://github.com/signup))
- ✅ Cuenta de Vercel ([crear aquí](https://vercel.com/signup))
- ✅ Aplicación funcionando localmente (`npm run dev`)

---

## 🐙 Parte 1: Subir a GitHub

### Paso 1: Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Click en el botón **"+"** (arriba derecha) → **"New repository"**
3. Configura tu repositorio:
   - **Repository name:** `coordenadas-iphone-react` (o el nombre que prefieras)
   - **Description:** "Herramienta de extracción de coordenadas para automatización móvil"
   - **Visibility:** Public o Private (tu elección)
   - ⚠️ **NO marques** "Add a README file" (ya tienes uno)
   - ⚠️ **NO marques** "Add .gitignore" (ya tienes uno)
4. Click en **"Create repository"**

### Paso 2: Inicializar Git Local (si no está inicializado)

Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
# Verificar si ya está inicializado
git status

# Si dice "not a git repository", inicializa:
git init
```

### Paso 3: Agregar Archivos al Repositorio

```bash
# Ver qué archivos se agregarán
git status

# Agregar todos los archivos
git add .

# Verificar archivos staged
git status
```

### Paso 4: Hacer el Commit Inicial

```bash
git commit -m "Initial commit: iPhone Coordinates Tool with multi-device support"
```

### Paso 5: Conectar con GitHub

Copia la URL de tu repositorio de GitHub (aparece después de crearlo) y ejecuta:

```bash
# Agregar remote (reemplaza con TU URL)
git remote add origin https://github.com/TU-USUARIO/coordenadas-iphone-react.git

# Verificar que se agregó correctamente
git remote -v
```

### Paso 6: Subir a GitHub

```bash
# Renombrar rama a 'main' si es necesario
git branch -M main

# Push a GitHub
git push -u origin main
```

✅ **¡Listo!** Tu código ahora está en GitHub. Refresca la página de tu repositorio para verlo.

---

## ☁️ Parte 2: Deploy en Vercel

### Opción A: Desde la Interfaz Web (Recomendado)

#### Paso 1: Conectar GitHub con Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Si es tu primera vez, Vercel te pedirá conectar con GitHub
3. Autoriza a Vercel para acceder a tus repositorios

#### Paso 2: Importar Proyecto

1. En el dashboard de Vercel, click en **"Add New..."** → **"Project"**
2. Busca tu repositorio `coordenadas-iphone-react`
3. Click en **"Import"**

#### Paso 3: Configurar Proyecto

Vercel detectará automáticamente que es un proyecto Vite. Verifica la configuración:

- **Framework Preset:** Vite
- **Root Directory:** `./` (raíz del proyecto)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

⚠️ **No necesitas cambiar nada**, Vercel lo detecta automáticamente.

#### Paso 4: Deploy

1. Click en **"Deploy"**
2. Espera 1-2 minutos mientras Vercel:
   - Instala dependencias
   - Ejecuta el build
   - Despliega la aplicación
3. ✅ **¡Listo!** Verás una pantalla de celebración con tu URL

#### Paso 5: Acceder a tu Aplicación

Tu aplicación estará disponible en:
```
https://coordenadas-iphone-react-tu-usuario.vercel.app
```

---

### Opción B: Desde la CLI

Si prefieres usar la terminal:

```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Login a Vercel
vercel login

# Deploy (modo preview)
vercel

# Deploy a producción
vercel --prod
```

---

## 🔄 Actualizaciones Futuras

### Actualizar el Código

Cada vez que hagas cambios:

```bash
# 1. Agregar cambios
git add .

# 2. Commit con mensaje descriptivo
git commit -m "Descripción de los cambios"

# 3. Push a GitHub
git push
```

### Deploy Automático

✨ **Vercel hace deploy automático** cada vez que haces push a GitHub:

- **Push a `main`** → Deploy a producción
- **Push a otra rama** → Deploy preview

---

## 🔍 Verificar el Deploy

### Checklist Post-Deploy

1. ✅ La aplicación carga correctamente
2. ✅ Puedes cargar una imagen
3. ✅ El selector de dispositivos funciona
4. ✅ Las coordenadas se capturan correctamente
5. ✅ El modo oscuro funciona
6. ✅ El simulador de gestos funciona
7. ✅ El botón de copiar funciona

### Herramientas de Verificación

**Vercel Dashboard:**
- Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
- Click en tu proyecto
- Verás:
  - Estado del deployment
  - Logs de build
  - Analytics
  - Dominios configurados

**Lighthouse (Performance):**
```bash
# Desde Chrome DevTools
1. Abre tu sitio en Chrome
2. F12 → Lighthouse tab
3. Click "Generate report"
```

---

## 🌐 Configurar Dominio Personalizado (Opcional)

### En Vercel:

1. Ve a tu proyecto en Vercel
2. Click en **"Settings"** → **"Domains"**
3. Agrega tu dominio personalizado
4. Sigue las instrucciones para configurar DNS

---

## 🐛 Troubleshooting

### Error: "Failed to compile"

```bash
# Verifica que el build funcione localmente
npm run build

# Si hay errores, corrígelos y vuelve a hacer push
```

### Error: "Module not found"

```bash
# Reinstala dependencias
rm -rf node_modules package-lock.json
npm install

# Commit y push
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### Error: "404 - Page not found" en rutas

✅ Ya está solucionado con `vercel.json` que incluye el rewrite rule.

### La aplicación no carga imágenes

✅ Las imágenes se cargan desde el navegador (FileReader API), no hay problema.

---

## 📊 Monitoreo

### Vercel Analytics (Gratis)

1. Ve a tu proyecto en Vercel
2. Click en **"Analytics"** tab
3. Verás:
   - Visitas
   - Performance
   - Web Vitals

### Logs en Tiempo Real

```bash
# Ver logs en tiempo real
vercel logs tu-proyecto-url
```

---

## 🔐 Seguridad

### Cabeceras HTTP

Las cabeceras de seguridad están configuradas automáticamente:
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-Options: DENY`
- ✅ `X-XSS-Protection: 1; mode=block`
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`
- ✅ `Content-Security-Policy`

Ver `SECURITY.md` para más detalles.

---

## 📝 Comandos Útiles

```bash
# Ver status de Git
git status

# Ver historial de commits
git log --oneline

# Ver branches
git branch

# Ver deployments de Vercel
vercel ls

# Ver logs de un deployment
vercel logs [deployment-url]

# Rollback a un deployment anterior
vercel rollback [deployment-url]
```

---

## ✅ Checklist Final

- [ ] Código subido a GitHub
- [ ] Repositorio visible en GitHub
- [ ] Proyecto importado en Vercel
- [ ] Deploy exitoso
- [ ] URL funcionando
- [ ] Todas las funcionalidades probadas
- [ ] Dominio personalizado configurado (opcional)

---

## 🎉 ¡Felicidades!

Tu aplicación ahora está:
- ✅ Versionada en GitHub
- ✅ Deployada en Vercel
- ✅ Accesible desde cualquier lugar
- ✅ Con deploy automático en cada push

**URL de tu aplicación:** `https://tu-proyecto.vercel.app`

---

## 📞 Soporte

- **Vercel Docs:** https://vercel.com/docs
- **GitHub Docs:** https://docs.github.com
- **Vite Docs:** https://vitejs.dev

---

**Última actualización:** 15 de diciembre de 2025
