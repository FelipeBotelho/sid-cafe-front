/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'coffee-50': '#FDFBF7',
        'coffee-100': '#F5EFE6',
        'coffee-200': '#E8DFCA', 
        'coffee-500': '#785A4E',
        'coffee-800': '#4B3731',
        'coffee-900': '#3C2A21',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}