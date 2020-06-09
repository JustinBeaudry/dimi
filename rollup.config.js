import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default [
	// Minified
	{
		input: './lib/dimi.js',
		output: {
			name: 'Dimi',
			file: 'dist/dimi.min.js',
			format: 'iife'
		},
		plugins: [
			nodeResolve({
				main: false,
				browser: true,
			}),
			commonjs()
		]
	},
	{
		input: './lib/dimi.js',
		output: {
			name: 'Dimi',
			file: 'dist/dimi.min.js',
			format: 'iife'
		},
		plugins: [
			nodeResolve({
				main: false,
				browser: true
			}),
			commonjs()
    ]
	},
	{
		input: './lib/dimi.js',
		output: {
			name: 'Dimi',
			file: 'dist/dimi.js',
			format: 'umd'
		},
		plugins: [
			nodeResolve({
				main: true,
				browser: true
			}),
			commonjs()
		]
	}
];
