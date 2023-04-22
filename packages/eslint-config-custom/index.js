/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	extends: [
		"next",
		"next/core-web-vitals",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"prettier",
	],
	parserOptions: {
		project: ["tsconfig.json"],
	},
	ignorePatterns: ["build/", ".turbo/", "dist/", "node_modules/", "*.js", "*.jsx"],
	rules: {
		// import order rules
		"import/order": [
			"error",
			{
				"newlines-between": "always",
				alphabetize: { order: "asc" },
				groups: ["builtin", "external", "parent", "sibling", "index", "type"],
			},
		],

		// Using nextjs appdir
		"@next/next/no-html-link-for-pages": "off",

		// react rules
		"react/display-name": "off",

		// Fastify async plugins
		"@typescript-eslint/require-await": "off",

		// Doesn't work well with React hook form handleSubmit(onSubmit) and fastify
		"@typescript-eslint/no-misused-promises": "off",
	},
};
