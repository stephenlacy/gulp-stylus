Gulp-Stylus 
===========

(gulp-stylus)


[![NPM version](https://badge.fury.io/js/gulp-stylus.png)](http://badge.fury.io/js/gulp-stylus)

## Information

<table>
<tr> 
<td>Package</td><td>gulp-stylus</td>
</tr>
<tr>
<td>Description</td>
<td>Stylus plugin for Gulp</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.4</td>
</tr>
</table>

## Usage

```javascript

// Gulpfile.js
// Require the needed packages
var gulp = require('gulp');
var stylus = require('gulp-stylus');


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



// Get and render all .styl files recursively 
gulp.task('stylus', function () {
	gulp.src('./css/**/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./css'));
});



// Default gulp task to run
gulp.task('default', function(){
	gulp.run('stylus', 'one');
});

```

Options to the stylus stream are passed straight through to the stylus module.

## Examples

You can view more examples in the [example folder.](https://github.com/stevelacy/gulp-stylus/tree/master/examples)

## LICENSE

(MIT License)

Copyright (c) 2013 Steve Lacy - Fractal <contact@wearefractal.com> wearefractal.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.