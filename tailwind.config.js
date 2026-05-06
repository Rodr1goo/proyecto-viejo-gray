/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#0d9488', // Verde azulado principal
          tealHover: '#0f766e',
          dark: '#0f172a', // Casi negro para sidebar
          light: '#f8fafc', // Gris muy claro para fondo
          card: '#ffffff',
          text: '#334155',
          muted: '#64748b'
        }
      }
    },
  },
  plugins: [],
}
