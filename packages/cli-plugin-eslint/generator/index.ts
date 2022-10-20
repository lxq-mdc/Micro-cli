import fs from 'node:fs';
import GeneratorAPI from '@m-cli/create/lib/GeneratorAPI';
import { answersTypes } from '@m-cli/create/types';
import path from 'node:path';
import { getDeps } from './eslintDeps';
import config from './eslintOptions';

export default (api: GeneratorAPI, options: any, answers: answersTypes) => {
  const devDependencies = getDeps(answers);
  const eslintConfigFinal = config(answers);
  fs.writeFileSync(
    path.resolve(__dirname, './template/.eslintrc'),
    JSON.stringify(eslintConfigFinal, null, 2)
  );
  api.render('./template', { plugin: 'cli-plugin-eslint' });
  api.extendPackage({
    devDependencies: {
      ...devDependencies,
    },
  });
};
