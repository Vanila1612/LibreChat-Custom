const { createTailwindColors } = require('./src/theme/utils/createTailwindColors.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        ...createTailwindColors(),
        agribank: {
          primary: '#B01C3A',
          'primary-hover': '#981733',
          'primary-light': '#F5EDEE',
          border: '#E7B7C0',
          background: '#F8F8F8',
          surface: '#FFFFFF',
          text: {
            primary: '#333333',
            secondary: '#666666',
          },
          success: '#28A745',
          warning: '#FFC107',
          error: '#DC3545',
        },
      },
    },
  },
  plugins: [],
};
