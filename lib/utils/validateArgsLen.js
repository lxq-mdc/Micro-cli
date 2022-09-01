const chalk = require('chalk');

function validateArgsLen(argvLen, maxArgvLens) {
  if (argvLen > maxArgvLens) {
    console.log(
      chalk.yellow(
        '\n Info: You provided more than argument. the rest are ignored.'
      )
    );
  }
}

module.exports = {
  validateArgsLen,
};
