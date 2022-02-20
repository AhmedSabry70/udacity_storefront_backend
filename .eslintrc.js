module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',

		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',

		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 13,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'prettier/prettier': 2, // Means error
		semi: ['error', 'always'],
		quotes: ['error', 'single'],
		'prettier/prettier': 2, // Means error
		'no-console': 0, // Means warning
		'no-var': 'error',
		'prefer-const': 'error',
		'@typescript-eslint/ban-ts-comment': 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['off'],
		'@typescript-eslint/ban-types': [
			'error',
			{
				types: {
					String: false,
					// Boolean: false,
					// Number: false,
					// Symbol: false,
					// '{}': false,
					// Object: false,
					// object: false,
					// Function: false,
				},
				extendDefaults: true,
			},
		],
	},
};
