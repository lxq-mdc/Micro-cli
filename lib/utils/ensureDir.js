const fs = require('fs-extra');
const { IsCover } = require('./prompts');
const { errorLog, successLog } = require('./logWithChalk');

/**
 * @description 确保目录是正常
 * @param {string} path
 * @param {object} options
 */
const ensureDir = async (path, options) => {
  try {
    //判断当前目录下有没有用户创建的同名的文件名
    if (await fs.pathExists(path)) {
      if (options.force) {
        // 若用户强制覆盖
        await fs.emptyDir(path);
      } else {
        let { action } = await IsCover(); // 提示用户是否确定要覆盖
        if (!action) {
          return;
        } else {
          console.log('removing...');
          await fs.emptyDir(path);
          successLog('remove success!!!');
        }
      }
    } else {
      await fs.ensureDir(path);
    }
  } catch (err) {
    errorLog('something error!!!');
    console.log(error);
  }
};

module.exports = ensureDir;
