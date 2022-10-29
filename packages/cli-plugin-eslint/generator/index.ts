import fs from 'node:fs';
import GeneratorAPI from '@micro-cli/create/lib/GeneratorAPI';
import { answersTypes } from '@micro-cli/create/types';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'url';
import { getDeps } from './eslintDeps';
import config from './eslintOptions';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

export default (api: GeneratorAPI, options: any, answers: answersTypes) => {
  const devDependencies = getDeps(answers);
  const eslintConfigFinal = config(answers);
  fs.writeFileSync(
    path.resolve(__dirname, '../template/.eslintrc'),
    JSON.stringify(eslintConfigFinal, null, 2)
  );
  api.render('../template', { plugin: 'cli-plugin-eslint' });
  api.extendPackage({
    devDependencies: {
      ...devDependencies,
    },
  });
};
