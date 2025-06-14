const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' if you want it automatic
  theme: {
    extend: {
      colors: {
        primary: "#6366F1", // Indigo
        accent: "#EC4899",  // Pink
        background: "#0f0f0f",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),

    // Optional: add a custom component/plugin
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".clip-mask-fade": {
          "mask-image": "linear-gradient(to bottom, black, transparent)",
          "-webkit-mask-image": "linear-gradient(to bottom, black, transparent)",
        },
      });
    }),
  ],
};
