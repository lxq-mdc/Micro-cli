import { transformSync } from '@babel/core';
import injectImportPlugin from './injectImportPlugin';
import useHookInReactPlugin from './useHookInReactPlugin';

export default (
  code: string,
  imports: Parameters<typeof injectImportPlugin>['1'],
  hook: Parameters<typeof useHookInReactPlugin>['1']
) => {
  const result = transformSync(code, {
    plugins: [
      [injectImportPlugin, imports],
      [useHookInReactPlugin, hook],
    ],
    parserOpts: {
      sourceType: 'unambiguous',
      plugins: ['jsx', 'typescript'],
    },
  });

  return result?.code || code;
};
