module.exports ={
  debugMode: true,
  usarJsonServer : false,
  //Api backend
  server:{
    port:"",
    host:"http://localhost:7001/ParametrizadorBackend/api"
  },
  //Configuración de constantes para enviar a WebService de Odi
  webService:{
    odiUser : "EQK7054A",
    odiPassword : "1234567",
    workRepository : "WRDEV_ASSURANCE1",
    contexto : "CNTX_DESARROLLO",
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
