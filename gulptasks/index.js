const gulp = require('gulp');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const tslint = require("gulp-tslint");
const less = require("gulp-less");
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const inlineNg2Template = require('gulp-inline-ng2-template');

const proxy = require('proxy-middleware');
const historyApiFallback = require('connect-history-api-fallback');

const rename = require('gulp-rename');

const url = require('url');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

const del = require('del');

const tscConfig = require('../tsconfig.json');



const appName = 'index';

gulp.task(appName + ':clean', function () {
    return del('dist/' + appName + '/scripts/**/*');
});

gulp.task(appName + ':tslint', function () {

    const pathToTs = 'src/' + appName + '/scripts/**/*.ts';

    return gulp.src(pathToTs)
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());

});

gulp.task(appName + ':app-html', function () {

    const pathToHtml = 'src/index.html';

    return gulp.src(pathToHtml)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/'));

});

gulp.task(appName + ':compile', [appName + ':clean'], function () {

    const pathToTs = 'src/' + appName + '/scripts/**/*.ts';

    return gulp.src(pathToTs)
        .pipe(sourcemaps.init())
        .pipe(inlineNg2Template({base: 'src/' + appName + '/scripts/', useRelativePaths: true}))
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/' + appName + '/scripts'));
});

gulp.task(appName + ':build', [appName + ':tslint', appName + ':compile', appName + ':app-html', appName + ':less-to-css']);

gulp.task(appName + ':less-to-css', function () {

    const pathToLess = ['src/' + appName + '/content/less/main.less'];

    return gulp.src(pathToLess)
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('dist/' + appName + '/content/css'));

});

gulp.task(appName + ':serve', [appName + ':build'], function () {


    //var proxyOptions = url.parse('https://colledge.online/backend/web');
    var proxyOptions = url.parse('http://diploma-backend.loc/backend/web');
    proxyOptions.route = '/backend/web';

    browserSync({
        server: {
            baseDir: 'dist',
            //middleware: [ historyApiFallback(), proxy(proxyOptions)]
            middleware: [proxy(proxyOptions), historyApiFallback()]
        }
        //proxy: {
        //    target: 'https://colledge.online/backend/web'
        //}
    });

    //gulp.watch(['src/' + appName + '/scripts/**/*.ts'], [appName + ':compile']);
    gulp.watch(['src/' + appName + '/scripts/**/*.html'], [appName + ':compile']);
    gulp.watch(['src/' + appName + '/content/**/*.less'], [appName + ':less-to-css']);
    gulp.watch(['src/index.html'], [appName + ':app-html']);

});