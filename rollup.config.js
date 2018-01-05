import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

// import buble from "rollup-plugin-buble";
// import copy from "rollup-plugin-copy";
import postcss from 'rollup-plugin-postcss';
import postcssModules from 'postcss-modules';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
// import hash from "rollup-plugin-hash";
import html from 'rollup-plugin-fill-html';
const cssExportMap = {};

export default {
  input: 'src/index.js',
  output: {
    file: `./dist/WifiSurvey.[hash].js`,
    format: 'umd',
    name: 'WifiSurvey'
  },
  plugins: [
    process.env.NODE_ENV === 'production' && uglify({}, minify),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    // buble(),
    postcss({
      // include: './src/**/*.css',
      sourceMap: true, // true, "inline" or false
      extract: './dist/style.[hash].css',
      extensions: ['.css']
    }),
    html({
      template: 'src/index.html',
      filename: 'survey.html',
      prefix: '/sa/survey/',
      decodeEntities: false,
      inject: 'head'
      // externals: [{ type: "css", file: "./dist/style.css", inject: "head" }]
    }),
    // hash({
    //   replace: true,
    //   manifest: true,
    //   dest: "dist/WifiSurvey.[hash].js"
    // }),
    // copy({
    //   "src/index.html": "dist/survey.html",
    //   verbose: true
    // }),
    resolve({
      jsnext: true, // Default: false
      main: true // Default: true
    }),
    commonjs({
      include: 'node_modules/**', // Default: undefined
      exclude: ['node_modules/foo/**', 'node_modules/bar/**'], // Default: undefined
      extensions: ['.js', '.coffee'], // Default: [ '.js' ]

      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false // Default: false
    })
  ],
  globals: {
    jquery: '$',
    'survey-jquery': 'Survey'
  }
};
