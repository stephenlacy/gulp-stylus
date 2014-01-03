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
    if (options && options.use && options.use.length > 0){
      s.use(function(stylus){
        try{
          options.use.forEach(function(args){
            stylus.use(require(args)());
          });
        }
        catch(e){}
      });
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