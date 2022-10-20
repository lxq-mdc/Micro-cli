import path from 'node:path';
import fs from 'node:fs';
import ejs from 'ejs';
import { globby } from 'globby';
import { injectImportsToFile } from '@m-cli/shared-utils';
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
async function renderFile(
  name: string,
  data: { [index: string]: string }
): Promise<string> {
  const template = fs.readFileSync(name, 'utf-8');
  return ejs.render(template, { data });
}

export default class GeneratorAPI {
  id: string;

  generator: Generator;

  options: any;

  answers: answersTypes;

  readonly entryFile: string;

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
    this.entryFile = this.getEntryFile();
  }

  // eslint-disable-next-line no-unused-vars
  render(
    source: string,
    options: { [index: string]: string | { [index: string]: string } }
  ) {
    const { plugin, data } = options;
    const { projectName } = this.options;
    const baseDir = extractCallDir(source, projectName, plugin as string);
    this.injectFileMiddleware(async (files: Record<string, string>) => {
      const allFiles = await globby(['**/*'], { cwd: baseDir, dot: true });
      // eslint-disable-next-line no-restricted-syntax
      for (const rawPath of allFiles) {
        const sourcePath = path.resolve(baseDir, rawPath);
        // eslint-disable-next-line no-await-in-loop
        const content = await renderFile(
          sourcePath,
          data as { [index: string]: string }
        );
        // eslint-disable-next-line no-param-reassign
        files[rawPath] = content;
      }
    });
  }

  // eslint-disable-next-line no-unused-vars
  private injectFileMiddleware(
    // eslint-disable-next-line no-unused-vars
    middleware: (files: Record<string, string>) => Promise<void>
  ) {
    this.generator.fileMiddlewares.push(middleware);
  }

  extendPackage(fields: Partial<packageTypes>) {
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const key in fields) {
      (this.generator.pkg as Partial<packageTypes>)[key] = {
        ...(this.generator.pkg as Partial<packageTypes>)[key],
        ...(fields as Partial<packageTypes>)[key],
      };
    }
  }

  /**
   * @description 向文件中加入 import 语句
   */
  injectImports(
    file: string,
    imports: Parameters<typeof injectImportsToFile>['1']
  ) {
    this.generator.imports[file] = imports;
  }

  /**
   * @description 修改文件代码
   */
  // eslint-disable-next-line no-unused-vars
  injectModifyCodeSnippetCb(file: string, cb: (code: string) => string) {
    if (!this.generator.modifyCodeSnippetCbs[file])
      this.generator.modifyCodeSnippetCbs[file] = [];
    this.generator.modifyCodeSnippetCbs[file].push(cb);
  }

  /**
   * @description 获得入口文件名
   */
  private getEntryFile() {
    const files = {
      React: ['main.jsx', 'main.tsx'],
      Vue: ['main.js', 'main.ts'],
    };

    const hasTypeScript = Number(
      this.answers.features?.includes('TypeScript') || 0
    );
    const framework = this.answers.preset;

    return files[framework][hasTypeScript];
  }
}
