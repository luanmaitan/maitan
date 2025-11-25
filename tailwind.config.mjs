/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"IBM Plex Sans"', 'sans-serif'],
                serif: ['"IBM Plex Serif"', 'serif'],
                mono: ['"IBM Plex Mono"', 'monospace'],
            },
            colors: {
                // Carbon Design System Gray Palette (v11) mapped to neutral
                neutral: {
                    50: '#f4f4f4',  // Gray 10
                    100: '#e0e0e0', // Gray 20
                    200: '#c6c6c6', // Gray 30
                    300: '#a8a8a8', // Gray 40
                    400: '#8d8d8d', // Gray 50
                    500: '#6f6f6f', // Gray 60
                    600: '#525252', // Gray 70
                    700: '#393939', // Gray 80
                    800: '#262626', // Gray 90
                    900: '#161616', // Gray 100
                    950: '#000000', // Black
                },
                // Carbon Blue 60 as primary accent
                primary: {
                    DEFAULT: '#0f62fe',
                    hover: '#0353e9',
                }
            },
        },
    },
    plugins: [],
}
