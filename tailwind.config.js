import { iconsPlugin } from '@egoist/tailwindcss-icons'

const { heroui } = require('@heroui/react')

/** *  @type {import('tailwindcss').Config} */

const primaryHue = 0

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        blob: 'blob 12s infinite',
        orbit: 'orbit calc(var(--duration)*1s) linear infinite',
      },
      keyframes: {
        orbit: {
          '0%': {
            transform:
              'rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)',
          },
          '100%': {
            transform:
              'rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)',
          },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(125px, -120px) scale(1.2)',
          },
          '66%': {
            transform: 'translate(-90px, 70px) scale(0.8)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        primaryHue: {
          DEFAULT: `hsl(${primaryHue}, 100%, 50%)`,
          light: `hsl(${primaryHue}, 100%, 70%)`,
          dark: `hsl(${primaryHue}, 100%, 30%)`,
        },
        grd: {
          50: '#fff0f0',
          100: '#ffdddd',
          200: '#ffc0c0',
          300: '#ff9494',
          400: '#ff5757',
          500: '#ff2323',
          600: '#ed0000',
          700: '#d70000',
          800: '#b10303',
          900: '#920a0a',
          950: '#500000',
        },
      },
    },
  },
  plugins: [
    iconsPlugin(), // ✅ 使用 iconsPlugin
    heroui(),
  ],
}
