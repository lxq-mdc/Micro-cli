export default (cli: any) => {
  cli.injectFeature({
    name: 'Prettier',
    value: 'Prettier',
    message: 'Check and enforce code quality with  Prettier',
  });
  cli.onPromptComplete((answers: any, options: any) => {
    if (answers.features.includes('prettier')) {
      // eslint-disable-next-line no-param-reassign
      options.plugins['@vue/cli-plugin-prettier'] = {};
    }
  });
};
