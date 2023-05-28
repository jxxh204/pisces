/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],

  theme: {
    fontFamily: {
      AppleGaramond: "Apple Garamond Light",
      charcoal: "charcoal",
      Monocraft: "Monocraft",
      Pretendard: "Pretendard",
    },
    extend: {
      cursor: {
        watch: "url(src/assets/images/cursor/Watch.png),pointer",
        cat: "url(src/assets/images/cursor/cat_cursor32x32.gif), pointer",
        select: "url(src/assets/images/cursor/Select.svg), pointer",
        default: "url(src/assets/images/cursor/Arrow.svg), pointer",
      },
      backgroundImage: {
        "default-pattern": "url(src/assets/images/bg/default.svg)",
        "finder-pattern": "url(src/assets/images/bg/finder.svg)",
        "blueDalmation-pattern": "url(src/assets/images/bg/blueDalmation.svg)",
        barPicker: "url(src/assets/images/Finder/barpicker.svg)",
      },
    },
    colors: {
      mac: {
        black: "#262626",
        white: "#FFFFFF",
        gray: {
          200: "#EEEEEE",
          300: "#DDDDDD",
          400: "#CCCCCC",
          500: "#BBBBBB",
          600: "#999999",
          700: "#808080",
          800: "#666666",
        },
        Azul: "#333399",
        Lavender: "#CCCCFF",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    theme: false,
    prefix: "ds-",
    darkTheme: "light",
    themes: [
      {
        mytheme: {
          error: "#ff700f",
          primary: "#c4b5fd",
          accent: "#1FB2A6",
          neutral: "#FAFAFA",
          "base-100": "#FAFAFA",
          warning: "#FBBD23",
          azul: "#333399",
          lavender: "#CCCCFF",
        },
      },
    ],
  },
};
