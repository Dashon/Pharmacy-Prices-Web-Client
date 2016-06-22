"use strict";
var fs_1 = require('fs');
var yargs_1 = require('yargs');
var path_1 = require('path');
var ENVIRONMENTS = {
    DEVELOPMENT: 'dev',
    PRODUCTION: 'prod'
};
exports.PROJECT_ROOT = path_1.normalize(path_1.join(__dirname, '..'));
exports.ENV = getEnvironment();
exports.DEBUG = yargs_1.argv['debug'] || false;
exports.PORT = yargs_1.argv['port'] || 9000;
exports.LIVE_RELOAD_PORT = yargs_1.argv['reload-port'] || 9001;
exports.DOCS_PORT = yargs_1.argv['docs-port'] || 9002;
exports.APP_BASE = yargs_1.argv['base'] || '/';
exports.ENABLE_HOT_LOADING = !!yargs_1.argv['hot-loader'];
exports.BOOTSTRAP_MODULE = 'main';
exports.APP_TITLE = 'Ani Theme';
exports.APP_SRC = 'app';
exports.ASSETS_SRC = exports.APP_SRC + "/assets";
exports.TOOLS_DIR = 'tools';
exports.TMP_DIR = 'tmp';
exports.TEST_DEST = 'test';
exports.DOCS_DEST = 'docs';
exports.APP_DEST = "dist/" + exports.ENV;
exports.ASSETS_DEST = exports.APP_DEST + "/assets";
exports.CSS_DEST = exports.APP_DEST + "/css";
exports.FONT_DEST = exports.APP_DEST + "/fonts";
exports.JS_DEST = exports.APP_DEST + "/js";
exports.APP_ROOT = exports.ENV === 'dev' ? "" + exports.APP_BASE + exports.APP_DEST + "/" : "" + exports.APP_BASE;
exports.VERSION = appVersion();
exports.CSS_PROD_BUNDLE = 'all.css';
exports.JS_PROD_SHIMS_BUNDLE = 'shims.js';
exports.JS_PROD_APP_BUNDLE = 'app.js';
exports.JS_PROD_REF_BUNDLE = 'ref.js';
exports.VERSION_NPM = '2.14.2';
exports.VERSION_NODE = '4.0.0';
exports.DEV_NPM_DEPENDENCIES = normalizeDependencies([
    { src: 'angular2/bundles/angular2-polyfills.js', inject: 'shims', dest: exports.JS_DEST },
    { src: 'systemjs/dist/system-polyfills.src.js', inject: 'ref', dest: exports.JS_DEST },
    { src: 'reflect-metadata/Reflect.js', inject: 'shims', dest: exports.JS_DEST },
    { src: 'es6-shim/es6-shim.js', inject: 'shims', dest: exports.JS_DEST },
    { src: 'systemjs/dist/system.src.js', inject: 'shims', dest: exports.JS_DEST },
    { src: 'rxjs/bundles/Rx.js', inject: 'libs', dest: exports.JS_DEST },
    { src: 'angular2/bundles/angular2.js', inject: 'libs', dest: exports.JS_DEST },
    { src: 'angular2/bundles/router.js', inject: 'libs', dest: exports.JS_DEST },
    { src: 'angular2/bundles/http.js', inject: 'libs', dest: exports.JS_DEST },
    { src: 'jquery/dist/jquery.min.js', inject: 'libs', dest: exports.JS_DEST },
    { src: 'chart.js/Chart.js', inject: 'libs', dest: exports.JS_DEST },
    { src: 'c3/c3.css', inject: true, dest: exports.CSS_DEST },
    { src: 'd3/d3.min.js', inject: 'libs', dest: exports.JS_DEST },
    { src: 'c3/c3.min.js', inject: 'libs', dest: exports.JS_DEST },
    { src: 'moment/min/moment.min.js', inject: 'libs', dest: exports.JS_DEST },
    { src: 'fullcalendar/dist/fullcalendar.css', inject: true, dest: exports.CSS_DEST },
    { src: 'fullcalendar/dist/fullcalendar.js', inject: 'libs', dest: exports.JS_DEST },
    { src: 'ckeditor/ckeditor.js', inject: 'libs', dest: exports.JS_DEST }
]);
exports.PROD_NPM_DEPENDENCIES = normalizeDependencies([
    { src: 'angular2/bundles/angular2-polyfills.min.js', inject: 'ref' },
    { src: 'reflect-metadata/Reflect.js', inject: 'ref' },
    { src: 'es6-shim/es6-shim.min.js', inject: 'shims' },
    { src: 'jquery/dist/jquery.min.js', inject: 'libs' },
    { src: 'chart.js/Chart.min.js', inject: 'libs' },
    { src: 'c3/c3.min.css', inject: true, dest: exports.CSS_DEST },
    { src: 'd3/d3.min.js', inject: 'libs' },
    { src: 'c3/c3.min.js', inject: 'libs' },
    { src: 'moment/min/moment.min.js', inject: 'libs' },
    { src: 'fullcalendar/dist/fullcalendar.css', inject: true, dest: exports.CSS_DEST },
    { src: 'fullcalendar/dist/fullcalendar.min.js', inject: 'libs' },
    { src: 'ckeditor/ckeditor.js', inject: 'libs' },
]);
exports.APP_ASSETS = [
    { src: exports.ASSETS_SRC + "/font-awesome-4.5.0/css/font-awesome.min.css", inject: true, dest: exports.CSS_DEST },
    { src: exports.ASSETS_SRC + "/components/jqvmap-master/dist/jqvmap.css", inject: true, dest: exports.CSS_DEST },
    { src: exports.ASSETS_SRC + "/components/ProgressButtonStyles/css/component.css", inject: true, dest: exports.CSS_DEST },
    { src: exports.ASSETS_SRC + "/components/ProgressButtonStyles/js/classie.js", inject: true, dest: exports.JS_DEST },
    { src: exports.ASSETS_SRC + "/components/ProgressButtonStyles/js/modernizr.custom.js", inject: true, dest: exports.JS_DEST },
    { src: exports.ASSETS_SRC + "/components/ProgressButtonStyles/js/progressButton.js", inject: true, dest: exports.JS_DEST },
    { src: exports.ASSETS_SRC + "/components/jquery.growl/stylesheets/jquery.growl.css", inject: true, dest: exports.CSS_DEST },
    { src: exports.ASSETS_SRC + "/components/jquery.growl/javascripts/jquery.growl.js", inject: true, dest: exports.JS_DEST },
    { src: exports.ASSETS_SRC + "/components/datetimepicker/css/bootstrap-datetimepicker.min.css", inject: true, dest: exports.CSS_DEST },
    { src: exports.ASSETS_SRC + "/components/datetimepicker/js/bootstrap-datetimepicker.min.js", inject: true, dest: exports.JS_DEST },
    { src: exports.ASSETS_SRC + "/components/perfect-scrollbar/css/perfect-scrollbar.css", inject: true, dest: exports.CSS_DEST },
    { src: exports.ASSETS_SRC + "/components/perfect-scrollbar/js/perfect-scrollbar.jquery.js", inject: true, dest: exports.JS_DEST },
    { src: exports.ASSETS_SRC + "/components/jqvmap-master/dist/jquery.vmap.min.js", inject: 'libs', dest: exports.JS_DEST },
    { src: exports.ASSETS_SRC + "/components/jqvmap-master/dist/maps/jquery.vmap.world.js", inject: 'libs', dest: exports.JS_DEST },
    { src: exports.ASSETS_SRC + "/sass/app.css", inject: true, dest: exports.CSS_DEST }
];
exports.DEV_DEPENDENCIES = exports.DEV_NPM_DEPENDENCIES.concat(exports.APP_ASSETS);
exports.PROD_DEPENDENCIES = exports.PROD_NPM_DEPENDENCIES.concat(exports.APP_ASSETS);
var SYSTEM_CONFIG_DEV = {
    defaultJSExtensions: true,
    paths: (_a = {},
        _a[exports.BOOTSTRAP_MODULE] = "" + exports.APP_ROOT + exports.BOOTSTRAP_MODULE,
        _a['hot_loader_main'] = exports.APP_ROOT + "hot_loader_main",
        _a['angular2/*'] = exports.APP_ROOT + "angular2/*",
        _a['rxjs/*'] = exports.APP_ROOT + "rxjs/*",
        _a['*'] = exports.APP_BASE + "node_modules/*",
        _a
    ),
    packages: {
        angular2: { defaultExtension: false },
        rxjs: { defaultExtension: false }
    }
};
exports.SYSTEM_CONFIG = SYSTEM_CONFIG_DEV;
function normalizeDependencies(deps) {
    deps
        .filter(function (d) { return !/\*/.test(d.src); })
        .forEach(function (d) { return d.src = require.resolve(d.src); });
    return deps;
}
function appVersion() {
    var pkg = JSON.parse(fs_1.readFileSync('package.json').toString());
    return pkg.version;
}
function getEnvironment() {
    var base = yargs_1.argv['_'];
    var prodKeyword = !!base.filter(function (o) { return o.indexOf(ENVIRONMENTS.PRODUCTION) >= 0; }).pop();
    if (base && prodKeyword || yargs_1.argv['env'] === ENVIRONMENTS.PRODUCTION) {
        return ENVIRONMENTS.PRODUCTION;
    }
    else {
        return ENVIRONMENTS.DEVELOPMENT;
    }
}
var _a;
//# sourceMappingURL=config.js.map