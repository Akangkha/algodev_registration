/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#ffc700",
        blue: "#0047ff",
      },
    },
  },
  plugins: [],
};
