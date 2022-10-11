import path from 'path';
import {
  isRoot,
  isTypescript,
  projectType,
  successLogWithBg,
  ensureDir,
  ensureFile,
  renderFile,
} from '@m-cli/shared-utils';

export default async (componentName: string, options: {}, pathName: string) => {
  if (!(await isRoot())) return; // 如果不在根目录，无法创建

  const type = await projectType();
  const dirName = path.resolve(process.cwd(), `${pathName}/${componentName}`);

  switch (type) {
    case 'Vue': {
      if (!(await ensureFile(`${dirName}.vue`, options))) return; // 确保所需文件，如果有相同名字的，则向用户询问是否覆盖，以保证下面的操作可以进行，若不覆盖，则不执行下面的操作
      await renderFile('vue-component.ejs', `${dirName}.vue`, {
        name: componentName,
        isTypescript: await isTypescript(),
      });
      break;
    }
    case 'React': {
      if (!(await ensureDir(dirName, options))) return; // 确保所需目录，如果有相同名字的，则向用户询问是否覆盖，以保证下面的操作可以进行，若不覆盖，则不执行下面的操作
      const isTs = await isTypescript();
      await renderFile(
        'react-component.ejs',
        `${dirName}/index.${isTs ? 'tsx' : 'jsx'}`,
        {
          name: componentName,
          isTypescript: isTs,
        }
      );
      await renderFile('react-style.ejs', `${dirName}/index.module.less`, {
        name: componentName,
      });
      break;
    }
    default:
      break;
  }
  successLogWithBg(`add ${componentName} success!!!`);
};
