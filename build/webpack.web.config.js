var path = require('path')

module.exports = {
  entry: {
    'index': path.resolve('src', 'entry.js')
  },
  output: {
    path: 'dist',
    filename: '[name].web.js'
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
        loaders: ['vue-loader']
      }
    ]
  }
}
