/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './layouts/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            spacing: {
                'h-header': 'var(--h-header)',
                'p-body': 'var(--p-body)',
                gap: 'var(--gap)',
            },
            maxWidth: {
                container: 'var(--max-container)',
            },
            colors: {
                primary: 'hsl(var(--clr-primary) / <alpha-value>)',
                'primary-dark': 'hsl(var(--clr-primary-dark) / <alpha-value>)',
                'primary-light': 'hsl(var(--clr-primary-light) / <alpha-value>)',
                secondary: 'hsl(var(--clr-secondary) / <alpha-value>)',
                'secondary-dark': 'hsl(var(--clr-secondary-dark) / <alpha-value>)',
                'secondary-light': 'hsl(var(--clr-secondary-light) / <alpha-value>)',
                'clr-text': 'hsl(var(--clr-text) / <alpha-value>)',
                'clr-text-dark': 'hsl(var(--clr-text-dark) / <alpha-value>)',
                'light-gray': 'hsl(var(--clr-light-gray) / <alpha-value>)',
                white: 'hsl(var(--clr-white) / <alpha-value>)',
                transparent: 'transparent',
                current: 'currentColor',
            },
            zIndex: {
                header: 100,
                popover: 50,
                'go-to-top-btn': 90,
            },
        },
        screens: {
            xl: { min: '1540px' },
            lg: { max: '1539px' },
            md: { max: '1279px' },
            sm: { max: '800px' },
            xs: { max: '575px' },
            xxs: { max: '330px' },
            'can-hover': { raw: '(hover: hover)' },
            'cannot-hover': { raw: '(hover: none)' },
        },
    },
    plugins: [],
};
