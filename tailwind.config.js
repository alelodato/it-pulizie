/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        blu: '#1a3f6f',
        celeste: '#4db8d4',
        'celeste-light': '#a8dce9',
        'site-white': '#f5fafd',
        'site-gray': '#5a6e82',
      },
      fontFamily: {
        heading: ['"Hammersmith One"', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}