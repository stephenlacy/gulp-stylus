var es = require('event-stream');
var stylus = require('stylus');
var gutil = require('gulp-util');
var path = require('path');

module.exports = function (options) {
  var opts = options ? options : {};
  var paths = opts.paths || [];

  function stylusstream (file, cb) {
    // file is on object passed in by gulp
    // TODO: support streaming files

    var s = stylus(file.contents.toString('utf8'));
    s.set('filename', file.path);
    s.set('paths', paths.concat([path.dirname(file.path)]));
    
    // Load Nib if available
    try {
      s.use(require('nib')());
    } catch (e) {}

    s.render(function(err, css){
      if (err) return cb(err);

      file.path = gutil.replaceExtension(file.path, '.css');
      file.contents = new Buffer(css);

      cb(null, file);
    });
  }

  return es.map(stylusstream);
};
