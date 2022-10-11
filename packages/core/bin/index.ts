/* eslint-disable import/no-extraneous-dependencies */
import { program } from 'commander';
import create from '@m-cli/create';
import add from '@m-cli/add';

/** @description 创建项目 */
program
  .command('create <project-name>')
  .description('create a new project from a React+TS+Vite template')
  .option('-f,--force', 'overwrite target directory if it exists')
  .action(() => {
    create();
  });

/**  @description 添加 page */
program
  .command('addPage <page-name>')
  .description('add page from template')
  .option('-f,--force', 'overwrite target directory if it exists')
  .action((projectName, options) => {
    add(projectName, options, 'src/pages');
  });

/**  @description 添加 component */
program
  .command('addComponent <page-name>')
  .description('add component from template')
  .option('-f,--force', 'overwrite target directory if it exists')
  .action((projectName, options) => {
    add(projectName, options, 'src/components');
  });

program.parse(process.argv);
