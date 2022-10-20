import GeneratorAPI from '@micro-cli/create/lib/GeneratorAPI';
import { answersTypes } from '@micro-cli/create/types';
import { DeleteUndefinedInUnion } from '@micro-cli/shared-utils';

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
