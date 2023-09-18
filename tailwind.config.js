/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#DE6F4C',
        'primary-600': '#CE5F3C',
        'primary-500': '#BE4F2C',
        'secondary': '#FFFFFF'
      },
      fontSize: {
        sm: '14px',
        md: '16px',
        base: '18px',
        xl: '25px',
        '2xl': '38px',
      }
    },
  },
  plugins: [],
}
