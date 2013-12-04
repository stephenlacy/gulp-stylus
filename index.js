var stream = require('event-stream');
var clone = require('clone');
var stylus = require('stylus');
var ext = require('gulp-util').replaceExtension;

module.exports = function (options) {
  var opts = options ? clone(options) : {};

  function stylusstream (file, cb) {
    // file is on object passed in by gulp
    // file.contents is always a Buffer
    
    var cloned = clone(file);

    opts.data = cloned.contents.toString();

    opts.error = function (err) {
      cb(err);
    };

    stylus.render(opts.data, function(err, css){

      cloned.path      = ext(cloned.path, '.css');
      cloned.shortened = cloned.shortened && ext(cloned.shortened, '.css');
      cloned.contents  = new Buffer(css);

      cb(null, cloned);
    });
  }

  return stream.map(stylusstream);
};