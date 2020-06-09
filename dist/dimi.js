var Dimi = (function () {
	'use strict';

	function createCommonjsModule(fn, basedir, module) {
		return module = {
		  path: basedir,
		  exports: {},
		  require: function (path, base) {
	      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
	    }
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var stringify_1 = createCommonjsModule(function (module, exports) {
	exports = module.exports = stringify;
	exports.getSerialize = serializer;
	function stringify(obj, replacer, spaces, cycleReplacer) {
	  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
	}
	function serializer(replacer, cycleReplacer) {
	  var stack = [], keys = [];
	  if (cycleReplacer == null) cycleReplacer = function(key, value) {
	    if (stack[0] === value) return "[Circular ~]"
	    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
	  };
	  return function(key, value) {
	    if (stack.length > 0) {
	      var thisPos = stack.indexOf(this);
	      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
	      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
	      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value);
	    }
	    else stack.push(value);
	    return replacer == null ? value : replacer.call(this, key, value)
	  }
	}
	});

	const time = () => new Date().toISOString();
	const arrayToObject = array => array.reduce((memo, datum) => {
		return Object.assign({}, memo, Array.isArray(datum) ? arrayToObject(datum) : datum);
	}, {});
	const defaultMsgFormat = (msg, metadata, level, time) => {
		const msgPrefix = `${time} [${level.toUpperCase()}]`;
		const msgPostfix = Object.keys(metadata).length > 0 ? `: ${metadata}` : '';
		return `${msgPrefix} - ${msg}:${msgPostfix}`;
	};
	const levels = Object.freeze({
		error: 50, warn:  40, info:  30, debug: 20, trace: 10
	});
	const dimi = (level, msgFormat, serialize) => {
		level = levels[level] || levels.info;
		serialize = serialize === true;
		msgFormat = typeof msgFormat === 'function' ? msgFormat : defaultMsgFormat;
		const log = logLevel => {
			return function() {
				if (levels[logLevel] >= level) {
					let metadata = arrayToObject(Array.prototype.slice.call(arguments, 1));
					let msg = msgFormat(
						arguments[0],
						serialize ? stringify_1(metadata, null, 2) : metadata,
						logLevel,
						time()
					);
					let write = console[logLevel];
					if (logLevel === 'trace') write = console.log;
					write(msg);
				}
			};
		};
		return {
			error: log('error'),
			warn:  log('warn'),
			info:  log('info'),
			debug: log('debug'),
			trace: log('trace'),
			setLevel: newLevel => {
				level = levels[newLevel] || levels.info;
			}
		};
	};
	var dimi_1 = dimi;

	return dimi_1;

}());
