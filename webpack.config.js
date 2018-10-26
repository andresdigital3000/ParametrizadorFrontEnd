var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    __dirname + "/src/App.js",
  ],
  output: {
    path: __dirname + "/resources",
    filename: "bundle.js",
    publicPath: "/resources"
  },
  node: {
    fs: "empty"
  },
  module:{
    loaders:[{
      test: /\.jsx?$|html/,
      exclude: /node_modules/,
      loader: 'babel',
      query:{
        presets:['es2015','react','react-hmre'],
        plugins: ["jsx-control-statements"]
      }
    }]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
