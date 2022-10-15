// eslint-disable-next-line import/no-unresolved
import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['./index'],
  // Generates .d.ts declaration file
  declaration: true,
});
