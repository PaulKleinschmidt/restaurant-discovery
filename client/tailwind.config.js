/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      gray: '#EFEFEC',
      white: '#FFFFFF',
    },
    extend: {
      boxShadow: {
        md: '0px 8px 16px -1px rgba(66, 82, 110, 0.2)',
      },
    },
  },
  plugins: [],
};
