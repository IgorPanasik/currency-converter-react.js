import eslintJs from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
	{
		files: ['**/*.{ts,tsx}'],
		ignores: ['dist'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		plugins: {
			react: reactPlugin,
		},
		settings: {
			react: { version: 'detect' },
		},
		extends: [
			eslintJs.configs.recommended,
			...tseslint.configs.recommended,
			reactPlugin.configs.flat.recommended,
			reactPlugin.configs.flat['jsx-runtime'],
			reactHooks.configs.flat.recommended,
		],
		rules: {
			'react/jsx-no-duplicate-props': 'error',
			'react/jsx-key': 'error',
			'react/display-name': 'error',
		},
	},
]);
