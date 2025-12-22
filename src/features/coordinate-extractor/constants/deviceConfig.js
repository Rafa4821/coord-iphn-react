// Brands configuration
export const BRANDS = {
  IPHONE: 'iphone',
  SAMSUNG: 'samsung'
}

// iPhone devices
const IPHONE_DEVICES = {
  // iPhone SE (1st, 2nd, 3rd gen) - Same as iPhone 6/7/8
  IPHONE_SE: {
    id: 'IPHONE_SE',
    name: 'iPhone SE',
    width: 375,
    height: 667,
    scaleFactor: 2,
    description: 'iPhone SE (375x667 @2x)'
  },
  
  // iPhone 8 - 4.7" display
  IPHONE_8: {
    id: 'IPHONE_8',
    name: 'iPhone 8',
    width: 375,
    height: 667,
    scaleFactor: 2,
    description: 'iPhone 8 (375x667 @2x)'
  },
  
  // iPhone 8 Plus - 5.5" display
  IPHONE_8_PLUS: {
    id: 'IPHONE_8_PLUS',
    name: 'iPhone 8 Plus',
    width: 414,
    height: 736,
    scaleFactor: 3,
    description: 'iPhone 8 Plus (414x736 @3x)'
  },
  
  // iPhone X/XS - 5.8" display
  IPHONE_X: {
    id: 'IPHONE_X',
    name: 'iPhone X',
    width: 375,
    height: 812,
    scaleFactor: 3,
    description: 'iPhone X (375x812 @3x)'
  },
  
  // iPhone XR/11 - 6.1" display with @2x
  IPHONE_11: {
    id: 'IPHONE_11',
    name: 'iPhone 11',
    width: 414,
    height: 896,
    scaleFactor: 2,
    description: 'iPhone 11 (414x896 @2x)'
  },
  
  // iPhone 11 Pro - 5.8" display
  IPHONE_11_PRO: {
    id: 'IPHONE_11_PRO',
    name: 'iPhone 11 Pro',
    width: 375,
    height: 812,
    scaleFactor: 3,
    description: 'iPhone 11 Pro (375x812 @3x)'
  },
  
  // iPhone 11 Pro Max - 6.5" display
  IPHONE_11_PRO_MAX: {
    id: 'IPHONE_11_PRO_MAX',
    name: 'iPhone 11 Pro Max',
    width: 414,
    height: 896,
    scaleFactor: 3,
    description: 'iPhone 11 Pro Max (414x896 @3x)'
  },
  
  // iPhone 12 Mini / 13 Mini - 5.4" display
  IPHONE_12_MINI: {
    id: 'IPHONE_12_MINI',
    name: 'iPhone 12 Mini',
    width: 375,
    height: 812,
    scaleFactor: 3,
    description: 'iPhone 12 Mini (375x812 @3x)'
  },
  
  // iPhone 12 / 12 Pro - 6.1" display (SAME RESOLUTION)
  IPHONE_12: {
    id: 'IPHONE_12',
    name: 'iPhone 12',
    width: 390,
    height: 844,
    scaleFactor: 3,
    description: 'iPhone 12 (390x844 @3x)'
  },
  
  IPHONE_12_PRO: {
    id: 'IPHONE_12_PRO',
    name: 'iPhone 12 Pro',
    width: 390,
    height: 844,
    scaleFactor: 3,
    description: 'iPhone 12 Pro (390x844 @3x)'
  },
  
  // iPhone 12 Pro Max - 6.7" display
  IPHONE_12_PRO_MAX: {
    id: 'IPHONE_12_PRO_MAX',
    name: 'iPhone 12 Pro Max',
    width: 428,
    height: 926,
    scaleFactor: 3,
    description: 'iPhone 12 Pro Max (428x926 @3x)'
  },
  IPHONE_13_MINI: {
    id: 'IPHONE_13_MINI',
    name: 'iPhone 13 Mini',
    width: 375,
    height: 812,
    scaleFactor: 3,
    description: 'iPhone 13 Mini (375x812 @3x)'
  },
  IPHONE_13: {
    id: 'IPHONE_13',
    name: 'iPhone 13',
    width: 390,
    height: 844,
    scaleFactor: 3,
    description: 'iPhone 13 (390x844 @3x)'
  },
  IPHONE_13_PRO: {
    id: 'IPHONE_13_PRO',
    name: 'iPhone 13 Pro',
    width: 390,
    height: 844,
    scaleFactor: 3,
    description: 'iPhone 13 Pro (390x844 @3x)'
  },
  IPHONE_13_PRO_MAX: {
    id: 'IPHONE_13_PRO_MAX',
    name: 'iPhone 13 Pro Max',
    width: 428,
    height: 926,
    scaleFactor: 3,
    description: 'iPhone 13 Pro Max (428x926 @3x)'
  },
  IPHONE_14: {
    id: 'IPHONE_14',
    name: 'iPhone 14',
    width: 390,
    height: 844,
    scaleFactor: 3,
    description: 'iPhone 14 (390x844 @3x)'
  },
  IPHONE_14_PLUS: {
    id: 'IPHONE_14_PLUS',
    name: 'iPhone 14 Plus',
    width: 428,
    height: 926,
    scaleFactor: 3,
    description: 'iPhone 14 Plus (428x926 @3x)'
  },
  IPHONE_14_PRO: {
    id: 'IPHONE_14_PRO',
    name: 'iPhone 14 Pro',
    width: 393,
    height: 852,
    scaleFactor: 3,
    description: 'iPhone 14 Pro (393x852 @3x)'
  },
  IPHONE_14_PRO_MAX: {
    id: 'IPHONE_14_PRO_MAX',
    name: 'iPhone 14 Pro Max',
    width: 430,
    height: 932,
    scaleFactor: 3,
    description: 'iPhone 14 Pro Max (430x932 @3x)'
  },
  IPHONE_15: {
    id: 'IPHONE_15',
    name: 'iPhone 15',
    width: 393,
    height: 852,
    scaleFactor: 3,
    description: 'iPhone 15 (393x852 @3x)'
  },
  IPHONE_15_PLUS: {
    id: 'IPHONE_15_PLUS',
    name: 'iPhone 15 Plus',
    width: 430,
    height: 932,
    scaleFactor: 3,
    description: 'iPhone 15 Plus (430x932 @3x)'
  },
  IPHONE_15_PRO: {
    id: 'IPHONE_15_PRO',
    name: 'iPhone 15 Pro',
    width: 393,
    height: 852,
    scaleFactor: 3,
    description: 'iPhone 15 Pro (393x852 @3x)'
  },
  IPHONE_15_PRO_MAX: {
    id: 'IPHONE_15_PRO_MAX',
    name: 'iPhone 15 Pro Max',
    width: 430,
    height: 932,
    scaleFactor: 3,
    description: 'iPhone 15 Pro Max (430x932 @3x)'
  },
  
  // iPhone 16 - 6.1" display
  IPHONE_16: {
    id: 'IPHONE_16',
    name: 'iPhone 16',
    width: 393,
    height: 852,
    scaleFactor: 3,
    description: 'iPhone 16 (393x852 @3x)'
  },
  
  // iPhone 16 Plus - 6.7" display
  IPHONE_16_PLUS: {
    id: 'IPHONE_16_PLUS',
    name: 'iPhone 16 Plus',
    width: 430,
    height: 932,
    scaleFactor: 3,
    description: 'iPhone 16 Plus (430x932 @3x)'
  },
  
  // iPhone 16 Pro - 6.3" display
  IPHONE_16_PRO: {
    id: 'IPHONE_16_PRO',
    name: 'iPhone 16 Pro',
    width: 402,
    height: 874,
    scaleFactor: 3,
    description: 'iPhone 16 Pro (402x874 @3x)'
  },
  
  // iPhone 16 Pro Max - 6.9" display
  IPHONE_16_PRO_MAX: {
    id: 'IPHONE_16_PRO_MAX',
    name: 'iPhone 16 Pro Max',
    width: 440,
    height: 956,
    scaleFactor: 3,
    description: 'iPhone 16 Pro Max (440x956 @3x)',
    brand: BRANDS.IPHONE
  }
}

