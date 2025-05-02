/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#282a36',
        purple: '#bd93f9',
        green: '#50fa7b',
        orange: '#ffb86c',
        pink: '#ff79c6',
        red: '#ff5555',
        yellow: '#f1fa8c',
        cyan: '#8be9fd',
        surface: '#44475a',
        border: '#6272a4',
        text: '#f8f8f2',
        textSecondary: '#6272a4',
        textTertiary: '#a1adc9',
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
};

