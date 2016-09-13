'use strict';

var gulp = require("gulp"),
	shell = require('gulp-shell');

gulp.task("less", shell.task('lessc content/core.less content/core.css'));
gulp.task("server", ['less', 'node', 'karma']);

gulp.task('node', shell.task('node app.js'));
gulp.task('karma', shell.task('powershell -Command "./karma.ps1"'));
