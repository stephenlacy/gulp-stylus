'use strict';

var through = require('through2');
var stylus  = require('accord').load('stylus');
var gutil   = require('gulp-util');
var rext    = require('replace-ext');
var path    = require('path');
var _       = require('lodash');

var PLUGIN_NAME = 'gulp-stylus';

module.exports = function (options) {
  var opts = _.assign({}, options);

  return through.obj(function (file, enc, cb) {

    if (file.isStream()) {
      return cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }
    if (file.isNull()){
      return cb(null, file);
    }
    if (path.extname(file.path) === '.css'){
      return cb(null, file);
    }
    opts.filename = file.path;

    stylus.render(file.contents.toString('utf8'), opts)
    .catch(function(err){
      return cb(new gutil.PluginError(PLUGIN_NAME, err));
    })
    .then(function(css){
      if (css !== undefined){
        if(typeof css != "string" && css.result !== undefined){
          css = css.result;
        }
        file.path = rext(file.path, '.css');
        file.contents = new Buffer(css);
        return cb(null, file);
      }
    });
  });

};
