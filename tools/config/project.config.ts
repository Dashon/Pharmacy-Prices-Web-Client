import { join } from 'path';

import { SeedConfig } from './seed.config';
import { InjectableDependency } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  FONTS_DEST = `${this.APP_DEST}/fonts`;
  FONTS_SRC = [
    'node_modules/font-awesome/fonts/**'
  ];

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    let additional_deps: InjectableDependency[] = [
      { src: 'font-awesome/css/font-awesome.css', inject: true },
      { src: 'jquery/dist/jquery.js', inject: 'libs' },
      { src: 'moment/moment.js', inject: 'libs' },
      { src: 'fullcalendar/dist/fullcalendar.css', inject: true },
      { src: 'fullcalendar/dist/fullcalendar.min.js', inject: 'libs' },
      { src: 'c3/c3.css', inject: true },
      { src: 'd3/d3.js', inject: 'libs' },
      { src: 'c3/c3.js', inject: 'libs' },
      { src: 'perfect-scrollbar/dist/css/perfect-scrollbar.css', inject: true },
      { src: 'perfect-scrollbar/dist/js/perfect-scrollbar.jquery.js', inject: 'libs' },
      { src: 'ckeditor/ckeditor.js', inject: 'libs' },
      { src: 'chart.js/Chart.js', inject: 'libs' }

    ];

    const seedDependencies = this.NPM_DEPENDENCIES;

    this.NPM_DEPENDENCIES = seedDependencies.concat(additional_deps);

    /* Add to or override NPM module configurations: */
    //this.mergeObject( this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false } );

  }
}
