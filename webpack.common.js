const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      /* rules buat component */
      {
        test: /\.css$/i,
        exclude: /styles/,
        use: ['to-string-loader', 'css-loader'],
      },
      /* rules buat global style */
      {
        test: /\.css$/i,
        include: /styles/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new webpack.EnvironmentPlugin(['API_KEY', 'API_ACCESS_TOKEN']),
  ],
  resolve: {
    fallback: {
      path: false,
      os: false,
      crypto: false,
    },
  },
};
