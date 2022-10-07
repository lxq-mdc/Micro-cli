import fs from 'fs-extra';
import { IsCover } from './prompts';
import { errorLogWithBg, successLog } from './logWithChalk';

/**
 * @description 确保目录是正常，如果有相同名字的，则向用户询问是否覆盖
 * @description 若覆盖，则执行覆盖操作并返回true；若不覆盖，则返回false
 * @param {string} path
 * @param {object} options
 * @return {Promise<boolean>}
 */
// eslint-disable-next-line consistent-return
const ensureDir = async (path, options) => {
  try {
    // 判断当前目录下有没有用户创建的同名的目录
    if (await fs.pathExists(path)) {
      if (options.force) {
        // 若用户强制覆盖
        await fs.emptyDir(path);
      } else {
        const { action } = await IsCover(); // 提示用户是否确定要覆盖
        if (!action) return false;
        console.log('removing...');
        await fs.emptyDir(path);
        successLog(' 💫 remove success!!!');
      }
    } else {
      await fs.ensureDir(path);
    }
    return true;
  } catch (err) {
    errorLogWithBg('something error!!!');
    console.log(err);
  }
};

export default ensureDir;
