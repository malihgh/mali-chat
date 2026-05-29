/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/modal.tsx",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: "#24A1DE",
          light: "#3fafdf",
        },
        destructive: {
          DEFAULT: "#C80F0F",
          hover: "#A00C0C",
          dark: "#780909",
          fill: "#DE6F6F",
        },
        successful: {
          DEFAULT: "#27AE60",
          dark: "#17683A",
          fill: "#7DCEA0",
        },
        tertiary: {
          DEFAULT: "#0500FF",
        },
        notification: {
          DEFAULT: "#FF8A00",
        },
        gray: {
          DEFAULT: "gray",
          light: "light-gray",
        },
        textColor: {
          DEFAULT: "black",
          light: "white",
        },
      },
      borderRadius: {
        DEFAULT: "32px",
        lg: "64px",
        full: "9999px",
      },
      boxShadow: {
        // main: "4px 4px 0px 0px rgba(0, 0, 0, 0.25)",
        primary: "0 35px 35px rgba(0, 0, 0, 0.25)",

        main: "4px 4px 0px 0px red",
      },
    },
  },
  plugins: [],
};
