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
      'whitegrey3': 'var(--color-whitegrey3)',
      'onPantone': 'var(--onPantone)',
      'onDarktone': 'var(--onDarktone)',
      'onLightone': 'var(--onLightone)'
    },
    extend: {
      fontSize: {
        'fluid--2': 'var(--step--2)',
        'fluid--1': 'var(--step--1)',
        'fluid-0': 'var(--step-0)',
        'fluid-1': 'var(--step-1)',
        'fluid-2': 'var(--step-2)',
        'fluid-3': 'var(--step-3)',
        'fluid-4': 'var(--step-4)',
        'fluid-5': 'var(--step-5)'
      },
    },
  },
  plugins: [],
}
