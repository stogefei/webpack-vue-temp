// babel.config.js
// module.exports = {
//     presets: [
//       [
//         '@vue/cli-plugin-babel/preset',
//         {
//           jsx: {
//             compositionAPI: true,
//           },
//         }
//       ],
//       ['@vue/babel-preset-jsx', { compositionAPI: true }]
//     ],
//     plugins: [
//       ['@babel/plugin-transform-typescript', { isTSX: true }]
      
//     ]
//   }
  module.exports = {
    compact: false,
    presets: [
      '@babel/preset-env',
      [
        '@vue/app',
        {
          jsx: {
            compositionAPI: true,
          },
        },
      ]
    ],
    plugins: [
      ['@babel/plugin-transform-typescript', { isTSX: true }],
      [
        '@babel/plugin-transform-runtime',
        {
          absoluteRuntime: false,
          corejs: 3,
        },
      ],
      [
        "component",
        {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-chalk"
        }
      ]
    ],
  };
  // module.exports = {
//   presets: [
//     [
//       "@babel/preset-env",
//       {
//       "corejs": {
//           "version": 3,
//           "proposals": true
//         }
//       }
//     ],
//     '@vue/app',
//     [
//       '@vue/babel-preset-jsx'
//     ]
//   ],
//   plugins: [
//     ['import', { libraryName: '@h3/antd-vue', libraryDirectory: 'lib', style: true }, '@h3/antd-vue'],
//     [
//       "@babel/plugin-transform-runtime",
//     ],
//   ]
// };