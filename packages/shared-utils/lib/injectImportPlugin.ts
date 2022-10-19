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

interface NewOption {
  kind: 'named' | 'default';
  key: string;
}

export default (
  { types, template }: typeof BabelCore,
  outerOptions: OuterOptions
): PluginObj => {
  const options: Options = outerOptions;
  const importDefaultSpecifierMap = new Map();
  const importSpecifierMap = new Map();
  const importRenamedSpecifierMap = new Map();
  const unImportedOptions: {
    [K: string]: NewOption[];
  } = {};

  return {
    visitor: {
      Program(path) {
        path.traverse({
          ImportDeclaration: {
            enter: (importPath) => {
              importPath.get('specifiers').forEach((specifier) => {
                if (types.isImportDefaultSpecifier(specifier)) {
                  importDefaultSpecifierMap.set(
                    specifier.node.local.name,
                    importPath.node.source.value
                  );
                } else if (
                  specifier.node.local.name !==
                  (
                    (specifier.node as BabelCore.types.ImportSpecifier)
                      .imported as BabelCore.types.Identifier
                  ).name
                ) {
                  importRenamedSpecifierMap.set(specifier.node.local.name, {
                    imported: specifier.node.local.name,
                    require: importPath.node.source.value,
                  }); // 如果是import React, { useState as a } from 'react'，就把useState和a全部放进去
                } else {
                  importSpecifierMap.set(
                    specifier.node.local.name,
                    importPath.node.source.value
                  );
                }
              });
            },
          },
        });

        Object.keys(options).forEach((key) => {
          if (importDefaultSpecifierMap.has(key)) {
            if (
              options[key].require !== importDefaultSpecifierMap.get(key) ||
              options[key].kind !== 'default'
            )
              // 名字相同，但是包不同或者不是默认导入
              throw new Error('default error');
          } else if (importSpecifierMap.has(key)) {
            if (
              options[key].require !== importSpecifierMap.get(key) ||
              options[key].kind !== 'named'
            )
              // 名字相同，但是包不同或者不是按需导入
              throw new Error('named error');
          } else if (importRenamedSpecifierMap.has(key)) {
            throw new Error('renamed error');
          } else {
            if (!unImportedOptions[options[key].require])
              unImportedOptions[options[key].require] = [];
            unImportedOptions[options[key].require].push({
              key,
              kind: options[key].kind,
            });
          }
        });

        path.traverse({
          ImportDeclaration: (importPath) => {
            console.log('--------------', importPath.toString());
            console.log(unImportedOptions);
            Object.keys(unImportedOptions).forEach((requireSource, index) => {
              if (importPath.node.source.value === requireSource) {
                console.log(index, requireSource);
                // eslint-disable-next-line no-use-before-define
                addImportInOldStatement(
                  importPath,
                  requireSource,
                  unImportedOptions[requireSource]
                );
                unImportedOptions[requireSource] = [];
                importPath.skip(); // 跳过遍历新生成的节点
              }
            });
          },
        });

        Object.keys(unImportedOptions).forEach((requireSource) => {
          if (unImportedOptions[requireSource].length > 0) {
            // eslint-disable-next-line no-use-before-define
            insertImportStatement(
              path,
              requireSource,
              unImportedOptions[requireSource]
            );
          }
        });
      },
    },
  };

  function insertImportStatement(
    path: BabelCore.NodePath<BabelCore.types.Program>,
    requireSource: string,
    arr: NewOption[]
  ) {
    const namedImport: string[] = [];
    let defaultImport = '';
    arr.forEach((option) => {
      if (option.kind === 'named') {
        namedImport.push(option.key);
      } else {
        defaultImport = option.key;
      }
    });
    console.log(
      `import ${`${defaultImport} `} ${
        namedImport.length > 0 ? `{${namedImport.join(',')}}` : ''
      } from '${requireSource}'`
    );
    const newNode = template.statement(
      `import ${`${defaultImport} `} ${
        namedImport.length > 0 ? `{${namedImport.join(',')}}` : ''
      } from '${requireSource}'`
    )();

    const nodeIndex = path.node.body.findIndex((node) => {
      if (node.type !== 'ImportDeclaration') {
        return true;
      }
      return false;
    });
    console.log(path.get(`body.${nodeIndex}`));
    (
      path.get(`body.${nodeIndex}`) as BabelCore.NodePath<BabelCore.types.Node>
    ).insertBefore(newNode);
  }

  function addImportInOldStatement(
    importPath: BabelCore.NodePath<BabelCore.types.ImportDeclaration>,
    requireSource: string,
    arr: NewOption[]
  ) {
    let statement = importPath.toString();
    console.log(requireSource, arr);
    arr.forEach((option) => {
      if (option.kind === 'named') {
        statement = `${statement.split('}')[0]}, ${
          option.key
        } } from '${requireSource}'`;
        console.log(statement);
      } else {
        statement = `import ${option.key},{${statement.split('{')}`;
      }
    });

    importPath.replaceWith(template.statement(statement)());
  }
};
