# 🔒 Configuración de Seguridad

Este documento describe las cabeceras de seguridad HTTP implementadas en la aplicación.

## Cabeceras Implementadas

### 1. **X-Content-Type-Options: nosniff**
Previene que el navegador intente adivinar el tipo MIME de los archivos, evitando ataques de MIME sniffing.

### 2. **X-Frame-Options: SAMEORIGIN** ⚠️ ACTUALIZADO
Permite que la aplicación sea embebida en iframes del mismo origen. Cambiado de `DENY` a `SAMEORIGIN` para permitir uso en entornos corporativos/intranets.

### 3. **X-XSS-Protection: 1; mode=block**
Activa la protección XSS del navegador (legacy, pero útil para navegadores antiguos).

### 4. **X-Download-Options: noopen** ✨ NUEVO
Previene que Internet Explorer ejecute automáticamente descargas en el contexto del sitio.

### 5. **X-Permitted-Cross-Domain-Policies: none** ✨ NUEVO
Restringe el acceso cross-domain para Adobe Flash y PDF readers.

### 6. **Referrer-Policy: strict-origin-when-cross-origin**
Controla qué información de referrer se envía en las peticiones HTTP.

### 7. **Permissions-Policy** ⚠️ ACTUALIZADO
Deshabilita APIs sensibles:
- Geolocalización
- Micrófono
- Cámara
- **Payment (nuevo)**
- **USB (nuevo)**

### 8. **Strict-Transport-Security (HSTS)** ✨ NUEVO
Fuerza conexiones HTTPS durante 1 año:
```
max-age=31536000; includeSubDomains; preload
```

### 9. **Content-Security-Policy (CSP)** ⚠️ MEJORADO
Define políticas de contenido permitido:
- `default-src 'self'` - Solo recursos del mismo origen
- `script-src 'self'` - Solo scripts del mismo origen (producción)
- `style-src 'self' 'unsafe-inline'` - Estilos inline permitidos (necesario para React)
- `img-src 'self' data: blob:` - Imágenes del mismo origen, data URIs y blobs
- `font-src 'self' https://fonts.gstatic.com data:` - Fuentes locales, Google Fonts y data URIs
- `connect-src 'self'` - Solo conexiones al mismo origen (+ `ws: wss:` en dev para HMR)
- `object-src 'none'` - **NUEVO:** Bloquea plugins (Flash, Java)
- `base-uri 'self'` - **NUEVO:** Restringe tag `<base>`
- `form-action 'self'` - **NUEVO:** Solo formularios al mismo origen
- `frame-ancestors 'self'` - **NUEVO:** Control de embedding en iframes
- `upgrade-insecure-requests` - **NUEVO:** Actualiza automáticamente HTTP a HTTPS

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

## 🌐 Soporte para VPN Corporativa

### Problemas Comunes
La aplicación puede no cargar cuando estás conectado a una VPN corporativa.

**DOS ESCENARIOS:**

#### 1️⃣ **Desarrollo Local** (`npm run dev`)
**Problema:** `http://localhost:5173` no carga con VPN

**Solución:** Ya está configurado
```javascript
server: {
  host: '0.0.0.0',  // Escucha en todas las interfaces
  port: 5173
}
```

**Acceso recomendado con VPN:**
- ✅ `http://127.0.0.1:5173` (en lugar de localhost)
- ✅ `http://TU_IP_LOCAL:5173` (ej: 192.168.1.100)

📄 **Guía completa:** `VPN_TROUBLESHOOTING.md`

---

#### 2️⃣ **Vercel en Producción** (`https://tu-app.vercel.app`)
**Problema:** La URL de Vercel está bloqueada por la VPN corporativa

**Causas:**
- VPN bloquea dominios `*.vercel.app`
- Firewall corporativo
- DNS corporativo no resuelve Vercel

**Soluciones:**
1. ✅ **Dominio personalizado** (Recomendado)
   - Comprar dominio propio
   - Configurar en Vercel
   - Menos probable de bloqueo

2. ✅ **Pedir a IT desbloquear** `*.vercel.app`

3. ✅ **Deploy en servidor interno** corporativo

4. ✅ **Usar sin VPN** temporalmente

📄 **Guía completa:** `VPN_VERCEL_TROUBLESHOOTING.md`

### Implementaciones de Seguridad

1. **X-Frame-Options: SAMEORIGIN**: Permite uso en intranets corporativas

2. **CORS Opcional**: Headers comentados en `.htaccess` y `nginx.conf` que puedes descomentar si es necesario

3. **Headers en Vercel**: Configurados en `vercel.json` con todos los headers de seguridad

---

## 🔐 Mejoras de Seguridad Implementadas (Abril 2026)

### Cambios Críticos
1. ✅ **Vulnerabilidades corregidas**: Actualizados 10 paquetes con `npm audit fix`
   - Vite: Path traversal patches
   - Rollup: Arbitrary file write fix
   - PostCSS, Picomatch, Minimatch: ReDoS fixes

2. ✅ **Headers mejorados**: 5 nuevos headers de seguridad
   - `X-Download-Options: noopen`
   - `X-Permitted-Cross-Domain-Policies: none`
   - `Strict-Transport-Security` (HSTS)
   - CSP extendido con 5 directivas nuevas

3. ✅ **Performance**: Compresión GZIP y caché configurados
   - Assets estáticos: 1 año de caché
   - index.html: sin caché

4. ✅ **HTTPS**: Configuración SSL/TLS moderna en nginx
   - TLS 1.2 y 1.3
   - Ciphers seguros
   - Redirección HTTP → HTTPS automática

### Archivos Actualizados
- `vite.config.js`: Headers + host 0.0.0.0
- `public/_headers`: Netlify/Vercel headers
- `.htaccess`: Apache config completo
- `nginx.conf`: Configuración producción completa

---

## 📊 Checklist de Seguridad

### Antes de Deploy
- [ ] Ejecutar `npm audit` (sin vulnerabilidades)
- [ ] Revisar headers en DevTools
- [ ] Configurar HTTPS (producción)
- [ ] Habilitar CORS solo si es necesario
- [ ] Probar con VPN corporativa
- [ ] Verificar que assets estáticos tengan caché

### Auditoría Regular
```bash
# Cada mes
npm audit
npm outdated

# Si hay vulnerabilidades
npm audit fix

# Actualizar dependencias major
npx npm-check-updates -u
npm install
```

### Herramientas de Testing
- [Security Headers Scanner](https://securityheaders.com/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- Chrome DevTools → Lighthouse → Best Practices

---

## Última Actualización

**Fecha**: 24 de abril de 2026  
**Versión React**: 19.2.0  
**Estado Vulnerabilidades**: 0 vulnerabilidades detectadas  
**Mejoras**: Headers mejorados, VPN support, HTTPS enforcement
