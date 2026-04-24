# 🔧 Solución: Vercel Bloqueado por VPN Corporativa

## ❌ Problema
Tu aplicación está desplegada en Vercel (`https://tu-app.vercel.app`), pero **NO CARGA** cuando estás conectado a la VPN del trabajo.

## 🔍 Causa
Las VPNs corporativas suelen bloquear:
- Dominios de hosting externos (`*.vercel.app`, `*.netlify.app`)
- CDNs públicos
- Servicios cloud no aprobados por IT
- Todo lo que no esté en la lista blanca corporativa

---

## ✅ Soluciones (Ordenadas por Facilidad)

### **Solución 1: Dominio Personalizado** ⭐ RECOMENDADO

En lugar de usar `https://tu-app.vercel.app`, usa tu **propio dominio**.

#### Pasos:

1. **Comprar un dominio** (si no tienes):
   - GoDaddy, Namecheap, Google Domains, etc.
   - Ejemplo: `coordenadas-moviles.com` o `herramientas-qa.com`

2. **Configurar en Vercel:**
   - Dashboard de Vercel → Tu proyecto → Settings → Domains
   - Agregar dominio personalizado
   - Seguir instrucciones DNS (A record o CNAME)

3. **Ventajas:**
   - ✅ Menos probable que sea bloqueado
   - ✅ Más profesional
   - ✅ Puedes usar subdominios: `coordenadas.tuempresa.com`
   - ✅ Gratis en Vercel (HTTPS incluido)

**Ejemplo:**
```
Antes: https://coordenadas-iphone-react.vercel.app (bloqueado)
Ahora: https://coordenadas.tuempresa.com (funciona)
```

---

### **Solución 2: Pedir a IT que Desbloquee Vercel**

Contacta al equipo de IT/Seguridad de tu empresa y pide que agreguen a la lista blanca:

**Dominios a desbloquear:**
```
*.vercel.app
*.vercel.com
vercel.com
assets.vercel.com
```

**IPs de Vercel (alternativa):**
```
76.76.21.21
76.76.21.98
```

**Argumentos para IT:**
- Es una herramienta interna de trabajo
- Solo usada para testing de QA
- Vercel es un servicio legítimo (propiedad de Vercel Inc.)
- Usado por miles de empresas
- Alternativa: usar solo desde red doméstica

---

### **Solución 3: Split Tunneling en VPN**

Configura la VPN para que **excluya** el dominio de Vercel.

#### Cisco AnyConnect
1. VPN → Preferences → Advanced
2. "Exclude domains": agregar `*.vercel.app`

#### OpenVPN
Agregar al archivo de configuración:
```
route-nopull
route 0.0.0.0 0.0.0.0 net_gateway
```

#### GlobalProtect / FortiClient
Pedir a IT que configure "split tunnel" para dominios externos no sensibles.

**Ventaja:** Sigues conectado a la VPN para recursos internos, pero accedes a Vercel directamente.

---

### **Solución 4: Deploy en Servidor Interno Corporativo** 🏢

Si tu empresa tiene infraestructura interna:

1. **Solicitar servidor interno:**
   - Servidor web corporativo (Apache/Nginx/IIS)
   - IP interna accesible vía VPN

2. **Deploy:**
   ```bash
   npm run build
   # Copiar carpeta 'dist' al servidor
   ```

3. **Acceso:**
   ```
   http://servidor-qa.empresa.local/coordenadas
   http://10.20.30.40/coordenadas
   ```

**Ventajas:**
- ✅ Funciona con VPN
- ✅ Más rápido (red interna)
- ✅ Control total
- ✅ Cumple políticas de seguridad

**Configuración recomendada:** Ver `nginx.conf` o `.htaccess` incluidos

---

### **Solución 5: Proxy/Túnel (Temporal)**

#### Opción A: SSH Tunnel
Si tienes acceso SSH a un servidor SIN VPN:

```bash
# En tu máquina con VPN
ssh -D 8080 usuario@servidor-sin-vpn

# Configurar navegador para usar proxy SOCKS5
# Host: localhost
# Port: 8080
```

#### Opción B: Cloudflare Tunnel (Avanzado)
```bash
# Instalar cloudflared
npm install -g cloudflared

# Crear túnel
cloudflared tunnel --url https://tu-app.vercel.app
# Te da una URL: https://random.trycloudflare.com
```

---

### **Solución 6: Desconectar VPN Temporalmente** 🔌

La más simple si solo necesitas acceso ocasional:

**Workflow:**
1. Desconectar VPN
2. Abrir `https://tu-app.vercel.app`
3. Usar la herramienta
4. Copiar código generado
5. Reconectar VPN
6. Pegar en tu script de Appium

**Cuándo usar:**
- ✅ Acceso esporádico
- ✅ No manejas datos sensibles en la herramienta
- ✅ No necesitas acceso simultáneo a recursos corporativos

---

### **Solución 7: Alternativa de Hosting**

Si Vercel sigue bloqueado, prueba otros servicios:

#### GitHub Pages (Gratis)
```bash
npm install -g gh-pages
npm run build

# Agregar a package.json:
"homepage": "https://tu-usuario.github.io/coordenadas-iphone-react",
"scripts": {
  "deploy": "gh-pages -d dist"
}

npm run deploy
```
**URL:** `https://tu-usuario.github.io/coordenadas-iphone-react`

