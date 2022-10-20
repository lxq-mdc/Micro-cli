import type { answersTypes } from '../../types';
import type PromptModuleAPI from '../promptModuleAPI';

export default (cli: PromptModuleAPI) => {
  cli.injectFeature({
    name: 'css-preprocessor',
    value: 'css-preprocessor',
    description: 'Add support for CSS pre-processors like Sass, Less',
  });

  cli.injectPrompt({
    name: 'cssPreprocessor',
    when: (answers: answersTypes) =>
      answers.features?.includes('css-preprocessor')!,
    type: 'list',
    message: `Pick a CSS pre-processor`,
    choices: [
      {
        name: 'Sass/SCSS (with dart-sass)',
        value: 'sass',
      },
      {
        name: 'Less',
        value: 'less',
      },
      {
        name: 'Stylus',
        value: 'stylus',
      },
    ],
  });

  cli.onPromptComplete((answers: any, options: any) => {
    if (answers.cssPreprocessor) {
      // eslint-disable-next-line no-param-reassign
      options.plugins['@micro-cli/cli-plugin-css-preprocessor'] = {};
    }
  });
};
