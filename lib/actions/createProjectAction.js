//创建一个项目
const Creator = require('../core/Creator')
const createProjectAction = async(projectName, options) => {
    const creator = new Creator(projectName, options)
    creator.create()
}
module.exports = {
    createProjectAction
}