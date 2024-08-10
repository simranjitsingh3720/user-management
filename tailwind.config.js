/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      width: {
        49: '48%',
      },
      colors: {
        cornFlower: '#18478b',
        fiord: '#465465',
        denim: '#185EC4',
        persianRed: '#d32f2f',
        linkWater: '#ECF2FB',
        blueHaze: '#C5CFDE',
        silverChalice: '#a2a2a2',
        shuttleGray: '#566475',
        bittersweet: '#d32f2f',
        shadowColor: '#185ec414',
        'custom-red': '#fd6262',
        'custom-gray': '#2F374180',
      },
      fontSize: {
        normal: '15px',
      },
    },
  },
  plugins: [],
};
