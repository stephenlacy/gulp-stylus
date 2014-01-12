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



// Get and render recursive stylus files
gulp.task('stylus', function () {
	gulp.src('./css/**/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./css'));
});





// Default gulp task to run
gulp.task('default', function(){
	gulp.run('stylus', 'one');
});