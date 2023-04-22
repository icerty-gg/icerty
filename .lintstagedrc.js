module.exports = {
	"*.{js,jsx,ts,tsx,yml,yaml,css,scss,json}": [() => "pnpm format"],
	"*.{js,jsx,ts,tsx}": [() => "pnpm lint:fix"],
};
