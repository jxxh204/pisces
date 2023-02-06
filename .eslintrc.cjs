/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  globals: {
    google: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['Btn', 'Spinner', 'Dots', 'Footer']
      }
    ],
    'at-rule-no-unknown': [
      true,
      {
          ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen']
      }
  ],
  'declaration-block-trailing-semicolon': null,
  'no-descending-specificity': null
  }
}
