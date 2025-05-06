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
        background: '#1e1f29', // deeper Dracula
        surface: '#2b2d3c', // card background
        border: '#3f4154', // less saturated border
        text: '#f8f8f2',
        textSecondary: '#a0aec0', // softened
        textTertiary: '#718096', // cooler gray-blue

        green: '#4ade80', // Tailwind emerald-400
        red: '#f87171', // Tailwind red-400
        orange: '#fbbf24', // Tailwind amber-400
        yellow: '#facc15', // more readable than f1fa8c
        purple: '#c084fc', // Tailwind purple-400
        pink: '#f472b6', // softened neon
        cyan: '#67e8f9', // soft cyan
      },
    },
  },
  plugins: [],
};

