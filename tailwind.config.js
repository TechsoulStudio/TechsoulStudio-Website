/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        aeonik: ['AeonikPro-Trial', 'sans-serif'],
      },
      screens: {
        xs: "480px",
      },
      animation: {
        slowbounce: "bounce 3s infinite",
      },
    },
  },
  plugins: [
    require("tw-animate-css"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
