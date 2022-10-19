import { parse } from 'vue-eslint-parser';

/**
 * @param {string} code 代码
 * @param {string} replaceValue 替换成的节点
 * @description 替换某个元素内的节点
 * @description 目前只能替换template
 */
// TODO: 可以替换任何元素内的所有节点
export default (code: string, replaceValue: string) => {
  const ast = parse(code, {
    sourceType: 'module',
  });

  if (!ast.templateBody) return code;
  if (!ast.templateBody.startTag || !ast.templateBody?.endTag)
    /** @description 如果没有template 直接返回code */
    return code;

  const templateBodyStartTagLoc = ast.templateBody.startTag.range;
  const templateBodyEndTagLoc = ast.templateBody.endTag.range;

  let newTemplate = '';
  newTemplate += code.slice(...templateBodyStartTagLoc);

  newTemplate += replaceValue;

  newTemplate += code.slice(...templateBodyEndTagLoc);

  /** @description 拼接 script 和 style */
  return (
    code.slice(0, ast.templateBody.range[0]) +
    newTemplate +
    code.slice(ast.templateBody.range[1])
  );
};
