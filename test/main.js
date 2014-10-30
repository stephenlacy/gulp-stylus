'use strict';

var should = require('should');
var gutil = require('gulp-util');
var stylus = require('../');
var fs = require('fs');
var gulpSourcemaps = require('gulp-sourcemaps');

require('mocha');

describe('gulp-stylus', function() {
	it('should render stylus .styl to CSS .css', function(done) {
		var stream = stylus();

		var fakeFile = new gutil.File({
			                              base: 'test/fixtures',
			                              cwd: 'test/',
			                              path: 'test/fixtures/normal.styl',
			                              contents: fs.readFileSync('test/fixtures/normal.styl')
		                              });

		stream.once('data', function(newFile) {
			should.exist(newFile);
			should.exist(newFile.contents);
			String(newFile.contents).should.equal(fs.readFileSync('test/expected/normal.css', 'utf8'));
			done();
		});
		stream.write(fakeFile);
		stream.end();

	});

	it('should compress when called', function(done) {
		var stream = stylus({compress: true});
		var fakeFile = new gutil.File({
			                              base: 'test/fixtures',
			                              cwd: 'test/',
			                              path: 'test/fixtures/normal.styl',
			                              contents: fs.readFileSync('test/fixtures/normal.styl')
		                              });

		stream.on('data', function(newFile) {
			should.exist(newFile);
			should.exist(newFile.contents);

			String(newFile.contents).should.equal(fs.readFileSync('test/expected/compressed.css', 'utf8'));
			done();
		});

		stream.write(fakeFile);
		stream.end();
	});

	it('should import other .styl files', function(done) {
		var stream = stylus({import: __dirname + '/fixtures/one.styl'});
		var fakeFile = new gutil.File({
			                              base: 'test/fixtures',
			                              cwd: 'test/',
			                              path: 'test/fixtures/normal.styl',
			                              contents: fs.readFileSync('test/fixtures/normal.styl')
		                              });

		stream.on('data', function(newFile) {
			should.exist(newFile);
			should.exist(newFile.contents);

			String(newFile.contents).should.equal(fs.readFileSync('test/expected/imported.css', 'utf8'));
			done();
		});

		stream.write(fakeFile);
		stream.end();
	});

	it('should define variables in .styl files', function(done) {
		var stream = stylus({define: {'white': '#fff'}});
		var fakeFile = new gutil.File({
			                              base: 'test/fixtures',
			                              cwd: 'test/',
			                              path: 'test/fixtures/define.styl',
			                              contents: fs.readFileSync('test/fixtures/define.styl')
		                              });

		stream.on('data', function(newFile) {
			should.exist(newFile);
			should.exist(newFile.contents);

			String(newFile.contents).should.equal(fs.readFileSync('test/expected/define.css', 'utf8'));
			done();
		});

		stream.write(fakeFile);
		stream.end();
	});

	it('should skip css files', function(done) {
		var stream = stylus();

		var fakeFile = new gutil.File({
			                              base: 'test/fixtures',
			                              cwd: 'test/',
			                              path: 'test/fixtures/ie8.css',
			                              contents: fs.readFileSync('test/fixtures/ie8.css')
		                              });

		stream.once('data', function(newFile) {
			should.exist(newFile);
			should.exist(newFile.contents);
			String(newFile.contents).should.equal(fs.readFileSync('test/fixtures/ie8.css', 'utf8'));
			done();
		});
		stream.write(fakeFile);
		stream.end();

	});


	it('should throw on parse error', function(done) {
		var stream = stylus();

		var file = 'test/fixtures/error.styl';

		var fakeFile = new gutil.File({
			                              base: 'test/fixtures',
			                              cwd: 'test/',
			                              path: file,
			                              contents: fs.readFileSync(file)
		                              });

		stream.on('error', function(err) {
			should.exist(err);
			err.name.toString().should.match(/ParseError/);
			done();
		});
		stream.write(fakeFile);
		stream.end();

	});

	it('should import nested and reverse recursive files', function(done) {
		var stream = stylus();
		var fakeFile = new gutil.File({
			                              base: 'test/fixtures',
			                              cwd: 'test/',
			                              path: 'test/fixtures/import.styl',
			                              contents: fs.readFileSync('test/fixtures/import.styl')
		                              });

		stream.on('data', function(newFile) {
			should.exist(newFile);
			should.exist(newFile.contents);
			String(newFile.contents).should.equal(fs.readFileSync('test/expected/import.css', 'utf8'));
			done();
		});
		stream.write(fakeFile);
		stream.end();
	});

	it('should create inline sourcemaps', function(done) {
		var stream = stylus({sourcemap: {inline: true}});
		var fakeFile = new gutil.File({
			                              base: 'test/fixtures',
			                              cwd: 'test/',
			                              path: 'test/fixtures/normal.styl',
			                              contents: fs.readFileSync('test/fixtures/normal.styl')
		                              });

		stream.on('data', function(newFile) {
			should.exist(newFile);
			should.exist(newFile.contents);
			String(newFile.contents).should.equal(fs.readFileSync('test/expected/sourcemap.css', 'utf8'));
			done();
		});
		stream.write(fakeFile);
		stream.end();
	});

	it('should work with gulp-sourcemaps', function(done) {
		var stream = gulpSourcemaps.init();
		var fakeFile = new gutil.File({
			                              base: 'test/fixtures',
			                              cwd: 'test/',
			                              path: 'test/fixtures/normal.styl',
			                              contents: fs.readFileSync('test/fixtures/normal.styl')
		                              });

		stream.pipe(stylus()).on('data', function(newFile) {
			should.exist(newFile);
			should.exist(newFile.contents);
			String(newFile.contents).should.equal(fs.readFileSync('test/expected/normal.css', 'utf8'));
			should.exist(newFile.sourceMap);
			console.log(newFile.sourceMap);
			newFile.sourceMap.sources.length.should.equal(1);
			newFile.sourceMap.sources[0].should.equal('test/fixtures/normal.styl');
			newFile.sourceMap.mappings.should.equal('AAGA;EACE,OAAM,KAAN;EACA,QAAQ,IAAR;;AACF;EACE,YAAW,KAAX;;AACA;EACE,YAAW,KAAX');
			done();
		});
		stream.write(fakeFile);
		stream.end();
	});

});
