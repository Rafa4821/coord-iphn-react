# ⚡ Solución Rápida: VPN Bloqueando la Aplicación

## 🎯 ¿Cuál es tu problema?

### ❌ Opción A: Vercel no carga con VPN
**URL bloqueada:** `https://tu-app.vercel.app`

**Soluciones rápidas:**

1. **Desconectar VPN temporalmente** ⚡ MÁS RÁPIDO
   ```
   1. Desconecta VPN
   2. Abre https://tu-app.vercel.app
   3. Usa la herramienta
   4. Reconecta VPN
   ```

2. **Pedir a IT desbloquear** 📧 PERMANENTE
   ```
   Email a IT:
   "Solicito desbloquear acceso a:
   - *.vercel.app
   - vercel.com
   
   Motivo: Herramienta interna de QA
   No maneja datos sensibles"
   ```

3. **Dominio personalizado** 🌐 RECOMENDADO
   ```
   1. Comprar dominio: $10-15/año
   2. Configurar en Vercel (gratis)
   3. Acceder vía: https://tu-dominio.com
   ```

📄 **Guía completa:** `VPN_VERCEL_TROUBLESHOOTING.md`

---

### ❌ Opción B: Localhost no carga con VPN
**URL bloqueada:** `http://localhost:5173`

**Solución instantánea:**

```
EN LUGAR DE:
http://localhost:5173

USA:
http://127.0.0.1:5173
```

**Ya está configurado en el proyecto** ✅

📄 **Guía completa:** `VPN_TROUBLESHOOTING.md`

---

## 📊 Tabla de Decisión Rápida

| Escenario | Problema | Solución Rápida | Tiempo |
|-----------|----------|-----------------|---------|
| Dev local con VPN | `localhost:5173` no carga | Usar `127.0.0.1:5173` | 0 min |
| Vercel con VPN | `*.vercel.app` bloqueado | Desconectar VPN | 1 min |
| Producción permanente | VPN siempre conectada | Dominio personalizado | 15 min |
| Empresa segura | Políticas estrictas | Servidor interno | 1-2 días |

---

## 🚀 Deploy a Vercel (Actualizado)

```bash
# 1. Build
npm run build

# 2. Deploy (primera vez)
npm install -g vercel
vercel

# 3. Deploy (siguientes veces)
vercel --prod

# Headers de seguridad se aplican automáticamente desde vercel.json ✅
```

**Verificar headers después del deploy:**
```bash
curl -I https://tu-app.vercel.app
```

---

## 💡 Recomendación según tu caso

### Si eres el único usuario:
✅ Usar sin VPN cuando necesites la herramienta

### Si es tu equipo (2-5 personas):
✅ Pedir a IT desbloquear `*.vercel.app`

### Si es toda la empresa (10+ personas):
✅ Dominio personalizado ($12/año) o servidor interno

---

## 📞 Contacto IT - Template

```
Asunto: Solicitud de acceso a herramienta de QA - Vercel

Hola equipo de IT,

Solicito desbloquear acceso a la siguiente herramienta:
- URL: https://coordenadas-[proyecto].vercel.app
- Dominios: *.vercel.app, vercel.com
- Propósito: Herramienta interna de extracción de coordenadas para testing de apps móviles
- Usuarios: Equipo de QA
- Datos: No sensibles (solo coordenadas de pantalla)
- Seguridad: Headers HTTP implementados según estándares OWASP

Alternativas si no es posible:
1. Usar dominio personalizado
2. Deploy en servidor corporativo interno

Adjunto documentación técnica: SECURITY.md

Gracias,
[Tu nombre]
```

---

**Última actualización:** 24 de abril de 2026
