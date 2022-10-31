import { answersTypes } from '@micro-cli/create/types';

const config = (answers: answersTypes) => {
  const { eslintConfig, preset } = answers;
  const isHasTypeScript = answers.features?.includes('TypeScript');
  const defaultConfig: {
    [index: string]: any;
  } = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      `plugin:${
        preset === 'React' ? 'React/recommended' : 'vue/vue3-essential'
      }`,
      `${eslintConfig}`,
    ],
    overrides: [],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: [`${preset.toLowerCase()}`],
    rules: {},
  };

  if (eslintConfig === 'airbnb' && preset === 'Vue') {
    defaultConfig.extends = ['plugin:vue/vue3-essential', 'airbnb-base'];
  }
  if (eslintConfig === 'base') {
    defaultConfig.extends[1] = 'eslint:recommended';
  }
  if (isHasTypeScript) {
    if (eslintConfig === 'standard') {
      defaultConfig.extends[1] = 'standard-with-typescript';
    } else if (eslintConfig === 'xo') {
      defaultConfig.extends[1] = 'xo';
      defaultConfig.overrides.push({
        extends: ['xo-typescript'],
        files: ['*.ts', '*.tsx'],
      });
    }
  }

  return defaultConfig;
};
export default config;
