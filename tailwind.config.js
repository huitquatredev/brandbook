module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,njk}"],
  theme: {
    colors:{
      'pantoned1':'var(--pantoned1)',
      'pantoned2':'var(--pantoned2)',
      'pantoned3':'var(--pantoned3)',
      'pantoned4':'var(--pantoned4)',
      'pantoned5':'var(--pantoned5)',
      'pantoned6':'var(--pantoned6)',
      'neutral1':'var(--neutral1)',
      'neutral2':'var(--neutral2)',
      'neutral3':'var(--neutral3)',
      'neutral4':'var(--neutral4)',
      'neutral5':'var(--neutral5)',
      'neutral6':'var(--neutral6)',
      'transparent': 'transparent',
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
