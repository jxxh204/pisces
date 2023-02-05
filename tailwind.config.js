/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      cursor: {
        'watch': 'url(src/assets/images/Watch.png),pointer',
        'cat': 'url(src/assets/images/cat_cursor32x32.gif), pointer',
      }
    },
    colors:{
      mac : {
        gray:{
          700 : '#808080'
        }
      }
    }
  },
  plugins: [],
}
