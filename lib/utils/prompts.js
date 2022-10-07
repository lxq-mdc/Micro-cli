// 导出一些选项的配置
import { prompt } from 'inquirer';

// 如果当前目录下有同名文件，询问是否删掉同名文件
export const IsCover = () =>
  prompt([
    // 配置询问的方式
    {
      name: 'action',
      type: 'list',
      message: 'target directory already exists pick an action',
      choices: [
        { name: 'Overwrite', value: 'overwrite' },
        { name: 'Cancle', value: false },
      ],
    },
  ]);

// 选择框架(目前只有react or vue)
export const SelectFrameork = () =>
  prompt([
    {
      name: 'framework',
      type: 'list',
      message: 'Select a framework:',
      choices: [
        { name: 'React', value: 'React' },
        { name: 'Vue', value: 'Vue' },
      ],
    },
  ]);

// 是否要配置eslint
export const IsConfigEslint = () =>
  prompt([
    {
      name: 'isEslint',
      type: 'confirm',
      message: 'Whether to configure Eslint:',
    },
  ]);

// 是否要配置prettier
export const IsConfigPrettier = () =>
  prompt([
    {
      name: 'isPrettier',
      type: 'confirm',
      message: 'Whether to configure Psrettier:',
    },
  ]);

// 是否要配置git hooks
export const IsConfigGitHooks = () =>
  prompt([
    {
      name: 'isGitHooks',
      type: 'confirm',
      message: 'Whether to configure Git Hooks:',
    },
  ]);

// 是否配置TS
export const IsConfigTs = () =>
  prompt([
    {
      name: 'isTs',
      type: 'confirm',
      message: 'Whether to configure TypeScript:',
    },
  ]);
