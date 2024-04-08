const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry: './index.js',
  mode: 'production',
  devtool: 'hidden-source-map',
  optimization: {
    splitChunks: {
      chunks: (chunk) => chunk.name !== 'legacy-index',
    },
  },
  output: {
    publicPath: 'http://localhost:3002/',
    clean: true,
  },
  // output: {
  //   filename: '[name].[contenthash].bundle.js',
  //   chunkFilename: '[id].[contenthash].chunk.js',
  //   path: path.join(__dirname, '../../public/dist'),
  //   publicPath: '/dist/',
  // },
  resolve: {
    extensions: [
      '.jsx',
      '.js',
      '.json',
      '.css',
      '.scss',
      '.jpg',
      'jpeg',
      'png',
    ],
  },
  cache: false,
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'main_app',
      remotes: {
        'lib-app': 'lib_app@http://localhost:3000/remoteEntry.js',
        'component-app': 'component_app@http://localhost:3001/remoteEntry.js',
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
