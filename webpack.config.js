var path = require('path')
var webpack = require('webpack')

var bannerPlugin = new webpack.BannerPlugin({
  banner: '// { "framework": "Vue" }\n',
  raw: true
})

function getBaseConfig () {
  return {
    entry: {
      'index': path.resolve('src', 'entry.js')
    },
    output: {
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }, {
          test: /\.vue(\?[^?]+)?$/,
          loaders: []
        }
      ]
    },
    plugins: [
      // new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }}),
      bannerPlugin
    ]
  }
}

var webConfig = getBaseConfig()
webConfig.output.filename = '[name].web.js'
webConfig.module.rules[1].loaders.push('vue-loader')

var nativeConfig = getBaseConfig()
nativeConfig.output.filename = '[name].weex.js'
nativeConfig.module.rules[1].loaders.push('weex-loader')

module.exports = [webConfig, nativeConfig]
