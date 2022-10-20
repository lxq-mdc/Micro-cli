import Creator from '../Creator';
import type { featureType, promptCompleteCbsType, PromptType } from '../types';

export default class PromptModuleAPI {
  creator: Creator;

  constructor(creator: Creator) {
    this.creator = creator;
  }

  // injectFeature 的作用是将功能特性注册到 Creator 实例中
  injectFeature(feature: featureType) {
    this.creator.featurePrompt.choices?.push(feature);
  }

  injectPrompt(prompt: PromptType) {
    this.creator.injectedPrompts.push(prompt);
  }

  // eslint-disable-next-line no-unused-vars
  onPromptComplete(cb: promptCompleteCbsType) {
    this.creator.promptCompleteCbs.push(cb);
  }
}
