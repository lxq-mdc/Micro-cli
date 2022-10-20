import type { answersTypes } from '../../types';
import type PromptModuleAPI from '../promptModuleAPI';

export default (cli: PromptModuleAPI) => {
  cli.injectFeature({
    name: 'TypeScript',
    value: 'TypeScript',
    description: 'Add support for the TypeScript language',
  });
  cli.onPromptComplete((answers: answersTypes, options: any) => {
    if (answers.features?.includes('TypeScript')) {
      // eslint-disable-next-line no-param-reassign
      options.plugins['@m-cli/cli-plugin-typescript'] = {};
    }
  });
};
