/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#070b14',
          raised: '#0d1424',
          overlay: '#121c30',
        },
        border: {
          DEFAULT: 'rgba(96, 165, 250, 0.12)',
          strong: 'rgba(96, 165, 250, 0.22)',
        },
        accent: {
          DEFAULT: '#22d3ee',
          muted: '#0891b2',
          glow: 'rgba(34, 211, 238, 0.35)',
        },
        trade: {
          DEFAULT: '#34d399',
          muted: '#10b981',
        },
        danger: '#f87171',
        muted: '#94a3b8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(34, 211, 238, 0.4)',
        card: '0 24px 48px -24px rgba(0, 0, 0, 0.65)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to right, rgba(96,165,250,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(96,165,250,0.06) 1px, transparent 1px)',
        'hero-radial':
          'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(34, 211, 238, 0.15), transparent 55%)',
        'hero-blue':
          'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(59, 130, 246, 0.12), transparent 50%)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
