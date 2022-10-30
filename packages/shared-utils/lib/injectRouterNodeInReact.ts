import { transformSync } from '@babel/core';
import injectRouterInReactPlugin from './injectRouterNodeInReactPlugin';

export default (
  code: string,
  router: Parameters<typeof injectRouterInReactPlugin>['1']['router']
) => {
  const result = transformSync(code, {
    plugins: [[injectRouterInReactPlugin, { router }]],
    parserOpts: {
      sourceType: 'unambiguous',
      plugins: ['typescript', 'jsx'],
    },
  });

  return result?.code || code;
};
