import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ebff',
          500: '#0f6fff',
          600: '#0b56c7',
          700: '#08429d',
        },
        accent: '#16a34a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 16px 45px -20px rgba(15, 111, 255, 0.55)',
      },
    },
  },
  plugins: [],
} satisfies Config;
