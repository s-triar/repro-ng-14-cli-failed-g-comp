module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  prefix: 'tw-',
  theme: {
    extend: {},
    colors: ({colors}) =>({
      primary: '#f97316',
      accent : '#facc15',
      error:'#dc2626',
      success: '#22c55e',
      warning: '#eab308',
      info:'#38bdf8'
    }),
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-children'),
  ],
}
