// var gp = require('gulp-load-plugins')();
// var changed = require('gulp-changed');
// var grep = require('gulp-grep');
// var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var csso = require('gulp-csso');
var concatCss = require('gulp-concat-css');
var clean = require('gulp-clean');

// ------------------
// Path
// ------------------
var paths = {
    dirs: {
        build: '.build',
        style: './content/css/'
    },
    html: '*.html',
    images: 'content/img/**/*.{JPG,jpg,png,gif}',
    less: 'websrc/less/**/*.less',
};

// ------------------
// Tasks
// ------------------
// gulp.task('clean', function () {
//     return gulp.src('./content/css/')
//         .pipe(clean({ force: true }))
//         .pipe(gulp.dest('content'));
// });

gulp.task('clean-css', function () {
    return gulp.src([
            'content/css/', 
            'websrc/less/*.css'
        ], { 
            read: false,
            allowEmpty: true 
            })
        .pipe(clean());
});

gulp.task('less', gulp.series(['clean-css'], function () {
    return gulp.src(paths.less)
        // .pipe(sourcemaps.init())
        .pipe(less())
        // .pipe(changed(paths.dirs.build))
        // .pipe(sourcemaps.write('.', { sourceRoot: '/' }))
        .pipe(concatCss('site.min.css'))
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: false
        }))
        .pipe(gulp.dest(paths.dirs.style))
        // .pipe(grep('**/*.css', { read: false, dot: true }))
        // .pipe(browserSync.reload({ stream: true }));
}));

gulp.task('watch:styles', function () {
    gulp.watch(paths.less, 'less');
});

// gulp.task('watch', gulp.series('watch:styles'));

gulp.task("watch", gulp.series("less", function anotherFunctionOrAnonymous() {
    gulp.watch("websrc/less/**/*.less", gulp.parallel('less'));
}));
