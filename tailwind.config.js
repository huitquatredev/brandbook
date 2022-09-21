module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,njk}"],
  theme: {
    colors:{
      'pantone': 'var(--color-pantone)',
      'darktone': 'var(--color-darktone)',
      'lightone': 'var(--color-lightone)',
      'lghtgrey1': 'var(--color-lghtgrey1)',
      'lghtgrey2': 'var(--color-lghtgrey2)',
      'lghtgrey3': 'var(--color-lghtgrey3)',
      'darkgrey1': 'var(--color-darkgrey1)',
      'darkgrey2': 'var(--color-darkgrey2)',
      'darkgrey3': 'var(--color-darkgrey3)',
      'whitegrey1': 'var(--color-whitegrey1)',
      'whitegrey2': 'var(--color-whitegrey2)',
      'whitegrey3': 'var(--color-whitegrey3)'
    },
    extend: {
      screens: {
        'xs': '400px',
      },
    },
  },
  plugins: [],
}
