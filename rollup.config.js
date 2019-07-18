import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const input = './src/windows.jsx'

export default [{
  input: input,
  output: {
    file: './dist/windows.cjs.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel(),
    terser(),
  ],
  external: [
    'react',
    'react-jss'
  ]
}, {
  input: input,
  output: {
    file: './dist/windows.esm.js',
    format: 'esm'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      presets: [
        ["@babel/preset-env", {
          targets: {
            esmodules: true,
          },
        }],
      ]
    }),
    terser(),
  ],
  external: [
    'react',
    'react-jss'
  ]
}];