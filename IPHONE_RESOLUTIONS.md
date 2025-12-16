# 📱 Resoluciones de iPhone - Guía Completa

Esta guía documenta las resoluciones lógicas (en points) y scale factors de todos los modelos de iPhone soportados en la aplicación.

## 📊 Conceptos Importantes

### Points vs Pixels
- **Points (pt):** Unidades lógicas usadas por iOS para el diseño de UI
- **Pixels (px):** Píxeles físicos reales en la pantalla
- **Scale Factor:** Multiplicador que convierte points a pixels

**Fórmula:** `Pixels = Points × Scale Factor`

### Scale Factors
- **@1x:** 1 pixel = 1 point (dispositivos antiguos)
- **@2x:** 2 pixels = 1 point (Retina Display)
- **@3x:** 3 pixels = 1 point (Super Retina Display)

---

## 📱 Resoluciones por Modelo

### iPhone SE / 8 (4.7")
- **Resolución Lógica:** 375 × 667 points
- **Scale Factor:** @2x
- **Resolución Física:** 750 × 1334 pixels
- **Modelos:** iPhone SE (1st, 2nd, 3rd gen), iPhone 6, 6s, 7, 8

### iPhone 8 Plus (5.5")
- **Resolución Lógica:** 414 × 736 points
- **Scale Factor:** @3x
- **Resolución Física:** 1242 × 2208 pixels (downsampled to 1080 × 1920)
- **Modelos:** iPhone 6 Plus, 6s Plus, 7 Plus, 8 Plus

### iPhone X / XS / 11 Pro (5.8")
- **Resolución Lógica:** 375 × 812 points
- **Scale Factor:** @3x
- **Resolución Física:** 1125 × 2436 pixels
- **Modelos:** iPhone X, XS, 11 Pro

### iPhone XR / 11 (6.1")
- **Resolución Lógica:** 414 × 896 points
- **Scale Factor:** @2x
- **Resolución Física:** 828 × 1792 pixels
- **Modelos:** iPhone XR, 11

### iPhone 11 Pro Max (6.5")
- **Resolución Lógica:** 414 × 896 points
- **Scale Factor:** @3x
- **Resolución Física:** 1242 × 2688 pixels
- **Modelos:** iPhone XS Max, 11 Pro Max

### iPhone 12 Mini / 13 Mini (5.4")
- **Resolución Lógica:** 375 × 812 points
- **Scale Factor:** @3x
- **Resolución Física:** 1080 × 2340 pixels
- **Modelos:** iPhone 12 Mini, 13 Mini
- **Nota:** Native scale factor es 2.88x, pero iOS usa 3x lógicamente

### iPhone 12 / 12 Pro / 13 / 13 Pro (6.1")
- **Resolución Lógica:** 390 × 844 points
- **Scale Factor:** @3x
- **Resolución Física:** 1170 × 2532 pixels
- **Modelos:** iPhone 12, 12 Pro, 13, 13 Pro

### iPhone 12 Pro Max / 13 Pro Max (6.7")
- **Resolución Lógica:** 428 × 926 points
- **Scale Factor:** @3x
- **Resolución Física:** 1284 × 2778 pixels
- **Modelos:** iPhone 12 Pro Max, 13 Pro Max

