import nx from '@nx/eslint-plugin';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
	...nx.configs['flat/base'],
	...nx.configs['flat/typescript'],
	...nx.configs['flat/javascript'],
	eslintPluginPrettierRecommended,
	{
		ignores: ['**/dist', '**/out-tsc']
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		rules: {
			'@nx/enforce-module-boundaries': [
				'error',
				{
					enforceBuildableLibDependency: true,
					allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
					depConstraints: [
						{
							sourceTag: '*',
							onlyDependOnLibsWithTags: ['*']
						}
					]
				}
			]
		}
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
		// Override or add rules here
		rules: {
			'@typescript-eslint/recommended-type-checked': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/explicit-function-return-type': [
				'warn',
				{
					allowedNames: ['toPrimitives']
				}
			],
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					ignoreRestSiblings: true,
					caughtErrors: 'none'
				}
			],
			'prettier/prettier': [
				'warn',
				{
					useTabs: true,
					indentSize: 4,
					singleQuote: true,
					trailingComma: 'none',
					printWidth: 120,
					semi: true,
					bracketSpacing: true,
					bracketSameLine: true,
					arrowParens: 'always',
					parser: 'typescript',
					endOfLine: 'lf'
				}
			]
		}
	}
];
