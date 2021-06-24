module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        frogHatAnim: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '20%': {
            transform: 'translateY(30px)'
          },
          '70%': {
            transform: 'translateY(30px)'
          },
        }
      },
      maxWidth: {
        'xxs': '12rem',
        "fit": "fit-content"
      },
      height: {
        '%95': '93%',
        '%5': '6%',
      },
      animation: {
        frogHatAnim: 'frogHatAnim 2s ease-in-out infinite',
      }
    },
  },
  variants: {
    extend: {},
    plugins: [],
  }
}