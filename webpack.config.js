const path = require('path');

const config = {
  entry: {
    "report-app": [
      path.join(__dirname, '/src/index.js')
    ]
  },
  output: {
    filename: '[name].[hash:6].js',
    path: path.join(__dirname, '/server/public/javascripts')
  },
  module: {
    rules: [{
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
    },]
  }
};

module.exports = config;
