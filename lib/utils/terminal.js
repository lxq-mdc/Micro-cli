import { spawn } from 'child_process';

const commandSpawn = (...args) =>
  new Promise((resolve) => {
    const childProcess = spawn(...args);
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on('close', () => {
      resolve();
    });
  });

export default commandSpawn;
