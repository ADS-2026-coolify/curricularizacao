/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // O Angular usa arquivos .ts, não .js
  ],
  theme: {
    extend: {
      colors: {
        'fema-blue': '#004077',
        'fema-orange': '#f39221',
      },
    },
  },
  plugins: [],
}