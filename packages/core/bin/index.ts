/* eslint-disable import/no-extraneous-dependencies */
import { program } from 'commander';
import fs from 'node:fs';
import { chalk, semver } from '@micro-cli/shared-utils';
import create from '@micro-cli/create';
import minimist from 'minimist';
import add from '@micro-cli/add';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import type { OptionsTypes } from '../types';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

// console.log(path.resolve(__dirname, '../package.json'));

const requiredVersion = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
).engines.node;

function checkNodeVersion(wanted: string, id: string) {
  if (!semver.satisfies(process.version, wanted, { includePrerelease: true })) {
    console.log(
      chalk.red(
        `You are using Node ${process.version}, but this version of ${id} requires Node ${wanted}.\nPlease upgrade your Node version.`
      )
    );
    process.exit(1);
  }
}

checkNodeVersion(requiredVersion, '@micro-cli');

/** @description 创建项目 */
program
  .command('create <project-name>')
  .description('create a new project from a React+TS+Vite template')
  .option('-f,--force', 'overwrite target directory if it exists')
  .option('-n, --no-git', 'Skip git initialization')
  .action((projectName: string, options: OptionsTypes) => {
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(
        chalk.yellow(
          "\n Info: You provided more than one argument. The first one will be used as the app's name, the rest are ignored."
        )
      );
    }
    create(projectName, options);
  });

/**  @description 添加 page */
program
  .command('addPage <page-name>')
  .description('add page from template')
  .option('-f,--force', 'overwrite target directory if it exists')
  .action((projectName: string, options: { OptionsTypes: boolean }) => {
    add(projectName, options, 'src/pages');
  });

/**  @description 添加 component */
program
  .command('addComponent <page-name>')
  .description('add component from template')
  .option('-f,--force', 'overwrite target directory if it exists')
  .action((projectName: string, options: { OptionsTypes: boolean }) => {
    add(projectName, options, 'src/components');
  });

program.parse(process.argv);
