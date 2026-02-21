const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const env = (process.env.NODE_ENV === 'production') ? (
  new webpack.EnvironmentPlugin({ ...process.env })
) : (
  new Dotenv()
)

module.exports = {
  entry: './src/app.js',
  context: path.resolve(__dirname, 'frontend'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'frontend/dist'),
    publicPath: process.env.NODE_ENV === 'production' ? '/project-04/' : '/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.s(a|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.woff2?$/, type: 'asset/resource' },
      { test: /\.(jpg|png|gif)$/, type: 'asset/resource' }
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'frontend/src')
    },
    client: {
      overlay: { errors: true, warnings: false }
    },
    hot: true,
    open: true,
    port: 8000,
    proxy: [{
      context: ['/api'],
      target: 'http://localhost:4000'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body',
      scriptLoading: 'blocking'
    }),
    env
  ]
}
