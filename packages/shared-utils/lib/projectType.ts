import fs from 'fs-extra';

/**
 * @description 判断当前项目是什么项目
 * @return {Promise<'Vue'|'React'|'unknown'>} 项目名
 */
const projectType = async (): Promise<'Vue' | 'React' | 'unknown'> => {
  switch (true) {
    case await fs.pathExists('src/App.vue'):
      return 'Vue';
    case await fs.pathExists('src/App.tsx'):
    case await fs.pathExists('src/App.jsx'):
      return 'React';
    default:
      return 'unknown';
  }
};

export default projectType;
