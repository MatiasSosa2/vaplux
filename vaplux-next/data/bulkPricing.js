// Mapa centralizado de precios mayoristas por producto (por slug)
// Complete con los tiers exactos provistos: [{ qty: 5, priceUSD: 123 }, ...]
export const bulkPricingMap = {
  // AIRPODS PRO 2
  'airpods-pro-2': [
    { qty: 1, priceUSD: 15 },
    { qty: 3, priceUSD: 14 },
    { qty: 5, priceUSD: 13.5 },
    { qty: 10, priceUSD: 12.5 },
    { qty: 20, priceUSD: 12 },
    { qty: 30, priceUSD: 11.5 },
    { qty: 50, priceUSD: 11 },
    { qty: 100, priceUSD: 9 }
  ],

  // JBL GO 3 & 4 (mismo esquema)
  'jbl-go-3': [
    { qty: 1, priceUSD: 17 },
    { qty: 3, priceUSD: 14.2 },
    { qty: 5, priceUSD: 12 },
    { qty: 10, priceUSD: 10.8 },
    { qty: 20, priceUSD: 9.8 },
    { qty: 30, priceUSD: 9.4 },
    { qty: 50, priceUSD: 9 },
    { qty: 100, priceUSD: 8.3 }
  ],
  'jbl-go-4': [
    { qty: 1, priceUSD: 17 },
    { qty: 3, priceUSD: 14.2 },
    { qty: 5, priceUSD: 12 },
    { qty: 10, priceUSD: 10.8 },
    { qty: 20, priceUSD: 9.8 },
    { qty: 30, priceUSD: 9.4 },
    { qty: 50, priceUSD: 9 },
    { qty: 100, priceUSD: 8.3 }
  ],

  // CABLE C-LIGHTNING & C-C (COMBO CARGADOR)
  'cable-usbc-lightning': [
    { qty: 5, priceUSD: 6.5 },
    { qty: 10, priceUSD: 5.5 },
    { qty: 20, priceUSD: 4.8 },
    { qty: 30, priceUSD: 4.0 },
    { qty: 50, priceUSD: 3.5 },
    { qty: 100, priceUSD: 3.2 },
    { qty: 200, priceUSD: 3.0 },
    { qty: 300, priceUSD: 2.8 },
    { qty: 500, priceUSD: 2.7 }
  ],
  'cable-usbc-usbc': [
    { qty: 5, priceUSD: 6.5 },
    { qty: 10, priceUSD: 5.5 },
    { qty: 20, priceUSD: 4.8 },
    { qty: 30, priceUSD: 4.0 },
    { qty: 50, priceUSD: 3.5 },
    { qty: 100, priceUSD: 3.2 },
    { qty: 200, priceUSD: 3.0 },
    { qty: 300, priceUSD: 2.8 },
    { qty: 500, priceUSD: 2.7 }
  ],

  // FUNDAS
  'fundas-silicona': [
    { qty: 25, priceUSD: 2.4 },
    { qty: 50, priceUSD: 1.8 },
    { qty: 100, priceUSD: 1.5 },
    { qty: 200, priceUSD: 1.45 },
    { qty: 300, priceUSD: 1.35 },
    { qty: 500, priceUSD: 1.25 },
    { qty: 1000, priceUSD: 1.2 }
  ],
  'fundas-magsafe': [
    { qty: 25, priceUSD: 2.5 },
    { qty: 50, priceUSD: 1.9 },
    { qty: 100, priceUSD: 1.65 },
    { qty: 200, priceUSD: 1.5 },
    { qty: 300, priceUSD: 1.4 },
    { qty: 500, priceUSD: 1.3 },
    { qty: 1000, priceUSD: 1.25 }
  ],
  'funda-anti-shock-transparente': [
    { qty: 50, priceUSD: 1.5 },
    { qty: 100, priceUSD: 1.25 },
    { qty: 200, priceUSD: 1.1 },
    { qty: 300, priceUSD: 1.0 },
    { qty: 500, priceUSD: 0.9 },
    { qty: 1000, priceUSD: 0.75 }
  ],

  // ELECTRÓNICA
  'joystick-ps5-dualsense': [
    { qty: 1, priceUSD: 95 },
    { qty: 3, priceUSD: 89 },
    { qty: 5, priceUSD: 85 },
    { qty: 10, priceUSD: 80 }
  ],
  'ps5-1tb-bundle': [
    { qty: 1, priceUSD: 560 },
    { qty: 3, priceUSD: 530 },
    { qty: 5, priceUSD: 520 },
    { qty: 10, priceUSD: 510 },
    { qty: 20, priceUSD: 495 }
  ],
  'tv-stick-original': [
    { qty: 5, priceUSD: 25 },
    { qty: 10, priceUSD: 23 },
    { qty: 20, priceUSD: 22 },
    { qty: 30, priceUSD: 21 },
    { qty: 50, priceUSD: 19.5 },
    { qty: 100, priceUSD: 18.3 }
  ],
  'tv-box-4k': [
    { qty: 5, priceUSD: 23 },
    { qty: 10, priceUSD: 21 },
    { qty: 20, priceUSD: 20 },
    { qty: 30, priceUSD: 19 },
    { qty: 50, priceUSD: 17.5 },
    { qty: 100, priceUSD: 16.3 }
  ],
  'game-stick-5000': [
    { qty: 1, priceUSD: 25 },
    { qty: 5, priceUSD: 21.5 },
    { qty: 10, priceUSD: 20 },
    { qty: 20, priceUSD: 18.5 }
  ],
  'airpods-max': [
    { qty: 1, priceUSD: 23.5 },
    { qty: 3, priceUSD: 19.5 },
    { qty: 5, priceUSD: 17.7 },
    { qty: 10, priceUSD: 16.5 },
    { qty: 20, priceUSD: 15.3 },
    { qty: 30, priceUSD: 14.5 },
    { qty: 50, priceUSD: 14.0 },
    { qty: 100, priceUSD: 13.5 }
  ],
  'proyector-con-juego': [
    { qty: 1, priceUSD: 60 },
    { qty: 3, priceUSD: 55 },
    { qty: 5, priceUSD: 53 },
    { qty: 10, priceUSD: 51 },
    { qty: 20, priceUSD: 49 },
    { qty: 30, priceUSD: 46 }
  ],
  'battery-pack-magsafe': [
    { qty: 1, priceUSD: 16.5 },
    { qty: 3, priceUSD: 14.5 },
    { qty: 5, priceUSD: 12.5 },
    { qty: 10, priceUSD: 11 },
    { qty: 20, priceUSD: 9.8 },
    { qty: 30, priceUSD: 9.0 },
    { qty: 50, priceUSD: 7.0 },
    { qty: 100, priceUSD: 6.5 }
  ],
  'proyector-magis-tv': [
    { qty: 1, priceUSD: 50 },
    { qty: 3, priceUSD: 47.5 },
    { qty: 5, priceUSD: 43 },
    { qty: 10, priceUSD: 42 },
    { qty: 20, priceUSD: 41 },
    { qty: 30, priceUSD: 39 },
    { qty: 50, priceUSD: 38 },
    { qty: 100, priceUSD: 36 }
  ],
  'cargador-magsafe': [
    { qty: 1, priceUSD: 12 },
    { qty: 3, priceUSD: 10 },
    { qty: 5, priceUSD: 8 },
    { qty: 10, priceUSD: 7 },
    { qty: 20, priceUSD: 6 },
    { qty: 30, priceUSD: 5.5 }
  ],
  'a6s-tws': [
    { qty: 1, priceUSD: 14 },
    { qty: 5, priceUSD: 8 },
    { qty: 10, priceUSD: 6.5 },
    { qty: 20, priceUSD: 5.5 },
    { qty: 30, priceUSD: 5 },
    { qty: 50, priceUSD: 4.5 }
  ],
  'apple-watch-ultra-2': [
    { qty: 1, priceUSD: 35 },
    { qty: 3, priceUSD: 30.5 },
    { qty: 5, priceUSD: 27.5 },
    { qty: 10, priceUSD: 26 },
    { qty: 20, priceUSD: 25 },
    { qty: 30, priceUSD: 24 },
    { qty: 50, priceUSD: 22.5 }
  ],
  'smartwatch-hw22': [
    { qty: 1, priceUSD: 22.5 },
    { qty: 5, priceUSD: 13.2 },
    { qty: 10, priceUSD: 11.8 },
    { qty: 20, priceUSD: 9.5 },
    { qty: 30, priceUSD: 9.0 },
    { qty: 50, priceUSD: 8.5 }
  ],
  'templados-21d-iphone': [
    { qty: 25, priceUSD: 1.1 },
    { qty: 50, priceUSD: 0.74 },
    { qty: 100, priceUSD: 0.65 },
    { qty: 200, priceUSD: 0.57 },
    { qty: 300, priceUSD: 0.52 },
    { qty: 500, priceUSD: 0.46 }
  ],
  'smartwatch-d20s': [
    { qty: 1, priceUSD: 15 },
    { qty: 5, priceUSD: 10.2 },
    { qty: 10, priceUSD: 9.0 },
    { qty: 20, priceUSD: 8.0 },
    { qty: 30, priceUSD: 6.5 },
    { qty: 50, priceUSD: 5.5 }
  ],
  'poco-c75-256gb': [
    { qty: 1, priceUSD: 139 },
    { qty: 3, priceUSD: 128 },
    { qty: 5, priceUSD: 119 },
    { qty: 10, priceUSD: 116 },
    { qty: 20, priceUSD: 113 },
    { qty: 30, priceUSD: 111 },
    { qty: 50, priceUSD: 108 }
  ],
  'redmi-14c-16-256': [
    { qty: 1, priceUSD: 135 },
    { qty: 3, priceUSD: 125 },
    { qty: 5, priceUSD: 113 },
    { qty: 10, priceUSD: 110 },
    { qty: 20, priceUSD: 107 },
    { qty: 30, priceUSD: 105 },
    { qty: 50, priceUSD: 103 }
  ],
  'cascos-jbl': [
    { qty: 1, priceUSD: 19.2 },
    { qty: 3, priceUSD: 17 },
    { qty: 5, priceUSD: 14.9 },
    { qty: 10, priceUSD: 13.5 },
    { qty: 20, priceUSD: 12 },
    { qty: 30, priceUSD: 11.5 },
    { qty: 50, priceUSD: 10.9 },
    { qty: 100, priceUSD: 9.8 }
  ],
  'x8-unique-combination': [
    { qty: 1, priceUSD: 39 },
    { qty: 3, priceUSD: 36 },
    { qty: 5, priceUSD: 33 },
    { qty: 10, priceUSD: 31.5 },
    { qty: 20, priceUSD: 30 },
    { qty: 30, priceUSD: 28 },
    { qty: 50, priceUSD: 26.5 }
  ],
  'pistola-masajeadora': [
    { qty: 1, priceUSD: 18 },
    { qty: 3, priceUSD: 16 },
    { qty: 5, priceUSD: 14 },
    { qty: 10, priceUSD: 13 },
    { qty: 20, priceUSD: 12 }
  ],
  'crema-karseell': [
    { qty: 1, priceUSD: 19.5 },
    { qty: 3, priceUSD: 15 },
    { qty: 5, priceUSD: 13 },
    { qty: 10, priceUSD: 12 },
    { qty: 20, priceUSD: 11 },
    { qty: 30, priceUSD: 10 }
  ],
  'termo-stanley-1-2': [
    { qty: 1, priceUSD: 19 },
    { qty: 3, priceUSD: 15.6 },
    { qty: 5, priceUSD: 13.4 },
    { qty: 10, priceUSD: 11.8 },
    { qty: 20, priceUSD: 10.7 },
    { qty: 30, priceUSD: 9.5 },
    { qty: 50, priceUSD: 9.25 }
  ],
  'copa-stanley': [
    { qty: 1, priceUSD: 18 },
    { qty: 3, priceUSD: 16 },
    { qty: 5, priceUSD: 14 },
    { qty: 10, priceUSD: 13 },
    { qty: 20, priceUSD: 12 }
  ],
  'vasos-cafeteros-sensor': [
    { qty: 5, priceUSD: 12 },
    { qty: 10, priceUSD: 11 },
    { qty: 20, priceUSD: 10 },
    { qty: 30, priceUSD: 9 },
    { qty: 50, priceUSD: 8.5 }
  ],
  'tiras-nasales': [
    { qty: 1, priceUSD: 18 },
    { qty: 3, priceUSD: 16 },
    { qty: 5, priceUSD: 14 },
    { qty: 10, priceUSD: 13 },
    { qty: 20, priceUSD: 12 }
  ],
  'masajeador-muscular': [
    { qty: 1, priceUSD: 14 },
    { qty: 5, priceUSD: 8.8 },
    { qty: 10, priceUSD: 7.0 },
    { qty: 20, priceUSD: 5.5 },
    { qty: 50, priceUSD: 4.2 },
    { qty: 100, priceUSD: 2.9 }
  ],
  'elfbar-iceking-40000': [
    { qty: 5, priceUSD: 15 },
    { qty: 10, priceUSD: 14 },
    { qty: 20, priceUSD: 13.5 },
    { qty: 30, priceUSD: 12 },
    { qty: 50, priceUSD: 11.5 },
    { qty: 100, priceUSD: 11 }
  ]
}
