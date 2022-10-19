import { transformSync } from '@babel/core';
import injectRootOptionInVuePlugin from './injectRootOptionInVuePlugin';

export default (
  code: string,
  rootOption: Parameters<typeof injectRootOptionInVuePlugin>['1']['value']
) => {
  const result = transformSync(code, {
    plugins: [[injectRootOptionInVuePlugin, { value: rootOption }]],
    parserOpts: {
      sourceType: 'unambiguous',
      plugins: ['typescript'],
    },
  });

  return result?.code || code;
};
