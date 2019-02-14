var webpack = require('webpack');

module.exports = {
  entry: [
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
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query:{
        presets:['es2015','react','react-hmre'],
        plugins: ["jsx-control-statements"]
      }
    },
    { test: /\.css$/, loader: "style-loader!css-loader" },
  ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV' : JSON.stringify('production')
      }
    })
  ]
}
