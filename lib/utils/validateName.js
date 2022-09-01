// name必须是字符串，不能以.或_开头，不能有大写字母，因为名称最终成为URL的一部分因此不能包含任何非URL安全字符。
//所以在这里做一次校验，要是名字不合法，直接返回
const validateName = (projectName) => {
  if (projectName.startsWith('.') || projectName.startsWith('_')) {
    return false;
  }
  return true;
};

module.exports = validateName;
