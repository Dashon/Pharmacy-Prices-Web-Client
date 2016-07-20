<<<<<<< HEAD
import {readFileSync} from 'fs';
import {argv} from 'yargs';
import {normalize, join} from 'path';

// --------------
// Configuration.

const ENVIRONMENTS = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod'
};

export const PROJECT_ROOT         = normalize(join(__dirname, '..'));
export const ENV                  = getEnvironment();
export const DEBUG                = argv['debug']       || false;
export const PORT                 = argv['port']        || 9000;
export const LIVE_RELOAD_PORT     = argv['reload-port'] || 9001;
export const DOCS_PORT            = argv['docs-port']   || 9002;
export const APP_BASE             = argv['base']        || '/';

export const ENABLE_HOT_LOADING   = !!argv['hot-loader'];


export const BOOTSTRAP_MODULE     = 'main';

export const APP_TITLE            = 'Ani Theme';

export const APP_SRC              = 'app';
export const ASSETS_SRC           = `${APP_SRC}/assets`;

export const TOOLS_DIR            = 'tools';
export const TMP_DIR              = 'tmp';
export const TEST_DEST            = 'test';
export const DOCS_DEST            = 'docs';
export const APP_DEST             = `dist/${ENV}`;
export const ASSETS_DEST          = `${APP_DEST}/assets`;
export const CSS_DEST             = `${APP_DEST}/css`;
export const FONT_DEST            = `${APP_DEST}/fonts`;
export const JS_DEST              = `${APP_DEST}/js`;
export const APP_ROOT             = ENV === 'dev' ? `${APP_BASE}${APP_DEST}/` : `${APP_BASE}`;
export const VERSION              = appVersion();

export const CSS_PROD_BUNDLE      = 'all.css';
export const JS_PROD_SHIMS_BUNDLE = 'shims.js';
export const JS_PROD_APP_BUNDLE   = 'app.js';
export const JS_PROD_REF_BUNDLE = 'ref.js';

export const VERSION_NPM          = '2.14.2';
export const VERSION_NODE         = '4.0.0';

interface InjectableDependency {
  src: string;
  inject: string | boolean;
  dest?: string;
}

// Declare NPM dependencies (Note that globs should not be injected).
export const DEV_NPM_DEPENDENCIES: InjectableDependency[] = normalizeDependencies([
  { src: 'angular2/bundles/angular2-polyfills.js', inject: 'shims', dest: JS_DEST },
  { src: 'systemjs/dist/system-polyfills.src.js', inject: 'ref', dest: JS_DEST },
  { src: 'reflect-metadata/Reflect.js', inject: 'shims', dest: JS_DEST },
  { src: 'es6-shim/es6-shim.js', inject: 'shims', dest: JS_DEST },
  { src: 'systemjs/dist/system.src.js', inject: 'shims', dest: JS_DEST },
  { src: 'rxjs/bundles/Rx.js', inject: 'libs', dest: JS_DEST },
  { src: 'angular2/bundles/angular2.js', inject: 'libs', dest: JS_DEST },
  { src: 'angular2/bundles/router.js', inject: 'libs', dest: JS_DEST },
  { src: 'angular2/bundles/http.js', inject: 'libs', dest: JS_DEST },
  { src: 'jquery/dist/jquery.min.js', inject: 'libs', dest: JS_DEST },
  { src: 'chart.js/Chart.js', inject: 'libs', dest: JS_DEST },
  { src: 'c3/c3.css', inject: true, dest: CSS_DEST },
  { src: 'd3/d3.min.js', inject: 'libs', dest: JS_DEST },
  { src: 'c3/c3.min.js', inject: 'libs', dest: JS_DEST },
  { src: 'moment/min/moment.min.js', inject: 'libs', dest: JS_DEST },
  { src: 'fullcalendar/dist/fullcalendar.css', inject: true, dest: CSS_DEST },
  { src: 'fullcalendar/dist/fullcalendar.js', inject: 'libs', dest: JS_DEST },
  { src: 'ckeditor/ckeditor.js', inject: 'libs', dest: JS_DEST }
]);

export const PROD_NPM_DEPENDENCIES: InjectableDependency[] = normalizeDependencies([
  { src: 'angular2/bundles/angular2-polyfills.min.js', inject: 'ref' },
  { src: 'reflect-metadata/Reflect.js', inject: 'ref' },
  { src: 'es6-shim/es6-shim.min.js', inject: 'shims' },
  { src: 'jquery/dist/jquery.min.js', inject: 'libs'},
  { src: 'chart.js/Chart.min.js', inject: 'libs'},
  { src: 'c3/c3.min.css', inject: true, dest: CSS_DEST },
  { src: 'd3/d3.min.js', inject: 'libs'},
  { src: 'c3/c3.min.js', inject: 'libs'},
  { src: 'moment/min/moment.min.js', inject: 'libs'},
  { src: 'fullcalendar/dist/fullcalendar.css', inject: true, dest: CSS_DEST },
  { src: 'fullcalendar/dist/fullcalendar.min.js', inject: 'libs'},
  { src: 'ckeditor/ckeditor.js', inject: 'libs'},
]);

