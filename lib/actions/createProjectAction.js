const path = require('path');
const fs = require('fs-extra'); //文件系统
const { promisify } = require('util');
const figlet = require('figlet'); // 可以用来定制CLI执行时的头部
const clear = require('clear'); // 清除命令
const download = promisify(require('download-git-repo')); //下载模板
const { commandSpawn } = require('../utils/terminal');
const { default: chalk } = require('chalk'); // 给提示语添加色彩
const {
  IsCover,
  SelectFrameork,
  IsConfigEslint,
  IsConfigPrettier,
  IsConfigGitHooks,
  IsConfigTs,
} = require('../utils/prompts'); //导入一些选项
const { complie, writeToFile } = require('../utils/complie');
const { ReactRepo, VueRepo } = require('../config/repo-config');
const validateName = require('../utils/validateName');
const {
  ReactEslintDependencies,
  ReactPrettierDependencies,
  ReactTsDependencies,
  ReactGitHooksDependencies,
} = require('../config/react-config'); //导入eslint，prettier的相关package.json的依赖
const extendPackage = require('../utils/extendPackage');

//创建一个项目
const createProjectAction = async (projectName, options) => {
  //校验项目名字中包不包含非法字符(eg: .|| _ )
  if (!validateName(projectName)) {
    console.log(`❌  ${chalk.red('Name contains illegal characters')}`);
    return;
  }
  clear();
  console.log(
    chalk.yellow(
      figlet.textSync('M-CLI', {
        horizontalLayout: 'full',
      })
    )
  );
  //项目创建的目录
  let projectPath = path.resolve(process.cwd(), projectName);
  //判断当前目录下有没有用户创建的同名的文件名
  if (fs.existsSync(projectPath)) {
    if (options.force) {
      //如果强制创建删除已有的
      await fs.remove(projectPath);
    } else {
      //提示用户是否确定要覆盖
      let { action } = await IsCover();
      if (!action) {
        //用户选了false
        return;
      } else if (action === 'overwrite') {
        console.log('\r\nRemoving....');
        try {
          await fs.remove(projectPath);
          console.log(
            `remove success! ${chalk.green('Please re-create it！')}`
          );
          await fs.mkdir(projectPath);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  // else {
  //     await fs.mkdir(projectPath)
  // }
  let { framework } = await SelectFrameork();
  let { isEslint } = await IsConfigEslint();
  let { isPrettier } = await IsConfigPrettier();
  let { isGitHooks } = await IsConfigGitHooks();
  let { isTs } = await IsConfigTs();
  let ReactPackage = await complie('react-package.ejs', {
    name: projectName.toLowerCase(),
  });

  async function ConfigEslint() {
    if (isEslint) {
      let result = await complie('react-eslint.ejs', {});
      //向react项目中的package.json添加eslint的相关依赖
      ReactPackage = extendPackage(
        typeof ReactPackage === 'string'
          ? ReactPackage
          : JSON.stringify(ReactPackage),
        ReactEslintDependencies
      );
      //增加.eslintrc文件的目录
      let targetPath = path.resolve(
        `${process.cwd() + '/' + projectName}`,
        '.eslintrc'
      );
      //向当前文件目录下增加 .eslintrc文件
      await writeToFile(targetPath, result);
    }
  }
  async function ConfigPrettier() {
    if (isPrettier) {
      let result = await complie('react-prettier.ejs', {});
      //向react项目中的package.json添加prettier的相关依赖
      ReactPackage = extendPackage(
        typeof ReactPackage === 'string'
          ? ReactPackage
          : JSON.stringify(ReactPackage),
        ReactPrettierDependencies
      );
      //增加.prettierrc文件的目录
      let targetPath = path.resolve(
        `${process.cwd() + '/' + projectName}`,
        '.prettierrc'
      );
      //向当前文件目录下增加 .prettierrc文件
      await writeToFile(targetPath, result);
    }
  }
  // //生成项目文件下面的vite.config.ts或者vite.config.js文件
  const viteConfig = await complie('react-viteconfig.ejs', {});
  async function ConfigTs() {
    if (isTs) {
      let tsconfig = await complie('react-tsconfig.ejs', {});
      let tsconfigNode = await complie('react-tsconfig.node.ejs', {});
      //向react项目中的package.json添加ts的相关依赖
      ReactPackage = extendPackage(
        typeof ReactPackage === 'string'
          ? ReactPackage
          : JSON.stringify(ReactPackage),
        ReactTsDependencies
      );
      //增加tsconfig.json文件的目录路径
      let tsConfigtPath = path.resolve(
        `${process.cwd() + '/' + projectName}`,
        'tsconfig.json'
      );
      //增加tsconfig.node.json文件的目录路径
      let tsConfigtNodePath = path.resolve(
        `${process.cwd() + '/' + projectName}`,
        'tsconfig.node.json'
      );
      //增加vite.config.ts文件的目录路径
      let viteConfigTsPath = path.resolve(
        `${process.cwd() + '/' + projectName}`,
        'vite.config.ts'
      );
      //向当前文件目录下增加 tsconfig.json文件
      await writeToFile(tsConfigtPath, tsconfig);
      await writeToFile(tsConfigtNodePath, tsconfigNode);
      await writeToFile(viteConfigTsPath, viteConfig);
    } else {
      let viteConfigJsPath = path.resolve(
        `${process.cwd() + '/' + projectName}`,
        'vite.config.js'
      );
      //如果用户没有选择ts，则会生成vite.config.js文件
      await writeToFile(viteConfigJsPath, viteConfig);
    }
  }
  async function ConfigGitHooks() {
    if (isGitHooks) {
      //添加git hooks的.husky文件
      let targetPath = path.resolve(
        `${process.cwd() + '/' + projectName}`,
        '.husky'
      );
      let sourcePath = path.resolve(__dirname, '../config/.husky');
      await fs.copy(sourcePath, targetPath);
      //添加git hooks的相关package.json配置
      ReactPackage = extendPackage(
        typeof ReactPackage === 'string'
          ? ReactPackage
          : JSON.stringify(ReactPackage),
        ReactGitHooksDependencies
      );
    }
  }
  let Repo = null;
  switch (framework) {
    case 'React':
      Repo = ReactRepo;
      break;
    case 'Vue':
      Repo = VueRepo;
      break;
    default:
      break;
  }
  console.log(`${chalk.green('m-cli helps you create your project....')}`);
  await download(Repo, projectName, { clone: true }, async (err) => {
    if (err) return;
    await ConfigEslint();
    await ConfigPrettier();
    await ConfigGitHooks();
    await ConfigTs();
    await writeToFile(
      path.resolve(process.cwd(), projectName, 'package.json'),
      JSON.stringify(ReactPackage)
    );
    const command = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
    await commandSpawn(command, ['install'], { cwd: `./${projectName}` });
  });
};

module.exports = {
  createProjectAction,
};
