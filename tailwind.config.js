// tailwind.config.js
import forms from '@tailwindcss/forms'

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      primary: '#4F39F6',
    }
    },
  },
  plugins: [
    forms({ strategy: 'base' }), 
  ],
}
