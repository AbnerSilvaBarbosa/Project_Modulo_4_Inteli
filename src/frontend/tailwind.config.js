/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ipt': '#3dc0e8',
        'fundo-ipt': '#1f5de8',
        'green-btn': '#159600',
        'red-btn': '#AF0000'
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(31, 41, 232, 0.8)',
      }
    },
  },
  plugins: [],
}
