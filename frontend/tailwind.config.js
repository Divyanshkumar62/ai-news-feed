/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#121212',
        textPrimary: '#E0E0E0',
        textSecondary: '#A0A0A0',
        accent: '#007BFF',
        accentLight: '#42A5F5',
        cardBackground: 'rgba(25, 25, 25, 0.8)',
      },
      borderColor: {
        glassBorder: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
}