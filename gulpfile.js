var gulp = require('gulp');
var cssmin = require('gulp-cssmin');

gulp.task('minify-css', function() {
  gulp.src('css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'));
});


gulp.task('delpoy-prod', function() {
  // Stuff here
});