/** @type {import('tailwindcss').Config} */
export default {
  content: [  "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        figtree: ['Figtree', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
