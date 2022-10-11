import chalk from 'chalk';

export const errorLog = (text: string) => {
  console.log(chalk.red(text || 'something error'));
};

export const successLog = (text: string) => {
  console.log(chalk.green(text || 'something success'));
};

export const errorLogWithBg = (text: string) => {
  console.log(chalk.white.bgRed(text || 'something error'));
};

export const successLogWithBg = (text: string) => {
  console.log(chalk.white.bgGreen(text || 'something success'));
};
