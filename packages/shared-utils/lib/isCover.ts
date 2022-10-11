import inquirer from 'inquirer';

/**
 * @description 如果当前目录下有同名目标，询问是否删掉同名目标
 * @param {string} type 目标类型，如file/directory
 */
export default (type: string) =>
  inquirer.prompt([
    // 配置询问的方式
    {
      name: 'action',
      type: 'list',
      message: `target ${type} already exists pick an action`,
      choices: [
        { name: 'Overwrite', value: 'overwrite' },
        { name: 'Cancle', value: false },
      ],
    },
  ]);
