
'use strict';

var gulp             = require('gulp'),
	//	plugins
    less             = require('gulp-less'),
    es               = require('event-stream'),
    concat           = require('gulp-concat'),
    rimraf           = require('gulp-rimraf'),
    eslint           = require('gulp-eslint'),
    gulpFilter       = require('gulp-filter'),
    uglify           = require('gulp-uglify'),
    log              = require('consologger'),
    //    build target
    buildPath = './',
    //	files paths
    lessFilesPath    = ['dev/style/main.less'],
    fontFilesPath    = ['dev/style/oxygen.300.woff'],
    jsFilesPaths     = [
    	'dev/script/angular.min.js',
    	'dev/script/angular-route.js',
    	'dev/script/angular-animate.js',
        'dev/script/main.js',
        'dev/script/interpreter.js'
    ],
    htmlFilesPath    = [
    	'dev/index.html'
    ];

var getFiles = function(filesPath){
    return gulp.src(filesPath);
}

gulp.task('copyStyleFiles', function(){

    getFiles(lessFilesPath)
    .pipe(less({ compress: true }))
    .pipe(gulp.dest(buildPath + 'style/'));

    getFiles(fontFilesPath)
    .pipe(gulp.dest(buildPath + 'style/'));

});

//    lint JS files
gulp.task('lint', function(){

    var filter = gulpFilter([
        '!angular*',
    ]);

    getFiles(jsFilesPaths)
    .pipe(filter)
    .pipe(eslint({ config: 'dev/eslint.conf.json' }))
    .pipe(eslint.format());
});

gulp.task('copyJsFiles', ['lint'], function(){

    getFiles(jsFilesPaths)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(buildPath + 'script/'));
});

gulp.task('copyHtmlFiles', function(){

    getFiles(htmlFilesPath)
    .pipe(gulp.dest(buildPath));
});

gulp.task('copyResourceFiles', function(){

    getFiles('dev/languages/*')
    .pipe(gulp.dest(buildPath + 'languages/'));
});

gulp.task('build', ['copyStyleFiles', 'copyJsFiles', 'copyHtmlFiles', 'copyResourceFiles'], function(){

});

gulp.task('test', function(){

    // gulp.src('dev/test/test.js')
    //     .pipe(mocha({reporter: 'list'}));
});
