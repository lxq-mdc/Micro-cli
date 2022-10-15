import path from 'path';

export default async (request: string, targetDir: string) => {
  const res = await import(
    path.resolve(
      targetDir,
      `./node_modules/@m-cli/${request.slice(7)}/dist/index.mjs`
    )
  );
  return res;
};
