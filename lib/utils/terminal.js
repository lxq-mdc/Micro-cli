const { spawn } = require('child_process');

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on('close', () => {
      resolve();
    });
  });
};

module.exports = {
  commandSpawn,
};
