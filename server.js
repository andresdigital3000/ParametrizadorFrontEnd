var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var path = require('path')
var webpack = require('webpack')
var config = require('./webpack.config')
var compiler = webpack(config)

app.use('/resources', express.static('resources'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit:'10mb'}));

app.use(require('webpack-dev-middleware')(compiler,{
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use('*', require('cors')());

app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname,'index.html'));
});

app.post('/login/:user', function(req,res){
  const body = req.body
  const user = req.params.user
  res.send(body);
});

app.listen(82,function(){
  console.log('Ejemplo app escuchando en puerto 82!');
});
