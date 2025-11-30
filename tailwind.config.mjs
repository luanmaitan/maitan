/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Rethink Sans"', ...defaultTheme.fontFamily.sans],
        serif: ['"Hedvig Letters Serif"', ...defaultTheme.fontFamily.serif],
        mono: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        // Redo Design System Colors (preserving user's tinted neutrals for now as requested, 
        // but can be switched to true grays later if "Engineering Design" strictness is preferred)
        neutral: {
          50: "#F5F7F9",
          100: "#E8EBEF",
          200: "#D1D9E2",
          300: "#B4C0CD",
          400: "#94A6B8",
          500: "#758CA3",
          600: "#596F84",
          700: "#405163",
          800: "#2A3642",
          900: "#151B21",
        },
        redo: {
          orange: "#FA9819",
          purple: "#8B5CF6",
        },
      },
      fontSize: {
        // Headings: Tight leading for impact
        'h1': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '500' }], // ~60px
        'h2': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '500' }], // ~30px
        
        // Body: Relaxed leading for better readability (Swiss/Engineering Style best practice)
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '-0.01em', fontWeight: '400' }], // 16px
        'small': ['0.875rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }], // 14px
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
