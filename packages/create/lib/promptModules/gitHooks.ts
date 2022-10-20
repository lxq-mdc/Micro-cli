import type { answersTypes } from '../../types';
import type PromptModuleAPI from '../promptModuleAPI';

export default (cli: PromptModuleAPI) => {
  cli.injectFeature({
    name: 'gitHooks',
    value: 'gitHooks',
    description: 'Review the code and ensure compliance with the submission',
  });
  cli.onPromptComplete((answers: answersTypes, options: any) => {
    if (answers.features?.includes('gitHooks')) {
      // eslint-disable-next-line no-param-reassign
      options.plugins['@micro-cli/cli-plugin-git-hooks'] = {};
    }
  });
};
