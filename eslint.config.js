import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vue from 'eslint-plugin-vue';
import * as vueParser from 'vue-eslint-parser';

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    ignores: ['**/node_modules/**']
  },
  {
    files: ['**/*'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest'
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    }
  },
  eslint.configs.recommended,
  {
    files: ['**/*.vue'],
    plugins: {
      vue,
      '@typescript-eslint': tseslint
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        'File': 'readonly',
        'FileReader': 'readonly',
        'HTMLElement': 'readonly',
        'setTimeout': 'readonly',
        'clearTimeout': 'readonly',
        'console': 'readonly',
        'Event': 'readonly'
      }
    },
    rules: {
      ...vue.configs.base.rules,
      'vue/comment-directive': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'warn',
      'vue/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        'ignoreRestSiblings': true,
        'varsIgnorePattern': '^_|props|emit',
        'argsIgnorePattern': '^_|e|evt|event|value',
        'vars': 'all'
      }]
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        'ImportMetaEnv': 'readonly',
        'ImportMeta': 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'warn',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    },
  }
];

export default config;
