/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      cursor: {
        'cat': 'url(src/assets/images/cat_cursor32x32.gif), pointer',
      }
    }
  },
  plugins: [],
}
