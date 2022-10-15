export default (api: any, options: any, answers: any) => {
  const hasTypeScript = answers.features.includes('TypeScript');
  if (answers.preset === 'React') {
    if (hasTypeScript) {
      api.render('./template/template-react-ts', { plugin: 'cli-service' });
      // api.extendPackage({
      //     "devDependencies": {
      //         "typescript": "^4.6.4"
      //     }
      // })
    } else {
      api.render('./template/template-react', { plugin: 'cli-service' });
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
      // api.extendPackage({
      //     "devDependencies": {
      //         "typescript": "^4.6.4",
      //         "vue-tsc": "^0.40.4"
      //     }
      // })
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
