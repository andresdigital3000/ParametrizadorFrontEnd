module.exports ={
  debugMode: false,
  //Api backend
  server:{
    port:"",
    host:"http://localhost:7001/ParametrizadorClaro/api"
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
  crypto:{
    secret: "ParametrizadorClaro2018_Nitolo"
  }
}
