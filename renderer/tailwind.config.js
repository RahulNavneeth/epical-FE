const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        './renderer/pages/**/*.{js,ts,jsx,tsx}',
        './renderer/libs/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontFamily: {
            primary: ['"Montserrat"', "sans-serif"],
        },
        extend: {},
    },
    plugins: [],
}
