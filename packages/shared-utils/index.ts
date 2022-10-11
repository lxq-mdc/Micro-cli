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
