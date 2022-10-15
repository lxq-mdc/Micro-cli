import ejs from 'ejs';
import fs from 'node:fs';
import path from 'node:path';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();

const compile = (templateName: string, data: any) => {
  // const templatePosition = `@m-cli/cli-plugin-eslint/generator/templates/react/${templateName}`
  const templatePosition = path.resolve(
    __dirname,
    `../../cli-plugin-eslint/generator/template/react/${templateName}`
  );
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
const writeToFile = (targetPath: string, result: any) =>
  fs.promises.writeFile(targetPath, result);

export { compile, writeToFile };
