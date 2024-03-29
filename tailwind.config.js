/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   blue1: "#E2F0FF",
      //   blue2: "#C5DFFF",
      //   blue3: "#A9CDFF",
      //   blue4: "#93BDFF",
      //   blue5: "#5F97FF",
      //   blue6: "#517DDB",
      //   blue7: "#385BB7",
      //   blue8: "#233E93",
      //   primary1: "#D8EEFF",
      //   primary2: "#B1DBFF",
      //   primary3: "#8AC4FF",
      //   primary4: "#6DAFFF",
      //   primary5: "#3D8DFF",
      //   primary6: "#2C6DDB",
      //   primary7: "#1E50B7",
      //   primary8: "#133893",
      //   gray1: "#F3F5F7",
      //   gray2: "#E7EBEF",
      //   gray3: "#DAE0E7",
      //   gray4: "#CED6DF",
      //   gray5: "#C1CBD7",
      //   gray6: "#B4C0CF",
      //   gray7: "#A8B6C7",
      //   gray8: "#9BACBF",
      //   gray9: "#8FA2B7",
      //   gray10: "#8398AF",
      //   gray11: "#768EA7",
      //   gray12: "#6A84A0",
      //   gray13: "#5F7A95",
      //   gray14: "#587089",
      //   gray15: "#50657C",
      //   gray16: "#485B70",
      //   gray17: "#405064",
      //   gray18: "#384657",
      //   gray19: "#303C4B",
      //   gray20: "#28323E",
      //   gray21: "#202832",
      //   gray22: "#181E25",
      //   gray23: "#101419",
      //   gray24: "#080A0C",
      // },
      colors: {
        primary1: "#CBFB45",
        primary2: "#161617",
        neutralDarker: "#000000",
        neutralDark: "#151517",
        neutral: "#232325",
        neutralLight: "#898990",
        neutralLighter: "#F3F3F3",
        darkGreen: "#70833C",
        grayDark: "#1E1E1F",
        gray1: "#F3F5F7",
        gray2: "#E7EBEF",
        gray3: "#DAE0E7",
        gray4: "#CED6DF",
        gray5: "#C1CBD7",
        gray6: "#B4C0CF",
        gray7: "#A8B6C7",
        gray8: "#9BACBF",
        gray9: "#8FA2B7",
        gray10: "#8398AF",
        gray11: "#768EA7",
        gray12: "#6A84A0",
        gray13: "#5F7A95",
        gray14: "#587089",
        gray15: "#50657C",
        gray16: "#485B70",
        gray17: "#405064",
        gray18: "#384657",
        gray19: "#303C4B",
        gray20: "#28323E",
        gray21: "#202832",
        gray22: "#181E25",
        gray23: "#101419",
        gray24: "#080A0C",
      },
      fontFamily: {
        "apfel-grotezk": "Apfel Grotezk",
        "neue-machina-bold": "Neue Machina Bold",
        "neue-machina": "Neue Machina",
      },
    },
  },
  plugins: [],
};
