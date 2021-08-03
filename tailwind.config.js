module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#C9E4C5',
          DEFAULT: '#66DE93',
          dark: '#519872',
        },
        secondary:{
          light: '#FFBCBC',
          DEFAULT: '#FC345C',
          dark: '#AF0404',
        }
      },
      fontFamily: {
        ui: ['Nunito'],
        body: ['Noto Sans']
      },
      animation: {
        zoomin: 'zoomin 350ms forwards'
      },
      keyframes: {
        zoomin: {
          '0%':{
            opacity: '0',
            transform: 'scale(0)',
            transformOrigin: 'bottom center'
          },
          '50%':{
            opacity: '1',
            transformOrigin: 'bottom center'
          },
          '100%': {
            transform: 'scale(1)',
            transformOrigin: 'bottom center'
          }
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
