// const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { dependencies } = require('./package.json');

module.exports = {
  entry: './index.js',
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    publicPath: 'auto',
    chunkFilename: '[id].[contenthash].chunk.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      maxSize: 2000,
      minSize: 1000,
    },
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
    port: 3001,
    historyApiFallback: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  cache: false,
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
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
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
      name: 'component_app',
      filename: 'remoteEntry.js',
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
        'react-router': {
          singleton: true,
          requiredVersion: dependencies['react-router'],
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: dependencies['react-router-dom'],
        },
      },
      exposes: {
        './CompApp': './CompApp.jsx',
      },
      remotes: {
        // 'lib-app': 'lib_app@http://localhost:3000/remoteEntry.js',
        // 'main-app': 'main_app@http://localhost:3002/remoteEntry.js',
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
