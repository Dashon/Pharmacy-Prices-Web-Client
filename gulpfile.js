"use strict";
var gulp = require('gulp');
var utils_1 = require('./tools/utils');
var sass = require('gulp-sass');
gulp.src('node_modules/moment/moment.js')
    .pipe(gulp.dest('./node_modules'));
gulp.task('clean', utils_1.task('clean', 'all'));
gulp.task('clean.dist', utils_1.task('clean', 'dist'));
gulp.task('clean.test', utils_1.task('clean', 'test'));
gulp.task('clean.tmp', utils_1.task('clean', 'tmp'));
gulp.task('check.versions', utils_1.task('check.versions'));
gulp.task('build.docs', utils_1.task('build.docs'));
gulp.task('serve.docs', utils_1.task('serve.docs'));
gulp.task('styles', function () {
    return gulp.src([
        'app/assets/sass/app.scss'
    ])
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('dist/prod'));
});
gulp.task('postinstall', function (done) {
    return utils_1.runSequence('clean', 'npm', done);
});
gulp.task('build.dev', function (done) {
    return utils_1.runSequence('clean.dist', 'tslint', 'build.sass.dev', 'build.assets.dev', 'build.js.dev', 'build.index.dev', done);
});
gulp.task('build.prod', function (done) {
    return utils_1.runSequence('clean.dist', 'clean.tmp', 'tslint', 'build.sass.prod', 'build.assets.prod', 'build.html_css.prod', 'build.js.prod', 'build.bundles', 'build.index.prod', done);
});
gulp.task('build.dev.watch', function (done) {
    return utils_1.runSequence('build.dev', 'watch.dev', done);
});
gulp.task('build.test.watch', function (done) {
    return utils_1.runSequence('build.test', 'watch.test', done);
});
gulp.task('serve', function (done) {
    return utils_1.runSequence('build.dev', 'server.start', 'watch.serve', done);
});
gulp.task('test', function (done) {
    return utils_1.runSequence('build.test', 'karma.start', done);
});
gulp.task('build.e2e', function (done) {
    return utils_1.runSequence('clean', 'tslint', 'build.assets.dev', 'build.js.e2e', 'build.index.dev', done);
});
gulp.task('serve.e2e', function (done) {
    return utils_1.runSequence('build.e2e', 'server.start', 'watch.serve', done);
});
//# sourceMappingURL=gulpfile.js.map