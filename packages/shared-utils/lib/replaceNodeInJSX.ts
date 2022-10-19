import { transformSync } from '@babel/core';
import replaceNodeInJSXPlugin from './replaceNodeInJSXPlugin';

export default (
  code: string,
  option: Parameters<typeof replaceNodeInJSXPlugin>['1']
) => {
  const result = transformSync(code, {
    plugins: [[replaceNodeInJSXPlugin, option]],
    parserOpts: {
      sourceType: 'unambiguous',
      plugins: ['jsx', 'typescript'],
    },
  });

  return result?.code || code;
};
