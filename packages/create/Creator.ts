import inquirer from 'inquirer';
// import path from 'node:path';
import {
  hasPnpm3OrLater,
  hasYarn,
  resolvePkg,
  hasPnpmVersionOrLater,
  hasGit,
  hasProjectGit,
  execa,
  loadModule,
  chalk,
  wrapLoading,
  commandSpawn,
} from '@micro-cli/shared-utils';
import type { OptionsTypes } from '@micro-cli/core/types';
import PromptModuleAPI from './lib/promptModuleAPI';
import promptModules from './lib/promptModules';
import writeFileTree from './lib/writeFileTree';
import sortObject from './lib/sortObject';
import type {
  PromptType,
  presetTypes,
  answersTypes,
  onPromptCompleteCbsType,
  presetPluginsTypes,
  resolvePluginsType,
} from './types';
import Generator from './lib/Generator';

class Creator extends EventTarget {
  private name: string;

  public targetDir: string;

  public featurePrompt: PromptType;

  public injectedPrompts: Array<PromptType>;

  private presetPrompt: PromptType;

  public promptCompleteCbs: Array<onPromptCompleteCbsType>;

  private answers: answersTypes;

  constructor(name: string, targetDir: string) {
    super();
    this.name = name;
    this.targetDir = targetDir;
    const { presetPrompt, featurePrompt } = this.resolveIntroPrompts();
    this.presetPrompt = presetPrompt; // 选择框架
    this.featurePrompt = featurePrompt; // 选择feature

    this.injectedPrompts = [];
    this.promptCompleteCbs = [];

    this.answers = { preset: 'React' };

    const promptAPI = new PromptModuleAPI(this);
    promptModules.forEach((m: any) => m(promptAPI));
  }

  // eslint-disable-next-line class-methods-use-this
  async create(cliOptions = {}) {
    const preset: presetTypes = await this.promptAndResolvePreset();
    preset.plugins['@micro-cli/cli-service'] = {
      projectName: this.name,
      ...preset,
    };
    // eslint-disable-next-line no-nested-ternary
    const packageManager: string = hasPnpm3OrLater()
      ? 'pnpm'
      : hasYarn()
      ? 'yarn'
      : 'npm';

    console.log(`✨  Creating project in ${chalk.yellow(this.targetDir)}.`);
    // eslint-disable-next-line no-unused-vars
    const pkg = {
      name: this.name,
      version: '0.1.0',
      private: true,
      devDependencies: {},
      ...resolvePkg(this.targetDir),
    };
    const deps: string[] = Object.keys(preset.plugins);
    deps.forEach((dep) => {
      // pkg.devDependencies[dep]='latest'
      // (pkg.devDependencies as any)[dep] = `^1.0.0`;
      (pkg.devDependencies as any)[
        dep
      ] = `link:D:/Desktop/m-cli/ts_cli/packages/${dep.slice(11)}`;
    });

    writeFileTree(this.targetDir, {
      'package.json': JSON.stringify(pkg, null, 2),
    });

    // generate a .npmrc file for pnpm, to persist the `shamefully-flatten` flag
    if (packageManager === 'pnpm') {
      const pnpmConfig = hasPnpmVersionOrLater('4.0.0')
        ? // pnpm v7 makes breaking change to set strict-peer-dependencies=true by default, which may cause some problems when installing
          'shamefully-hoist=true\nstrict-peer-dependencies=false\n'
        : 'shamefully-flatten=true\n';

      writeFileTree(this.targetDir, {
        '.npmrc': pnpmConfig,
      });
    }

    // initialize git repository before installing deps
    // so that vue-cli-service can setup git hooks.
    const shouldInitGit = this.shouldInitGit(cliOptions);
    if (shouldInitGit) {
      console.log(`🗃  Initializing git repository...`);
      await execa('git init', { cwd: this.targetDir });
    }

    // install plugins
    console.log();
    await wrapLoading(
      () => commandSpawn(packageManager, ['install'], { cwd: this.targetDir }),
      `⚙\u{fe0f}  `
    );

    console.log(`🚀  Invoking generators...`);
    // 5.遍历插件，generator方法设置为插件的apply方法
    const plugins: Array<resolvePluginsType> = await this.resolvePlugins(
      preset.plugins
    );
    // 创建Generator实例
    const generator = new Generator(this.targetDir, {
      pkg,
      plugins,
      answers: this.answers,
    });

    // 调用generator的generate方法
    await generator.generate();

    // commandSpawn
    await wrapLoading(
      () => commandSpawn(packageManager, ['install'], { cwd: this.targetDir }),
      `📦  `
    );

    console.log(`🎉  Successfully created project ${chalk.yellow(this.name)}.`);

    console.log();
    console.log(
      `👉  Get started with the following commands:\n\n${
        this.targetDir === process.cwd()
          ? ``
          : chalk.cyan(` ${chalk.gray('$')} cd ${this.name}\n`)
      }${chalk.cyan(
        ` ${chalk.gray('$')} ${
          // eslint-disable-next-line no-nested-ternary
          packageManager === 'yarn'
            ? 'yarn run dev'
            : packageManager === 'pnpm'
            ? 'pnpm run dev'
            : 'npm run dev'
        }`
      )}`
    );
    // await execa(`${packageManager} install`, { cwd: this.targetDir });
  }

  // { id: options } => [{ id, apply, options }]
  async resolvePlugins(
    rawPlugins: Partial<presetPluginsTypes>
  ): Promise<Array<resolvePluginsType>> {
    // ensure cli-service is invoked first
    // eslint-disable-next-line no-param-reassign
    rawPlugins = sortObject(rawPlugins, ['@micro-cli/cli-service'], true);
    const plugins: any = [];
    // eslint-disable-next-line no-empty, no-restricted-syntax
    for (const id of Object.keys(rawPlugins)) {
      // eslint-disable-next-line no-await-in-loop
      const apply = (await loadModule(`${id}`, this.targetDir)) || (() => {});
      const options = { ...(rawPlugins as any)[id], projectName: this.name };
      plugins.push({ id, apply, options, answers: this.answers });
    }
    return plugins;
  }

  async promptAndResolvePreset() {
    const answers: answersTypes = await inquirer.prompt(this.getFinalPrompts());
    this.answers = answers;
    const preset = {
      useConfigFiles: true,
      plugins: {},
    };
    answers.features = answers.features || [];
    this.promptCompleteCbs.forEach((cb) => cb(answers, preset));
    return preset;
  }

  getFinalPrompts() {
    return [this.presetPrompt, this.featurePrompt, ...this.injectedPrompts];
  }

  // eslint-disable-next-line class-methods-use-this
  resolveIntroPrompts() {
    const presetPrompt = {
      name: 'preset',
      type: 'list',
      message: `Please pick a frameWork:`,
      choices: [
        {
          name: 'React',
          value: 'React',
        },
        {
          name: 'Vue',
          value: 'Vue',
        },
      ],
    };
    const featurePrompt = {
      name: 'features',
      // when: isManualMode,
      type: 'checkbox',
      message: 'Check the features needed for your project:',
      choices: [],
      pageSize: 10,
    };

    return {
      featurePrompt,
      presetPrompt,
    };
  }

  // 判断有没有安装git
  shouldInitGit(cliOptions: OptionsTypes) {
    if (!hasGit()) {
      return false;
    }
    if (cliOptions.git) {
      return true;
    }
    return !hasProjectGit(this.targetDir);
  }
}

export default Creator;
