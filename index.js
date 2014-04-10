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

    stylus.render(file.contents.toString('utf8'), opts)
    .catch(function(err){
      if(err) new Error(err);
    })
    .done(function(css){
      file.path = rext(file.path, '.css');
      file.contents = new Buffer(css);
      cb(null, file);
    });

  }

  return map(stylusstream);
};
