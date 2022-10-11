// 追加package.json相关选项的依赖
const extendPackage = (oldReactPackage: any, addPackage: any) => {
  const newReactPackage = JSON.parse(oldReactPackage);
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const key in addPackage) {
    newReactPackage[key] = {
      ...newReactPackage[key],
      ...addPackage[key],
    };
  }

  return newReactPackage;
};

export default extendPackage;
