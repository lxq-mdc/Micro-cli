const path = require('path');
const { compile, writeToFile } = require('../utils/compile');
const ensureDir = require('../utils/ensureDir');
const { successLog } = require('../utils/logWithChalk');

const addComponentAction = async(componentName, options, pathName) => {
    const dirName = path.resolve(process.cwd(), `${pathName}/${componentName}`);
    await ensureDir(dirName, options);
    const tsx = await compile('react-page.ejs', { name: componentName });
    const css = await compile('style.ejs', { name: componentName });
    await writeToFile(dirName + '/index.tsx', tsx);
    await writeToFile(dirName + '/index.css', css);
    successLog(`add ${componentName} page success!!!`);
};

module.exports = addComponentAction;