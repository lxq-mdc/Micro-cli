export default (cli: any) => {
  cli.injectFeature({
    name: 'css-preprocessor',
    value: 'css-preprocessor',
    description: 'Add support for CSS pre-processors like Sass, Less',
  });
  cli.injectPrompt({
    name: 'cssPreprocessor',
    when: (answers: { features: string | string[] }) =>
      answers.features.includes('css-preprocessor'),
    type: 'list',
    message: `Pick a CSS pre-processor`,
    choices: [
      {
        name: 'Sass/SCSS (with dart-sass)',
        value: 'dart-sass',
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
};
