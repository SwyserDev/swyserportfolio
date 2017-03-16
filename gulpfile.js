var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
var webserver = require('gulp-webserver');
var FwdRef = require('undertaker-forward-reference');
gulp.registry(FwdRef());

gulp.task('clean', () => {
  return gulp.src('dist/')
    .pipe(clean());
});

gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('fontAwesome', () => {
  return gulp.src('font-awesome/**/*')
    .pipe(gulp.dest('dist/font-awesome'));
});

gulp.task('fonts', () => {
  return gulp.src('fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', () => {
  return gulp.src('img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('js', () => {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('less', () => {
  return gulp.src('les/**/*')
    .pipe(gulp.dest('dist/less'));
});

gulp.task('html', () => {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('root', () => {
  return gulp.src('favicon.ico')
    .pipe(gulp.dest('dist/'));
});

gulp.task('serve',  () => {
  gulp.src('dist/')
    .pipe(webserver({
      fallback: 'index.html',
      open: true,
      directoryListing: {
        enable: true,
        path: 'public'
      },
      livereload: false
    }));
});

gulp.task('generate-service-worker', (callback) => {
  var path = require('path');
  var swPrecache = require('sw-precache');

  swPrecache.write('dist/service-worker.js', {
    staticFileGlobs: ['dist/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
    stripPrefix: 'dist/'
  }, callback);
});

gulp.task('default',
  gulp.series(
    'clean',
    gulp.parallel('minify-css', 'fontAwesome', 'fonts', 'images', 'js', 'less', 'html', 'root'),
    'generate-service-worker',
    'serve'
  )
);