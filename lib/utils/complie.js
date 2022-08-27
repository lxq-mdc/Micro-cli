const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const complie = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`;
  const templatePath = path.resolve(__dirname, templatePosition);
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log('err', err);
        reject(err);
      }
      return resolve(result);
    });
  });
};

const writeToFile = (targetPath, result) => {
  return fs.promises.writeFile(targetPath, result);
};

module.exports = {
  complie,
  writeToFile,
};
