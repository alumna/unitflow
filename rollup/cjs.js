import { terser } 		from 'rollup-plugin-terser';

export default {
	input: 'src/unitflow.js',

	output: {
		file: 'dist/unitflow.cjs.js',
		format: 'cjs'
	},

	// plugins: [ terser() ]
};