### iPhone 14 / 14 Plus
- **iPhone 14 (6.1"):** 390 × 844 points @3x
- **iPhone 14 Plus (6.7"):** 428 × 926 points @3x

### iPhone 14 Pro / 14 Pro Max
- **iPhone 14 Pro (6.1"):** 393 × 852 points @3x (Dynamic Island)
- **iPhone 14 Pro Max (6.7"):** 430 × 932 points @3x (Dynamic Island)

### iPhone 15 Series
- **iPhone 15 (6.1"):** 393 × 852 points @3x
- **iPhone 15 Plus (6.7"):** 430 × 932 points @3x
- **iPhone 15 Pro (6.1"):** 393 × 852 points @3x
- **iPhone 15 Pro Max (6.7"):** 430 × 932 points @3x

### iPhone 16 Series (2024)
- **iPhone 16 (6.1"):** 393 × 852 points @3x
- **iPhone 16 Plus (6.7"):** 430 × 932 points @3x
- **iPhone 16 Pro (6.3"):** 402 × 874 points @3x
- **iPhone 16 Pro Max (6.9"):** 440 × 956 points @3x

---

## 🎯 Uso en la Aplicación

### Captura de Coordenadas

Cuando haces click en una imagen:

1. **Coordenadas de Display:** Posición del click en la imagen mostrada
2. **Coordenadas Originales:** `displayCoords × (naturalWidth / clientWidth)`
3. **Coordenadas Lógicas:** `originalCoords / scaleFactor`

**Ejemplo con iPhone 12 (390×844 @3x):**
```
Click en display: (100, 200)
Imagen natural: 1170 × 2532 px
Imagen mostrada: 390 × 844 px
Ratio: 1170 / 390 = 3

Coordenadas originales: (100 × 3, 200 × 3) = (300, 600)
Coordenadas lógicas: (300 / 3, 600 / 3) = (100, 200)
```

### Prueba de Coordenadas

Proceso inverso para mostrar el marcador:

1. **Coordenadas Lógicas:** Ingresadas por el usuario
2. **Coordenadas Originales:** `logicalCoords × scaleFactor`
3. **Coordenadas de Display:** `originalCoords × (clientWidth / naturalWidth)`
4. **Coordenadas Viewport:** `displayCoords + imageRect.left/top`

---

## 📐 Tabla Resumen

| Modelo | Tamaño | Resolución Lógica | Scale | Resolución Física |
|--------|--------|-------------------|-------|-------------------|
| iPhone SE/8 | 4.7" | 375 × 667 | @2x | 750 × 1334 |
| iPhone 8 Plus | 5.5" | 414 × 736 | @3x | 1242 × 2208 |
| iPhone X/11 Pro | 5.8" | 375 × 812 | @3x | 1125 × 2436 |
| iPhone 11 | 6.1" | 414 × 896 | @2x | 828 × 1792 |
| iPhone 11 Pro Max | 6.5" | 414 × 896 | @3x | 1242 × 2688 |
| iPhone 12 Mini | 5.4" | 375 × 812 | @3x | 1080 × 2340 |
| iPhone 12/13 | 6.1" | 390 × 844 | @3x | 1170 × 2532 |
| iPhone 12/13 Pro Max | 6.7" | 428 × 926 | @3x | 1284 × 2778 |
| iPhone 14 | 6.1" | 390 × 844 | @3x | 1170 × 2532 |
| iPhone 14 Plus | 6.7" | 428 × 926 | @3x | 1284 × 2778 |
| iPhone 14 Pro | 6.1" | 393 × 852 | @3x | 1179 × 2556 |
| iPhone 14 Pro Max | 6.7" | 430 × 932 | @3x | 1290 × 2796 |
| iPhone 15 | 6.1" | 393 × 852 | @3x | 1179 × 2556 |
| iPhone 15 Plus | 6.7" | 430 × 932 | @3x | 1290 × 2796 |
| iPhone 15 Pro | 6.1" | 393 × 852 | @3x | 1179 × 2556 |
| iPhone 15 Pro Max | 6.7" | 430 × 932 | @3x | 1290 × 2796 |
| iPhone 16 | 6.1" | 393 × 852 | @3x | 1179 × 2556 |
| iPhone 16 Plus | 6.7" | 430 × 932 | @3x | 1290 × 2796 |
| iPhone 16 Pro | 6.3" | 402 × 874 | @3x | 1206 × 2622 |
| iPhone 16 Pro Max | 6.9" | 440 × 956 | @3x | 1320 × 2868 |

---

## ⚠️ Notas Importantes

### iPhone 12/13 Mini
- Tiene un **native scale factor de 2.88x** pero iOS lo trata como **@3x lógicamente**
- Resolución lógica: 375 × 812 points
- Resolución nativa: 1080 × 2340 pixels (375 × 2.88 = 1080)

### iPhone 8 Plus y similares
- Renderiza internamente a **1242 × 2208** pixels
- Luego hace **downsampling** a **1080 × 1920** pixels para la pantalla física
- Esto es transparente para el desarrollador

### Dynamic Island (iPhone 14 Pro+)
- Los modelos Pro desde iPhone 14 tienen Dynamic Island
- Esto afecta ligeramente la resolución vertical
- La aplicación maneja esto automáticamente

---

## 🔗 Referencias

- [iOS Ref - Resolution by iOS device](https://iosref.com/res)
- [iOS Resolution - Display properties](https://www.ios-resolution.com/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [PaintCode - iPhone Resolutions Guide](https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions)

---

## 📝 Última Actualización

**Fecha:** 15 de diciembre de 2025  
**Modelos incluidos:** iPhone SE hasta iPhone 16 Pro Max  
**Total de configuraciones:** 24 modelos diferentes