// Samsung devices - Using PHYSICAL resolution (pixels) for Appium
const SAMSUNG_DEVICES = {
  // Samsung Galaxy A54 - 6.4" display
  GALAXY_A54: {
    id: 'GALAXY_A54',
    name: 'Galaxy A54',
    width: 1080,
    height: 2340,
    scaleFactor: 1,
    description: 'Galaxy A54 (1080x2340 px)',
    brand: BRANDS.SAMSUNG,
    logicalResolution: { width: 360, height: 780 },
    density: 403
  },
  
  // Samsung Galaxy A55 - 6.6" display
  GALAXY_A55: {
    id: 'GALAXY_A55',
    name: 'Galaxy A55',
    width: 1080,
    height: 2340,
    scaleFactor: 1,
    description: 'Galaxy A55 (1080x2340 px)',
    brand: BRANDS.SAMSUNG,
    logicalResolution: { width: 360, height: 780 },
    density: 393
  },
  
  // Samsung Galaxy A56 - 6.7" display
  GALAXY_A56: {
    id: 'GALAXY_A56',
    name: 'Galaxy A56',
    width: 1080,
    height: 2340,
    scaleFactor: 1,
    description: 'Galaxy A56 (1080x2340 px)',
    brand: BRANDS.SAMSUNG,
    logicalResolution: { width: 360, height: 780 },
    density: 385
  },
  
  // Samsung Galaxy S20 - 6.2" display
  GALAXY_S20: {
    id: 'GALAXY_S20',
    name: 'Galaxy S20',
    width: 1440,
    height: 3200,
    scaleFactor: 1,
    description: 'Galaxy S20 (1440x3200 px)',
    brand: BRANDS.SAMSUNG,
    logicalResolution: { width: 360, height: 800 },
    density: 563
  }
}

// Add brand property to all iPhone devices
Object.keys(IPHONE_DEVICES).forEach(key => {
  IPHONE_DEVICES[key].brand = BRANDS.IPHONE
})

// Combined device configs
export const DEVICE_CONFIGS = {
  ...IPHONE_DEVICES,
  ...SAMSUNG_DEVICES
}

// Devices by brand
export const DEVICES_BY_BRAND = {
  [BRANDS.IPHONE]: IPHONE_DEVICES,
  [BRANDS.SAMSUNG]: SAMSUNG_DEVICES
}

// Default devices
export const DEFAULT_DEVICE = DEVICE_CONFIGS.IPHONE_12
export const DEFAULT_BRAND = BRANDS.IPHONE
