import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import cleanup from 'rollup-plugin-cleanup';

export default {
	input: './dimi.js',
	output: {
		name: 'Dimi',
		file: 'dist/dimi.js',
		format: 'iife'
	},
	plugins: [
		resolve(),
		commonjs(),
		cleanup()
	]
};
