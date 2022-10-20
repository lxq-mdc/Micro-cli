import { injectImportsToFile } from '@micro-cli/shared-utils';
import GeneratorAPI from './GeneratorAPI';
import writeFileTree from './writeFileTree';
import type { answersTypes, packageTypes, resolvePluginsType } from '../types';

export default class Generator {
  pkg: Partial<packageTypes>;

  plugins: Array<resolvePluginsType>;

  targetDir: string;

  originalPkg: Partial<packageTypes>;

  imports: Record<string, Parameters<typeof injectImportsToFile>['1']> = {};

  // eslint-disable-next-line no-unused-vars
  modifyCodeSnippetCbs: Record<string, ((code: string) => string)[]> = {};

  // eslint-disable-next-line no-unused-vars
  fileMiddlewares: ((files: typeof this.files) => Promise<void>)[];

  files: Record<string, string>;

  answers: answersTypes;

  constructor(
    targetDir: string,
    {
      pkg = {},
      plugins = [] as Array<resolvePluginsType>,
      answers = { preset: 'React' },
    } = {}
  ) {
    this.targetDir = targetDir;
    this.originalPkg = pkg;
    // package.json
    this.pkg = { ...pkg };
    this.plugins = plugins;
    this.fileMiddlewares = [];
    this.files = {};

    this.answers = answers as answersTypes;
  }

  async initPlugins() {
    this.plugins.forEach((plugin) => {
      const { id, apply, options, answers } = plugin;
      const api = new GeneratorAPI(id, this, options, this.answers);
      apply(api, options, answers);
    });
  }

  async generate() {
    await this.initPlugins();
    await this.resolveFiles();
    this.files['package.json'] = `${JSON.stringify(this.pkg, null, 2)}\n`;
    writeFileTree(this.targetDir, this.files);
  }

  async resolveFiles() {
    const { files } = this;

    // eslint-disable-next-line no-restricted-syntax
    for (const middleware of this.fileMiddlewares) {
      // eslint-disable-next-line no-await-in-loop
      await middleware(files);
    }

    /** @description 向文件注入import */
    Object.keys(files).forEach((file) => {
      const imports = this.imports[file];
      if (imports && Object.keys(imports).length > 0) {
        files[file] = injectImportsToFile(files[file], imports) || files[file];
      }
    });

    /** @description 修改文件代码 */
    Object.keys(this.modifyCodeSnippetCbs).forEach((file) => {
      this.modifyCodeSnippetCbs[file].forEach((cb) => {
        files[file] = cb(files[file]);
      });
    });
  }
}
