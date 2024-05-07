/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lite: "#EFF9F0",
        dark: "#00A7E1",
        toodark: "#003459"
      },
      fontFamily: {
        sans: ['"tajawal"', "sans-serif"],
        josefin: ['"josefin-sans"', "sans-serif"]
      }
    },
  },
  plugins: [],
}