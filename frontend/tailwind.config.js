/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4F46E5",
          DEFAULT: "#3B82F6",
          dark: "#2563EB",
        },
        background: {
          light: "rgba(255,255,255,0.8)",
          dark: "rgba(31,41,55,0.8)",
        },
      },
      boxShadow: {
        chat: "0 4px 16px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
