import { answersTypes } from '@micro-cli/create/types';

type Index = 'common' | 'base' | 'airbnb' | 'standard' | 'xo';

const getDeps = (answers: answersTypes) => {
  const { eslintConfig, preset } = answers;

  const DEPS_MAP: {
    [index: string]: {
      // eslint-disable-next-line no-unused-vars
      [k in Index]?: {
        [index: string]: string;
      };
    };
  } = {
    React: {
      base: {
        'babel-eslint': '^10.1.0',
        'eslint-plugin-html': '^7.1.0',
        prettier: '^2.7.1',
        eslint: '^8.0.1',
        'eslint-plugin-react': '^7.31.10',
      },
      xo: {
        'eslint-config-xo': '^0.42.0',
        'eslint-plugin-react': '^7.31.10',
        ...(answers.features?.includes('TypeScript')
          ? {
              '@typescript-eslint/eslint-plugin': '>=5.31.0',
              '@typescript-eslint/parser': '>=5.31.0',
              'eslint-config-xo-typescript': '^0.53.0',
              eslint: '>=8.0.0',
            }
          : {
              eslint: '>=8.14.0',
            }),
      },
      airbnb: {
        eslint: '^7.32.0 || ^8.2.0',
        'eslint-config-airbnb': '^19.0.4',
        'eslint-plugin-import': '^2.25.3',
        'eslint-plugin-jsx-a11y': '^6.5.1',
        'eslint-plugin-react-hooks': '^4.3.0',
        'eslint-plugin-react': '^7.28.0',
      },
      standard: {
        'eslint-plugin-import': '^2.25.2',
        'eslint-plugin-n': '^15.0.0',
        'eslint-plugin-promise': '^6.0.0',
        'eslint-plugin-react': '^7.31.10',
        eslint: '^8.0.1',
        ...(answers.features?.includes('TypeScript')
          ? {
              '@typescript-eslint/eslint-plugin': '^5.0.0',
              'eslint-config-standard-with-typescript': '^23.0.0',
            }
          : {
              'eslint-config-standard': '^17.0.0',
            }),
      },
    },
    Vue: {
      base: {
        prettier: '^2.7.1',
        'eslint-config-prettier': '^8.5.0',
        'eslint-plugin-prettier': '^4.2.1',
        eslint: '^8.23.0',
        'eslint-plugin-vue': '^9.4.0',
      },
      airbnb: {
        eslint: '^7.32.0 || ^8.2.0',
        'eslint-config-airbnb-base': '^15.0.0',
        'eslint-plugin-import': '^2.25.2',
        'eslint-plugin-vue': '^9.6.0',
      },
      xo: {
        'eslint-plugin-vue': '^9.6.0',
        eslint: '>=8.0.0',
        'eslint-config-xo': '^0.42.0',
        ...(answers.features?.includes('TypeScript')
          ? {
              '@typescript-eslint/eslint-plugin': '>=5.31.0',
              '@typescript-eslint/parser': '>=5.31.0',
              'eslint-config-xo-typescript': '^0.53.0',
            }
          : null),
      },
      standard: {
        eslint: '^8.0.1',
        'eslint-plugin-vue': '^9.6.0',
        'eslint-plugin-import': '^2.25.2',
        'eslint-plugin-n': '^15.0.0',
        'eslint-plugin-promise': '^6.0.0',
        ...(answers.features?.includes('TypeScript')
          ? {
              '@typescript-eslint/eslint-plugin': '^5.0.0',
              'eslint-config-standard-with-typescript': '^23.0.0',
            }
          : {
              'eslint-config-standard': '^17.0.0',
            }),
      },
    },
  };

  const deps = {
    ...DEPS_MAP[preset][eslintConfig! as Index],
  };
  return deps;
};
export default getDeps;
