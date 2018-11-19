import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as WebpackPwaManifest from 'webpack-pwa-manifest';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import * as OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { Configuration } from 'webpack';

const plugins = [
  new CleanWebpackPlugin(['dist']),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'app', 'index.html'),
  }),
  new WebpackPwaManifest({
    name: 'Price Check',
    short_name: 'Price Check',
    description: 'Check the price before buying!',
    background_color: '#ffffff',
    ios: {
      'apple-mobile-web-app-status-bar-style': 'black',
    },
    inject: true,
    icons: [
      {
        src: path.resolve('./src/app/assets/icons/Icon.png'),
        sizes: [120, 152, 167, 180, 1024],
        destination: path.join('icons', 'ios'),
        ios: true,
      },
      {
        src: path.resolve('./src/app/assets/icons/Icon.png'),
        size: 1024,
        destination: path.join('icons', 'ios'),
        ios: true,
      },
    ],
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
];

const baseWebpack = (options: Configuration): Configuration => ({
  mode: options.mode,
  entry: {
    app: [
      './src/app/index.tsx',
    ],
    search: [
      './src/app/components/SearchPage/SearchPage.tsx',
    ],
    scan: [
      './src/app/components/ScanPage/ScanPage.tsx',
    ],
    list: [
      './src/app/components/MyListPage/MyListPage.tsx',
    ],
    react: ['react', 'react-dom', 'react-router-dom'],
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
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
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  devServer: options.devServer,
  plugins: plugins.concat(options.plugins),
});

export default baseWebpack;