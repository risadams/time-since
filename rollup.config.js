import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript'; // Import TypeScript plugin

export default {
  input: 'src/time-since.ts', // Changed from .js to .ts
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
    commonjs(),
    typescript(), // Add TypeScript plugin
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
  ],
};
