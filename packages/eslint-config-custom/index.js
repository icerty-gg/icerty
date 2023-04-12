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
		"import/order": "error",
		"react/display-name": "off",

		// This fixes React hook form handleSubmit(onSubmit)
		"@typescript-eslint/no-misused-promises": [
			2,
			{
				checksVoidReturn: {
					attributes: false,
				},
			},
		],
	},
};
