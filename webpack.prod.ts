import { Configuration } from 'webpack';
import baseWebpack from './webpack.base';
const plugins = [
];

const prodWebpack: Configuration = baseWebpack({
  mode: 'production',
  plugins,
});

export default prodWebpack;
