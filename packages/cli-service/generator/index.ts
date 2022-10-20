import GeneratorAPI from '@m-cli/create/lib/GeneratorAPI';
import { answersTypes } from '@m-cli/create/types';

export default (api: GeneratorAPI, options: any, answers: answersTypes) => {
  const hasTypeScript = answers.features?.includes('TypeScript');
  if (answers.preset === 'React') {
    if (hasTypeScript) {
      api.render('./template/template-react-ts', { plugin: 'cli-service' });
    } else {
      api.render('./template/template-react', {
        plugin: 'cli-service',
        data: {
          name: 'micro_cli',
        },
      });
    }

    api.extendPackage({
      scripts: {
        dev: 'vite',
        build: hasTypeScript ? 'tsc && vite build' : 'vite build',
        preview: 'vite preview',
      },
      dependencies: {
        react: '^18.2.0',
        'react-dom': '^18.2.0',
      },
      devDependencies: {
        '@types/react': '^18.0.17',
        '@types/react-dom': '^18.0.6',
        '@vitejs/plugin-react': '^2.1.0',
        vite: '^3.1.0',
      },
    });
  } else if (answers.preset === 'Vue') {
    if (hasTypeScript) {
      api.render('./template/template-vue-ts', { plugin: 'cli-service' });
    } else {
      api.render('./template/template-vue', { plugin: 'cli-service' });
    }
    api.extendPackage({
      scripts: {
        dev: 'vite',
        build: hasTypeScript ? 'vue-tsc --noEmit && vite build' : 'vite build',
        preview: 'vite preview',
      },
      dependencies: {
        vue: '^3.2.37',
      },
      devDependencies: {
        '@vitejs/plugin-vue': '^3.1.0',
        vite: '^3.1.0',
      },
    });
  }
};
