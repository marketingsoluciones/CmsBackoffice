/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './layouts/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      "body": ['Montserrat', ...defaultTheme.fontFamily.sans],
      "display": ['Poppins', ...defaultTheme.fontFamily.sans],
      "title": ['Italiana', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      fontSize: {
        sm: '0.8rem',
        md: '0.8rem',
        lg: '0.8rem',
        base: '0.8rem',
        xl: '1.25rem',
        '2xl': '0.8rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      colors: {
        'gray-919EAB': '#919EAB',
        'tituloPrimario': '#212B36',
        'tituloSecundario': '#637381',
        'white': '#ffffff',
        'scrollbar': '#00AB55',
        'iconMenucolor': '#637381',
        'bg': '#F0F0F0',
        'verde': '#30CB30',
        'hover-verde': '#2EBD2E',
        'botonBack': '#C2C2C2',
        'rosa':'#FF5887 ',
        'acento': '#F4C02F',
      },
      spacing: {
        '80px': '50px',
        '23px': '320px',
        '6pxx': '19px'

      }
    },

  },
  plugins: [],
}
