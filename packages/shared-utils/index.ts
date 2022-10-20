export { default as exit } from './lib/exit';
export { compile, writeToFile } from './lib/compile';
export { default as extendPackage } from './lib/extendPackage';
export { default as chalk } from 'chalk';
export { default as semver } from 'semver';
export { default as clear } from 'clear';
export { isRoot, isTypescript } from './lib/is';
export { default as projectType } from './lib/projectType';
export {
  hasPnpm3OrLater,
  hasYarn,
  hasPnpmVersionOrLater,
  hasGit,
  hasProjectGit,
} from './lib/env';
export { default as resolvePkg } from './lib/pkg';
export {
  errorLog,
  errorLogWithBg,
  successLog,
  successLogWithBg,
} from './lib/logWithChalk';
export { default as ensureDir } from './lib/ensureDir';
export { default as ensureFile } from './lib/ensureFile';
export { default as loadModule } from './lib/module';
export { execa } from 'execa';
export { default as injectImportsToFile } from './lib/injectImportsToFile';
export type { DeleteUndefinedInUnion } from './lib/typescriptUtils';
export { default as replaceNodeInJSX } from './lib/replaceNodeInJSX';
export { default as replaceNodeInVue } from './lib/replaceNodeInVue';
export { default as injectRootOptionInVue } from './lib/injectRootOptionInVue';
export { default as getCssPreProcessor } from './lib/getCssPreProcessor';
export { default as wrapLoading } from './lib/wrapLoading';
export { default as commandSpawn } from './lib/commandSpawn';
