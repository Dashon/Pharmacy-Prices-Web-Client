import * as gulp from 'gulp';
<<<<<<< HEAD
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
=======
import * as runSequence from 'run-sequence';

import { PROJECT_TASKS_DIR, SEED_TASKS_DIR } from './tools/config';
import { loadTasks } from './tools/utils';


loadTasks(SEED_TASKS_DIR);
loadTasks(PROJECT_TASKS_DIR);


// --------------
// Build dev.
gulp.task('build.dev', (done: any) =>
  runSequence(//'clean.dev',
              'tslint',
              'css-lint',
              'build.assets.dev',
              'build.fonts', 
              'build.html_css',
              'build.js.dev',
              'build.index.dev',
              done));

// --------------
// Build dev watch.
gulp.task('build.dev.watch', (done: any) =>
  runSequence('build.dev',
              'watch.dev',
              done));

// --------------
// Build e2e.
gulp.task('build.e2e', (done: any) =>
  runSequence('clean.dev',
              'tslint',
              'build.assets.dev',
              'build.js.e2e',
>>>>>>> Dev
              'build.index.dev',
              done));

// --------------
// Build prod.
<<<<<<< HEAD
gulp.task('build.prod', done =>
  runSequence('clean.dist',
              'clean.tmp',
              'tslint',
              'build.sass.prod',
              'build.assets.prod',
              'build.html_css.prod',
              'build.js.prod',
              'build.bundles',
=======
gulp.task('build.prod', (done: any) =>
  runSequence('clean.prod',
              //'tslint',
              //'css-lint',
              'build.assets.prod',
              'build.fonts', 
              'build.html_css',
              'copy.js.prod',
              'build.js.prod',
              'build.bundles',
              'build.bundles.app',
>>>>>>> Dev
              'build.index.prod',
              done));

// --------------
<<<<<<< HEAD
// Watch.
gulp.task('build.dev.watch', done =>
  runSequence('build.dev',
              'watch.dev',
              done));

gulp.task('build.test.watch', done =>
=======
// Build test.
gulp.task('build.test', (done: any) =>
  runSequence('clean.dev',
              'tslint',
              'build.assets.dev',
              'build.fonts', 
              'build.js.test',
              'build.index.dev',
              done));

// --------------
// Build test watch.
gulp.task('build.test.watch', (done: any) =>
>>>>>>> Dev
  runSequence('build.test',
              'watch.test',
              done));

// --------------
<<<<<<< HEAD
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
=======
// Build tools.
gulp.task('build.tools', (done: any) =>
  runSequence('clean.tools',
              'build.js.tools',
              done));

// --------------
// Docs
// gulp.task('docs', (done: any) =>
//   runSequence('build.docs',
//               'serve.docs',
//               done));

// --------------
// Serve dev
gulp.task('serve.dev', (done: any) =>
  runSequence('build.dev',
              'server.start',
              'watch.dev',
              done));

// --------------
// Serve e2e
gulp.task('serve.e2e', (done: any) =>
  runSequence('build.e2e',
              'server.start',
              'watch.e2e',
              done));


// --------------
// Serve prod
gulp.task('serve.prod', (done: any) =>
  runSequence('build.prod',
              'server.prod',
>>>>>>> Dev
              done));


// --------------
<<<<<<< HEAD
// Serve e2e
gulp.task('serve.e2e', done =>
  runSequence('build.e2e',
              'server.start',
              'watch.serve',
=======
// Test.
gulp.task('test', (done: any) =>
  runSequence('build.test',
              'karma.start',
>>>>>>> Dev
              done));
