export default (cli: any) => {
  cli.injectFeature({
    name: 'TypeScript',
    value: 'TypeScript',
    description: 'Add support for the TypeScript language',
  });
};
