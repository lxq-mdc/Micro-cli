//追加package.json相关选项的依赖
const extendPackage = (oldReactPackage, package) => {
  let newReactPackage = JSON.parse(oldReactPackage);
  for (const key in package) {
    // if (key == 'devDependencies' || key == 'dependencies') {
    //     newReactPackage[key] = {
    //         ...newReactPackage[key],
    //         ...package[key]
    //     }
    // }
    newReactPackage[key] = {
      ...newReactPackage[key],
      ...package[key],
    };
  }
  return newReactPackage;
};

module.exports = extendPackage;
