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
      Pretendard: "Pretendard-Regular",
    },
    extend: {
      cursor: {
        watch: "url(/src/assets/images/cursor/Watch.png),pointer",
        select: "url(/src/assets/images/cursor/Select.png), pointer",
        default: "url(/src/assets/images/cursor/Arrow.png), pointer",
      },
      backgroundImage: {
        "default-pattern": "url(/src/assets/images/bg/default.png)",
        "finder-pattern": "url(/src/assets/images/bg/finder.svg)",
        "blueDalmation-pattern": "url(/src/assets/images/bg/blueDalmation.svg)",
        barPicker: "url(/src/assets/images/Finder/barpicker.svg)",
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
        button:{
          red:"#ef3552"
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
