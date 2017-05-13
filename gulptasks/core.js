const gulp = require('gulp');
const concat = require('gulp-concat');
const replace = require('gulp-replace');

const del = require('del');


const appName = 'core';

gulp.task(appName + ':clean', function () {
    return del('dist/' + appName);
});

gulp.task(appName + ':materialize-css', function () {

    const pathToMaterialize = ['node_modules/materialize-css/dist/css/materialize.min.css'];

    return gulp.src(pathToMaterialize)
        .pipe(gulp.dest('dist/' + appName + '/content/css/'));

});

gulp.task(appName + ':materialize-js', function () {

    const pathToMaterialize = ['node_modules/materialize-css/dist/js/materialize.min.js'];

    return gulp.src(pathToMaterialize)
        .pipe(gulp.dest('dist/' + appName + '/scripts/materialize-css/'));

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

gulp.task(appName + ':copy-vendor', function () {
    return gulp.src([
            'node_modules/zone.js/dist/zone.js',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/core-js/client/shim.min.js',
            'node_modules/systemjs/dist/system.js'
        ])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('dist/core/scripts'));
});

gulp.task(appName + ':copy-bundle', function () {

    const pathToJs = [
        'node_modules/core-js/client/shim.min.js',
        'node_modules/systemjs/dist/system.js',
        'node_modules/typescript/lib/**/typescript.js',
        'node_modules/rxjs/**/*.js',
        'node_modules/zone.js/dist/**/*.js',
        'node_modules/@angular/**/bundles/**/*.js'
    ];

    return gulp.src(pathToJs)
        .pipe(concat('core.js'))
        .pipe(gulp.dest('dist/' + appName + '/scripts'));
});