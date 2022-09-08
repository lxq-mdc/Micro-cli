const { execFile, execFileSync } = require('child_process');

// function detection() {
//     return new Promise((resolve, reject) => {
//         execFileSync('git', ['--version'], (error, stdout, stderr) => {
//             if (error) {
//                 reject(error)
//             }
//             resolve(stdout)
//         });
//     })
// }
// console.log(execFileSync('giyt', ['--version']).toString());
try {
    execFileSync('git', ['--version'])
} catch (error) {
    console.log('error');
}