/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-start': '#090979',
        'gradient-end': '#00d4ff',
        'theme-fuchsia': '#86198f',
        'theme-gray': '#94a3b8',
      }
    },
  },
  plugins: [],
}