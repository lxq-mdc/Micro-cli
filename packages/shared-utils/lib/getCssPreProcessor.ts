import path from 'path';
import fs from 'fs-extra';

/**
 * @description 返回项目所用的css预处理器
 */
export default async () => {
  const content = await fs.readJSON(path.resolve('./package.json'));
  if (content.devDependencies?.less) return 'less';
  if (content.devDependencies?.sass) return 'sass';
  if (content.devDependencies?.stylus) return 'stylus';
  return undefined;
};
