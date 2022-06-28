const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: './src/src-sw.js',
      swDest: 'sw.js',
    }),
  ],
};
