const { execFileSync } = require('child_process');
//检查用户是否安装了git
const installedGit = () => {
    try {
        execFileSync('git', ['--version'])
        return true
    } catch (error) {
        console.log('error');
        return false
    }
}
module.exports = {
    installedGit
}