const path = require('path')
const fs = require('fs-extra')
const Inquirer = require('inquirer')
const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const { commandSpawn } = require('../utils/terminal')
const { default: chalk } = require('chalk')
const open = require('open')
const { ReactRepo } = require('../config/repo-config')
    //创建一个项目
const createProjectAction = async(projectName, options) => {
    //项目创建的目录
    let projectPath = path.resolve(process.cwd(), projectName)
    if (fs.existsSync(projectPath)) {
        if (options.force) { //如果强制创建删除已有的
            await fs.remove(projectPath)
        } else {
            //提示用户是否确定要覆盖
            let { action } = await Inquirer.prompt([ //配置询问的方式
                {
                    name: 'action',
                    type: 'list',
                    message: 'target directory already exists pick an action',
                    choices: [
                        { name: 'Overwrite', value: "overwrite" },
                        { name: 'Cancle', value: false }
                    ]
                }
            ])
            if (!action) {
                //用户选了false
                return
            } else if (action === 'overwrite') {
                console.log('\r\nRemoving....');
                try {
                    await fs.remove(projectPath)
                    console.log(`remove success! ${chalk.green('Please re-create it！')}`)
                } catch (err) {
                    console.error(err)
                }
            }
        }
    }
    let { framework } = await Inquirer.prompt([ //配置询问的方式
        {
            name: 'framework',
            type: 'list',
            message: 'Select a framework:',
            choices: [
                { name: 'React', value: "React" },
                { name: 'Vue', value: "Vue" }
            ]
        }
    ])
    let Repo = null
    switch (framework) {
        case 'React':
            Repo = ReactRepo
            break;
        case 'Vue':
            Repo = 'Vue'
            break;
        default:
            break;
    }
    // console.log(`${chalk.green('m-cli helps you create your project....')}`);
    await download(ReactRepo, projectName, { clone: true }, async(err) => {
        if (err) return
        const command = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
        await commandSpawn(command, ['install'], { cwd: `./${projectName}` })
            //3.运行npm run dev 
        commandSpawn(command, ['run', 'dev', { cwd: `./${projectName}` }])
            //4.打开浏览器
        open("localhost:8080")
    })
}
module.exports = {
    createProjectAction
}