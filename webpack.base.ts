import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import { Configuration } from 'webpack';

const plugins = [
  new CleanWebpackPlugin(['dist/**/*.*']),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'app', 'index.html'),
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
  new CopyWebpackPlugin([
    {
      from: './src/app/assets/icons/*.*',
      to: './',
      flatten: true,
    },
  ]),
];

const baseWebpack = (options: Configuration): Configuration => ({
  mode: options.mode,
  entry: {
    app: [
      './src/app/index.tsx',
    ],
    react: ['react', 'react-dom', 'react-router', 'react-router-dom'],
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  // Enable sourcemaps for debugging webpack's output
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },

      {
        test: /\.css$/,
        use: [
          options.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },

      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          outputPath: path.join('assets', 'images'),
        },
      },
    ],
  },
  devServer: options.devServer,
  plugins: plugins.concat(options.plugins),
});

export default baseWebpack;
