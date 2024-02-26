/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/Components/Home/Home.{html,js}",
        "./src/Components/loginsignup/Login.{html,js}",  
],
  theme: {
    extend: {
      columns: {
        '4xs': '14rem',
      }
    },
  },
  plugins: [],
}

