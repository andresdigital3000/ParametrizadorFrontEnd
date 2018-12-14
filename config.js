module.exports ={
  debugMode: false,
  usarJsonServer : true,
  //Api backend
  server:{
    port:"",
    host:"http://localhost:7001/ParametrizadorClaro/api"
  },
  //Configuración de constantes para enviar a WebService de Odi
  webService:{
    stopLevel : "IMMEDIATE",
    runCount : 1,
    debug : 0
  },

  //seguridad emulada
  jwt:{
    secret: "#$%EGt2eT##$EG%Y$Y&U&/IETRH45W$%whth$Y$%YGRT"
  }
}
