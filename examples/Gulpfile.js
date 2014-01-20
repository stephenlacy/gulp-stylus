// include the required packages.
var gulp = require('gulp');
var stylus = require('../');


// Get one .styl file and render
gulp.task('one', function () {
	gulp.src('./css/one.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./css'));
});


// Get all .styl files in one folder and render
gulp.task('one', function () {
	gulp.src('./css/blue/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./css/blue'));
});

// Get and render recursive stylus files
gulp.task('stylus', function () {
	gulp.src('./css/**/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./css'));
});


// Options
// Options compress
gulp.task('compress', function () {
	gulp.src('./css/compressed/*.styl')
		.pipe(stylus({set: ['compress']}))
		.pipe(gulp.dest('./css/compressed'));
});

// Options linenos
gulp.task('linenos', function () {
	gulp.src('./css/test.styl')
		.pipe(stylus({set: ['linenos']}))
		.pipe(gulp.dest('./css/linenos'));
});

// Option import file
gulp.task('import', function () {
	gulp.src('./css/test.styl')
		.pipe(stylus({import: ['./one.styl']}))
		.pipe(gulp.dest('./css/import'));
});

// Options use[]
// use nib
gulp.task('nib', function () {
	gulp.src('./css/test.styl')
		.pipe(stylus({use: ['nib']}))
		.pipe(gulp.dest('./css/nib'));
});

// use axis

gulp.task('axis', function () {
	gulp.src('./css/test.styl')
		.pipe(stylus({use: ['axis-css']}))
		.pipe(gulp.dest('./css/axis'));
});


// Default gulp task to run
gulp.task('default', function(){
	gulp.run('stylus', 'one');
});