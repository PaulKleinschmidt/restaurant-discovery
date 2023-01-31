/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      sm: '0.8125rem',
    },
    colors: {
      transparent: colors.transparent,
      gray: '#EFEFEC',
      gray2: '#DBDAD2',
      white: '#FFFFFF',
      green: '#2C5601',
      textPrimary: '#2B381F',
      textSecondary: '#656E5E',
    },
    extend: {
      boxShadow: {
        sm: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        md: '0px 8px 16px -1px rgba(66, 82, 110, 0.2)',
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
