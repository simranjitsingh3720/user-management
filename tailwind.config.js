/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      width :{
        49: '48%', 
      },
      colors: {
        cornFlower: '#18478b',
        fiord: '#465465',
        denim: "#185EC4",
        persianRed: "#d32f2f",
        linkWater: "#ECF2FB",
        blueHaze: "#C5CFDE",
      }
    },
  },
  plugins: [],
}

