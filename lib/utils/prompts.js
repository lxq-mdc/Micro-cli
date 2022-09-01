//导出一些选项的配置
const Inquirer = require('inquirer')

//如果当前目录下有同名文件，询问是否删掉同名文件
const IsCover = () => {
        return Inquirer.prompt([ //配置询问的方式
            {
                name: 'action',
                type: 'list',
                message: 'target directory already exists pick an action',
                choices: [
                    { name: 'Overwrite', value: "overwrite" },
                    { name: 'Cancel', value: false }
                ]
            }
        ])
    }
    //选择框架(目前只有react or vue)
const SelectFramework = () => {
        return Inquirer.prompt([{
            name: 'framework',
            type: 'list',
            message: 'Select a framework:',
            choices: [
                { name: 'React', value: "React" },
                { name: 'Vue', value: "Vue" }
            ]
        }])
    }
    //是否要配置eslint
const IsConfigEslint = () => {
        return Inquirer.prompt([{
            name: 'isEslint',
            type: 'confirm',
            message: 'Whether to configure Eslint:',
        }])
    }
    //是否要配置prettier
const IsConfigPrettier = () => {
        return Inquirer.prompt([{
            name: 'isPrettier',
            type: 'confirm',
            message: 'Whether to configure Prettier:',
        }])
    }
    //是否要配置git hooks
const IsConfigGitHooks = () => {
    return Inquirer.prompt([{
        name: 'isGitHooks',
        type: 'confirm',
        message: 'Whether to configure Git Hooks:',
    }])
}

//是否配置TS
const IsConfigTs = () => {
    return Inquirer.prompt([{
        name: 'isTs',
        type: 'confirm',
        message: 'Whether to configure TypeScript:',
    }])
}
module.exports = {
    IsCover,
    SelectFramework,
    IsConfigEslint,
    IsConfigPrettier,
    IsConfigGitHooks,
    IsConfigTs
}