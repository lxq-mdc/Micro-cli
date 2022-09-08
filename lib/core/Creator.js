const path = require('path')
const fs = require('fs-extra') //文件系统
const { promisify } = require('util')
const figlet = require('figlet'); // 可以用来定制CLI执行时的头部
const clear = require('clear'); // 清除命令
const download = promisify(require('download-git-repo')) //下载模板
const { commandSpawn } = require('../utils/terminal')
const { default: chalk } = require('chalk') // 给提示语添加色彩
const { IsCover, SelectFramework, IsConfigEslint, IsConfigPrettier, IsConfigGitHooks, IsConfigTs, IsConfigAxios } = require('../utils/prompts') //导入一些选项
const { compile, writeToFile } = require('../utils/compile')
const { ReactRepo, VueRepo } = require('../config/repo-config');
const validateName = require('../utils/validateName');
const { ReactEslintDependencies, ReactPrettierDependencies, ReactTsDependencies, ReactGitHooksDependencies, ReactAxiosDependencies } = require('../config/react-config'); //导入eslint，prettier的相关package.json的依赖
const extendPackage = require('../utils/extendPackage');
const typeofPackage = require('../utils/typeofPackage');
const { installedGit } = require('../utils/installedGit');
class Creator {
    constructor(projectName, options) {
        this.projectName = projectName
        this.options = options
    }
    async create() {
        //校验项目名字中包不包含非法字符(eg: .|| _ )
        if (!validateName(this.projectName)) {
            console.log(`❌  ${chalk.red('Name contains illegal characters')}`);
            return
        }
        clear()
        console.log(chalk.yellow(figlet.textSync('M-CLI', {
            horizontalLayout: 'full'
        })));
        //项目创建的目录
        let projectPath = path.resolve(process.cwd(), this.projectName)
            //判断当前目录下有没有用户创建的同名的文件名
        if (fs.existsSync(projectPath)) {
            if (this.options.force) { //如果强制创建删除已有的
                await fs.remove(projectPath)
            } else {
                //提示用户是否确定要覆盖
                let { action } = await IsCover()
                if (!action) {
                    //用户选了false
                    return
                } else if (action === 'overwrite') {
                    console.log('\r\nRemoving....');
                    try {
                        await fs.remove(projectPath)
                        console.log(`remove success! ${chalk.green('Please re-create it！')}`)
                        await fs.mkdir(projectPath)
                    } catch (err) {
                        console.error(err)
                    }
                }
            }
        }
        // else {
        //     await fs.mkdir(projectPath)
        // }
        let { framework } = await SelectFramework()
        let { isEslint } = await IsConfigEslint()
        let { isPrettier } = await IsConfigPrettier()
        let { isGitHooks } = await IsConfigGitHooks()
        let { isAxios } = await IsConfigAxios()
        let { isTs } = await IsConfigTs()
        let ReactPackage = await compile('react-package.ejs', { name: this.projectName.toLowerCase() })

        //保证下面函数中的this是执行类的
        let that = this
        async function ConfigEslint() {
            if (isEslint) {
                let result = await compile('react-eslint.ejs', {})
                    //向react项目中的package.json添加eslint的相关依赖
                ReactPackage = extendPackage(typeofPackage(ReactPackage), ReactEslintDependencies)
                    //增加.eslintrc文件的目录
                let targetPath = path.resolve(`${process.cwd()+'/'+  that.projectName }`, '.eslintrc')
                    //向当前文件目录下增加 .eslintrc文件
                await writeToFile(targetPath, result)
            }
        }
        async function ConfigPrettier() {
            if (isPrettier) {
                let result = await compile('react-prettier.ejs', {})
                    //向react项目中的package.json添加prettier的相关依赖
                ReactPackage = extendPackage(typeofPackage(ReactPackage), ReactPrettierDependencies)
                    //增加.prettierrc文件的目录
                let targetPath = path.resolve(`${process.cwd()+'/'+that.projectName}`, '.prettierrc')
                    //向当前文件目录下增加 .prettierrc文件
                await writeToFile(targetPath, result)
            }
        }
        // //生成项目文件下面的vite.config.ts或者vite.config.js文件
        const viteConfig = await compile('react-viteconfig.ejs', {})
        async function ConfigTs() {
            if (isTs) {
                let tsconfig = await compile('react-tsconfig.ejs', {})
                let tsconfigNode = await compile('react-tsconfig.node.ejs', {})
                    //向react项目中的package.json添加ts的相关依赖
                ReactPackage = extendPackage(typeofPackage(ReactPackage), ReactTsDependencies)
                    //增加tsconfig.json文件的目录路径
                let tsConfigPath = path.resolve(`${process.cwd()+'/'+that.projectName}`, 'tsconfig.json')
                    //增加tsconfig.node.json文件的目录路径
                let tsConfigNodePath = path.resolve(`${process.cwd()+'/'+that.projectName}`, 'tsconfig.node.json')
                    //增加vite.config.ts文件的目录路径
                let viteConfigTsPath = path.resolve(`${process.cwd()+'/'+that.projectName}`, 'vite.config.ts')
                    //向当前文件目录下增加 tsconfig.json文件
                await writeToFile(tsConfigPath, tsconfig)
                await writeToFile(tsConfigNodePath, tsconfigNode)
                await writeToFile(viteConfigTsPath, viteConfig)
            } else {
                let viteConfigJsPath = path.resolve(`${process.cwd()+'/'+that.projectName}`, 'vite.config.js')
                    //如果用户没有选择ts，则会生成vite.config.js文件
                await writeToFile(viteConfigJsPath, viteConfig)
            }
        }
        //配置githooks
        async function ConfigGitHooks() {
            if (isGitHooks) {
                //添加git hooks的.husky文件
                let targetPath = path.resolve(`${process.cwd()+'/'+that.projectName}`, '.husky')
                let sourcePath = path.resolve(__dirname, '../config/.husky')
                await fs.copy(sourcePath, targetPath)
                    //添加git hooks的相关package.json配置
                ReactPackage = extendPackage(typeofPackage(ReactPackage), ReactGitHooksDependencies)
            }
        }

        //配置axios
        async function ConfigAxios() {
            if (isAxios) {
                ReactPackage = extendPackage(typeofPackage(ReactPackage), ReactAxiosDependencies)
                await fs.mkdir(path.resolve(process.cwd(), that.projectName, 'service'))
            }
        }

        let Repo = null
        switch (framework) {
            case 'React':
                Repo = ReactRepo
                break;
            case 'Vue':
                Repo = VueRepo
                break;
            default:
                break;
        }
        console.log(`${chalk.green('m-cli helps you create your project....')}`);
        await download(Repo, this.projectName, { clone: true }, async(err) => {
            if (err) return
            await ConfigEslint()
            await ConfigPrettier()
            await ConfigGitHooks()
            await ConfigTs()
            await ConfigAxios()
            await writeToFile(path.resolve(process.cwd(), this.projectName, 'package.json'), typeofPackage(ReactPackage))
            const command = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
            await commandSpawn(command, ['install'], { cwd: `./${this.projectName}` })
            if (installedGit) {
                await command Spawn('git', ['init'], { cwd: `./${this.projectName}` })
            } else {
                console.error("You haven't installed Git yet, you need to install it");
            }
        })
    }

}
module.exports = Creator