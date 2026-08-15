import { fileURLToPath } from 'node:url';

// Chemins ancrés sur ce fichier : la config reste valable quel que soit le
// répertoire depuis lequel Vite est lancé.
const dir = fileURLToPath(new URL('.', import.meta.url)).replace(/\\/g, '/');

/** @type {import('tailwindcss').Config} */
export default {
  content: [`${dir}index.html`, `${dir}src/**/*.{js,ts,jsx,tsx}`],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07070b',
          900: '#0a0a0f',
          850: '#0f0f16',
          800: '#14141d',
          700: '#1c1c28',
          600: '#282836',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          soft: '#a78bfa',
          deep: '#6d28d9',
        },
        cyan: {
          glow: '#22d3ee',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '64px 64px',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(139,92,246,0.25), 0 8px 40px -12px rgba(139,92,246,0.45)',
        'glow-cyan': '0 0 0 1px rgba(34,211,238,0.25), 0 8px 40px -12px rgba(34,211,238,0.4)',
        card: '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 20px 50px -20px rgba(0,0,0,0.8)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.7)', opacity: '0' },
          '100%': { transform: 'scale(1.7)', opacity: '0' },
        },
        shimmer: {
          '100%': { transform: 'translateX(200%)' },
        },
        'gradient-pan': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 7s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.24, 0, 0.38, 1) infinite',
        shimmer: 'shimmer 2.5s infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
      },
    },
  },
  plugins: [],
};
