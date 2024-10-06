import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'; // Import the plugin

export default {
  input: 'src/time-since.js',
  output: [
    {
      file: 'dist/time-since.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/time-since.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(), // Add the plugin to the plugins array
    babel({
      exclude: 'node_modules/**', // Only transpile our source code
      babelHelpers: 'bundled'
    }),
  ],
};
