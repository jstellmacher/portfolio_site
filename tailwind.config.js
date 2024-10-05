/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        // Merge all shadow values into a single 'boxShadow' object
        'inner-extreme': 'inset 0 0 20px rgba(0, 0, 0, 0.5)', // Custom intense inner shadow
        'custom-inset': 'inset 0 0 10px 5px rgba(255, 255, 255, 0.8)', // Light custom inner shadow
        'deep-dark': '0 4px 10px rgba(0, 0, 0, 0.8)', // Deeper outer shadow for depth
        'dark-lg': '0 10px 30px rgba(0, 0, 0, 0.6)', // Larger, darker shadow for more depth
      },
    },
  },
  plugins: [],
};