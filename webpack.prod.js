const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const plugins = [
];

module.exports = require('./webpack.base')({
  mode: 'production',
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'dist/'),
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server', 'cert', 'localhost+3-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server', 'cert', 'localhost+3.pem')),
    },
    historyApiFallback: true,
    host: '0.0.0.0',
  },
  plugins
});
