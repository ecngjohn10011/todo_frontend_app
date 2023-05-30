/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#090034",
        secondary: "#f0c808",
        light_bg: "#f3f3f4",
        app_red: "#dd1c1a",
      },
    },
  },
  plugins: [],
};
