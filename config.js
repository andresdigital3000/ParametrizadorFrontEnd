module.exports ={
<<<<<<< HEAD
  debugMode: false,
  usarJsonServer : true,
  //Api backend
  server:{
    port:"",
    host:"http://localhost:7001/ParametrizadorClaro/api"
=======
  debugMode: true,
  usarJsonServer : false,
  //Api backend
  server:{
    port:"",
    host:"http://localhost:8080/ParametrizadorBackend/api"
>>>>>>> origin/master
  },
  //Configuración de constantes para enviar a WebService de Odi
  webService:{
    stopLevel : "IMMEDIATE",
    runCount : 1,
    debug : 1
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
