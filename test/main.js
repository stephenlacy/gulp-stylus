var should = require('should');
var gutil = require('gulp-util');
var stylus = require('../');
var fs = require('fs');
var es = require('event-stream');

require('mocha');

describe('gulpstylus', function(){
	it('should render stylus .styl to CSS .css', function(done){
		var stylusStream = stylus();

		var fakeFile = new gutil.File({
			base: "/home/proj/css/",
			cwd: "/home/proj/",
			path: "/home/proj/css/stuff.styl",
			contents: "body\r\n  width 100%"
		});

		stylusStream.once('data', function(newFile){
			should.exist(newFile);
			should.exist(newFile.path);
			should.exist(newFile.contents);
			newFile.path.should.equal("/home/proj/css/stuff.css");
			String(newFile.contents).should.equal("body {\n  width: 100%;\n}\n")
			done();
		});
		stylusStream.write(fakeFile);

		var stylusStream = stylus();
	});

	it ('should uitlize nib when possible', function(done){
		var stream = stylus();
		var fakeFile = new gutil.File({
			base: 'test/fixtures',
			cwd: 'test/',
			path: 'test/fixtures/nib-using.styl',
			contents: fs.readFileSync('test/fixtures/nib-using.styl')
		});

		stream.on('data', function(newFile) {
			should.exist(newFile);
			should.exist(newFile.contents);
			fs.writeFileSync('test/expected/nib-using.css', String(newFile.contents));

			String(newFile.contents).should.equal(fs.readFileSync('test/expected/nib-using.css', 'utf8'));
			done();
		});

		stream.write(fakeFile);
		stream.end();
	});
});