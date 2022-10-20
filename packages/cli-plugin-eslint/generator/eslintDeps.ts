import { answersTypes } from '@m-cli/create/types';

type Index = 'common' | 'base' | 'airbnb' | 'standard';

const DEPS_MAP: {
  [index: string]: {
    // eslint-disable-next-line no-unused-vars
    [k in Index]?: {
      [index: string]: string;
    };
  };
} = {
  React: {
    common: {
      prettier: '^2.7.1',
      eslint: '^8.20.0',
      'eslint-config-prettier': '^8.5.0',
      'eslint-plugin-babel': '^5.3.1',
      'eslint-plugin-prettier': '^4.2.1',
      'eslint-plugin-react': '^7.30.1',
      'eslint-plugin-react-hooks': '^4.6.0',
    },
    base: {
      'babel-eslint': '^10.1.0',
      'eslint-plugin-html': '^7.1.0',
    },
    airbnb: {
      'eslint-config-airbnb': '^19.0.4',
      'eslint-plugin-import': '^2.26.0',
      'eslint-plugin-jsx-a11y': '^6.6.1',
    },
    standard: {
      'eslint-config-standard': '^17.0.0',
      'eslint-config-standard-react': '^11.0.1',
      'eslint-plugin-import': '^2.26.0',
      'eslint-plugin-n': '^15.0.0',
      'eslint-plugin-node': '^11.1.0',
      'eslint-plugin-promise': '^6.1.0',
      'eslint-plugin-standard': '^5.0.0',
    },
  },
  Vue: {
    common: {
      eslint: '^8.23.0',
      'eslint-plugin-vue': '^9.4.0',
    },
    base: {
      prettier: '^2.7.1',
      'eslint-config-prettier': '^8.5.0',
      'eslint-plugin-prettier': '^4.2.1',
    },
    airbnb: {
      'eslint-config-airbnb-base': '^15.0.0',
      'eslint-plugin-import': '^2.25.2',
    },
    standard: {
      'eslint-config-standard': '^17.0.0',
      'eslint-plugin-import': '^2.25.2',
      'eslint-plugin-n': '^15.0.0',
      'eslint-plugin-promise': '^6.0.0',
    },
  },
  TypeScript: {
    common: {
      '@typescript-eslint/eslint-plugin': '^5.30.7',
      '@typescript-eslint/parser': '^5.30.7',
    },
  },
};
const getDeps = (answers: answersTypes) => {
  const { eslintConfig, preset } = answers;
  const deps = {
    ...DEPS_MAP[preset].common,
    ...DEPS_MAP[preset][eslintConfig! as Index],
  };
  if (answers.features?.includes('TypeScript')) {
    Object.assign(deps, DEPS_MAP.TypeScript.common);
  }

  return deps;
};
export { DEPS_MAP, getDeps };
