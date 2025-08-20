/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        dark: "url('/Background/BgDark.webp')",
        white: "url('/Background/BgWhite.webp')",
        "custom-gradient": "linear-gradient(to bottom right, #0000ff, #ff0000)",
      },
      textColor: {
        darkText: "#ffffff",
        lightText: "#1e293b",
      },
      fontFamily: {
        custom: ["CustomFont", "sans-serif"],
      },
      keyframes: {
        "gradient-border": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "gradient-border": "gradient-border 4s ease infinite",
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
    },
  },
  plugins: [],
};
