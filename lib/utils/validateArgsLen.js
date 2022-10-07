import chalk from 'chalk';

function validateArgsLen(argvLen, maxArgvLens) {
  if (argvLen > maxArgvLens) {
    console.log(
      chalk.yellow(
        '\n Info: You provided more than argument. the rest are ignored.'
      )
    );
  }
}

export default {
  validateArgsLen,
};
