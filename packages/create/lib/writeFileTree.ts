import fs from 'fs-extra';
import path from 'node:path';

export default function writeFileTree(dir: string, files: any) {
  Object.keys(files).forEach((name) => {
    const filePath = path.join(dir, name);
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, files[name]);
  });
}
