import GeneratorAPI from '@m-cli/create/lib/GeneratorAPI';
import { answersTypes } from '@m-cli/create/types';
import { DeleteUndefinedInUnion } from '@m-cli/shared-utils';

const preprocessorVersion = {
  sass: '^1.55.0',
  less: '^4.1.3',
  stylus: '^0.59.0',
};

export default (api: GeneratorAPI, options: any, answers: answersTypes) => {
  // const isTypescript = answers.features?.includes('TypeScript') || false;

  const preprocessor = answers.cssPreprocessor;
  api.extendPackage({
    devDependencies: {
      [preprocessor as string]:
        preprocessorVersion[
          preprocessor as DeleteUndefinedInUnion<
            answersTypes['cssPreprocessor']
          >
        ],
    },
  });
};
