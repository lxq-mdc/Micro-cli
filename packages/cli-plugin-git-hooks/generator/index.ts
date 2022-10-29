import GeneratorAPI from '@micro-cli/create/lib/GeneratorAPI';

export default (api: GeneratorAPI) => {
  api.extendPackage({
    scripts: {
      prepare: 'husky install',
      lint: 'lint-staged',
    },
    devDependencies: {
      husky: '^8.0.1',
      'cz-conventional-changelog': '^3.3.0',
      'lint-staged': '^13.0.3',
    },
    husky: {
      hooks: {
        'pre-commit': 'lint-staged',
      },
    },
    config: {
      commitizen: {
        path: './node_modules/cz-conventional-changelog',
      },
    },
    'lint-staged': {
      '*.{js,css,md,tsx,ts,less,json,vue}': 'prettier --write',
    },
  });
  api.render('../template', { plugin: 'cli-plugin-gitHooks' });
};
