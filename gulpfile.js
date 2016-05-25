var gulp = require('gulp'),
    rename = require('gulp-rename'),
    traceur = require('gulp-traceur'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    requireDir = require('require-dir');


requireDir('./gulp');

// run init tasks
gulp.task('default', ['dependencies', 'js', 'html', 'sass', 'img']);

// run development task
gulp.task('dev', ['watch', 'serve']);

// serve the build dir
gulp.task('serve', function () {
  gulp.src('build')
    .pipe(webserver({
      open: true
    }));
});

// watch for changes and run the relevant task
gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', ['js']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/scss/*.scss', ['sass']);
});

// move dependencies into build dir
gulp.task('dependencies', function () {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/traceur/bin/traceur-runtime.js',
    'node_modules/systemjs/dist/system-csp-production.src.js',
    'node_modules/systemjs/dist/system.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/angular2/bundles/angular2.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/es6-shim/es6-shim.map',
    'node_modules/foundation-sites/dist/foundation.js'
  ])
    .pipe(gulp.dest('build/lib'));
});

// transpile & move js
gulp.task('js', function () {
  return gulp.src('src/**/*.ts')
    .pipe(rename({
      extname: ''
    }))
    .pipe(traceur({
      modules: 'instantiate',
      moduleName: true,
      annotations: true,
      types: true,
      memberVariables: true
    }))
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(gulp.dest('build'));
});

// move html
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'))
});

// move css
// gulp.task('sass', function () {
//   return gulp.src('src/scss/*.scss')
//     .pipe(sass({ includePaths : ['build/css'] }))
//     .pipe(gulp.dest('build/css'));
// });

gulp.task('img', function () {
  return gulp.src('src/images/*')
    .pipe(gulp.dest('build/images'))
});

