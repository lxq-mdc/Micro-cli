import { answersTypes } from '@micro-cli/create/types';

const config = (answers: answersTypes) => {
  const { eslintConfig, preset } = answers;
  const isHasTypeScript = answers.features?.includes('TypeScript');
  const defaultConfig: {
    [index: string]: any;
  } = {
    root: true,
    env: {
      browser: true,
      commonjs: true,
      es6: true,
      node: true,
      jest: true,
    },
    extends: [
      'eslint:recommended',
      `plugin:${preset.toLocaleLowerCase()}/recommended`,
    ] as Array<string>,
  };
  if (eslintConfig === 'airbnb') {
    defaultConfig.extends.push('airbnb');
  } else if (eslintConfig === 'standard') {
    defaultConfig.extends.push('standard');
  } else {
    defaultConfig.extends.push('plugin:prettier/recommended');
  }
  const parserOptions = {
    parser: 'Babel-eslint',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  };
  if (isHasTypeScript) {
    defaultConfig.extends.push('plugin:@typescript-eslint/recommended');
    if (preset === 'React') {
      defaultConfig.parser = '@typescript-eslint/parser';
    } else {
      defaultConfig.parserOptions = Object.assign(parserOptions, {
        parser: '@typescript-eslint/parser',
      });
    }
  } else if (preset === 'React') {
    defaultConfig.parser = 'babel-eslint';
  } else {
    defaultConfig.parserOptions = parserOptions;
  }

  return defaultConfig;
};
export default config;
