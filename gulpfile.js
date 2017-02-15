var gulp = require('gulp'),
  concat = require('gulp-concat'),
  minifyCSS = require('gulp-minify-css'),
  uglifycss = require('gulp-uglifycss'),
  uglify = require('gulp-uglify'),
  rename = require("gulp-rename");

gulp.task('concat',function() {
  return gulp.src('./source/css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('minify',['concat'],function() {
  return gulp.src('./build/css/all.css')
    .pipe(minifyCSS({
      keepBreaks: true,
    }))
    .pipe(rename(function(path) {
      path.basename += ".min";
      path.extname = ".css";
    }))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('uglify-css',['minify','concat'],function () {
  gulp.src('./dist/css/*.css')
    .pipe(uglifycss({
      "maxLineLen":10000,
      "uglyComments":true
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('uglify-js', function() {
  return gulp.src('./source/js/*.js')
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename += ".min";
      path.extname = ".js";
    }))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('default', ['uglify-css','uglify-js']);
