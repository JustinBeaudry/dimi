'use strict';
module.exports = {
	plugins: [
		'plugins/markdown',
		'jsdoc-plugin-npm',
		'jsdoc-plugin-url'
	],
	source: {
		include: [
			'lib/dimi.js'
		]
	},
	templates: {
		referenceTitle: 'Dimi',
		cleverLinks: true,
		monospaceLinks: false,
		default: {
			outputSourceFiles: true
		}
	},
	tags: {
		allowUnknownTags: ['npm', 'url'],
		dictionaries: ['jsdoc', 'closure']
	},
	opts: {
		recurse: false,
		encoding: 'utf8',
		template: 'node_modules/braintree-jsdoc-template',
		destination: 'docs',
		readme: 'README.md'
	},
	urls: {
		circularRefs: {
			url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Exceptions',
			name: 'Circular References'
		},
		console: 'https://developer.mozilla.org/en-US/docs/Web/API/console',
		stdout: 'https://nodejs.org/api/process.html#process_process_stdout',
		error: {
			url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error',
			name: 'Error'
		},
		bestPractice: {
			url: 'https://github.com/JustinBeaudry/dimi/blob/master/README.md#best-practice',
			name: 'Best Practice'
		},
		toIsoString: {
			url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString',
			name: '`new Date().toISOString()`'
		}
	}
};
