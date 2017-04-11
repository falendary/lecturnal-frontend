const gulp = require('gulp');
const concat = require('gulp-concat');
const replace = require('gulp-replace');

const del = require('del');


const appName = 'core';

gulp.task(appName + ':clean', function () {
    return del('dist/' + appName);
});

gulp.task(appName + ':materialize', function () {

    const pathToMaterialize = ['node_modules/materialize-css/dist/css/materialize.min.css'];

    return gulp.src(pathToMaterialize)
        .pipe(gulp.dest('dist/' + appName + '/content/css/'));

});
gulp.task(appName + ':material-icons-css', function () {

    const pathToMaterialize = ['node_modules/material-design-icons/iconfont/material-icons.css'];

    return gulp.src(pathToMaterialize)
        .pipe(replace('url(', 'url(../fonts/'))
        .pipe(gulp.dest('dist/' + appName + '/content/css/'));

});

gulp.task(appName + ':material-icons-fonts', function () {

    const pathToMaterialize = ['node_modules/material-design-icons/iconfont/*',
        '!node_modules/material-design-icons/iconfont/material-icons.css'];

    return gulp.src(pathToMaterialize)
        .pipe(gulp.dest('dist/' + appName + '/content/fonts/'));

});


gulp.task(appName + ':copy-fonts', function () {

    const pathToMaterialize = [
        'node_modules/materialize-css/dist/fonts/**'
    ];

    return gulp.src(pathToMaterialize)
        .pipe(gulp.dest('dist/' + appName + '/content/fonts'));

});

gulp.task(appName + ':copy-libs', function () {

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
        .pipe(gulp.dest('dist/' + appName + '/scripts'));
});