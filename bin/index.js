#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const { createProjectAction } = require('../lib/actions/createProjectAction')
const helpOptions = require('../lib/core/help')
const { validateArgsLen } = require('../lib/utils/validateArgsLen')
program
    .version(`m-cli@${chalk.green(require('../package.json').version)}`)
    .usage('<command> [option]')
helpOptions()
program
    .command('create <project-name>')
    .description('create a new project from a React+TS+Vite template')
    .option('-f,--force', 'overwrite target directory if it exists')
    .action((projectName, options) => {
        //校验参数是否符合要求
        validateArgsLen(process.argv.length, 5)
        createProjectAction(projectName, options)
    })
program.parse(process.argv)