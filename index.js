var through = require('through2');
var stylus = require('accord').load('stylus');
var gutil = require("gulp-util");
var path = require('path');
var applySourceMap = require('vinyl-sourcemaps-apply');

module.exports = function (options) {
  var opts = options ? options : {};
  opts.paths = opts.paths ? opts.paths : [];

  return through.obj(function (file, enc, cb) {

    if (file.isStream()) return cb(new gutil.PluginError("gulp-stylus: Streaming not supported"));
    if (file.isNull()){
      return cb(null, file);
    }
    if (path.extname(file.path) === '.css'){
      return cb(null, file);
    }

    var style = stylus(file.contents.toString('utf8'))
      .set('filename', file.path);

    if (file.sourceMap) {
      style.set('sourcemap', {comment: false});
    }

    style.render(function(err, css) {
      if (err) {
        return cb(new gutil.PluginError('gulp-stylus', err));
      } else {
        if (css !== undefined){
          file.contents = new Buffer(css);
          file.path = gutil.replaceExtension(file.path, '.css');
          if (file.sourceMap) applySourceMap(file, style.sourcemap);
          return cb(null, file);
        }
      }
    });

  });
}
