export default (cli: any) => {
  cli.injectFeature({
    name: 'TypeScript',
    value: 'TypeScript',
    description: 'Add support for the TypeScript language',
  });
  cli.onPromptComplete((answers: any, options: any) => {
    if (answers.features.includes('TypeScript')) {
      // eslint-disable-next-line no-param-reassign
      options.plugins['@m-cli/cli-plugin-typescript'] = {};
    }
  });
};
