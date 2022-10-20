import { chalk } from '@m-cli/shared-utils';
import type { answersTypes } from '../../types';
import type PromptModuleAPI from '../promptModuleAPI';

export default (cli: PromptModuleAPI) => {
  cli.injectFeature({
    name: 'Router',
    value: 'router',
    description: 'Structure the app with dynamic pages',
  });

  cli.injectPrompt({
    name: 'historyMode',
    when: (answers: answersTypes) => answers.features?.includes('router')!,
    type: 'confirm',
    message: `Use history mode for router? ${chalk.yellow(
      `(Requires proper server setup for index fallback in production)`
    )}`,
    description: `By using the HTML5 History API, the URLs don't need the '#' character anymore.`,
  });

  cli.onPromptComplete((answers: answersTypes, options: any) => {
    if (answers.features?.includes('router')) {
      // eslint-disable-next-line no-param-reassign
      options.plugins['@m-cli/cli-plugin-router'] = {};
    }
  });
};
