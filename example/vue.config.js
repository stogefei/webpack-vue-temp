module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '' : '././',
  filenameHashing: true,
  productionSourceMap: false,
  lintOnSave: false,
};
