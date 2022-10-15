export default (cli: any) => {
  cli.injectFeature({
    name: 'Linter / Formatter',
    value: 'linter',
    description: 'Check and enforce code quality with ESLint or Prettier',
    plugins: ['eslint'],
    checked: true,
  });
  cli.injectPrompt({
    name: 'eslintConfig',
    when: (answers: { features: string | string[] }) =>
      answers.features.includes('linter'),
    type: 'list',
    message: 'Pick a linter / formatter config:',
    description:
      'Checking code errors and enforcing an homogeoneous code style is recommended.',
    choices: () => [
      {
        name: 'ESLint with error prevention only',
        value: 'base',
        short: 'Basic',
      },
      {
        name: 'ESLint + Airbnb config',
        value: 'airbnb',
        short: 'Airbnb',
      },
      {
        name: 'ESLint + Standard config',
        value: 'standard',
        short: 'Standard',
      },
      {
        name: 'ESLint + Prettier',
        value: 'prettier',
        short: 'Prettier',
      },
    ],
  });

  cli.onPromptComplete((answers: any, options: any) => {
    if (answers.features.includes('linter')) {
      // eslint-disable-next-line no-param-reassign
      options.plugins['@m-cli/cli-plugin-eslint'] = {
        config: answers.eslintConfig,
        // lintOn: answers.lintOn
      };
    }
  });
};
