/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
// import {createRequire} from 'module'
// // import path from 'path';
// // import path from 'path';
// import { fileURLToPath } from 'url';

// // // eslint-disable-next-line no-underscore-dangle
// const filename = fileURLToPath(import.meta.url);
// // const dirname = path.dirname(filename);
// const myRequire=createRequire(filename)
const getPromptModules = () =>
  ['cssPreprocessors', 'linter', 'typescript', 'gitHooks'].map((file) =>
    require(`./promptModules/${file}`)
  );
export default getPromptModules;
