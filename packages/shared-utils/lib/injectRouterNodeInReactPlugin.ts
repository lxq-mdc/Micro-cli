import BabelCore, { PluginObj } from '@babel/core';

export default (
  { template, types }: typeof BabelCore,
  options: { router: string }
): PluginObj => ({
  visitor: {
    CallExpression(path) {
      if (
        types.isMemberExpression(path.node.callee) &&
        types.isIdentifier(path.node.callee.property)
      ) {
        if (path.node.callee.property.name === 'render') {
          path.get('arguments')[0].replaceWith(
            template.expression(
              `
            <${options.router}>
${path.get('arguments').toString()}
  </${options.router}>`,
              { plugins: ['jsx'] }
            )()
          );
        }
      }
    },
  },
});
