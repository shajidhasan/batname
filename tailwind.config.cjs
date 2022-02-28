const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Anton', 'sans-serif'],
        bengali: ["'Baloo Da 2'"]
      }
    },
  },

  plugins: [require("@tailwindcss/forms")],
};

module.exports = config;
