/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: "#a6133dff",
        greenLight: "#8dd203",
      },
    },
  },
  plugins: [],
};
