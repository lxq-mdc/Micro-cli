import BabelCore, { PluginObj } from '@babel/core';

interface Option {
  className: string;
  statements: string[];
}

export default (
  { template, types }: typeof BabelCore,
  option: Option
): PluginObj => ({
  visitor: {
    JSXElement(path) {
      path.node.openingElement.attributes.forEach((attr) => {
        if (!types.isJSXAttribute(attr) || !types.isStringLiteral(attr.value))
          return; // 若不是jsx属性或属性值不是字符串，则返回
        if (
          attr.name?.name === 'className' &&
          attr.value?.value === option.className
        ) {
          option.statements.forEach((statement, index) => {
            // TODO: 判断statement是否是jsx
            path
              .get('children')
              [0 + index].insertBefore(
                template.expression(statement, { plugins: ['jsx'] })()
              );
          });
          path.get('children').forEach((node, index) => {
            if (index >= option.statements.length) node.remove();
          });
        }
      });
    },
  },
});
