var Dimi = (function () {
	'use strict';

	const arrayToObject = array => array.reduce((memo, datum) => {
		Object.assign(memo, Array.isArray(datum) ? arrayToObject(datum) : datum);
		return memo;
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
					let __metadata = arrayToObject(Array.prototype.slice.call(arguments, 1));
					let metadata;
					if (!serialize) {
						metadata = __metadata;
					} else {
						try {
							metadata = JSON.stringify(__metadata, null, 2);
						} catch(err) {}
					}
					let msg = msgFormat(
						arguments[0],
						metadata,
						logLevel,
						new Date().toISOString()
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
