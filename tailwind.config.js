/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#003478',
          light: '#004a9c',
          dark: '#002356',
        },
        secondary: {
          DEFAULT: '#FFD100',
          light: '#FFE066',
          dark: '#CCAA00',
        },
        accent: {
          DEFAULT: '#0066CC',
          light: '#3388DD',
          dark: '#0055AA',
        },
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

