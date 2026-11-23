/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: '#F8DDE8',
        rose: '#EFA9C5',
        'rose-deep': '#D84A6E',
        plum: '#6D3B53',
        berry: '#7A445D',
        gold: '#D8B56D',
      },
      fontFamily: {
        script: ['"Dancing Script"', 'cursive'],
        sans: ['"Quicksand"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 3.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s infinite',
        'wiggle': 'wiggle 0.6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-8deg)' },
          '75%': { transform: 'rotate(8deg)' },
        }
      }
    },
  },
  plugins: [],
}
