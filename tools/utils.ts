<<<<<<< HEAD
export * from './utils/template_injectables';
export * from './utils/template_locals';
export * from './utils/server';
export * from './utils/tasks_tools';


export function tsProjectFn(plugins) {
  return plugins.typescript.createProject('tsconfig.json', {
    typescript: require('typescript')
  });
}
=======
/**
 * This barrel file provides the export for the utilities provided by the project and the seed.
 */
export * from './utils/project.utils';
export * from './utils/seed.utils';
>>>>>>> Dev
