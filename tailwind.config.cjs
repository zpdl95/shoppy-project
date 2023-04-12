/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#7F00FF',
        success: '#00FF00',
        fail: '#FF0000',
        required: '#0000FF',
      },
    },
  },
  plugins: [],
};
