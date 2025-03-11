module.exports = {
  root: true,
  env: {
      es6: true,
      node: true,
  },
  extends: [
      'eslint:recommended',
      'google',
  ],
  rules: {
      'quotes': ['error', 'single'],
      'no-unused-vars': 'warn',
      'indent': ['error', 4],
  },
  parserOptions: {
      ecmaVersion: 2020,
  },
};