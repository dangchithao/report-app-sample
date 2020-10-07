const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'production', // development | production, this one should be configured inside .env file
  entry: {
    "report-app": [
      path.join(__dirname, '/src/index.js')
    ]
  },
  output: {
    filename: '[name].[hash:6].js',
    path: path.join(__dirname, '/server/build')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-optional-chaining'
            ]
          }
        }
      },
      {
        test: /\.ect$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.ect',
      template: path.join(__dirname, 'server/views/index.ect')
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};

module.exports = config;
