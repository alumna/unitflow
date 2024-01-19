import terser from '@rollup/plugin-terser';

export default {
	input: 'src/unitflow.js',

	output: {
		file: 'dist/unitflow.mjs',
		format: 'esm'
	},

	plugins: [ terser() ]
};