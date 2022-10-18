const getPromptModules = () =>
  [
    'cssPreprocessors',
    'linter',
    'typescript',
    'gitHooks',
    'router',
    // eslint-disable-next-line import/no-dynamic-require, global-require
  ].map((file) => require(`./promptModules/${file}`));
export default getPromptModules;
