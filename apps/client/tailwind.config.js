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
			keyframes: {
				ripple: {
					"0%": { width: "0", height: "0", opacity: "1" },
					"100%": { width: "80rem", height: "80rem", opacity: "0" },
				},
			},
		},
	},
	plugins: [],
};
