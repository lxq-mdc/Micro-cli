export interface errorNameResult {
  validForNewPackages: boolean;
  validForOldPackages: boolean;
  errors?: string[];
  warnings?: string[];
}

export type correctNameResult = Omit<errorNameResult, 'errors' | 'warnings'>;

export interface answersTypes {
  preset: 'React' | 'Vue';
  features?: Array<
    'css-preprocessor' | 'linter' | 'TypeScript' | 'gitHooks' | 'router'
  >;
  cssPreprocessor?: 'less' | 'sass' | 'stylus';
  eslintConfig?: 'airbnb' | 'base' | 'standard' | 'prettier' | 'xo';
  historyMode?: boolean;
}

export interface PromptType {
  name: string;
  type: string;
  value?: string;
  description?: string;
  message: string;
  choices?: Array<any>;
  pageSize?: number;
  plugins?: Array<string>;
  checked?: boolean;
  // eslint-disable-next-line no-unused-vars
  when?: (answers: answersTypes) => boolean;
}
export type featureType = Omit<
  PromptType,
  'type' | 'message' | 'pageSize' | 'choices'
>;

export interface presetPluginsTypes {
  '@micro-cli/cli-plugin-eslint': {
    config: 'airbnb' | 'standard';
    lintOn: Array<'save' | 'commit'>;
  };
  '@micro-cli/cli-plugin-router': any;
  '@micro-cli/cli-service': any;
  '@micro-cli/cli-plugin-cssPreprocessors': any;
  '@micro-cli/cli-plugin-typescript': any;
  '@micro-cli/cli-plugin-git-hooks': any;
}

export interface resolvePluginsType {
  id: string;
  // eslint-disable-next-line no-unused-vars
  apply: (...rest: any) => void;
  options: any;
  answers: answersTypes;
}

// export type depsTypes='@micro-cli/cli-plugin-eslint'| '@micro-cli/cli-plugin-typescript'|'@micro-cli/cli-service'
export type depsTypes = keyof presetPluginsTypes;
export interface presetTypes {
  useConfigFiles: boolean;
  plugins: Partial<presetPluginsTypes>;
}

export type onPromptCompleteCbsType = (
  // eslint-disable-next-line no-unused-vars
  answers: answersTypes,
  // eslint-disable-next-line no-unused-vars
  options: any
) => void;

export interface packageTypes {
  name: string;
  private: boolean;
  version: string;
  type: string;
  scripts: {
    dev?: string;
    build?: string;
    preview?: string;
    [prop: string]: any;
  };
  dependencies: {
    [prop: string]: string;
  };
  devDependencies: {
    [prop: string]: string;
  };
  husky: any;
  config: any;
  'lint-staged': any;
  [index: string]: any;
}

// eslint-disable-next-line no-unused-vars
// export type promptCompleteCbsType = (
//   answers: answersTypes,
//   options: any
// ) => void;
