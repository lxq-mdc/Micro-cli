export interface errorNameResult {
  validForNewPackages: boolean;
  validForOldPackages: boolean;
  errors?: string[];
  warnings?: string[];
}

export type correctNameResult = Omit<errorNameResult, 'errors' | 'warnings'>;

export interface PromptType {
  name: string;
  type: string;
  value?: string;
  description?: string;
  message: string;
  choices?: Array<any>;
  pageSize?: number;
}
export type featureType = Omit<
  PromptType,
  'type' | 'message' | 'pageSize' | 'choices'
>;
export interface answersTypes {
  preset: 'React' | 'Vue';
  features?: Array<'css-preprocessor' | 'linter' | 'TypeScript' | 'gitHooks'>;
  cssPreprocessor?: 'less' | 'dart-sass' | 'stylus';
  eslintConfig?: 'airbnb' | 'base' | 'standard' | 'prettier';
}

export interface presetPluginsTypes {
  '@m-cli/cli-plugin-eslint': {
    config: 'airbnb' | 'standard';
    lintOn: Array<'save' | 'commit'>;
  };
  '@m-cli/cli-service': any;
  '@m-cli/cli-plugin-cssPreprocessors': any;
  '@m-cli/cli-plugin-typescript': any;
  '@m-cli/cli-plugin-gitHooks': any;
}

export interface resolvePluginsType {
  id: string;
  // eslint-disable-next-line no-unused-vars
  apply: (...rest: any) => void;
  options: any;
  answers: answersTypes;
}

// export type depsTypes='@m-cli/cli-plugin-eslint'| '@m-cli/cli-plugin-typescript'|'@m-cli/cli-service'
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
  // [prop: any]: string;
  // prop: any: string;
}
