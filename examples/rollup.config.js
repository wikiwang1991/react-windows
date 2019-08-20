import replace from 'rollup-plugin-replace'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import alias from 'rollup-plugin-alias'

export default {
  input: 'examples/index.jsx',
  output: {
    dir: 'examples/dist',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    alias({
      'react-windows-component': 'src/windows.jsx'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/index.js': [
          'useState',
        ],
      },
    }),
    babel({
      inputSourceMap: true,
      sourceMaps: true,
    }),
    serve('examples'),
    livereload('examples'),
  ],
  watch: {
    include: ['examples/**', 'src/**'],
  },
}
