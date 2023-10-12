// /** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            'xs': '400px',
            'sm': '576px',
            // => @media (min-width: 576px) { ... }
            'md': '768px',
            // => @media (min-width: 768px) { ... }
            'lg': '992px',
            // => @media (min-width: 992px) { ... }
            'xl': '1200px',
            // => @media (min-width: 1200px) { ... }
        },
        extend: {
            backgroundImage: {
                'logo': "url('/public/backwallrecords-logo.jpeg')"
            },
            colors: {
                'burntOrange': '#BC5F04',
                'lightOrange': '#F0A868',
                'mint': '#9EBC9F',
            }
        },
    },
    plugins: [],
}