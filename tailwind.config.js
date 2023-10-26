// /** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "400px",
      sm: "576px",
      // => @media (min-width: 576px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "992px",
      // => @media (min-width: 992px) { ... }
      xl: "1200px",
      // => @media (min-width: 1200px) { ... }
    },
    textShadow: {
      sm: "1px 1px 2px var(--tw-shadow-color)",
      DEFAULT: "2px 2px 4px var(--tw-shadow-color)",
      lg: "4px 4px 8px var(--tw-shadow-color)",
      xl: "4px 4px 16px var(--tw-shadow-color)",
      "2xl": "8px 8px 24px var(--tw-shadow-color)",
    },
    extend: {
      backgroundImage: {
        logo: "url('/public/backwallrecords-logo.jpeg')",
      },
      colors: {
        burntOrange: "#BC5F04",
        lightOrange: "#F0A868",
        mint: "#9EBC9F",
        darkMint: "#649066",
      },
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    animation: {
      marquee: "marquee 300s linear infinite 2s",
      marquee2: "marquee2 300s linear infinite 2s",
      'fade-alert': 'fade-alert 3s both'
    },
    keyframes: {
      marquee: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      },
      marquee2: {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(0%)" },
      },
      'fade-alert': {
        '0%, 100%': {
            opacity: '0',
            transform: 'translateX(2rem)',
        },
        '20%, 80%': {
            opacity: '1',
            transform: 'translateX(0)',
        },
    }
    },
  },
  plugins: [
    require("tailwindcss-animated"),
    require('autoprefixer'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
