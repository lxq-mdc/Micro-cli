/* eslint-disable no-unused-vars */
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';

const commandSpawn = (
  command: string,
  options: string[],
  { cwd }: { cwd: string }
): Promise<string> =>
  new Promise((resolve) => {
    const commandCmd: string =
      process.platform === 'win32' ? `${command}.cmd` : command;
    const childProcess: ChildProcessWithoutNullStreams = spawn(
      commandCmd,
      options,
      { cwd }
    );
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on('close', () => {
      resolve('');
    });
  });

export default commandSpawn;
