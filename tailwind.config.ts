import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        surface: 'hsl(var(--surface))',
        'surface-sunken': 'hsl(var(--surface-sunken))',
        border: 'hsl(var(--border))',
        'border-strong': 'hsl(var(--border-strong))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
          tint: 'hsl(var(--success-tint))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
          tint: 'hsl(var(--warning-tint))',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger))',
          foreground: 'hsl(var(--danger-foreground))',
          tint: 'hsl(var(--danger-tint))',
        },
        learner: {
          surface: 'hsl(var(--learner-surface))',
          sidebar: 'hsl(var(--learner-sidebar))',
          primary: 'hsl(var(--learner-primary))',
          'primary-foreground': 'hsl(var(--learner-primary-foreground))',
          next: 'hsl(var(--learner-next))',
          'next-foreground': 'hsl(var(--learner-next-foreground))',
        },
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 2px)',
        DEFAULT: 'var(--radius)',
        md: 'var(--radius)',
        lg: 'calc(var(--radius) + 4px)',
        learner: 'var(--radius-learner)',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
        arabic: ['IBM Plex Sans Arabic', 'IBM Plex Sans', 'sans-serif'],
      },
      fontSize: {
        caption: ['0.6875rem', { lineHeight: '1rem' }],
        small: ['0.8125rem', { lineHeight: '1.25rem' }],
        body: ['0.875rem', { lineHeight: '1.5rem' }],
        subheading: ['1.125rem', { lineHeight: '1.625rem' }],
        heading: ['1.5rem', { lineHeight: '1.95rem' }],
        display: ['1.875rem', { lineHeight: '2.25rem' }],
        'learner-body': ['1rem', { lineHeight: '1.65rem' }],
        'learner-heading': ['1.75rem', { lineHeight: '2.25rem' }],
      },
      spacing: {
        'row-comfortable': '2.875rem',
        sidebar: '15rem',
        'sidebar-collapsed': '4rem',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(10 10 10 / 0.04)',
        'learner-card': '0 1px 5px 0 rgb(10 10 10 / 0.07)',
        'learner-raised': '0 4px 14px 0 rgb(10 10 10 / 0.1)',
      },
    },
  },
  plugins: [animate],
} satisfies Config
