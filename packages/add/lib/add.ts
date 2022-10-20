import path from 'path';
import {
  isRoot,
  isTypescript,
  projectType,
  successLogWithBg,
  ensureDir,
  ensureFile,
  compile,
  writeToFile,
  getCssPreProcessor,
} from '@micro-cli/shared-utils';

export default async (componentName: string, options: {}, pathName: string) => {
  if (!(await isRoot())) return; // 如果不在根目录，无法创建

  const type = await projectType();
  const cssPreProcessor = await getCssPreProcessor();
  const isTs = await isTypescript();
  const dirName = path.resolve(process.cwd(), `${pathName}/${componentName}`);

  switch (type) {
    case 'Vue': {
      if (!(await ensureFile(`${dirName}.vue`, options))) return; // 确保所需文件，如果有相同名字的，则向用户询问是否覆盖，以保证下面的操作可以进行，若不覆盖，则不执行下面的操作
      const vue = await compile(
        path.resolve(__dirname, './templates/vue-component.ejs'),
        {
          name: componentName,
          isTypescript: isTs,
          cssPreProcessor,
        }
      );

      await writeToFile(`${dirName}.vue`, vue);
      break;
    }
    case 'React': {
      if (!(await ensureDir(dirName, options))) return; // 确保所需目录，如果有相同名字的，则向用户询问是否覆盖，以保证下面的操作可以进行，若不覆盖，则不执行下面的操作
      const xml = await compile(
        path.resolve(__dirname, './templates/react-component.ejs'),
        {
          name: componentName,
          isTypescript: isTs,
          cssPreProcessor,
        }
      );
      const style = await compile(
        path.resolve(__dirname, './templates/react-style.ejs'),
        {
          name: componentName,
        }
      );
      await writeToFile(`${dirName}/index.${isTs ? 'tsx' : 'jsx'}`, xml);
      await writeToFile(`${dirName}/index.${cssPreProcessor || 'css'}`, style);
      break;
    }
    default:
      break;
  }
  successLogWithBg(`add ${componentName} success!!!`);
};
