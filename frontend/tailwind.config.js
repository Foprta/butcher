const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
