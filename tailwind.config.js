/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        lite: "#EFF9F0",
        dark: "#00A7E1",
        toodark: "#003459"
      },
      boxShadow: {
        'custom': '2px 2px 2px 2px rgba(22, 72, 99, 0.4)',
      },
      fontFamily: {
        sans: ['"tajawal"', "sans-serif"],
        custom: ['"josefin-sans"', "sans-serif"]
      }
    },
  },
  plugins: [],
}