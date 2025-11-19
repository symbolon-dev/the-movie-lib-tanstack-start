import { defineConfig } from 'eslint/config';
import { tanstackConfig } from '@tanstack/eslint-config';

import reactHooks from 'eslint-plugin-react-hooks';
import reactPlugin from '@eslint-react/eslint-plugin';
import pluginA11y from 'eslint-plugin-jsx-a11y';
import unicorn from 'eslint-plugin-unicorn';
import prettier from 'eslint-config-prettier';

import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginRouter from '@tanstack/eslint-plugin-router';

const config = defineConfig([
    ...tanstackConfig,

    ...pluginQuery.configs['flat/recommended'],

    ...pluginRouter.configs['flat/recommended'],

    reactHooks.configs.flat.recommended,

    reactPlugin.configs['recommended-type-checked'],

    {
        files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.jsx'],
        plugins: {
            'unicorn': unicorn,
        },
        rules: {
            'prefer-const': 'error',
            'no-param-reassign': 'error',
            'no-else-return': 'error',
            'no-return-await': 'error',
            'object-shorthand': ['error', 'always'],
            'prefer-template': 'error',
            'prefer-arrow-callback': 'error',
            'arrow-body-style': ['error', 'as-needed'],
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'ForStatement',
                    message: 'For loops are not allowed. Use iterable methods or for..of loops instead.',
                },
            ],
            'unicorn/no-array-for-each': 'error',
            'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
            'no-unsafe-optional-chaining': 'error',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-var': 'error',
            'no-nested-ternary': 'error',
            'no-unneeded-ternary': 'error',
            'yoda': 'error',
            'curly': ['error', 'all'],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': ['error', {
                'argsIgnorePattern': '^_',
                'varsIgnorePattern': '^_',
                'ignoreRestSiblings': true
            }],
            '@typescript-eslint/no-shadow': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/consistent-type-imports': ['error', { 'prefer': 'type-imports' }],
            '@typescript-eslint/no-unnecessary-condition': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/prefer-nullish-coalescing': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/switch-exhaustiveness-check': 'error',
            '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
            '@typescript-eslint/no-invalid-void-type': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',
            'unicorn/filename-case': ['error', { cases: { kebabCase: true, pascalCase: true } }],
        },
    },

    {
        files: ['**/*.jsx', '**/*.tsx'],
        plugins: {
            'jsx-a11y': pluginA11y,
        },
        rules: {
            'jsx-a11y/alt-text': 'error',
            'jsx-a11y/anchor-has-content': 'error',
            'jsx-a11y/label-has-associated-control': 'error',
            'jsx-a11y/no-redundant-roles': 'error',
            'jsx-a11y/no-static-element-interactions': 'error',
            'jsx-a11y/click-events-have-key-events': 'error',
            'jsx-a11y/tabindex-no-positive': 'error',
            'jsx-a11y/heading-has-content': 'error',
            'jsx-a11y/aria-props': 'error',
            'jsx-a11y/aria-role': 'error',
            'jsx-a11y/aria-unsupported-elements': 'error',
        },
    },
    
    prettier,
]);

export default config;
