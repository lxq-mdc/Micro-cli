const getPromptModules = () =>
  [
    'linter',
    'cssPreprocessors',
    'typescript',
    'gitHooks',
    // eslint-disable-next-line import/no-dynamic-require, global-require
  ].map((file) => require(`./promptModules/${file}`));
export default getPromptModules;
