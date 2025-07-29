import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pixeloid-sans)', 'Arial', 'sans-serif'],
        mono: ['var(--font-pixeloid-mono)', 'Courier New', 'monospace'],
        pixeloid: ['var(--font-pixeloid-sans)', 'Arial', 'sans-serif'],
        'pixeloid-mono': ['var(--font-pixeloid-mono)', 'Courier New', 'monospace'],
      },
      colors: {
        // Sontine Brand Colors
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Primary brand color
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#9945ff', // Solana purple
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        yellow: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Gold accent
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontSize: {
        // Pixel-perfect sizes for Pixeloid font
        'pixel-xs': ['9px', { lineHeight: '12px' }],
        'pixel-sm': ['18px', { lineHeight: '24px' }],
        'pixel-base': ['36px', { lineHeight: '48px' }],
        'pixel-lg': ['72px', { lineHeight: '96px' }],
        'pixel-xl': ['144px', { lineHeight: '192px' }],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin-reverse 15s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
