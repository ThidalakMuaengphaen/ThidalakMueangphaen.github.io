/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  screens: {
    // "xl": "1960px", // Adjust the width to match your desired breakpoint
    '2xl': '1920px'
  },
  theme: {
    extend: {
      fontFamily: {
       kanit: ["Kanit", "sans-serif"],
      },
    },
  },
  plugins: [],
}