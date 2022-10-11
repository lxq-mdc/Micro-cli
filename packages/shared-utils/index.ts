export { default as exit } from './lib/exit';
export { compile, writeToFile } from './lib/compile';
export { default as extendPackage } from './lib/extendPackage';
// export { exit, compile, writeToFile, extendPackage };
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
export { default as renderFile } from './lib/renderFile';
