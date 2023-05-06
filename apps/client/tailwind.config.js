/** @type {import('tailwindcss').Config} \*/
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-inter)"],
			},
			colors: {
				primaryWhite: "#FFFEFF",
				secondaryWhite: "#F7F8FB",
				tertiaryWhite: "#F9F8FB",
				gray: "#E2E0E2",
				darkGray: "#817981",
			},
		},
	},
	plugins: [],
};
