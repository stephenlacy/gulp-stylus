'use strict';

var through = require('through2');
var stylus = require('stylus');
var gutil = require('gulp-util');
var rext = require('replace-ext');
var path = require('path');
var _ = require('lodash');
var applySourceMap = require('vinyl-sourcemaps-apply');

var PLUGIN_NAME = 'gulp-stylus';

module.exports = function(options) {
	var opts = _.cloneDeep(options) || {};

	_.defaults(opts, {
		paths: []
	});

	return through.obj(function(file, enc, cb) {

		if(file.isStream()) {
			return cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
		}
		if(file.isNull()) {
			return cb(null, file);
		}
		if(path.extname(file.path) === '.css') {
			return cb(null, file);
		}

		if(file.sourceMap) {
			opts.sourcemap = { comment: false };
		}

		opts.filename = file.path;
		opts.paths.push(path.dirname(file.path));

		var styler = stylus(file.contents.toString('utf8'));
		configureStylus(styler, opts);
		var css;
		try {
			css = styler.render();
		} catch(err) {
			return cb(new gutil.PluginError(PLUGIN_NAME, err));
		}
		if(css !== undefined) {
			file.path = rext(file.path, '.css');
			file.contents = new Buffer(css);
			if(file.sourceMap) {
				applySourceMap(file, styler.sourcemap);
			}
			return cb(null, file);
		}
	});

};

function configureStylus(styler, opts) {
	var handlers = {
		'define': function(v) {
			_.forIn(v, function(val, prop) { styler.define(prop, val) });
		},
		'include': function(v) {
			v = _.isArray(v) ? v : [v];
			_.forEach(v, function(val) { styler.include(val) });
		},
		'import': function(v) {
			v = _.isArray(v) ? v : [v];
			_.forEach(v, function(val) { styler['import'](val) });
		},
		'use': function(v) {
			v = _.isArray(v) ? v : [v];
			_.forEach(v, function(val) { styler.use(val) });
		},
		'url': function(v) {
			var name = v,
				fn;
			if(typeof v === 'string') {
				fn = stylus.url();
			} else {
				name = v.name;
				fn = stylus.url({
					                limit: v.limit != null ? v.limit : 30000,
					                paths: v.paths || []
				                });
			}
			styler.define(name, fn);
		}
	};
	opts = _.clone(opts);

	_.forIn(opts, function(v, k) {
		if(!handlers[k]) {
			styler.set(k, v);
			delete opts[k];
		}
	});
	_.forIn(opts, function(v, k) {
		handlers[k](v);
	});
}
