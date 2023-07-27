/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")
module.exports = {
  content: [
    './index.html', './src/**/*.{vue,js,ts,jsx,tsx}',
    "./node_modules/vue-tailwind-datepicker/**/*.mjs"
  ],
  theme: {
    extend: {
      colors: {
        base: '#eef0e1',
        deep: '#14532d',
        "vtd-primary": colors.gray, 
        "vtd-secondary": colors.gray,
      },
      keyframes: {
        fade_out: {
          '0%': {
            opacity: 1
          },
          '100%': {
            opacity: 0
          }
        },

      },
      animation: {
        fade_out: 'fade_out 0.5s 0.5s ease-out forwards',
      }
      
    },
    container: {
      center: true,
    },
    fontFamily: {
      default: ["xxrt"],
      primary: ['modist'],
      secondary: ["Inter, sans-serif"],
    }
  },
  variants: {
    extend: {
      display: ['group-hover']
    },
  },
  plugins: [
    require("daisyui"),
    //require('@tailwindcss/forms'),
  ],
  daisyui: {
    themes: ["lemonade"],
    
  },
  darkMode: 'class'
}

