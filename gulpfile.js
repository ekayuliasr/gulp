// Konfigurasi
var gulp = require('gulp');
var gulpConnect = require('gulp-connect');
var gulpMinifyCss = require('gulp-minify-css');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');
var gulpHtmlmin = require('gulp-htmlmin');

// Task `hello`
gulp.task('hello', async function () {
    console.log("Gulp");
});

// Server
gulp.task('server', async function () {
    gulpConnect.server({
        root: "dist",
        livereload: true
    });
});

// task untuk minify
gulp.task('minify-css', async function () {
    gulp.src('./src/css/*.css')
        .pipe(gulpMinifyCss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(gulpConnect.reload());
});

gulp.task('minify-js', async function () {
    gulp
        .src([
            './src/js/*.js'
        ])
        .pipe(gulpConcat('bundle.js'))
        .pipe(gulpUglify())
        .pipe(gulp.dest('dist'))
        .pipe(gulpConnect.reload());
});

gulp.task('minify-html', async function () {
    gulp.src('src/*.html')
        .pipe(gulpHtmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(gulpConnect.reload());
});

// gulp watch
gulp.task('watch', async function () {
    gulp.watch('./src/js/*.js', gulp.series('minify-js'));
    gulp.watch('./src/css/*.css', gulp.series('minify-css'));
    gulp.watch('./src/*.html', gulp.series('minify-html'));
});

// Task `default`
gulp.task('default', gulp.series('watch', 'server'));

/* Sass
    var sass = require('gulp-sass');

    gulp.task('styles', function () {
        gulp.src('dist/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
    });

    gulp.task('watch', function() {
        gulp.watch('dist/sass/*.scss',
        ['styles']);
    });

    gulp.task('default', ['watch']);

*/