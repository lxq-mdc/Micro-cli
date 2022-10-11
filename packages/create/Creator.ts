import inquirer from 'inquirer';
import dealEslint from '@m-cli/cli-plugin-eslint/generator/index';
import PromptModuleAPI from './lib/promptModuleAPI';
import getPromptModules from './lib/getPromptModules';

import type { PromptType } from './types';

class Creator extends EventTarget {
  name: string;

  targetDir: string;

  featurePrompt: PromptType;

  injectedPrompts: Array<any>;

  presetPrompt: PromptType;

  constructor(name: string, targetDir: string) {
    super();
    this.name = name;
    this.targetDir = targetDir;
    const { presetPrompt, featurePrompt } = this.resolveIntroPrompts();
    this.presetPrompt = presetPrompt;
    this.featurePrompt = featurePrompt;

    this.injectedPrompts = [];

    const promptAPI = new PromptModuleAPI(this);
    getPromptModules().forEach((m) => m(promptAPI));
  }

  // eslint-disable-next-line class-methods-use-this
  async create() {
    const answers = await inquirer.prompt(this.getFinalPrompts());
    console.log('answers', answers);
    // eslint-disable-next-line no-unused-vars
    const pkg = {
      name: this.name,
      version: '0.1.0',
      private: true,
      devDependencies: {},
    };
    if (answers.preset === 'React' && answers.features.includes('Eslint')) {
      console.log();
      dealEslint(this.targetDir, pkg);
    }
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
}

export default Creator;
