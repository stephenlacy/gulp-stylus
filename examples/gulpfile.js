'use strict';

// include the required packages.
var gulp = require('gulp');
var stylus = require('../');

// include, if you're going to use nib helper library
var nib = require('nib');

// include, if you want to work with sourcemaps
var sourcemaps = require('gulp-sourcemaps');

// Get one .styl file and render
gulp.task('one', function () {
	gulp.src('./css/one.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./css/build'));
});

// Options
// Options compress
gulp.task('compress', function () {
	gulp.src('./css/compressed.styl')
		.pipe(stylus({
      use: nib(),
      compress: true
    }))
		.pipe(gulp.dest('./css/build'));
});

// Use nib
gulp.task('nib', function () {
  gulp.src('./css/nib.styl')
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest('./css/build'));
});

// Set linenos
gulp.task('linenos', function () {
  gulp.src('./css/linenos.styl')
    .pipe(stylus({linenos: true}))
    .pipe(gulp.dest('./css/build'));
});

// Inline sourcemaps
gulp.task('sourcemaps-inline', function () {
  gulp.src('./css/sourcemaps-inline.styl')
    .pipe(stylus({
      sourcemap: {
        inline: true,
        sourceRoot: '..',
        basePath: 'css'
      }
    }))
    .pipe(gulp.dest('./css/build'));
});

// External sourcemaps
gulp.task('sourcemaps-external', function () {
  gulp.src('./css/sourcemaps-external.styl')
    .pipe(stylus({
      sourcemap: {
        inline: true,
        sourceRoot: '.',
        basePath: 'css/build'
      }
    }))
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('.', {
      includeConent: false,
      sourceRoot: '.'
    }))
    .pipe(gulp.dest('./css/build'));
});

// Default gulp task to run
gulp.task('default', ['one', 'compress', 'nib', 'linenos', 'sourcemaps-inline', 'sourcemaps-external']);