// Declare local files that needs to be injected
export const APP_ASSETS: InjectableDependency[] = [
    { src: `${ASSETS_SRC}/font-awesome-4.5.0/css/font-awesome.min.css`, inject: true, dest: CSS_DEST },
    { src: `${ASSETS_SRC}/components/jqvmap-master/dist/jqvmap.css`, inject: true, dest: CSS_DEST },
    { src: `${ASSETS_SRC}/components/ProgressButtonStyles/css/component.css`, inject: true, dest: CSS_DEST },
    { src: `${ASSETS_SRC}/components/ProgressButtonStyles/js/classie.js`, inject: true, dest: JS_DEST },
    { src: `${ASSETS_SRC}/components/ProgressButtonStyles/js/modernizr.custom.js`, inject: true, dest: JS_DEST },
    { src: `${ASSETS_SRC}/components/ProgressButtonStyles/js/progressButton.js`, inject: true, dest: JS_DEST },
    { src: `${ASSETS_SRC}/components/jquery.growl/stylesheets/jquery.growl.css`, inject: true, dest: CSS_DEST },
    { src: `${ASSETS_SRC}/components/jquery.growl/javascripts/jquery.growl.js`, inject: true, dest: JS_DEST },
    { src: `${ASSETS_SRC}/components/datetimepicker/css/bootstrap-datetimepicker.min.css`, inject: true, dest: CSS_DEST },
    { src: `${ASSETS_SRC}/components/datetimepicker/js/bootstrap-datetimepicker.min.js`, inject: true, dest: JS_DEST },
    { src: `${ASSETS_SRC}/components/perfect-scrollbar/css/perfect-scrollbar.css`, inject: true, dest: CSS_DEST },
    { src: `${ASSETS_SRC}/components/perfect-scrollbar/js/perfect-scrollbar.jquery.js`, inject: true, dest: JS_DEST },
    { src: `${ASSETS_SRC}/components/jqvmap-master/dist/jquery.vmap.min.js`, inject: 'libs', dest: JS_DEST },
    { src: `${ASSETS_SRC}/components/jqvmap-master/dist/maps/jquery.vmap.world.js`, inject: 'libs', dest: JS_DEST },
    { src: `${ASSETS_SRC}/sass/app.css`, inject: true, dest: CSS_DEST }
];


export const DEV_DEPENDENCIES = DEV_NPM_DEPENDENCIES.concat(APP_ASSETS);
export const PROD_DEPENDENCIES = PROD_NPM_DEPENDENCIES.concat(APP_ASSETS);


// ----------------
// SystemsJS Configuration.
const SYSTEM_CONFIG_DEV = {
  defaultJSExtensions: true,
  paths: {
    [BOOTSTRAP_MODULE]: `${APP_ROOT}${BOOTSTRAP_MODULE}`,
    'hot_loader_main': `${APP_ROOT}hot_loader_main`,
    'angular2/*': `${APP_ROOT}angular2/*`,
    'rxjs/*': `${APP_ROOT}rxjs/*`,
    '*': `${APP_BASE}node_modules/*`
  },
  packages: {
    angular2: { defaultExtension: false },
    rxjs: { defaultExtension: false }
  }
};

export const SYSTEM_CONFIG = SYSTEM_CONFIG_DEV;

// --------------
// Private.

function normalizeDependencies(deps: InjectableDependency[]) {
  deps
    .filter((d:InjectableDependency) => !/\*/.test(d.src)) // Skip globs
    .forEach((d:InjectableDependency) => d.src = require.resolve(d.src));
  return deps;
}

function appVersion(): number|string {
  var pkg = JSON.parse(readFileSync('package.json').toString());
  return pkg.version;
}

function getEnvironment() {
  let base:string[] = argv['_'];
  let prodKeyword = !!base.filter(o => o.indexOf(ENVIRONMENTS.PRODUCTION) >= 0).pop();
  if (base && prodKeyword || argv['env'] === ENVIRONMENTS.PRODUCTION) {
    return ENVIRONMENTS.PRODUCTION;
  } else {
    return ENVIRONMENTS.DEVELOPMENT;
  }
}
=======
import { ProjectConfig } from './config/project.config';

const config: ProjectConfig = new ProjectConfig();
export = config;
>>>>>>> Dev
