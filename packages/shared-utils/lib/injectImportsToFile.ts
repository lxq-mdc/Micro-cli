import { transformSync } from '@babel/core';
import injectImportPlugin from './injectImportPlugin';

export default (
  code: string,
  imports: Parameters<typeof injectImportPlugin>['1']
) => {
  const result = transformSync(code, {
    plugins: [[injectImportPlugin, imports]],
    parserOpts: {
      sourceType: 'unambiguous',
      plugins: ['jsx', 'typescript'],
    },
  });

  return result?.code;
};
