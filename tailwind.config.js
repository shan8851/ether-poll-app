/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      colors: {
        background: '#1e1f29',
        surface: '#2b2d3c',
        border: '#3f4154',
        text: '#f8f8f2',
        textSecondary: '#a0aec0',
        textTertiary: '#718096',

        green: '#4ade80',
        red: '#f87171',
        orange: '#fbbf24',
        yellow: '#facc15',
        purple: '#c084fc',
        pink: '#f472b6',
        cyan: '#67e8f9',
      },
    },
  },
  plugins: [],
};

