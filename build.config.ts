import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['./bin/index'],
  // Generates .d.ts declaration file
  declaration: true,
});
