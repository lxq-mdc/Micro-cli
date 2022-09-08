//此函数主要是判断package.json的类型,因为在选择了某项配置后，需要遍历package.json的属性，需要将其转为json格式才能遍历，但是读取package之后返回的
//是字符串，需要通过jJSON.parse()转为json对象的格式，但是将package.json写入到项目文件中的时候，不能写入json格式，此时又需要通过JSON.stringify()转为字符串

function typeofPackage(Package) {
    return typeof Package === 'string' ? Package : JSON.stringify(Package)
}
module.exports = typeofPackage