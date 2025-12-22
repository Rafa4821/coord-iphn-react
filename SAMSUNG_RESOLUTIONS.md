# 📱 Resoluciones de Samsung - Guía Completa

Esta guía documenta las resoluciones lógicas (en DP - Density-independent Pixels) y scale factors de los modelos Samsung Galaxy soportados en la aplicación.

## 📊 Conceptos Importantes para Android

### DP vs Pixels
- **DP (Density-independent Pixels):** Unidades lógicas usadas por Android para el diseño de UI
- **Pixels (px):** Píxeles físicos reales en la pantalla
- **Density:** Densidad de píxeles por pulgada (DPI)
- **Scale Factor:** Multiplicador que convierte DP a pixels

**Fórmula:** `Pixels = DP × Scale Factor`

### Density Buckets de Android
Android agrupa dispositivos en categorías de densidad:

| Bucket | DPI Range | Scale Factor | Descripción |
|--------|-----------|--------------|-------------|
| mdpi | ~160 DPI | 1.0x | Densidad media |
| hdpi | ~240 DPI | 1.5x | Alta densidad |
| xhdpi | ~320 DPI | 2.0x | Extra alta densidad |
| xxhdpi | ~480 DPI | 3.0x | Extra extra alta densidad |
| xxxhdpi | ~640 DPI | 4.0x | Extra extra extra alta densidad |

---

## 📱 Resoluciones por Modelo Samsung

### Samsung Galaxy A54 (2023)
- **Tamaño:** 6.4 pulgadas
- **Resolución Física:** 1080 × 2340 pixels (FHD+) ⭐ **USADA EN APPIUM**
- **Resolución Lógica:** 360 × 780 DP (solo referencia)
- **Densidad:** 403 PPI
- **Scale Factor:** 1.0x (coordenadas directas en pixels)
- **Aspect Ratio:** 19.5:9
- **Tecnología:** Super AMOLED, 120Hz

**Especificaciones Appium:**
```python
# Coordenadas físicas (pixels) - Appium usa resolución física en Android
clickPantalla = driver.tap([(540, 1170)], 100)  # Centro de pantalla
```

---

### Samsung Galaxy A55 (2024)
- **Tamaño:** 6.6 pulgadas
- **Resolución Física:** 1080 × 2340 pixels (FHD+) ⭐ **USADA EN APPIUM**
- **Resolución Lógica:** 360 × 780 DP (solo referencia)
- **Densidad:** 393 PPI
- **Scale Factor:** 1.0x (coordenadas directas en pixels)
- **Aspect Ratio:** 19.5:9
- **Tecnología:** Super AMOLED, 120Hz

**Especificaciones Appium:**
```python
# Coordenadas físicas (pixels)
clickPantalla = driver.tap([(540, 1170)], 100)  # Centro de pantalla
```

**Nota:** A55 tiene la misma resolución física que A54 pero pantalla ligeramente más grande (6.6" vs 6.4")

---

### Samsung Galaxy A56 (2025)
- **Tamaño:** 6.7 pulgadas
- **Resolución Física:** 1080 × 2340 pixels (FHD+) ⭐ **USADA EN APPIUM**
- **Resolución Lógica:** 360 × 780 DP (solo referencia)
- **Densidad:** 385 PPI
- **Scale Factor:** 1.0x (coordenadas directas en pixels)
- **Aspect Ratio:** 19.5:9
- **Tecnología:** Super AMOLED, 120Hz

**Especificaciones Appium:**
```python
# Coordenadas físicas (pixels)
clickPantalla = driver.tap([(540, 1170)], 100)  # Centro de pantalla
```

**Nota:** Modelo más reciente de la serie A5x con pantalla de 6.7"

---

### Samsung Galaxy S20 (2020)
- **Tamaño:** 6.2 pulgadas
- **Resolución Física:** 1440 × 3200 pixels (QHD+) ⭐ **USADA EN APPIUM**
- **Resolución Lógica:** 360 × 800 DP (solo referencia)
- **Densidad:** 563 PPI
- **Scale Factor:** 1.0x (coordenadas directas en pixels)
- **Aspect Ratio:** 20:9
- **Tecnología:** Dynamic AMOLED 2X, 120Hz

**Especificaciones Appium:**
```python
# Coordenadas físicas (pixels)
clickPantalla = driver.tap([(720, 1600)], 100)  # Centro de pantalla
```

**Nota:** El S20 tiene mayor resolución física (QHD+) comparado con la serie A

---

## 🎯 Uso en la Aplicación

### Captura de Coordenadas

**IMPORTANTE:** Para Samsung/Android, Appium usa **coordenadas físicas (pixels)** directamente.

Cuando haces click en una imagen de Samsung:

