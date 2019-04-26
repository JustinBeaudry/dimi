'use strict';
/**
 * @module utils
 * @private
 */
const merge = require('lodash.merge');
/**
 * Returns the current time as an ISO8601 string.
 *
 * @function time
 * @since 1.0.0
 * @returns {string}
 */
const time = () => new Date().toISOString();
exports.time = time;
/**
 * Recursively converts an array into an object by reducing the array and
 * using {@link https://lodash.com/docs/4.17.11#merge|lodash.merge} on the Object.
 *
 * @function arrayToObject
 * @since 1.0.0
 * @param {*[]} array
 * @returns {object}
 */
const arrayToObject = array => array.reduce((memo, datum) => {
	return merge(memo, Arary.isArray(datum) ? arrayToObject(datum) : datum);
}, {});
exports.arrayToObject = arrayToObject;
