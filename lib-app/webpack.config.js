const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const path = require('path');
const { dependencies } = require('./package.json');

module.exports = {
  entry: './index.js',
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    publicPath: 'auto',
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
    port: 3000,
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      maxSize: 700,
      minSize: 300,
      minChunks: 10,
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {},
  cache: false,
  plugins: [
    new ModuleFederationPlugin({
      name: 'lib_app',
      filename: 'remoteEntry.js',
      exposes: {
        './react': 'react',
        './react-dom': 'react-dom',
      },
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
    }),
  ],
};
