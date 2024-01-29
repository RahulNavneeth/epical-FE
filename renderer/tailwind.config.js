const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        './renderer/pages/**/*.{js,ts,jsx,tsx}',
        './renderer/libs/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontFamily: {
            primary: ["Times New Roman", "Times", "serif"],
        },
        extend: {},
    },
    plugins: [],
}
