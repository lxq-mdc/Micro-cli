// 追加pkg.json相关选项的依赖
const extendPackage = (oldReactPkg, pkg) => {
  const newReactPkg = JSON.parse(oldReactPkg);
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in pkg) {
    // if (key == 'devDependencies' || key == 'dependencies') {
    //     newReactpkg[key] = {
    //         ...newReactpkg[key],
    //         ...pkg[key]
    //     }
    // }
    newReactPkg[key] = {
      ...newReactPkg[key],
      ...pkg[key],
    };
  }
  return newReactPkg;
};

export default extendPackage;
