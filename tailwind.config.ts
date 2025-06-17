import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        figtree: ['var(--font-figtree)'],
      },
      colors: {
        primary: {
          DEFAULT: '#000814',
          light: '#000814',
          dark: '#000814',
        },
        secondary: {
          DEFAULT: '#001d3d',
          light: '#013566',
          dark: '#001d3d',
        },
        accent: {
          DEFAULT: '#ffc300',
          light: '#fed709',
          dark: '#ffc300',
        },
        background: {
          DEFAULT: '#ebf5ff',
          light: '#ebf5ff',
          dark: '#001528',
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;
