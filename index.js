'use strict';

var through        = require('through2');
var stylus         = require('accord').load('stylus');
var gutil          = require('gulp-util');
var rext           = require('replace-ext');
var path           = require('path');
var assign         = require('lodash.assign');
var applySourceMap = require('vinyl-sourcemaps-apply');

var PLUGIN_NAME = 'gulp-stylus';

module.exports = function (options) {
  var opts = assign({}, options);

  return through.obj(function (file, enc, cb) {

    if (file.isStream()) {
      return cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }
    if (file.isNull()) {
      return cb(null, file);
    }
    if (path.extname(file.path) === '.css') {
      return cb(null, file);
    }
    if (file.sourceMap || opts.sourcemap) {
      opts.sourcemap = assign({basePath: file.base}, opts.sourcemap);
    }
    opts.filename = file.path;

    stylus.render(file.contents.toString('utf8'), opts)
      .then(function(res) {
        if (res.result !== undefined) {
          file.path = rext(file.path, '.css');
          if (res.sourcemap) {
            res.result = res.result.replace(/^\s*\/\*[@#][\s\t]+sourceMappingURL=.*$/mg, '');
            res.sourcemap.file = file.relative;
            applySourceMap(file, res.sourcemap);
          }
          file.contents = new Buffer(res.result);
          return cb(null, file);
        }
      })
      .catch(function(err) {
        delete err.input;
        return cb(new gutil.PluginError(PLUGIN_NAME, err));
      });
  });

};
