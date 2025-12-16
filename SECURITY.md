# 🔒 Configuración de Seguridad

Este documento describe las cabeceras de seguridad HTTP implementadas en la aplicación.

## Cabeceras Implementadas

### 1. **X-Content-Type-Options: nosniff**
Previene que el navegador intente adivinar el tipo MIME de los archivos, evitando ataques de MIME sniffing.

### 2. **X-Frame-Options: DENY**
Impide que la aplicación sea embebida en iframes, protegiendo contra ataques de clickjacking.

### 3. **X-XSS-Protection: 1; mode=block**
Activa la protección XSS del navegador (legacy, pero útil para navegadores antiguos).

### 4. **Referrer-Policy: strict-origin-when-cross-origin**
Controla qué información de referrer se envía en las peticiones HTTP.

### 5. **Permissions-Policy**
Deshabilita APIs sensibles:
- Geolocalización
- Micrófono
- Cámara

### 6. **Content-Security-Policy (CSP)**
Define políticas de contenido permitido:
- `default-src 'self'` - Solo recursos del mismo origen
- `script-src 'self'` - Solo scripts del mismo origen (producción)
- `style-src 'self' 'unsafe-inline'` - Estilos inline permitidos (necesario para React)
- `img-src 'self' data: blob:` - Imágenes del mismo origen, data URIs y blobs
- `font-src 'self' https://fonts.gstatic.com` - Fuentes locales y Google Fonts
- `connect-src 'self'` - Solo conexiones al mismo origen

## Configuración por Entorno

### Desarrollo (Vite Dev Server)
Las cabeceras están configuradas en `vite.config.js` bajo la sección `server.headers`.

```bash
npm run dev
```

### Preview (Vite Preview)
Las cabeceras están configuradas en `vite.config.js` bajo la sección `preview.headers`.

```bash
npm run build
npm run preview
```

### Producción

#### Netlify / Vercel
El archivo `public/_headers` se copiará automáticamente al build y será utilizado por el CDN.

#### Apache
Copia el archivo `.htaccess` a la raíz de tu servidor web.

#### Nginx
Agrega las directivas del archivo `nginx.conf` dentro de tu bloque `server {}`.

## Verificación

Para verificar que las cabeceras están activas:

1. **Usando curl:**
```bash
curl -I http://localhost:5173
```

2. **Usando DevTools:**
- Abre las DevTools del navegador (F12)
- Ve a la pestaña "Network"
- Recarga la página
- Selecciona el documento principal
- Revisa la sección "Response Headers"

3. **Usando herramientas online:**
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)

## Notas Importantes

### CSP y React
La directiva `'unsafe-inline'` en `style-src` es necesaria porque:
- React usa estilos inline para algunos componentes
- Bootstrap usa estilos inline
- El modo desarrollo de Vite inyecta estilos inline

En producción, considera usar:
- CSS Modules
- Styled Components con nonce
- Eliminar `'unsafe-inline'` si es posible

### Imágenes Data URIs
La directiva `data:` y `blob:` en `img-src` es necesaria porque:
- La aplicación carga imágenes desde el sistema de archivos local
- Cropper.js genera imágenes en formato data URI
- FileReader API usa data URIs

### Scripts Inline (Desarrollo)
En desarrollo, `script-src` incluye `'unsafe-inline'` porque Vite HMR lo requiere.
En producción (preview), esto se elimina para mayor seguridad.

## Auditoría de Seguridad

Ejecuta regularmente:

```bash
# Auditoría de dependencias
npm audit

# Actualizar dependencias con vulnerabilidades
npm audit fix

# Verificar actualizaciones disponibles
npx npm-check-updates
```

## Recursos Adicionales

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy Reference](https://content-security-policy.com/)

## Última Actualización

Fecha: 15 de diciembre de 2025
Versión React: 19.2.0
Estado CVE-2025-55182: Monitoreando actualizaciones
