'use strict';

var fs = require('fs');
var gulp = require('gulp');
var Parker = require('parker/lib/Parker');
var prettyJSON = require('prettyjson');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var scssLint = require('gulp-scss-lint');

var PATHS = [
  'src/scss',
  'node_modules/motion-ui/src',
  'node_modules/foundation-docs/scss'
];

var LINT_PATHS = [
  'scss/**/*.scss',
  '!scss/vendor/**/*.scss'
];

var SASS_PATHS = [
  'node_modules/foundation-sites/scss/*',
  'node_modules/motion-ui/src'
];
var COMPATIBILITY = [
  'last 2 versions',
  'ie >= 9',
  'Android >= 2.3'
];

// Compiles Sass files into CSS
gulp.task('sass', ['sass:foundation', 'sass:docs']);

// Compiles Foundation Sass
gulp.task('sass:foundation', function() {
  return gulp.src('src/scss/main.scss')
    .pipe(sass({
      includePaths: SASS_PATHS
    })).on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe(gulp.dest('build/css'))
    .on('finish', function() {
      gulp.src(LINT_PATHS).pipe(scssLint())
    });
});


// Compiles docs Sass (includes Foundation code also)
gulp.task('sass:docs', function() {
  return gulp.src('docs/assets/scss/docs.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: PATHS
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_build/assets/css'));
});

// Audits CSS filesize, selector count, specificity, etc.
gulp.task('sass:audit', ['sass:foundation'], function(cb) {
  fs.readFile('./_build/assets/css/foundation.css', function(err, data) {
    var parker = new Parker(require('parker/metrics/All'));
    var results = parker.run(data.toString());
    console.log(prettyJSON.render(results));
    cb();
  });
});
