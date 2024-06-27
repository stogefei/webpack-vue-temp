module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@vue/app',
      {
        jsx: {
          compositionAPI: true,
        },
      },
    ],
  ],
  plugins: [
],
};
