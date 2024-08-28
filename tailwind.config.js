/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'level1': '0 4px 14px 0 #00000044',
        'level2': '0 4px 14px 0 #00000020',
        'level2-bottom': '0 4px 14px 0 rgba(0, 0, 0, 0.2)'
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        poppins: ["Poppins", "sans-serif"]
      },
    },
  },
  plugins: [],
}

