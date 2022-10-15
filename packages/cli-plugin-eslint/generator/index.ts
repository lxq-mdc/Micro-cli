// import { compile, extendPackage, writeToFile } from '@m-cli/shared-utils';
// import path from 'node:path';

// export default async (targetDir: string, pkg: any) => {
//   const result = await compile('react-eslint.ejs', {});
//   const obj = {
//     devDependencies: {
//       eslint: '^8.0.1',
//       '@typescript-eslint/eslint-plugin': '^5.0.0',
//       '@typescript-eslint/parser': '^5.33.1',
//       'eslint-config-prettier': '^8.5.0',
//       'eslint-config-standard-with-typescript': '^22.0.0',
//       'eslint-plugin-babel': '^5.3.1',
//       'eslint-plugin-import': '^2.25.2',
//       'eslint-plugin-n': '^15.0.0',
//       'eslint-plugin-prettier': '^4.2.1',
//       'eslint-plugin-promise': '^6.0.0',
//       'eslint-plugin-react': '^7.30.1',
//       'eslint-plugin-react-hooks': '^4.6.0',
//     },
//   };
//   // eslint-disable-next-line no-param-reassign
//   pkg = extendPackage(JSON.stringify(pkg), obj);
//   console.log('pkg', pkg);
//   const targetPath = path.resolve(targetDir, '.eslintrc');
//   await writeToFile(targetPath, result);
// };

export default { a: 1 };
