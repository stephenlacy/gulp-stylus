var map = require('map-stream');
var stylus = require('accord').load('stylus');
var rext = require('replace-ext');
var path = require('path');

module.exports = function (options) {
  var opts = options ? options : {};

  function stylusstream (file, cb) {

    if (file.isNull()) return cb(null, file); // pass along
    if (file.isStream()) return cb(new Error("gulp-stylus: Streaming not supported"));
    if (path.extname(file.path) === '.css') return cb(null, file);

    if (!opts.filename)
      opts.filename = file.path;

    stylus.render(file.contents.toString('utf8'), opts)
    .then(function(css){
      file.path = rext(file.path, '.css');
      file.contents = new Buffer(css);
      cb(null, file);
    })
    .catch(function(err){
      cb(err);
    });

  }

  return map(stylusstream);
};
