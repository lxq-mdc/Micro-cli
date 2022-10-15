import ejs from 'ejs';
import type { answersTypes, packageTypes, resolvePluginsType } from '../types';
import GeneratorAPI from './GeneratorAPI';
import writeFileTree from './writeFileTree';
// import GeneratorAPI from './GeneratorAPI'

export default class Generator {
  pkg: Partial<packageTypes>;

  plugins: Array<resolvePluginsType>;

  targetDir: string;

  originalPkg: any;

  // eslint-disable-next-line no-unused-vars
  fileMiddlewares: Array<(files: any, render: any) => {}>;

  files: any;

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
    // eslint-disable-next-line no-restricted-syntax
    for (const plugin of this.plugins) {
      const { id, apply, options, answers } = plugin;
      const api = new GeneratorAPI(id, this, options, this.answers);
      // eslint-disable-next-line no-await-in-loop
      const a = await apply;
      // eslint-disable-next-line no-await-in-loop
      await a(api, options, answers);
    }
  }

  async generate() {
    await this.initPlugins();
    await this.resolveFiles();
    this.files['package.json'] = `${JSON.stringify(this.pkg, null, 2)}\n`;
    await writeFileTree(this.targetDir, this.files);
    console.log('写入完毕');
  }

  async resolveFiles() {
    const { files } = this;
    // console.log('files-----------', files)
    console.log(
      'this.fileMiddlewares-----------------------',
      this.fileMiddlewares
    );

    // eslint-disable-next-line no-restricted-syntax
    for (const middleware of this.fileMiddlewares) {
      // eslint-disable-next-line no-await-in-loop
      await middleware(files, ejs.render);
    }
  }
}
