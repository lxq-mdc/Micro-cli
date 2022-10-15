import fs from 'node:fs';
import path from 'node:path';
import { readPackage } from 'read-pkg';

export default (context: string) => {
  if (fs.existsSync(path.join(context, 'package.json'))) {
    return readPackage({ cwd: context });
  }
  return {};
};
