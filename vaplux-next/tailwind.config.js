/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A3D62",       // Deep Blue
        accent: "#1B98E0",        // Azure Pulse
        royal: "#3A6EA5",         // Royal Sky
        iceWhite: "#F5FAFF",      // Ice White
        mistGray: "#E3E8EF",      // Mist Gray
        slateInk: "#1E293B",      // Slate Ink
        success: "#16A34A",       // Verdant Mint
        warning: "#F59E0B",       // Amber Glow
      },
          navy: "#003366",
          cyan: "#00AEEF",
          graylight: "#F7F7F7",
          navy: "#003366",
          cyan: "#00AEEF",
          graylight: "#F7F7F7",
      boxShadow: {
          blueGlow: "0 8px 24px rgba(0, 174, 239, 0.25)",
        structure: "0 6px 18px rgba(0,0,0,0.06)",
        glow: "0 8px 24px rgba(27, 152, 224, 0.18)",
      },
          blueGlow: "0 8px 24px rgba(0, 174, 239, 0.25)",
      keyframes: {
        overlayMove: {
          '0%, 100%': { transform: 'translate3d(0,0,0)', opacity: '0.10' },
          '50%': { transform: 'translate3d(2%, -2%, 0)', opacity: '0.16' },
        },
        clickPop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.96)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        overlayMove: 'overlayMove 14s ease-in-out infinite',
        clickPop: 'clickPop 200ms ease-out',
      },
      borderRadius: {
        xl: '1rem',
      }
    },
  },
  plugins: [],
};
