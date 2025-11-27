/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blucia-dark': '#3b0064',
        'blucia-medium': '#5a0080',
        'blucia-light': '#7d00a3',
        'blucia-accent': '#a855f7',
        'blucia-white': '#f3f4f6',
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #3b0064 0%, #5a0080 50%, #7d00a3 100%)',
        'gradient-purple-light': 'linear-gradient(135deg, #5a0080 0%, #7d00a3 50%, #a855f7 100%)',
      },
    },
  },
  plugins: [],
}

