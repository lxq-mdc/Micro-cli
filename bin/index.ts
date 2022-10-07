#! /usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { createProjectAction } from '../lib/core/actions/createProjectAction.js';
import addComponentAction from '../lib/core/actions/addComponentAction';
import helpOptions from '../lib/core/help';
import { validateArgsLen } from '../lib/utils/validateArgsLen';
import packageJson from '../package.json';

program
  .version(`m-cli@${chalk.green(packageJson.version)}`)
  .usage('<command> [option]');
helpOptions();

/** @description 创建项目 */
program
  .command('create <project-name>')
  .description('create a new project from a React+TS+Vite template')
  .option('-f,--force', 'overwrite target directory if it exists')
  .action((projectName, options) => {
    // 校验参数是否符合要求
    validateArgsLen(process.argv.length, 5);
    createProjectAction(projectName, options);
  });

/**  @description 添加 page */
program
  .command('addPage <page-name>')
  .description('add page from template')
  .option('-f,--force', 'overwrite target directory if it exists')
  .action((pageName, options) => {
    addComponentAction(pageName, options, 'src/pages');
  });

/**  @description 添加 component */
program
  .command('addComponent <page-name>')
  .description('add component from template')
  .option('-f,--force', 'overwrite target directory if it exists')
  .action((pageName, options) => {
    addComponentAction(pageName, options, 'src/components');
  });

program.parse(process.argv);
