import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import postcss from 'rollup-plugin-postcss'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        format: 'esm',
        file: 'dist/library.mjs',
      },
      {
        format: 'cjs',
        file: 'dist/library.ssr.js'
      },

    ],
    plugins: [
        css(), vue({ css: false }), peerDepsExternal()
    ]
  },
  {
    input: 'src/index.js',
    output: {
        name: 'VueHeatmap',
        format: 'iife',
        file: 'dist/library.js',
        globals: {
          'vue': 'Vue'
        }
      },
      plugins: [
          vue({css: false}), peerDepsExternal(),
          postcss({
            extract: true,
          })
      ],
   },
]
