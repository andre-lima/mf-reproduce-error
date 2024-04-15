// const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { dependencies } = require('./package.json');

module.exports = {
  entry: './index.js',
  mode: 'production',
  devtool: 'hidden-source-map',
  optimization: {
    splitChunks: {
      chunks: 'async',
      maxSize: 2000,
      minSize: 1000,
    },
  },
  output: {
    publicPath: 'auto',
    chunkFilename: '[id].[contenthash].chunk.js',
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3002,
    historyApiFallback: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
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
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        exclude: /node_modules/,
        options: {
          loader: 'jsx',
          target: 'es2015',
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'main_app',
      remotes: {},
      shared: [
        {
          ...Object.keys(dependencies).forEach((key) => ({
            [key]: {
              eager: true,
              requiredVersion: dependencies[key],
            },
          })),
          react: {
            eager: true,
            singleton: true,
            requiredVersion: dependencies.react,
          },
          'react-dom': {
            eager: true,
            singleton: true,
            requiredVersion: dependencies['react-dom'],
          },
          'react-router': {
            eager: true,
            singleton: true,
            requiredVersion: dependencies['react-router'],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
