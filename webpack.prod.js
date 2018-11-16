const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const plugins = [
];

module.exports = require('./webpack.base')({
  mode: 'production',
  plugins
});
