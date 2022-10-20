import ora, { Ora } from 'ora';

export default async (
  fn: () => Promise<string>,
  message: string
): Promise<void> => {
  const spinner: Ora = ora(message);
  spinner.start();
  try {
    await fn();
    spinner.succeed();
  } catch (e) {
    spinner.fail(`Installing additional dependencies failed,${e}`);
  }
};
