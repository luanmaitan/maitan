/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Rethink Sans"', 'sans-serif'],
                serif: ['"Hedvig Letters Serif"', 'serif'],
                mono: ['"IBM Plex Mono"', 'monospace'],
            },
            // Exact Redo Typography System
            fontSize: {
                // Headings
                'h1': ['60px', { lineHeight: '1.1', letterSpacing: '-0.6px', fontWeight: '500' }],
                'h2': ['30px', { lineHeight: '1.2', letterSpacing: '-0.6px', fontWeight: '500' }],
                'h3': ['22px', { lineHeight: '1.2', letterSpacing: '-0.22px', fontWeight: '600' }],
                
                // Body & UI
                'body': ['15px', { lineHeight: '1.2', letterSpacing: '-0.15px', fontWeight: '500' }],
                'body-bold': ['15px', { lineHeight: '1.2', letterSpacing: '-0.15px', fontWeight: '700' }],
                'label': ['13px', { lineHeight: '1.2', letterSpacing: '-0.13px', fontWeight: '500' }],
                'display': ['10px', { lineHeight: '1.2', letterSpacing: '-0.2px', fontWeight: '500' }],
                
                // Keeping some standard sizes for flexibility if needed, but mapped to system
                'xs': ['10px', { lineHeight: '1.2', letterSpacing: '-0.2px' }],
                'sm': ['13px', { lineHeight: '1.2', letterSpacing: '-0.13px' }],
                'base': ['15px', { lineHeight: '1.2', letterSpacing: '-0.15px' }],
                'lg': ['22px', { lineHeight: '1.2', letterSpacing: '-0.22px' }],
                'xl': ['30px', { lineHeight: '1.2', letterSpacing: '-0.6px' }],
                '2xl': ['30px', { lineHeight: '1.2', letterSpacing: '-0.6px' }], // Redo doesn't have many sizes, mapping closely
                '3xl': ['60px', { lineHeight: '1.1', letterSpacing: '-0.6px' }],
            },
            colors: {
                // Redo Palette
                redo: {
                    orange: '#FA9819',
                    'blue-tint': '#B6C9CF',
                    white: '#FFFFFF',
                    'baby-blue': '#C6EBF7',
                    navy: '#1E3D59',
                    caption: '#48749E',
                    'sky-blue': '#DEEEFE',
                    'off-blue': '#E8EBEF',
                    'deep-orange': '#CD4900',
                    black: '#000000',
                    'dark-grey': '#A3A3A3',
                    grey: '#E5E5E5',
                },
                // Mapping to semantic names
                primary: {
                    DEFAULT: '#FA9819',
                    hover: '#CD4900',
                    foreground: '#000000',
                },
                secondary: {
                    DEFAULT: '#1E3D59',
                    foreground: '#FFFFFF',
                },
                neutral: {
                    50: '#FFFFFF',
                    100: '#F5F7F9',
                    200: '#E8EBEF',
                    300: '#E5E5E5',
                    400: '#B6C9CF',
                    500: '#A3A3A3',
                    600: '#48749E',
                    700: '#1E3D59',
                    800: '#152C40',
                    900: '#000000',
                    950: '#000000',
                },
            },
        },
    },
    plugins: [],
}
