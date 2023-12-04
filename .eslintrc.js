module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript',
  ],
  plugins: ['nuxt'],
  // add your custom rules here
  rules: {
    // https://eslint.org/docs/rules/generator-star-spacing
    'generator-star-spacing': 'off',
    // https://eslint.org/docs/rules/no-unused-vars#options
    'no-unused-vars': 'off',

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
    '@typescript-eslint/no-empty-function': 'off',
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    '@typescript-eslint/no-unused-vars': 'off',
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
    '@typescript-eslint/explicit-function-return-type': 'off',
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
    '@typescript-eslint/no-explicit-any': 'off',
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
    '@typescript-eslint/ban-types': 'off',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md
    'import/no-mutable-exports': 'off',
    'space-before-function-paren': 'off',
    'comma-dangle': 'off',
  },
  parserOptions: {
    // 다른 설정...
    types: ['@nuxt/types'],
  },
  globals: {
    Kakao: true,
  },
}
