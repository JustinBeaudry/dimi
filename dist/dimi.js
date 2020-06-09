(function () {
	'use strict';

	/**
	 *
	 * @author Justin Beaudry <me@justinbeaudry.dev>
	 * @file Dimi export
	 * @module dimi
	 * @version 1.0.0
	 * @copyright Justin Beaudry 2019. Licensed under Apache-2.0.
	 *
	 */
	const stringify = require('json-stringify-stable');
	const utils = require('./utils');
	const arrayToObject = utils.arrayToObject;
	const time = utils.time;
	/**
	 * @type {defaultMsgFormat}
	 * @returns {string}
	 * @private
	 */
	const defaultMsgFormat = (msg, metadata, level, time) => {
		const msgPrefix = `${time} [${level.toUpperCase()}]`;
		const msgPostfix = Object.keys(data).length > 0 ? `: ${metadata}` : '';
		return `${msgPrefix} - ${msg}:${msgPostfix}`;
	};
	/**
	 * Log levels as integers.
	 *
	 * @type {Readonly<{
	 *   warn: number,
	 *   trace: number,
	 *   debug: number,
	 *   error: number,
	 *   info: number
	 * }>}
	 * @readonly
	 * @enum
	 * @private
	 */
	const levels = Object.freeze({
		error: 50, warn:  40, info:  30, debug: 20, trace: 10
	});
	/**
	 * Metadata passed to a {@link logFunction} to be logged. Metadata is typically
	 * (by default if using the {@link defaultMsgFormat} function) serialized. If
	 * `serialized` is set to `true` on the {@link DimiLogger} instance, than
	 * `metadata` is serialized using {@npm json-stringify-stable} to prevent
	 * throwing on {@url circularRefs}.
	 *
	 * @typedef metadata
	 * @typedef {(object|array|string|number|boolean)}
	 * @since 1.0.0
	 */
	/**
	 * The log function. All levels share the same function parameters:
	 *
	 * - `message` ({string}) - The message `string` to be logged.
	 * - `metadata` ({@link metadata}) - `Object`
	 *
	 * `logFunction` will not return a value but will write to the {@url console}
	 * in a browser environment, or to {@url stdout} in Node.
	 * Note that `trace` uses `log` instead of their namesakes due to default
	 * formatting in Node and the Browser.
	 *
	 * @typedef logFunction
	 * @type {function(string, metadata): void}
	 * @since 1.0.0
	 */
	/**
	 * The log object that applications use during runtime. A `DimiLogger`
	 * instance only writes to the {@url console} or {@url stdout} if the level
	 * being logged is greater than or equal to the current log level.
	 *
	 * `DimiLogger` levels uses standard integers for it's log levels, e.g.:
	 *
	 * - `error` is `50`
	 * - `warn` is `40`
	 * - `info` is `30`
	 * - `debug` is `20`
	 * - `trace` is `10`
	 *
	 * @typedef DimiLogger
	 * @type {object}
	 * @property {function(string, metadata): void} error - Log an {@url error}.
	 *
	 * @property {function(string, metadata): void} warn - Log a warning, alias for
	 * `console.error`, but is typically used to signal a recoverable {@url error}
	 * has occurred. {@url bestPractice} for info on suggestions for logging.
	 * @property {function(string, metadata): void} info - Log information, alias
	 * for `console.log`, typically used in applications about an event that
	 * took place. {@url bestPractice} for info on suggestions for logging.
	 * @property {function(string, metadata): void} debug - Log debug info, alias
	 * for `console.log`, typically used to log info for developers.
	 * See {@url bestPractice} for info on suggestions for logging.
	 * @property function((string, metadata): void} trace
	 * @property {function(logLevel): void} setLogLevel
	 * @since 1.0.0
	 */
	/**
	 * The function that formats the log message, metadata, log level, current time,
	 * and any other desired log outputs into a string to be written to the
	 * {@url console} in a browser environment or to {@url stdout} in Node. If
	 * `serialize` is set to `true` on the {@link DimiLogger} instance, than
	 * `metadata` will be a serialized string. Dimi uses {@npm
	 * json-stringify-stable} to prevent throwing on {@url circularRefs}
	 *
	 * `messageFormatFunction` is passed the following parameters (in order):
	 *
	 * - `message` The message that is being logged.
	 * - `metadata` The data object (or string if `serialize` is `true`).
	 * - `level` The level being logged at.
	 * - `time` The current time as an ISO8601 String. {@url toIsoString}
	 *
	 * @typedef messageFormatFunction
	 * @type {function(string, (object|string), string, string): string}
	 * @since 1.0.0
	 * @example
	 * ```javascript
	 *   const logFormatter = (message, metadata, level, time) => {
	 *      // parities {@link defaultMsgFormat}
	 *      // in this case `metadata` is a serialized string.
	 *      return `${time} [${level.toUpperCase()}] - ${msg}:\n\n${metadata}`;
	 *   };
	 * ```
	 */
	/**
	 * The default message format function that is used by {@link DimiLogger}.
	 * If a {@link messageFormatFunction} is passed to the {@link dimi} factory
	 * function than that {@link messageFormatFunction} will be used instead.
	 *
	 * @typedef defaultMsgFormat
	 * @type {messageFormatFunction}
	 * @since 1.0.0
	 */
	/**
	 * Log levels supported by {@link DimiLogger}.
	 *
	 * @typedef logLevel
	 * @type {('error'|'warn'|'info'|'debug'|'trace')}
	 * @since 1.0.0
	 * @readonly
	 */
	/**
	 * Factory function that returns a {@link DimiLogger} object. Dimi is a
	 * micro logging utility (dimi is short for diminutive) in that it provides
	 * a very small code base for handling logging. If you're looking for a
	 * fully-featured log utility check out {@npm pino}. Dimi is
	 * meant for those cases when Pino is too heavy handed.
	 *
	 * @function dimi
	 * @since 1.0.0
	 * @param {logLevel} [level='info'] - The log level to use
	 * when writing to the {@url console}
	 * or stdout (in Node). Defaults to `info` if the level being passed is not
	 * of {@link logLevel}.
	 * @param {messageFormatFunction} [msgFormat=defaultMsgFormat]
	 * @param {boolean} [serialize=false] - If `true` `dimi` will serialize
	 * {@link metadata} using {@npm json-stringify-stable} to prevent throwing
	 * on {@url circularRefs}, Otherwise, if `false` {@link metadata} will be
	 * passed as an `Object`.
	 *
	 * @returns {DimiLogger}
	 * @example
	 *
	 * ### In Node
	 * ```javascript
	 *   const dimi = require('dimi');
	 *   const log = dimi('info', (msg, data, level, time) => {
	 *     // parity the default format function
	 *     return `${time} [$level.toUpperCase()] - ${msg}:\n\n${data}`;
	 *   });
	 * ```
	 *
	 * ### In the Browser
	 * ```javascript
	 *   // dimi is defined on the window
	 *   const log = dimi('info', (msg, data, level, time) => {
	 *     // parity the default format function
	 *     return `${time} [$level.toUpperCase()] - ${msg}:\n\n${data}`;
	 *   });
	 * ```
	 */
	const dimi = (level, msgFormat, serialize) => {
		level = levels[level] || levels.info;
		serialize = serialize === true;
		msgFormat = typeof msgFormat === 'function' ? msgFormat : defaultMsgFormat;
		// A unary function that returns logFunctions.
		const log = logLevel => {
			return function() {
				// Don't write to console or stdout if logLevel is below the
				// threshold (level).
				if (levels[logLevel] >= level) {
					// converts an arguments array into an Array and then merges objects
					// passed into a single object to be serialized.
					let metadata = arrayToObject(Array.prototype.slice.call(arguments, 1));
					// format the message into a string
					let msg = msgFormat(
						argument[0],
						serialize ? stringify(metadata, null, 2) : metadata,
						logLevel,
						time()
					);
					let write = console[logLevel];
					// trace in Node and the Browser is used to log stack traces
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
	module.exports = dimi;

}());
