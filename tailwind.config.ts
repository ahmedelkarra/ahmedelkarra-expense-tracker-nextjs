/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        mainButton: '#3572EF',
        secondButton: '#3ABEF9',
      },
      borderColor: {
        mainButton: '#71C9CE',
        secondButton: '#A6E3E9',
      },
      borderWidth: {
        mainBorder: '1px'
      },
      textColor: {
        mainButton: '#ffffff',
        secondButton: '#ffffff',
      },
    },
  },
  plugins: [],
}