export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0f",
        slate: "#151a23",
        mist: "#eef1f6",
        accent: "#ff7a59",
        aqua: "#56c5d0"
      },
      fontFamily: {
        sans: ["Space Grotesk", "Avenir Next", "Trebuchet MS", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};
