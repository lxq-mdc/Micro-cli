module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': 0,
    'max-len': 0,
    'import/extensions': [
      // 这个是解决不写后缀报错的问题
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        json: 'never',
      },
    ],
    'import/no-extraneous-dependencies': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '/json'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
