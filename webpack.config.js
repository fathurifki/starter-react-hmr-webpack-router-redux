// ==== Node Modules
const chalk = require('chalk');
const path = require('path');
const webpack = require('webpack');
// ==== Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const port = 8080;

module.exports = {
  context: path.resolve(__dirname),
  devtool: 'inline-source-map',

  entry: [
    'react-hot-loader/patch',

    `webpack-dev-server/client?http://localhost:${port}`,

    'webpack/hot/only-dev-server',
    path.join(__dirname, 'src', 'entry.js'),
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname),
    pathinfo: true,
    publicPath: `http://localhost:${port}/`,
    sourceMapFilename: '[file].map',
  },

  devServer: {
    clientLogLevel: 'info',
    compress: true,
    contentBase: __dirname,
    headers: { 'X-Custom-Header': 'yes' },
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    https: false,
    inline: true,
    lazy: false,
    noInfo: true,
    open: true,
    port: port,
    publicPath: '/',
    quiet: false,
    stats: 'errors-only',
    watchContentBase: false,
  },

  module: {

    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/,
        ],
        loaders: [
          'babel-loader',
        ],
      },
      {
        test: /\.json$/,
        exclude: [
          /node_modules/,
        ],
        loaders: [
          'json-loader',
        ],
      },
      {
        test: /\.css/,
        loaders: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss/,
        exclude: [
          /node_modules/,
        ],
        include: [
          path.join(__dirname, 'src', 'components'),
          path.join(__dirname, 'src', 'containers'),
        ],
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader',
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.join(__dirname, 'public', 'favicon.ico'),
      filename: 'index.html',
      inject: true,
      template: path.join(__dirname, 'public', 'index.html'),
      title: 'React Clock',
    }),

    new ProgressBarPlugin({
      format: `  building webpack... [:bar] ${chalk.green.bold(':percent')} (It took :elapsed seconds to build)\n`,
      clear: false,
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      
      options: {
        sassLoader: {
          includePaths: [
            path.resolve(__dirname, './src'),
          ],
          outputStyle: 'expanded',
          sourceMap: true,
        },
        context: path.join(__dirname),
      },
    }),

    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  resolve: {
    descriptionFiles: [
      'package.json',
    ],
    enforceExtension: false,
    extensions: [
      '.jsx',
      '.js',
      '.json',
    ],
    modules: [
      'src',
      'node_modules',
    ],
  },
};
