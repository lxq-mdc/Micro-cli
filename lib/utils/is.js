import fs from 'fs-extra';
import { errorLog } from './logWithChalk';

/**
 * @description 通过判断当前目录下是否存在tsconfig.json，来判断是否是typescript项目
 * @return {Promise<boolean>} 是否是typescript项目
 */
export const isTypescript = async () => {
  const result = await fs.pathExists('tsconfig.json');
  return result;
};

/**
 * @description 通过判断当前目录下是否存在package.json，来判断是否是在根目录
 * @return {Promise<boolean>} 是否在根目录
 */
export const isRoot = async () => {
  if (!(await fs.pathExists('package.json'))) {
    errorLog(
      '\n ⚠️   Please make sure you are running this command from the project root directory\n'
    );
    return false;
  }
  return true;
};
