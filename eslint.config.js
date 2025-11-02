import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';

export default [
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            '**/*.min.js',
            'coverage/**',
            '.git/**',
        ],
    },
    js.configs.recommended,
    // Node.js JavaScript config files (esbuild)
    {
        files: ['*.js', '*.config.js'],
        languageOptions: {
            globals: {
                console: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                require: 'readonly',
                module: 'readonly',
                exports: 'readonly',
            },
            sourceType: 'module',
        },
        rules: {
            'no-console': 'off',
            'no-unused-vars': 'warn',
        },
    },
    // Node.js TypeScript config files (jest.config.ts, scripts)
    {
        files: ['*.config.ts', 'scripts/**/*.ts'],
        languageOptions: {
            parser: tsparser,
            globals: {
                console: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
            },
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 2023,
            },
        },
        rules: {
            'no-console': 'off',
        },
    },
    // TypeScript source files (production code only)
    {
        files: ['src/**/*.ts', 'src/**/*.tsx'],
        ignores: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/*.spec.ts', 'src/**/*.spec.tsx'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                project: './tsconfig.json',
                sourceType: 'module',
                ecmaVersion: 2023,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            import: importPlugin,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            ...importPlugin.configs.recommended.rules,
            ...prettier.rules,
            'no-unused-vars': 'warn',
            'import/order': ['warn', { 'newlines-between': 'always' }],
            '@typescript-eslint/no-unused-vars': ['warn'],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
    },
    // TypeScript test files
    {
        files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                project: './tsconfig.test.json',
                sourceType: 'module',
                ecmaVersion: 2023,
            },
            globals: {
                console: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                test: 'readonly',
                expect: 'readonly',
                beforeAll: 'readonly',
                beforeEach: 'readonly',
                afterAll: 'readonly',
                afterEach: 'readonly',
                jest: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            import: importPlugin,
            jest,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            ...importPlugin.configs.recommended.rules,
            ...prettier.rules,
            ...jest.configs.recommended.rules,
            'no-unused-vars': 'warn',
            'import/order': ['warn', { 'newlines-between': 'always' }],
            '@typescript-eslint/no-unused-vars': ['warn'],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'no-console': 'off',
        },
    },
];
