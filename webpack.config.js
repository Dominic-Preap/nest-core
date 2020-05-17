const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

// Speeding Up Webpack, Typescript Incremental Builds by 7x
// https://medium.com/@kenneth_chau/speeding-up-webpack-typescript-incremental-builds-by-7x-3912ba4c1d15

module.exports = function(options) {
  return {
    ...options,
    // watch: true,
    entry: ['webpack/hot/poll?100', './src/main.ts'],
    externals: [
      nodeExternals({
        whitelist: ['webpack/hot/poll?100']
      })
    ],
    plugins: [...options.plugins, new webpack.HotModuleReplacementPlugin()]
  };
};
