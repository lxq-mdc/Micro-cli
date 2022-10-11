import type { featureType, PromptType } from '../types';

export default class PromptModuleAPI {
  creator: any;

  constructor(creator: any) {
    this.creator = creator;
  }

  // injectFeature 的作用是将功能特性注册到 Creator 实例中
  injectFeature(feature: featureType) {
    this.creator.featurePrompt.choices.push(feature);
  }

  injectPrompt(prompt: PromptType) {
    this.creator.injectedPrompts.push(prompt);
  }
}
