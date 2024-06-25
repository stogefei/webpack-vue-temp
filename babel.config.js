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