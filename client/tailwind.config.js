/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: colors.transparent,
      gray: '#EFEFEC',
      white: '#FFFFFF',
      green: '#2C5601',
    },
    extend: {
      boxShadow: {
        md: '0px 8px 16px -1px rgba(66, 82, 110, 0.2)',
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
