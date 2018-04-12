'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');


gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3004",
        files: ["static/**/*.*"],
        browser: "google chrome",
        port: 7000,
				ws: true
	});
});

gulp.task('nodemon', function (cb) {
	var started = false;

	return nodemon({
		script: 'server.js',
    ignore: "static",
    nodeArgs: ['--inspect=0.0.0.0:9229']
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	});
});
