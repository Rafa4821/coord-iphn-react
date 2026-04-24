# 🔧 Solución de Problemas con VPN Corporativa - Desarrollo Local

> ⚠️ **Nota:** Este documento es para desarrollo **LOCAL** (`npm run dev`).
> 
> **Si el problema es con Vercel en producción**, ve a: `VPN_VERCEL_TROUBLESHOOTING.md`

---

## Problema: La aplicación no carga en localhost cuando estás conectado a la VPN del trabajo

### 🔍 Causas Comunes

1. **Proxy corporativo bloqueando localhost**
2. **Firewall de la VPN bloqueando puertos**
3. **DNS corporativo no resolviendo localhost**
4. **CSP/CORS muy restrictivos**
5. **Red virtual sin acceso a 127.0.0.1**

---

## ✅ Soluciones

### **Solución 1: Usar 0.0.0.0 en lugar de localhost** ⭐ RECOMENDADO

Ya está configurado en `vite.config.js`:

```javascript
server: {
  host: '0.0.0.0',  // ✅ Escucha en todas las interfaces
  port: 5173,
}
```

**Accede con:**
- ✅ `http://127.0.0.1:5173`
- ✅ `http://TU_IP_LOCAL:5173` (ej: `http://192.168.1.100:5173`)
- ❌ NO uses `http://localhost:5173` con VPN

**Encuentra tu IP local:**

Windows:
```bash
ipconfig
# Busca "IPv4 Address"
```

Mac/Linux:
```bash
ifconfig
# o
ip addr show
```

---

### **Solución 2: Configurar exclusión de VPN**

**Opción A - Split Tunneling:**
Pide a tu equipo de IT que habilite "split tunneling" para:
- `127.0.0.1`
- `localhost`
- Rango de IPs locales: `192.168.x.x`, `10.x.x.x`

**Opción B - Excepciones en el cliente VPN:**
Algunos clientes VPN permiten agregar excepciones para dominios/IPs locales.

---

### **Solución 3: Proxy bypass (Windows)**

Agregar excepción de proxy para localhost:

1. **Configuración de Windows:**
   - Panel de Control → Internet Options → Connections → LAN Settings
   - Advanced → Exceptions
   - Agregar: `127.0.0.1;localhost`

2. **Variables de entorno:**
   ```bash
   set NO_PROXY=localhost,127.0.0.1,*.local
   ```

---

### **Solución 4: Desplegar en servidor interno**

Si trabajas en oficina con acceso a un servidor interno:

1. **Deploy en servidor corporativo:**
   ```bash
   npm run build
   # Copiar carpeta 'dist' al servidor IIS/Apache/Nginx
   ```

2. **Accede vía IP/dominio interno:**
   - `http://servidor-interno.empresa.local/coordenadas`
   - `http://10.20.30.40/coordenadas`

---

### **Solución 5: HTTPS local (si VPN bloquea HTTP)**

Algunas VPNs corporativas solo permiten HTTPS.

**Opción A - Vite con HTTPS:**

1. Generar certificado auto-firmado:
   ```bash
   # Windows (PowerShell como Admin)
   New-SelfSignedCertificate -DnsName "localhost" -CertStoreLocation "cert:\LocalMachine\My"
   
   # Mac/Linux
   openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
   ```

2. Configurar Vite:
   ```javascript
   import { defineConfig } from 'vite'
   import fs from 'fs'
   
   export default defineConfig({
     server: {
       https: {
         key: fs.readFileSync('./key.pem'),
         cert: fs.readFileSync('./cert.pem')
       },
       host: '0.0.0.0',
       port: 5173
     }
   })
   ```

3. Accede con: `https://127.0.0.1:5173`
   - Acepta el warning de certificado auto-firmado

---

### **Solución 6: Túnel SSH (Avanzado)**

Si tienes acceso SSH a un servidor sin VPN:

```bash
ssh -L 5173:localhost:5173 usuario@servidor-sin-vpn
# Luego accede a http://localhost:5173
```

---

### **Solución 7: Desconectar VPN temporalmente**

Si SOLO necesitas la app para pruebas locales:

1. Desconecta VPN
2. Usa la aplicación
3. Reconecta VPN

**Workflow sugerido:**
- Desconecta → Captura coordenadas → Reconecta → Copia código a tu script

---

## 🛠️ Diagnóstico

### Test 1: Verificar acceso básico

```bash
# Sin VPN (debe funcionar)
curl http://localhost:5173

# Con VPN
curl http://127.0.0.1:5173
curl http://TU_IP_LOCAL:5173
```

### Test 2: Verificar puerto abierto

```bash
# Windows
netstat -an | findstr 5173

# Mac/Linux
lsof -i :5173
```

### Test 3: Verificar firewall

```bash
# Windows (PowerShell Admin)
Get-NetFirewallRule | Where-Object {$_.LocalPort -eq 5173}

# Mac
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate
```

---

## 📋 Checklist de Solución

1. ✅ Cambiar `localhost` por `127.0.0.1` o IP local
2. ✅ Verificar que `vite.config.js` tenga `host: '0.0.0.0'`
3. ✅ Probar con VPN desconectada
4. ✅ Verificar que el puerto 5173 esté abierto
5. ✅ Revisar firewall de Windows/Mac
6. ✅ Contactar IT si es política de la VPN
7. ✅ Considerar deployment en servidor interno

---

## 🎯 Solución Rápida (Más Común)

**EN LUGAR DE:**
```
http://localhost:5173
```

**USA:**
```
http://127.0.0.1:5173
```

**O encuentra tu IP local y usa:**
```
http://192.168.X.X:5173
```

---

## 📞 Soporte Adicional

Si ninguna solución funciona:

1. **Verifica con IT:**
   - ¿La VPN bloquea conexiones locales?
   - ¿Hay excepciones disponibles?
   - ¿Existe un servidor de desarrollo interno?

2. **Alternativa Cloud:**
   - Deploy temporal en Vercel/Netlify
   - Acceso vía URL pública con autenticación

3. **Containerización:**
   - Docker con port forwarding
   - Acceso vía interfaz de red del contenedor
