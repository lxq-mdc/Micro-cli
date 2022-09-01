const program = require('commander');

function helpOptions() {
  program.option('-m --m', 'a React+Ts+Vite cli');
}

module.exports = helpOptions;
