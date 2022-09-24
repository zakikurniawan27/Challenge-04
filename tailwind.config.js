/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      margin:{
        '66rem' : '66rem',
        '69rem' : '69rem',
        '72rem' : '72rem',
        
      },
      flexBasis:{
        '3/7': '43.8571429%',
        '7/7': '95.7142857%'
      }
    },
  },
  plugins: [require("daisyui")],
}
