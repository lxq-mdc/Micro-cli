import inquirer from 'inquirer';
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
} from '@m-cli/shared-utils';
import type { OptionsTypes } from '@m-cli/core/types';
import PromptModuleAPI from './lib/promptModuleAPI';
import getPromptModules from './lib/getPromptModules';
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

  targetDir: string;

  private featurePrompt: PromptType;

  private injectedPrompts: Array<PromptType>;

  private presetPrompt: PromptType;

  private promptCompleteCbs: Array<onPromptCompleteCbsType>;

  answers: answersTypes;

  constructor(name: string, targetDir: string) {
    super();
    this.name = name;
    this.targetDir = targetDir;
    const { presetPrompt, featurePrompt } = this.resolveIntroPrompts();
    this.presetPrompt = presetPrompt;
    this.featurePrompt = featurePrompt;

    this.injectedPrompts = [];
    this.promptCompleteCbs = [];

    this.answers = { preset: 'React' };

    const promptAPI = new PromptModuleAPI(this);
    getPromptModules().forEach((m: any) => m(promptAPI));
  }

  // eslint-disable-next-line class-methods-use-this
  async create(cliOptions = {}) {
    const preset: presetTypes = await this.promptAndResolvePreset();
    preset.plugins['@m-cli/cli-service'] = {
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
      (pkg.devDependencies as any)[
        dep
      ] = `link:D:/Desktop/m-cli/ts_cli/packages/${dep.slice(7)}`;
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
    // intilaize git repository before installing deps
    // so that vue-cli-service can setup git hooks.
    const shouldInitGit = this.shouldInitGit(cliOptions);
    if (shouldInitGit) {
      console.log(`🗃  Initializing git repository...`);
      await execa('git init', { cwd: this.targetDir });
    }

    // install plugins
    console.log(
      `⚙\u{fe0f}  Installing CLI plugins. This might take a while...`
    );
    console.log();
    await execa(`${packageManager} install`, { cwd: this.targetDir });

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

    console.log(`📦  Installing additional dependencies...`);
    await execa(`${packageManager} install`, { cwd: this.targetDir });
  }

  // { id: options } => [{ id, apply, options }]
  async resolvePlugins(
    rawPlugins: Partial<presetPluginsTypes>
  ): Promise<Array<resolvePluginsType>> {
    // ensure cli-service is invoked first
    // eslint-disable-next-line no-param-reassign
    rawPlugins = sortObject(rawPlugins, ['@m-cli/cli-service'], true);
    console.log('rawPlugins', rawPlugins);
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
    console.log('answers', answers);
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
