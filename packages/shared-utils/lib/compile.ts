import ejs from 'ejs';
import fs from 'node:fs';
// import path from 'path';

export const compile = (templatePath: string, data: any) =>
  // const templatePosition = `@m-cli/cli-plugin-eslint/generator/templates/react/${templateName}`
  new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log('err', err);
        reject(err);
      }
      return resolve(result);
    });
  });

export const writeToFile = (targetPath: string, result: any) =>
  fs.promises.writeFile(targetPath, result);
