import resolve from '@rollup/plugin-node-resolve';

export default {
	input: './lib/dimi.js',
	output: {
		name: 'Dimi',
		file: 'dist/dimi.js',
		format: 'iife'
	},
	plugins: [ resolve() ]
};
