
var gulp   = require('gulp'),
    mocha  = require('gulp-mocha');

gulp.task('build', function(){

    console.log('build');
});

gulp.task('test', function(){

    gulp.src('test/test.js')
        .pipe(mocha({reporter: 'nyan'}));
});
