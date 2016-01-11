/* jshint esnext:true */

const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('js', function() {
  gulp.src('private/javascripts/**/*.js')
    .pipe(babel({
      presets: [ 'react', 'es2015' ]
    }))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('watch', function() {
  gulp.watch('private/javascripts/**/*.js', ['js']);
});

gulp.task('default', ['js', 'watch']);
