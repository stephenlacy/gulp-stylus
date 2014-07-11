var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var rext = require('replace-ext');
var clone = require('lodash.clone');
var stylus = require('accord').load('stylus');


module.exports = function (opts) {

  return through.obj(function (file, enc, cb) {

    if (file.isStream()) {
      return cb(new gutil.PluginError('gulp-stylus: Streaming not supported'));
    }
    if (file.isNull()){
      return cb(null, file);
    }
    if (path.extname(file.path) !== '.styl'){
      return cb(null, file);
    }
    var opt = opts ? clone(opts) : {};
    opt.filename = file.path;

    // scope file to its own folder
    // if no paths given
    if (!opt.paths) {
      opt.paths = [];
    }
    opt.paths.push(path.dirname(file.path));

    stylus.render(file.contents.toString('utf8'), opt)
    .catch(function(err){
      cb(new gutil.PluginError('gulp-stylus', err));
    })
    .then(function(css){
      if(!css) return;
      file.path = rext(file.path, '.css');
      file.contents = css ? new Buffer(css) : null;
      cb(null, file);
    });
  });

};
