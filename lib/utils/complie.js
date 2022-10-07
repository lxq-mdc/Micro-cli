import { renderFile } from 'ejs';
import { promises } from 'fs';
import path from 'path';

export const complie = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`;
  const templatePath = path.resolve(__dirname, templatePosition);
  return new Promise((resolve, reject) => {
    renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log('err', err);
        reject(err);
      }
      return resolve(result);
    });
  });
};

export const writeToFile = (targetPath, result) =>
  promises.writeFile(targetPath, result);
