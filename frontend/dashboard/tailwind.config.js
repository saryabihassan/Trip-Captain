import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        in: 'animate-in .5s ease-out',
        'in-reverse': 'animate-in-reverse .5s ease-out'
      }
    },
  },
  plugins: [
    tailwindcssAnimate
  ],
}
