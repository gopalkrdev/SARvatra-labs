/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          950: '#02040a',
          900: '#050b14',
          850: '#091322',
          800: '#0e1b2f',
          700: '#172b49',
          600: '#23416e',
        },
        radar: {
          cyan: '#00F0FF',
          blue: '#0070F3',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
          purple: '#8B5CF6'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace', 'Consolas'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Chakra Petch"', 'sans-serif'],
      },
      boxShadow: {
        'hud': '0 0 25px rgba(0, 240, 255, 0.12), inset 0 0 15px rgba(0, 240, 255, 0.05)',
        'hud-glow': '0 0 35px rgba(0, 240, 255, 0.25)',
        'hud-amber': '0 0 25px rgba(245, 158, 11, 0.2)',
        'hud-rose': '0 0 25px rgba(244, 63, 94, 0.25)',
      }
    },
  },
  plugins: [],
}
