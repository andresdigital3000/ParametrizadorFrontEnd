var express = require('express');
var http = require('http')
var path = require('path');

var app = express();
var port = 3000;

function startServer() {

  if(process.env.NODE_ENV !== 'production'){
    var config = require('./webpack.config.js');
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
    app.use(webpackHotMiddleware(compiler));
  }

  app.use('/public', express.static(__dirname + '/public'))
  app.use('/resources', express.static('resources'));
  
  app.get('/*', function (req, res) {
        console.log("router ==>")
        res.sendFile(path.join(__dirname, 'index.html'))
  });

  // app.listen(port, function(error) {
  //   if (error) throw error;
  //   console.log("Express server listening on port", port);
  // });

  http.createServer(app).listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  });

}

if(require.main === module){
    startServer();
} else {
    module.exports = startServer;
}
