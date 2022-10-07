import chalk from 'chalk';

export const errorLog = (text) => {
  console.log(chalk.red(text || 'something error'));
};

export const successLog = (text) => {
  console.log(chalk.green(text || 'something success'));
};

export const errorLogWithBg = (text) => {
  console.log(chalk.white.bgRed(text || 'something error'));
};

export const successLogWithBg = (text) => {
  console.log(chalk.white.bgGreen(text || 'something success'));
};
