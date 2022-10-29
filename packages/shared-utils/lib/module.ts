import path from 'path';

export default async (request: string, targetDir: string) => {
  const res = await import(
    `file:///${path.resolve(
      targetDir,
      `./node_modules/@micro-cli/${request.slice(11)}/dist/index.mjs`
    )}`
  );
  return res;
};
