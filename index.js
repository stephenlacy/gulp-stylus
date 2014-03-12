var map = require('map-stream');
var stylus = require('stylus');
var gutil = require('gulp-util');
var path = require('path');

module.exports = function (options) {
  var opts = options ? options : {};
  var paths = opts.paths || [];

  function stylusstream (file, cb) {
    // file is on object passed in by gulp
    // TODO: support streaming files
    if (file.isNull()) return cb(null, file); // pass along
    if (file.isStream()) return cb(new Error("gulp-stylus: Streaming not supported"));

    var s = stylus(file.contents.toString('utf8'));
    s.set('filename', file.path);
    s.set('paths', paths.concat([path.dirname(file.path)]));

    //trying to load extensions from array passed by user
    if (opts.use && opts.use.length > 0){
      s.use(function(stylus){
        options.use.forEach(function(args){
          stylus.use(require(args)());
        });
      });
    }

    if (opts.set && opts.set.length > 0){
      options.set.forEach(function(option){
        s.set(option, true);
        if (option === 'resolve url') {
          s.define('url', stylus.resolver());
        }
      });
    }
    if (opts.import && opts.import.length > 0){
      options.import.forEach(function(args){
        s.import(args);
      });
    }
    if (opts.define){
      Object.keys(options.define).forEach(function(key) {
        s.define(key, options.define[key]);
      });
    }
    if (opts.urlFunc && opts.urlFunc.length > 0) {
      options.urlFunc.forEach(function(args){
        s.define(args, stylus.url());
      });
    }

    if (path.extname(file.path) === '.css') {
      return cb(null, file);
    }

    s.render(function(err, css){
      if (err) return cb(err);

      file.path = gutil.replaceExtension(file.path, '.css');
      file.contents = new Buffer(css);

      cb(null, file);
    });
  }

  return map(stylusstream);
};
