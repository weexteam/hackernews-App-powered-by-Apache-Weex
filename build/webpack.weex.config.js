var path = require('path')
var webpack = require('webpack')

var bannerPlugin = new webpack.BannerPlugin(
  '// { "framework": "Vue" }\n',
  { raw: true }
)

module.exports = {
  entry: {
    'index': path.resolve('src', 'entry.js')
  },
  output: {
    path: 'dist',
    filename: '[name].weex.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.vue(\?[^?]+)?$/,
        loaders: ['weex-loader']
      }
    ]
  },
  plugins: [bannerPlugin]
}
