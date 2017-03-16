var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
var webserver = require('gulp-webserver');

gulp.task('clean', function() {
  gulp.src('dist/')
    .pipe(clean());
});

gulp.task('minify-css', function() {
  gulp.src('css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('fontAwesome', function(){
  gulp.src('font-awesome/**/*')
    .pipe(gulp.dest('dist/font-awesome'));
});

gulp.task('fonts', function() {
  gulp.src('fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function() {
  gulp.src('img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('js', function() {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('less', function() {
  gulp.src('les/**/*')
    .pipe(gulp.dest('dist/less'));
});

gulp.task('mail', function() {
  gulp.src('mail/**/*')
    .pipe(gulp.dest('dist/mail'));
});

gulp.task('html', function() {
  gulp.src('index.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('root', function() {
  gulp.src('favicon.ico')
    .pipe(gulp.dest('dist/'));
});

gulp.task('serve', function () {
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

gulp.task('default', ['minify-css', 'fontAwesome', 'fonts', 'images', 'js', 'less', 'mail', 'html', 'root']);

gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');

  swPrecache.write('dist/service-worker.js', {
    staticFileGlobs: ['dist/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
    stripPrefix: 'dist/'
  }, callback);
});