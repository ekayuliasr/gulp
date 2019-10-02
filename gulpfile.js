// Konfigurasi
var gulp = require('gulp');
var gulpConnect = require('gulp-connect');
var gulpMinifyCss = require('gulp-minify-css');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');
var gulpHtmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var clean = require('gulp-clean');

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

// Sass
gulp.task('styles', async function () {
    gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(gulpConnect.reload());
});

// Task `default`
gulp.task('default', gulp.series('watch', 'server'));


// gulp watch
gulp.task('watch', async function () {
    gulp.watch('./src/js/*.js', gulp.series('minify-js'));
    gulp.watch('./src/css/*.css', gulp.series('minify-css'));
    gulp.watch('./src/*.html', gulp.series('minify-html'));
    gulp.watch('./src/sass/*.scss', gulp.series('styles'));
});


// clean
gulp.task('clean', function () {
    return gulp.src('dist', {
        read: false,
        allowEmpty: true
    }).pipe(clean());
});

gulp.task('build', gulp.series('clean', 'minify-css', 'minify-js', 'minify-html'));