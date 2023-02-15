import { execSync } from 'child_process';
import semver from 'semver';

export const hasYarn = () => {
  try {
    execSync('yarn --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
};

function getPnpmVersion() {
  let pnpmVersion;
  try {
    pnpmVersion = execSync('pnpm --version', {
      stdio: ['pipe', 'pipe', 'ignore'],
    }).toString();
    // there's a critical bug in pnpm 2
    // https://github.com/pnpm/pnpm/issues/1678#issuecomment-469981972
    // so we only support pnpm >= 3.0.0
    // eslint-disable-next-line no-empty
  } catch (e) {}
  return pnpmVersion || '0.0.0';
}
export const hasPnpmVersionOrLater = (version: string) =>
  semver.gte(getPnpmVersion(), version);
export const hasPnpm3OrLater = () => hasPnpmVersionOrLater('3.0.0');

/**
 * @description:判断该用户是否安装过git
 * @returns : true | false
 */
export const hasGit = () => {
  try {
    execSync('git --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * @description:判断当前目录下是否已经初始化git
 * @returns : true | false
 */
export const hasProjectGit = (cwd: string) => {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore', cwd });
    return true;
  } catch (e) {
    return false;
  }
};
