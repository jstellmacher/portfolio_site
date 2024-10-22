/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enables dark mode via class strategy
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', ...fontFamily.sans],
        serif: ['var(--font-playfair)', ...fontFamily.serif],
      },
      boxShadow: {
        'inner-extreme': 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
        'custom-inset': 'inset 0 0 10px 5px rgba(255, 255, 255, 0.8)',
        'deep-dark': '0 4px 10px rgba(0, 0, 0, 0.8)',
        'dark-lg': '0 10px 30px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
};
