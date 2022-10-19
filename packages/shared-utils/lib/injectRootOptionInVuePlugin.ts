import BabelCore, { PluginObj } from '@babel/core';

export default (
  { template, types }: typeof BabelCore,
  option: { value: string }
): PluginObj => {
  const set = new Set();

  return {
    visitor: {
      CallExpression(path) {
        if (
          path.node.callee.type !== 'MemberExpression' ||
          (
            (path.get('callee').node as BabelCore.types.MemberExpression)
              .property as BabelCore.types.Identifier
          ).name !== 'use'
        )
          return;

        path.node.arguments.forEach((arg) => {
          if (types.isIdentifier(arg)) set.add(arg.name);
          else if (types.isStringLiteral(arg)) set.add(arg.value);
          else
            throw new Error(
              `The code has some problem. The type of an argument is ${arg.type}. please check the code!`
            );
        });
      },
      MemberExpression: {
        exit(path) {
          if (!set.has(option.value)) {
            if (
              (path.node.property as BabelCore.types.Identifier).name ===
              'mount'
            ) {
              const newNode = template.smart(
                `${path.get('object').toString()}.use(${option.value})`
              )() as BabelCore.types.Statement;
              path.get('object').replaceWith(newNode);
            }
          }
        },
      },
    },
  };
};
