var gulp = require('gulp');
var watch = require('gulp-watch');
var exec = require('child_process').exec;

gulp.task('watch-browser', function () {
    watch('www/**/*', function () {
      exec('cordova prepare browser');
    });
});