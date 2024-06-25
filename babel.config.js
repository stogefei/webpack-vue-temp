// babel.config.js
module.exports = {
    presets: [
      [
        '@vue/cli-plugin-babel/preset',
        {
          jsx: {
            compositionAPI: true,
          },
        }
      ],
      ['@vue/babel-preset-jsx', { compositionAPI: true }]
    ],
    plugins: [
      ['@babel/plugin-transform-typescript', { isTSX: true }]
      
    ]
  }

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