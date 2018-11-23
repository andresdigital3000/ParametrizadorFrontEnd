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

if(process.env.NODE_ENV !== 'production'){
  app.use(require('webpack-dev-middleware')(compiler,{
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
}
app.use('*', require('cors')());

app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname,'index.html'));
});

app.post('/login/:user', function(req,res){
  const body = req.body
  const user = req.params.user
  res.send(body);
});

app.listen(80,function(){
  console.log("ENV ==> " , process.env.NODE_ENV)
  console.log('Claro parametrizador app escuchando en puerto 80!');
});
