const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  // Misc
  purge: false,
  // Theme
  theme: {
    // Replace
    fontFamily: {
      sans: ['"Exo 2"', ...defaultTheme.fontFamily.sans],
      mono: defaultTheme.fontFamily.mono
    },
    colors: {
      // Misc & e621's colors
      transparent: 'transparent',
      artist: '#F2AC08',
      species: '#ED5D1F',
      copyright: '#DD00DD',
      character: '#00AA00',
      // App colors
      dark: {
        '1': '#9DA7AF',
        '2': '#859099',
        '3': '#707E89',
        '4': '#5D6A74',
        '5': '#47535C',
        '6': '#3C464E',
        '7': '#353E45',
        '8': '#2C343A',
        '9': '#262C31',
        '10': '#1F2428'
      },
      gray: {
        '1': '#F5F7FA',
        '2': '#E4E7EB',
        '3': '#CBD2D9',
        '4': '#9AA5B1',
        '5': '#7B8794',
        '6': '#616E7C',
        '7': '#52606D',
        '8': '#3E4C59',
        '9': '#323F4B',
        '10': '#1F2933'
      },
      blue: {
        '1': '#DCEEFB',
        '2': '#B6E0FE',
        '3': '#84C5F4',
        '4': '#62B0E8',
        '5': '#4098D7',
        '6': '#2680C2',
        '7': '#186FAF',
        '8': '#0F609B',
        '9': '#0A558C',
        '10': '#003E6B'
      },
      orange: {
        '1': '#FFEFE6',
        '2': '#FFD3BA',
        '3': '#FAB38B',
        '4': '#EF8E58',
        '5': '#E67635',
        '6': '#C65D21',
        '7': '#AB4E19',
        '8': '#8C3D10',
        '9': '#77340D',
        '10': '#572508'
      },
      green: {
        '1': '#EFFCF6',
        '2': '#C6F7E2',
        '3': '#8EEDC7',
        '4': '#65D6AD',
        '5': '#3EBD93',
        '6': '#27AB83',
        '7': '#199473',
        '8': '#147D64',
        '9': '#0C6B58',
        '10': '#014D40'
      },
      pink: {
        '1': '#FFE0F0',
        '2': '#FAB8D9',
        '3': '#F191C1',
        '4': '#E668A7',
        '5': '#DA4A91',
        '6': '#C42D78',
        '7': '#AD2167',
        '8': '#9B1B5A',
        '9': '#781244',
        '10': '#5C0B33'
      },
      red: {
        '1': '#FDB9BF',
        '2': '#FC9CA4',
        '3': '#FC838D',
        '4': '#FF6161',
        '5': '#FF4242',
        '6': '#FA0000',
        '7': '#B03636',
        '8': '#9C3030',
        '9': '#7F2F2F',
        '10': '#562525'
      },
      // Mono colors
      black: '#000000',
      white: '#FFFFFF'
    },
    // Extend
    extend: {
      zIndex: {
        '60': 60,
        '70': 70,
        '80': 80,
        '90': 90,
        '100': 100,
      }
    }
  }
}