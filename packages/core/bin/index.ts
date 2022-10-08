/* eslint-disable import/no-extraneous-dependencies */
import { program } from 'commander';
import chalk from 'chalk';
import create from '@m-cli/create';

/** @description 创建项目 */
program
  .command('create <project-name>')
  .description('create a new project from a React+TS+Vite template')
  .option('-f,--force', 'overwrite target directory if it exists')
  .action((projectName) => {
    console.log(chalk.bgBlue(projectName));
  });

/**  @description 添加 page */
program
  .command('addPage <page-name>')
  .description('add page from template')
  .option('-f,--force', 'overwrite target directory if it exists')
  .action((projectName) => {
    console.log(chalk.bgBlue(projectName));
  });

/**  @description 添加 component */
program
  .command('addComponent <page-name>')
  .description('add component from template')
  .option('-f,--force', 'overwrite target directory if it exists')
  .action((projectName) => {
    console.log(chalk.bgBlue(projectName));
  });

program.parse(process.argv);
