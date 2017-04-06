const gulp = require('gulp');
const requireDir = require('require-dir');

const tasks = requireDir('./gulptasks');

gulp.task('build', ['index:build', 'core:build']);

gulp.task('default', ['build']);
