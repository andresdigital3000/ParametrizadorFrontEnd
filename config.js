module.exports ={
  debugMode: true,
  usarJsonServer : false,
  //json-server
  /*server:{
    port:3000,
    host:"http://localhost"
  },*/
  //Api backend
  server:{
    port:"",
    host:"http://localhost:8080/ParametrizadorBackend/api"
  },
  //aplicacion front
  resources:{
    port: 82,
    server: "http://localhost"
  },
  //seguridad emulada
  jwt:{
    secret: "#$%EGt2eT##$EG%Y$Y&U&/IETRH45W$%whth$Y$%YGRT"
  }
}
