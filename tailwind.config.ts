import type { Config } from 'tailwindcss'
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true, // 중앙 정렬
      screens: {
        DEFAULT: '600px', // 화면 너비의 32%로 설정
      },
    },
    extend: {
      minWidth: {
        default: '600px',
      },
      maxWidth: {
        default: '33%',
      },
      fontFamily: {
        jalnan: ['Jalnan2'],
        notosanko: ['NotoSansKR'],
        toss: ['Toss'],
      },
      boxShadow: {
        base: '0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.10)',
      },
      fontSize: {
        clam: 'clam(1rem, 2vw, 2.25rem)',
        weatherTitle: [
          '36px',
          {
            lineHeight: '3rem',
            letterSpacing: '-0.012em',
            fontWeight: '500',
          },
        ],
        weatherSub: [
          '16px',
          {
            fontWeight: 500,
          },
        ],
        weatherTem: [
          '24px',
          {
            fontWeight: 500,
          },
        ],
        weatherSpan: [
          '16px',
          {
            fontWeight: 600,
          },
        ],
        h1: [
          '3rem',
          {
            lineHeight: '3rem',
            letterSpacing: '-0.012em',
          },
        ],
        h2: [
          '1.875rem',
          {
            lineHeight: '2.25rem',
            letterSpacing: '-0.0075em',
          },
        ],
        h3: [
          '1.5rem',
          {
            lineHeight: '2rem',
            letterSpacing: '-0.006em',
          },
        ],
        h4: [
          '1.25rem',
          {
            lineHeight: '1.75rem',
            letterSpacing: '-0.005em',
          },
        ],
        large: [
          '1.125rem',
          {
            lineHeight: '1.75rem',
            letterSpacing: '0em',
          },
        ],
        lead: [
          '1.25rem',
          {
            lineHeight: '1.75rem',
            letterSpacing: '0em',
            fontWeight: '400',
          },
        ],
        p: [
          '1rem',
          {
            lineHeight: '1.75rem',
            letterSpacing: '0em',
            fontWeight: '400',
          },
        ],
        'p-ui': [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0em',
            fontWeight: '400',
          },
        ],
        body: [
          '0.875rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0em',
            fontWeight: '400',
          },
        ],
        subtle: [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0em',
            fontWeight: '400',
          },
        ],
        small: [
          '0.875rem',
          {
            lineHeight: '0.875rem',
            letterSpacing: '0em',
            fontWeight: '500',
          },
        ],
        detail: [
          '0.75rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0em',
            fontWeight: '500',
          },
        ],
        blockquote: [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0em',
            fontWeight: '300',
          },
        ],
        'inline-code': [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0em',
            fontWeight: '700',
          },
        ],
        'table-head': [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0em',
            fontWeight: '700',
          },
        ],
        'table-item': [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0em',
            fontWeight: '400',
          },
        ],
      },
      colors: {
        weatherSubColor: '#6B7280',
        weatherSpanColor: '#374151',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      keyframes: {
        fadein: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' }, // 시작 위치와 투명도
          '100%': { transform: 'translateY(0)', opacity: '1' }, // 끝 위치와 투명도
        },
        modalFadein: {
          '0%': { transform: 'translateY(-3px)', opacity: '0.5' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        modalFadeout: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-3px)', opacity: '0.5' },
        },
        'dot-flashing': {
          '0%, 20%': { opacity: '0' }, // 처음과 20%일 때 투명
          '50%': { opacity: '1' }, // 50%에서 최대 투명도
          '80%, 100%': { opacity: '0' }, // 마지막으로 다시 투명
        },
      },
      animation: {
        fadein: 'fadein 1s ease-out',
        modalFadein: 'modalFadein 0.2s ease-out',
        modalFadeout: 'modalFadeout 0.2s ease-in',
        dot: 'dot-flashing 1.4s infinite', // 애니메이션 이름
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
} satisfies Config

export default config
