import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import { globby } from 'globby';
import Generator from './Generator';
import { answersTypes, packageTypes } from '../types';

function extractCallDir(source: string, projectName: string, plugin: string) {
  const cwd = process.cwd();
  return path.join(
    cwd,
    `./${projectName}/node_modules/@m-cli/${plugin}/generator/${source}`
  );
}

// eslint-disable-next-line no-unused-vars
function renderFile(name: string, data: any) {
  const template = fs.readFileSync(name, 'utf-8');
  return ejs.render(template);
}

export default class GeneratorAPI {
  id: string;

  generator: Generator;

  options: any;

  answers: answersTypes;

  constructor(
    id: string,
    generator: Generator,
    options: any,
    answers: answersTypes
  ) {
    this.id = id;
    this.generator = generator;
    this.options = options;

    this.answers = answers;
  }

  // eslint-disable-next-line no-unused-vars
  render(source: string, options: any) {
    const { plugin } = options;
    const { projectName } = this.options;
    const baseDir = extractCallDir(source, projectName, plugin);
    this.injectFileMiddleware(async (files: any) => {
      const allFiles = await globby(['**/*'], { cwd: baseDir, dot: true });
      console.log('allFiles', allFiles);
      // eslint-disable-next-line no-restricted-syntax
      for (const rawPath of allFiles) {
        const sourcePath = path.resolve(baseDir, rawPath);
        const content = renderFile(sourcePath, this.options);
        // eslint-disable-next-line no-param-reassign
        files[rawPath] = content;
      }
    });
  }

  private injectFileMiddleware(middleware: any) {
    this.generator.fileMiddlewares.push(middleware);
  }

  extendPackage(fields: Partial<packageTypes>) {
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const key in fields) {
      (this.generator.pkg as any)[key] = {
        ...(this.generator.pkg as any)[key],
        ...(fields as any)[key],
      };
    }
  }
}