#### Netlify (Gratis)
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```
**URL:** `https://tu-app.netlify.app`

#### Render (Gratis)
- Similar a Vercel
- Conecta tu repo de GitHub
- Deploy automático

**Nota:** Estos también pueden estar bloqueados. Mejor usar dominio personalizado.

---

## 🎯 Solución Recomendada para Empresas

### **Opción A: Dominio Personalizado + Vercel** (Mejor)

```
1. Comprar dominio: coordenadas-qa.com ($10-15/año)
2. Configurar en Vercel (gratis)
3. HTTPS automático
4. URL profesional: https://coordenadas-qa.com
```

**Costo:** ~$12/año  
**Tiempo setup:** 10-15 minutos  
**Probabilidad de bloqueo:** Muy baja  

### **Opción B: Servidor Interno** (Más seguro)

```
1. Solicitar VM/servidor a IT
2. Instalar Nginx/Apache
3. npm run build
4. Copiar dist/ al servidor
5. Acceso: http://qa-tools.empresa.local/coordenadas
```

**Costo:** $0 (infraestructura existente)  
**Tiempo setup:** 1-2 horas (con aprobaciones de IT)  
**Probabilidad de bloqueo:** 0%  

---

## 🛠️ Configuración de Vercel para Empresas

### **Verificar Headers de Seguridad**

Tu proyecto ya tiene `public/_headers` configurado, pero verifica que Vercel lo esté aplicando:

1. **Deploy en Vercel**
2. **Verificar headers:**
   ```bash
   curl -I https://tu-app.vercel.app
   ```

3. **Debe aparecer:**
   ```
   X-Content-Type-Options: nosniff
   X-Frame-Options: SAMEORIGIN
   Strict-Transport-Security: max-age=31536000
   ...
   ```

### **Archivo vercel.json Mejorado**

Tu actual `vercel.json` es básico. Actualízalo:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 📋 Checklist de Diagnóstico

### ¿Por qué NO carga con VPN?

1. **Test 1: DNS**
   ```bash
   # Con VPN conectada
   nslookup tu-app.vercel.app
   
   # Si no resuelve o da error → Bloqueado por DNS
   ```

2. **Test 2: Firewall**
   ```bash
   # Con VPN conectada
   curl -v https://tu-app.vercel.app
   
   # Si timeout → Bloqueado por firewall
   # Si "Connection refused" → Puerto bloqueado
   ```

3. **Test 3: Proxy**
   ```bash
   # Verificar proxy
   echo $HTTP_PROXY
   echo $HTTPS_PROXY
   
   # Si hay proxy → Puede requerir autenticación
   ```

4. **Test 4: Acceso sin VPN**
   ```bash
   # Desconecta VPN
   curl https://tu-app.vercel.app
   
   # Si funciona → Confirmado: VPN bloquea
   ```

---

## 🎯 Plan de Acción Inmediato

### **Día 1: Verificación**
1. [ ] Confirmar que funciona SIN VPN
2. [ ] Confirmar que NO funciona CON VPN
3. [ ] Identificar tipo de bloqueo (DNS/Firewall/Proxy)

### **Día 2: Solución Rápida**
1. [ ] Comunicar a tu equipo usar sin VPN temporalmente
2. [ ] O pedir a IT agregar a whitelist

### **Día 3-7: Solución Permanente**
**Opción A:** Dominio personalizado
1. [ ] Comprar dominio
2. [ ] Configurar en Vercel
3. [ ] Probar con VPN

**Opción B:** Servidor interno
1. [ ] Solicitar servidor a IT
2. [ ] Deploy manual
3. [ ] Configurar acceso

---

## 💡 Consejos Adicionales

### Para Comunicar al Equipo
```
"La herramienta de coordenadas está en:
https://tu-app.vercel.app

Si no carga con la VPN:
1. Desconecta la VPN temporalmente
2. Usa la herramienta
3. Copia el código generado
4. Reconecta la VPN
5. Pega el código en tu script

Estamos trabajando en solución permanente con IT."
```

### Evidencia para IT
Si necesitas justificar el desbloqueo:

**Documento para IT:**
```
Solicitud: Desbloquear acceso a Vercel

Servicio: Vercel (https://vercel.com)
Dominios: *.vercel.app, vercel.com
Propósito: Herramienta interna de QA para testing de apps móviles
Usuarios: Equipo de QA (X personas)
Datos: No sensibles (solo coordenadas de pantalla)
Seguridad: Headers HTTP implementados (ver SECURITY.md)
Alternativa: Deploy en servidor interno (requiere recursos IT)
```

---

## 📞 Soporte

### Si nada funciona:
1. **Contactar a IT:** Es la solución más directa
2. **Usar sin VPN:** Funciona mientras se resuelve
3. **Servidor interno:** La solución más segura para empresas
4. **Dominio personalizado:** Muy probable que funcione

### Recursos
- Vercel Custom Domains: https://vercel.com/docs/concepts/projects/domains
- Vercel Enterprise: https://vercel.com/enterprise (si tu empresa es grande)
- Alternative Hosting: GitHub Pages, Netlify, Render

---

**Última actualización:** 24 de abril de 2026  
**Problema:** Vercel bloqueado por VPN corporativa  
**Solución recomendada:** Dominio personalizado o servidor interno
