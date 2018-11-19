import * as webpack from 'webpack';
import * as fs from 'fs';
import * as path from 'path';
import baseWebpack from './webpack.base';
const plugins = [
  new webpack.HotModuleReplacementPlugin(),
];

const devWebpack: webpack.Configuration = baseWebpack({
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
      errors: true,
    },
  },
  plugins,
});

export default devWebpack;
