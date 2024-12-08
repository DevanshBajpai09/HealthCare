import flowbite from "flowbite-react/tailwind"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#5f6FFF'
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill , minmax(200px,1fr))'
      }
    },
  },
  plugins: [
    flowbite.plugin(),
    require('preline/plugin'),

    
  ],
}