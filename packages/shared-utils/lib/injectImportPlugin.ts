import BabelCore, { PluginObj } from '@babel/core';

interface Option {
  kind: 'named' | 'default';
  require: string;
}

interface OuterOptions {
  [K: string]: Option;
}

interface Options {
  [K: string]: Option & { identifierName?: string };
}

export default (
  { types, template }: typeof BabelCore,
  outerOptions: OuterOptions
): PluginObj => {
  const options: Options = outerOptions;
  return {
    visitor: {
      Program(path) {
        path.traverse({
          ImportDeclaration(importPath) {
            const requirePath = importPath.node.source.value;
            Object.keys(options).forEach((key) => {
              const option = options[key];
              if (option.require === requirePath) {
                // 包名相同
                const specifiers = importPath.get('specifiers');
                specifiers.forEach((specifier) => {
                  // 如果是默认type导入
                  if (option.kind === 'default') {
                    // 判断导入类型
                    if (types.isImportDefaultSpecifier(specifier)) {
                      // 找到已有 default 类型的引入
                      if (specifier.node.local.name === key) {
                        // 挂到 identifierName 以供后续调用获取
                        option.identifierName = specifier
                          .get('local')
                          .toString();
                      }
                    }
                  }

                  // 如果是 named 形式的导入
                  if (option.kind === 'named') {
                    //
                    if (types.isImportSpecifier(specifier)) {
                      // 找到已有 default 类型的引入
                      if (specifier.node.local.name === key) {
                        option.identifierName = specifier.local.toString();
                      }
                    }
                  }
                });
              }
            });
          },
        });

        // 处理未被引入的包
        Object.keys(options).forEach((key) => {
          const option = options[key];
          // 需要require 并且未找到 identifierName 字段
          if (option.require && !option.identifierName) {
            // default形式
            if (option.kind === 'default') {
              // eslint-disable-next-line no-use-before-define
              insertImportStatement(path, key, option);
            }

            // named形式
            if (option.kind === 'named') {
              // eslint-disable-next-line no-use-before-define
              insertImportStatement(path, key, option);
            }
          }

          // 如果没有传递 require 会认为是全局方法，不做导入处理
          if (!option.require) {
            option.identifierName = key;
          }
        });
      },
    },
  };

  function insertImportStatement(
    path: BabelCore.NodePath<BabelCore.types.Program>,
    key: string,
    option: Option
  ) {
    const nodeIndex = path.node.body.findIndex((node) => {
      if (node.type !== 'ImportDeclaration') {
        return true;
      }
      return false;
    });

    let newNode;
    if (option.kind === 'default') {
      newNode = template.statement(`import ${key} from '${option.require}'`)();
    } else {
      newNode = template.statement(
        `import {${key}} from '${option.require}'`
      )();
    }

    (
      path.get(
        `body.${nodeIndex}`
      ) as BabelCore.NodePath<BabelCore.types.Statement>
    ).insertBefore(newNode);
  }
};
