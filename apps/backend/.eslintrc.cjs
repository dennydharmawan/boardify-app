/* eslint-disable no-undef */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'typescript-paths', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:typescript-paths/recommended'
  ],
  rules: {
    'typescript-paths/absolute-parent-import': 'off',
    'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/no-cycle': 'error',
    'import/no-unresolved': 'off',
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-named-as-default': 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  ignorePatterns: ['dist', 'node_modules', 'coverage', 'sequelize']
};
