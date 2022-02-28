module.exports = {
  plugins: ['cypress'],
  env: {
    browser: true,
    es2020: true,
    'cypress/globals': true,
    node: true,
  },
  globals: {
    globalThis: false,
  },
  extends: ['airbnb-base', 'plugin:cypress/recommended'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-extraneous-dependencies': 'off',
    'func-names': 'off',
  },
};
