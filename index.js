var stream = require('event-stream');
var stylus = require('stylus');
var ext = require('gulp-util').replaceExtension;

module.exports = function (options) {
  var opts = options ? options : {};

  function stylusstream (file, cb) {
    // file is on object passed in by gulp
    // file.contents is always a Buffer
    
    opts.data = String(file.contents);

    opts.error = function (err) {
      cb(err);
    };

    stylus.render(opts.data, function(err, css){
      if (err) return cb(err);

      file.path      = ext(file.path, '.css');
      file.shortened = file.shortened && ext(file.shortened, '.css');
      file.contents  = new Buffer(css);

      cb(null, file);
    });
  }

  return stream.map(stylusstream);
};
