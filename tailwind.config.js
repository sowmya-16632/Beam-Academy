/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#080C14',
          surface: '#0F1623',
          elevated: '#162032',
        },
        border: {
          subtle: '#1E2D4A',
          default: '#263A5A',
        },
        blue: {
          beam: '#4F8EF7',
          soft: '#A8C8FF',
          dim: '#1E3A6E',
        },
        violet: {
          accent: '#A78BFA',
          dim: '#3B2D6B',
        },
        text: {
          primary: '#E2E8F0',
          secondary: '#94A3B8',
          muted: '#475569',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'beam-gradient': 'linear-gradient(135deg, #4F8EF7 0%, #A78BFA 100%)',
        'beam-radial': 'radial-gradient(ellipse at 50% 0%, rgba(79,142,247,0.15) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(79,142,247,0.08) 0%, rgba(167,139,250,0.05) 100%)',
        'grid-pattern': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23263A5A' fill-opacity='0.25'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      },
      animation: {
        'beam-sweep': 'beamSweep 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        beamSweep: {
          '0%, 100%': { backgroundPosition: '-200% center' },
          '50%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
