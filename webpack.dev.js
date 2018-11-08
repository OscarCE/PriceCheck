const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
];

module.exports = require('./webpack.base')({
  mode: 'development',
  devServer: {
    hot: true,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server', 'cert', 'localhost+3-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server', 'cert', 'localhost+3.pem')),
    },
    historyApiFallback: true,
    port: 3000,
    contentBase: path.join(__dirname, 'src'),
    host: '0.0.0.0',
    overlay: {
      warnings: true,
      errors: true
    }
  },
  plugins
});
