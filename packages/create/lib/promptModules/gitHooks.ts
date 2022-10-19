import { answersTypes } from '../../types';

export default (cli: any) => {
  cli.injectFeature({
    name: 'gitHooks',
    value: 'gitHooks',
    description: 'Review the code and ensure compliance with the submission',
  });
  cli.onPromptComplete((answers: answersTypes, options: any) => {
    if (answers.features?.includes('gitHooks')) {
      // eslint-disable-next-line no-param-reassign
      options.plugins['@m-cli/cli-plugin-gitHooks'] = {};
    }
  });
};
