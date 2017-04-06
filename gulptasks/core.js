const gulp = require('gulp');
const concat = require('gulp-concat');

const del = require('del');


const appName = 'core';

gulp.task(appName + ':clean', function () {
    return del('dist/' + appName);
});

gulp.task(appName + ':materialize', function () {

    const pathToMaterialize = ['node_modules/materialize-css/dist/css/materialize.min.css'];

    return gulp.src(pathToMaterialize)
        .pipe(gulp.dest('dist/core/materialize-css'));

});

gulp.task(appName + ':copy-libs', [appName + ':clean'], function () {

    const pathToJs = [
        'core-js/client/shim.min.js',
        'systemjs/dist/system.js',
        'typescript/lib/**/typescript.js',
        'rxjs/**/*.js',
        'zone.js/dist/**',
        '@angular/**/bundles/**'
    ];

    return gulp.src(pathToJs, {cwd: "node_modules/**"})
        //.pipe(concat('core.js'))
        .pipe(gulp.dest('dist/' + appName));
});