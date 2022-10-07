import fs from 'fs-extra';
import { IsCover } from './prompts';
import { errorLogWithBg, successLogWithBg } from './logWithChalk';

/**
 * @description 确保文件是正常，如果有相同名字的，则向用户询问是否覆盖
 * @description 若覆盖，则执行覆盖操作并返回true；若不覆盖，则返回false
 * @param {string} path
 * @param {object} options
 * @return {Promise<boolean>}
 */
// eslint-disable-next-line consistent-return
const ensureFile = async (path, options) => {
  try {
    // 判断当前目录下有没有用户创建的同名的文件名
    if (await fs.pathExists(path)) {
      if (options.force) {
        // 若用户强制覆盖
        await fs.remove(path);
      } else {
        const { action } = await IsCover(); // 提示用户是否确定要覆盖
        if (!action) return false;

        console.log('removing...');
        await fs.remove(path);
        successLogWithBg(' 💫 remove success!!!');
      }
    }
    return true;
  } catch (err) {
    errorLogWithBg('something error!!!');
    console.log(err);
  }
};

export default ensureFile;
