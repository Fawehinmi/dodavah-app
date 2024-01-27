/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(244, 63, 94)",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
