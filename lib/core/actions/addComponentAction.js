import path from 'path';
import { complie, writeToFile } from '../../utils/complie';
import ensureDir from '../../utils/ensureDir';
import { successLogWithBg } from '../../utils/logWithChalk';
import { isRoot, isTypescript } from '../../utils/is';
import projectType from '../../utils/projectType';
import ensureFile from '../../utils/ensureFile';

const addComponentAction = async (componentName, options, pathName) => {
  if (!(await isRoot())) return; // 如果不在根目录，无法创建

  const type = await projectType();
  const dirName = path.resolve(process.cwd(), `${pathName}/${componentName}`);

  switch (type) {
    case 'Vue': {
      if (!(await ensureFile(`${dirName}.vue`, options))) return; // 确保所需文件，如果有相同名字的，则向用户询问是否覆盖，以保证下面的操作可以进行，若不覆盖，则不执行下面的操作
      const vue = await complie('vue-component.ejs', {
        name: componentName,
        isTypescript: await isTypescript(),
      });
      await writeToFile(`${dirName}.vue`, vue);
      break;
    }
    case 'React': {
      if (!(await ensureDir(dirName, options))) return; // 确保所需目录，如果有相同名字的，则向用户询问是否覆盖，以保证下面的操作可以进行，若不覆盖，则不执行下面的操作
      const isTs = await isTypescript();
      const xml = await complie('react-component.ejs', {
        name: componentName,
        isTypescript: isTs,
      });
      const style = await complie('react-style.ejs', { name: componentName });
      await writeToFile(`${dirName}/index.${isTs ? 'tsx' : 'jsx'}`, xml);
      await writeToFile(`${dirName}/index.module.less`, style);
      break;
    }
    default:
      break;
  }
  successLogWithBg(`add ${componentName} success!!!`);
};

export default addComponentAction;
