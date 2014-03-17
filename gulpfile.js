
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
	through          = require('through2'),
    log              = require('consologger'),
    //    build target
    buildPath = './',
    //	files paths
    lessFilesPath     = ['dev/style/main.less'],
    fontFilesPath     = ['dev/style/oxygen.300.woff'],
	templateFilesPath = ['dev/templates/*.html'],
    jsFilesPaths      = [
    	'dev/script/angular.min.js',
    	'dev/script/angular-route.js',
    	'dev/script/angular-animate.js',
        'dev/script/main.js',
        'dev/script/interpreter.js'
    ],
    htmlFilesPath     = [
    	'dev/index.html'
    ];
/////////////////////////////////////////////////
var getFiles = function(filesPath){
    return gulp.src(filesPath);
};

var wrapScript = function(){

	return through.obj(function (file, enc, callback) {

		var fileName = file.path.replace(file.base,''),
			//	set the new contents
		    newContentString = '<script type="text/ng-template" id="' +
		        fileName + '">' + '\n' +
		        file.contents.toString() +
		        '</script>',
			//	make a new buffer
			buf = new Buffer(newContentString);

		//	change the file contents
		file.contents = buf;
		//	push the file into the output
		this.push(file);
		callback();
	});
};

gulp.task('test', function(){

	return gulp.src('templates.html')
	.pipe(wrapScript())
	.pipe(gulp.dest('new/'));
});

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

	getFiles(templateFilesPath)
	.pipe(wrapScript())
	.pipe(concat('templates.html'))
	.pipe(gulp.dest(buildPath));

	getFiles(htmlFilesPath)
	.pipe(gulp.dest(buildPath));
});

gulp.task('copyResourceFiles', function(){

    getFiles('dev/languages/*')
    .pipe(gulp.dest(buildPath + 'languages/'));
});

gulp.task('build', ['copyStyleFiles', 'copyJsFiles', 'copyHtmlFiles', 'copyResourceFiles'], function(){

});
