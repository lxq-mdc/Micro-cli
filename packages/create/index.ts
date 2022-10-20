import path from 'node:path';
import fs from 'fs-extra';
import figlet from 'figlet';
import inquirer from 'inquirer';
import type { OptionsTypes } from '@m-cli/core/types';
import validateProjectName from 'validate-npm-package-name';
import { chalk, exit, clear } from '@m-cli/shared-utils';
import type { correctNameResult, errorNameResult } from './types/index';
import Creator from './Creator';

async function create(projectName: string, options: OptionsTypes) {
  const cwd: string = process.cwd();
  const inCurrent: boolean = projectName === '.';
  const name: string = inCurrent ? path.relative('../', cwd) : projectName;
  const targetDir: string = path.resolve(cwd, projectName || '.');

  /**
   * @description 检测项目名称是否合法
   */
  const result: correctNameResult | errorNameResult = validateProjectName(name);
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`));
    (result as errorNameResult).errors?.forEach((err: string) => {
      console.error(chalk.red.dim(`Error: ${err}`));
    });
    (result as errorNameResult).warnings?.forEach((warn: string) => {
      console.error(chalk.red.dim(`Warning: ${warn}`));
    });
    exit(1);
  }

  /**
   * @description 检测当前目录下是否已经有项目名称的文件夹
   */
  if (fs.existsSync(targetDir)) {
    if (options.force) {
      await fs.remove(targetDir);
    } else if (inCurrent) {
      const { ok } = await inquirer.prompt([
        {
          name: 'ok',
          type: 'confirm',
          message: `Generate project in current directory?`,
        },
      ]);
      if (!ok) {
        return;
      }
    } else {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: `Target directory ${chalk.cyan(
            targetDir
          )} already exists. Pick an action:`,
          choices: [
            { name: 'Overwrite', value: 'overwrite' },
            { name: 'Cancel', value: false },
          ],
        },
      ]);
      if (action === 'overwrite') {
        console.log(`\nRemoving ${chalk.cyan(targetDir)}...`);
        await fs.remove(targetDir);
      } else {
        return;
      }
    }
  }
  if (!inCurrent) {
    await fs.mkdir(targetDir);
  }
  clear();
  console.log(
    chalk.yellow(
      figlet.textSync('M-CLI', {
        horizontalLayout: 'full',
        font: '3D-ASCII',
        verticalLayout: 'default',
        width: 150,
        whitespaceBreak: true,
      })
    )
  );
  const creator = new Creator(name, targetDir);
  await creator.create(options);
}

export default create;
