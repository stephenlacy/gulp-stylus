// include the required packages.
var gulp = require('gulp');
var nib = require('nib');
var stylus = require('../');

// Get one .styl file and render
gulp.task('one', function () {
	gulp.src('./css/one.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./css'));
});

// Options
// Options compress
gulp.task('compress', function () {
	gulp.src('./css/compressed/*.styl')
		.pipe(stylus({compress: true}))
		.pipe(gulp.dest('./css/compressed'));
});

// Use nib
gulp.task('nib', function () {
  gulp.src('./css/nib.styl')
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest('./css/nib'));
});

// Set linenos
gulp.task('linenos', function () {
  gulp.src('./css/test.styl')
    .pipe(stylus({linenos: true}))
    .pipe(gulp.dest('./css/linenos'));
});

// Show errors if encountered
gulp.task('errors', function () {
  gulp.src('./css/errors.styl')
    .pipe(stylus({errors: true}))
    .pipe(gulp.dest('./css/errors'));
});

// Define a variable
gulp.task('define', function () {
  gulp.src('./css/define.styl')
    .pipe(stylus({define: { color: 'red' }}))
    .pipe(gulp.dest('./css/define'));
});

// Default gulp task to run
gulp.task('default', ['nib', 'one']);