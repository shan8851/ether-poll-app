/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
],
theme: {
    extend: {
      colors: {
        background: '#1E1B2E', // deep dark purple, not pure black
        surface: '#2A223A',    // card/modal surface
        border: '#3E3650',     // soft but visible
        primary: '#8AFFC1',    // soft neon green
        primaryDark: '#4EE2A7', // hover state or pressed
        text: '#E0DEF4',       // light gray-lilac text
        textSecondary: '#9A96B1', // softer secondary text
      },
      borderRadius: {
        DEFAULT: '0.75rem', // 12px rounded, consistent but modern
      },
      boxShadow: {
        DEFAULT: '0 2px 10px rgba(0, 0, 0, 0.5)', // subtle but noticeable
      },
    },
  },
  plugins: [],
}

