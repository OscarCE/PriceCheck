const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'app', 'index.html')
  }),
  new WebpackPwaManifest({
    name: 'Price Check',
    short_name: 'Price Check',
    description: 'Check the price before buying!',
    background_color: '#ffffff',
    ios: {
      'apple-mobile-web-app-status-bar-style': 'black'
    },
    inject: true,
    icons: [
      {
        src: path.resolve('./src/app/assets/icons/Icon.png'),
        sizes: [120, 152, 167, 180, 1024],
        destination: path.join('icons', 'ios'),
        ios: true
      },
      {
        src: path.resolve('./src/app/assets/icons/Icon.png'),
        sizes: 1024,
        destination: path.join('icons', 'ios'),
        ios: 'startup'
      }
    ]
  })
];

module.exports = options => ({
  mode: options.mode,
  entry: {
    app: [
      './src/app/index.tsx',
    ],
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  // Enable sourcemaps for debugging webpack's output
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  devServer: options.devServer,
  plugins: plugins.concat(options.plugins)
});
