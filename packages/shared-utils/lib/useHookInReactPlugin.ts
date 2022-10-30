import BabelCore, { PluginObj } from '@babel/core';

interface Option {
  statement: string;
}

export default (
  { template }: typeof BabelCore,
  options: Option
): PluginObj => ({
  visitor: {
    FunctionDeclaration(path) {
      path
        .get('body')
        .get('body')[0]
        .insertBefore(template.statement(options.statement)());
    },
  },
});
