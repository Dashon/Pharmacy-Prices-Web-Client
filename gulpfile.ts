import * as gulp from 'gulp';
import {runSequence, task} from './tools/utils';
import {join} from 'path';
var sass = require('gulp-sass');

gulp.src('node_modules/moment/moment.js')
  .pipe(gulp.dest('./node_modules'));

// --------------
// Clean (override).

gulp.task('clean',       task('clean', 'all'));
gulp.task('clean.dist',  task('clean', 'dist'));
gulp.task('clean.test',  task('clean', 'test'));
gulp.task('clean.tmp',   task('clean', 'tmp'));

gulp.task('check.versions', task('check.versions'));
gulp.task('build.docs', task('build.docs'));
gulp.task('serve.docs', task('serve.docs'));


gulp.task('styles', function() {
    return gulp.src([
        'app/assets/sass/app.scss'
        ])
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('dist/prod'));
});

// --------------
// Postinstall.
gulp.task('postinstall', done =>
  runSequence('clean',
              'npm',
              done));

// --------------
// Build dev.
gulp.task('build.dev', done =>
  runSequence('clean.dist',
              'tslint',
              'build.sass.dev',
              'build.assets.dev',
              'build.js.dev',
              'build.index.dev',
              done));

// --------------
// Build prod.
gulp.task('build.prod', done =>
  runSequence('clean.dist',
              'clean.tmp',
              'tslint',
              'build.sass.prod',
              'build.assets.prod',
              'build.html_css.prod',
              'build.js.prod',
              'build.bundles',
              'build.index.prod',
              done));

// --------------
// Watch.
gulp.task('build.dev.watch', done =>
  runSequence('build.dev',
              'watch.dev',
              done));

gulp.task('build.test.watch', done =>
  runSequence('build.test',
              'watch.test',
              done));

// --------------
// Serve.
gulp.task('serve', done =>
  runSequence('build.dev',
              'server.start',
              'watch.serve',
              done));

// --------------
// Test.
gulp.task('test', done =>
  runSequence('build.test',
              'karma.start',
              done));

// --------------
// Build e2e.
gulp.task('build.e2e', done =>
  runSequence('clean',
              'tslint',
              'build.assets.dev',
              'build.js.e2e',
              'build.index.dev',
              done));


// --------------
// Serve e2e
gulp.task('serve.e2e', done =>
  runSequence('build.e2e',
              'server.start',
              'watch.serve',
              done));
