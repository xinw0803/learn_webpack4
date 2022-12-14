const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Webpackbar = require('webpackbar')

let pathsToClean = [
  'dist'
]

module.exports = {
  entry: {
    index: './src/index.js',
    hello: './src/hello.js'
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'js/[name].[hash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: [
            //   ['@babel/preset-env', { targets: "defaults" }]
            // ],
            // TODO: 和.bablerc效果一致
            plugins: ["@babel/plugin-transform-arrow-functions", ["@babel/plugin-proposal-decorators", { "legacy": true }]]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'learn webpack4',
      filename: 'index.html',
      template: 'public/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      title: 'learn webpack4',
      filename: 'hello.html',
      template: 'public/index.html',
      chunks: ['hello']
    }),
    new Webpackbar(),
    new CleanWebpackPlugin(pathsToClean)
  ]
}