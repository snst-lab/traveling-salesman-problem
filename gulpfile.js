var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test1', function () {
    return gulp.src(['test/solver.js'], { read: false })
        .pipe(mocha({
            reporter: 'nyan',
            compilers: 'js:babel-core/register'
        }));
});

gulp.task('default',['test1']);