const eslintConfigReact = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: '',
  extends: [],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: [],
};
const eslintConfigVue = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:vue/vue3-recommended',
    //   "prettier",
    //   "plugin:prettier/recommended"
  ],

  rules: {
    // override/add rules settings here, such as:
  },
};

export { eslintConfigVue, eslintConfigReact };
