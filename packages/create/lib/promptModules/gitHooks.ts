export default (cli: any) => {
  cli.injectFeature({
    name: 'gitHooks',
    value: 'gitHooks',
    description: 'Review the code and ensure compliance with the submission',
  });
};
