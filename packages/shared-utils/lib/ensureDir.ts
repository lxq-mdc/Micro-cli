import fs from 'fs-extra';
import isCover from './isCover';
import { errorLogWithBg, successLog } from './logWithChalk';

/**
 * @description 确保目录是正常，如果有相同名字的，则向用户询问是否覆盖
 * @description 若覆盖，则执行覆盖操作并返回true；若不覆盖，则返回false
 */
const ensureDir = async (
  path: string,
  options: { force?: string }
): Promise<boolean> => {
  try {
    // 判断当前目录下有没有用户创建的同名的目录
    if (await fs.pathExists(path)) {
      if (options.force) {
        // 若用户强制覆盖
        await fs.emptyDir(path);
      } else {
        const { action } = await isCover('directory'); // 提示用户是否确定要覆盖
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
    return false;
  }
};

export default ensureDir;
