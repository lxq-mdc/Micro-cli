const fs = require('fs-extra');

/**
 * @description 判断当前项目是什么项目
 * @return {'Vue'|'React'|'unknown'} 是否在根目录
 */
const projectType = async () => {
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

module.exports = projectType;
