/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#C2FF04",
        "primary-600": "#B2EF03",
        "primary-500": "#A2DF03",
        secondary: "#000000",
      },
      fontSize: {
        sm: "14px",
        md: "16px",
        base: "18px",
        xl: "25px",
        "2xl": "38px",
      },
    },
  },
  plugins: [],
};
