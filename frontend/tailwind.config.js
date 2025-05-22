/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0160FE", // color corporativo ejemplo
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
