const { default: chalk } = require('chalk');

const errorLog = (text, error) => {
  console.log(chalk.red(text || 'something error'));
};

const successLog = (text) => {
  console.log(chalk.green(text || 'something success'));
};

const errorLogWithBg = (text, error) => {
  console.log(chalk.white.bgRed(text || 'something error'));
};

const successLogWithBg = (text) => {
  console.log(chalk.white.bgGreen(text || 'something success'));
};

module.exports = {
  errorLog,
  successLog,
  errorLogWithBg,
  successLogWithBg,
};
