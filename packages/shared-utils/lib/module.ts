// import Module from "module";
import path from 'path';

// const loadModule= (request:string,targetDir:string)=>Module.createRequire(path.resolve(targetDir,'./node_modules/@m-cli/cli-service/generator/index'))('./index.ts')
const loadModule = async (request: string, targetDir: string) => {
  const res = import(
    path.resolve(
      targetDir,
      `./node_modules/@m-cli/${request.slice(7)}/dist/index.mjs`
    )
  );
  // console.log('res', res);

  //    return Module.createRequire(path.resolve(targetDir,'./node_modules/@m-cli/cli-service/dist/index'))('./index.mjs')
  return res;
};
export default loadModule;