1. **Coordenadas de Display:** Posición del click en la imagen mostrada
2. **Coordenadas Físicas:** `displayCoords × (physicalWidth / clientWidth)`
3. **Coordenadas Finales:** Las mismas físicas (scaleFactor = 1)

**Ejemplo con Galaxy A54 (1080×2340 px):**
```
Click en display: (100, 200)
Imagen física: 1080 × 2340 px
Imagen mostrada: 360 × 780 px
Ratio: 1080 / 360 = 3

Coordenadas físicas: (100 × 3, 200 × 3) = (300, 600) px
Coordenadas finales: (300, 600) px  ← Usadas directamente en Appium
```

**Ejemplo con Galaxy S20 (1440×3200 px):**
```
Click en display: (100, 200)
Imagen física: 1440 × 3200 px
Imagen mostrada: 360 × 800 px
Ratio: 1440 / 360 = 4

Coordenadas físicas: (100 × 4, 200 × 4) = (400, 800) px
Coordenadas finales: (400, 800) px  ← Usadas directamente en Appium
```

---

## 📐 Tabla Comparativa

| Modelo | Tamaño | Resolución Física (Appium) | Resolución Lógica (ref) | Densidad | Scale |
|--------|--------|----------------------------|-------------------------|----------|-------|
| Galaxy A54 | 6.4" | 1080 × 2340 px ⭐ | 360 × 780 dp | 403 PPI | 1.0x |
| Galaxy A55 | 6.6" | 1080 × 2340 px ⭐ | 360 × 780 dp | 393 PPI | 1.0x |
| Galaxy A56 | 6.7" | 1080 × 2340 px ⭐ | 360 × 780 dp | 385 PPI | 1.0x |
| Galaxy S20 | 6.2" | 1440 × 3200 px ⭐ | 360 × 800 dp | 563 PPI | 1.0x |

---

## 🔄 Diferencias entre iOS y Android

### iOS (iPhone)
- Usa **Points (pt)** como unidad lógica
- Scale factors: @1x, @2x, @3x
- Resoluciones lógicas varían por modelo
- Ejemplo: iPhone 12 = 390×844 pt @3x

### Android (Samsung)
- Usa **DP (Density-independent Pixels)** como unidad lógica
- Scale factors: 1x, 1.5x, 2x, 3x, 4x
- Muchos dispositivos comparten la misma resolución lógica (360 DP ancho)
- Ejemplo: Galaxy A54/A55/A56 = 360×780 DP @3x

### Implicaciones para Appium
- **iOS:** Las coordenadas varían más entre modelos
- **Android:** Muchos dispositivos comparten coordenadas (360 DP ancho es estándar)
- **Ventaja Android:** Scripts más portables entre dispositivos similares

---

## 🎨 Características de las Pantallas Samsung

### Serie Galaxy A (A54, A55, A56)
- **Tecnología:** Super AMOLED
- **Refresh Rate:** 120Hz
- **Brillo:** ~1000-1200 nits (pico)
- **Protección:** Gorilla Glass 5/Victus
- **Características:** Always-On Display, HDR10+

### Serie Galaxy S (S20)
- **Tecnología:** Dynamic AMOLED 2X
- **Refresh Rate:** 120Hz adaptativo
- **Brillo:** ~1200+ nits (pico)
- **Protección:** Gorilla Glass 6
- **Características:** HDR10+, Always-On Display, Eye Comfort Shield

---

## ⚙️ Configuración en Appium

### Capabilities para Samsung

```python
from appium import webdriver

desired_caps = {
    'platformName': 'Android',
    'platformVersion': '13',  # o la versión de tu dispositivo
    'deviceName': 'Galaxy A54',
    'automationName': 'UiAutomator2',
    'app': '/path/to/your/app.apk',
    # Opcional: forzar resolución específica
    'appium:screenResolution': '1080x2340'
}

driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

# Usar coordenadas lógicas (DP)
driver.tap([(180, 390)], 100)  # Centro de la pantalla A54
```

---

## 🔗 Referencias

- [GSMArena - Samsung Galaxy A54](https://www.gsmarena.com/samsung_galaxy_a54-12070.php)
- [GSMArena - Samsung Galaxy A55](https://www.gsmarena.com/samsung_galaxy_a55-12824.php)
- [GSMArena - Samsung Galaxy A56](https://www.gsmarena.com/samsung_galaxy_a56-13603.php)
- [GSMArena - Samsung Galaxy S20](https://www.gsmarena.com/samsung_galaxy_s20-10081.php)
- [Android Developers - Screen Compatibility](https://developer.android.com/guide/practices/screens_support)
- [Android Developers - Density Buckets](https://developer.android.com/training/multiscreen/screendensities)

---

## 📝 Última Actualización

**Fecha:** 22 de diciembre de 2025  
**Modelos incluidos:** Galaxy A54, A55, A56, S20  
**Total de configuraciones:** 4 modelos Samsung
