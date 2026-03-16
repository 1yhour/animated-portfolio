// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F5F2EE',   // warm off-white (matches the site)
        foreground: '#0F0F0F',   // near-black for headings
        muted: '#6B6B6B',        // gray for secondary text (clock, labels)
        border: '#E0DDD9',       // subtle dividers
      },
      fontFamily: {
        // The site uses a serif display + clean sans combo
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config