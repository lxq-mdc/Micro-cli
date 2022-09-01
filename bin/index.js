#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const {
  createProjectAction,
} = require('../lib/core/actions/createProjectAction');
const addPageAction = require('../lib/core/actions/addComponentAction');
const helpOptions = require('../lib/core/help');
const { validateArgsLen } = require('../lib/utils/validateArgsLen');

program
  .version(`m-cli@${chalk.green(require('../package.json').version)}`)
  .usage('<command> [option]');
helpOptions();

/** @description 创建项目 */
program
  .command('create <project-name>')
  .description('create a new project from a React+TS+Vite template')
  .option('-f,--force', 'overwrite target directory if it exists')
  .action((projectName, options) => {
    //校验参数是否符合要求
    validateArgsLen(process.argv.length, 5);
    createProjectAction(projectName, options);
  });

/**  @description 添加page */
program
  .command('addPage <page-name>')
  .description('add page from template')
  .option('-f,--force', 'overwrite target directory if it exists')
  .action((pageName, options) => {
    addPageAction(pageName, options, `src/pages`);
  });

/**  @description 添加component */
program
  .command('addComponent <page-name>')
  .description('add component from template')
  .option('-f,--force', 'overwrite target directory if it exists')
  .action((pageName, options) => {
    addPageAction(pageName, options, `src/components`);
  });

program.parse(process.argv);
