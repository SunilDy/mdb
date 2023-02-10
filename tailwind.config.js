/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xsm: "300px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: "#0F172A",
      },
      gridTemplateColumns: {
        // added new 4 column grid as new4
        new4: "repeat(auto-fit, minmax(200px, 1fr))",
        new4xsm: "repeat(auto-fit, minmax(100px, 1fr))",
        new5: "repeat(auto-fit, minmax(18rem, 1fr))",
        review: "repeat(auto-fit, minmax(24rem, 1fr))",
        reviewsm: "repeat(auto-fit, minmax(12rem, 1fr))",
        cast: "repeat(auto-fit, minmax(8rem, 1fr))",
        castsm: "repeat(auto-fit, minmax(6rem, 1fr))",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(74, 222, 128, 1)",
      },
      animation: {
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
      },
      keyframes: {
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwind-scrollbar-hide")],
};
