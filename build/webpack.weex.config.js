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
        loader: 'buble-loader',
        exclude: /node_modules/,
        options: {
          objectAssign: 'Object.assign'
        }
      }, {
        test: /\.vue(\?[^?]+)?$/,
        loaders: ['weex-vue-loader']
      }
    ]
  },
  plugins: [bannerPlugin]
}
