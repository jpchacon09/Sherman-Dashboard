/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sherman-primary': '#3b82f6',
        'sherman-secondary': '#8b5cf6',
        'sherman-accent': '#10b981',
      },
    },
  },
  plugins: [],
}
