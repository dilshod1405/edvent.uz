// tailwind.config.js
import forms from '@tailwindcss/forms'

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    forms({ strategy: 'base' }), // 👈 plugin and strategy here
  ],
}
