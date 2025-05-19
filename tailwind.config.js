/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        glass: {
          light: 'rgba(255, 255, 255, 0.7)',
          dark: 'rgba(17, 25, 40, 0.75)'
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
};