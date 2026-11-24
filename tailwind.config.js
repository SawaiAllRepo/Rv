/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F8FF',
          100: '#DDF0FF',
          200: '#B3E0FF',
          300: '#80CBFF',
          400: '#4DB8FF',
          500: '#00A9FF',
          600: '#0090DC',
          700: '#0073B1',
        },
        navy: {
          500: '#2E5280',
          600: '#1E3E62',
          700: '#16304E',
          800: '#0F2438',
          900: '#0B192C',
        },
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(11, 25, 44, 0.08)',
        lift: '0 16px 40px rgba(11, 25, 44, 0.14)',
      },
    },
  },
  plugins: [],
}
