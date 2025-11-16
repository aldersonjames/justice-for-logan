/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Justice for Logan brand colors
        'primary': '#FF69B4',           // Logan Pink
        'primary-light': '#FFB6D9',
        'primary-dark': '#C71585',
        'secondary': '#004C54',         // Eagles Midnight Green
        'secondary-light': '#006B76',
        'secondary-dark': '#00333A',
        'accent': '#A5ACAF',            // Eagles Silver
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Montserrat', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

