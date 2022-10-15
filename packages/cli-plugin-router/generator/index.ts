export default (api: any, options: any, answers: any) => {
  const hasTypeScript = answers.features.includes('TypeScript');
  if (hasTypeScript && answers.preset === 'React') {
    api.render('./template/template-react-ts', { plugin: 'cli-plugin-router' });
    api.extendPackage({
      devDependencies: {
        'react-router-dom': '^4.6.4',
      },
    });
  } else {
    api.render('./template/template-vue-ts', { plugin: 'cli-plugin-router' });
    api.extendPackage({
      devDependencies: {
        typescript: '^4.6.4',
        'vue-tsc': '^0.40.4',
      },
    });
  }
};
