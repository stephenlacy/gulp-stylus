var through = require('through2');
var stylus = require('accord').load('stylus');
var gutil = require("gulp-util");
var rext = require('replace-ext');
var path = require('path');

module.exports = function (options) {
  var opts = options ? options : {};
  var paths = opts.paths ? opts.paths : [];
  
  return through.obj(function (file, enc, cb) {

    if (file.isStream()) return cb(new gutil.PluginError("gulp-stylus: Streaming not supported"));
    if (file.isNull()){
      this.push(file);
      return cb();
    }
    if (path.extname(file.path) === '.css'){
      this.push(file);
      return cb();
    }
    if (!opts.filename) opts.filename = file.path;
    if (!opts.paths) opts.paths = paths.concat([path.dirname(file.path)]);

    that = this;
    stylus.render(file.contents.toString('utf8'), opts)
    .catch(function(err){
      if(err){
        if(opts.errors) gutil.log('gulp-stylus', gutil.colors.cyan(err));
        that.emit('error', new gutil.PluginError('gulp-stylus', err));
      }
      cb(err);
    })
    .then(function(css){
      file.path = rext(file.path, '.css');
      file.contents = new Buffer(css);
      that.push(file);
      cb();
    });
  });

};
