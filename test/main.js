var should = require('should');
var gulp = require('gulp');
var stylus = require('../');

require('mocha');

describe('gulpstylus', function(){
	it('should render stylus .styl to CSS .css', function(){
		gulp.task('stylus', function () {
			gulp.src('./css/**/*.styl')
				.pipe(stylus())
				.pipe(gulp.dest('./css'));
		});

		gulp.task('default', function(){
			gulp.run('stylus');
		});
	});
});