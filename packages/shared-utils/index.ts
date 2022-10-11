// import chalk from 'chalk';
// import chalk from 'chalk';
// import semver from 'semver';
// import log from './lib/log';

// export default {
//     log ,
//     chalk,
//     semver
// };

// eslint-disable-next-line import/prefer-default-export
import exit from './lib/exit';
import { compile, writeToFile } from './lib/compile';
import extendPackage from './lib/extendPackage';

export { exit, compile, writeToFile, extendPackage };
export { default as chalk } from 'chalk';
export { default as semver } from 'semver';
export { isRoot, isTypescript } from './lib/is';
export { default as projectType } from './lib/projectType';
export {
  errorLog,
  errorLogWithBg,
  successLog,
  successLogWithBg,
} from './lib/logWithChalk';
export { default as ensureDir } from './lib/ensureDir';
export { default as ensureFile } from './lib/ensureFile';
// export { default as renderFile } from './lib/renderFile';
