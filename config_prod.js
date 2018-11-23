module.exports ={
  debugMode: false,
  usarJsonServer : false,
  //Api backend
  server:{
    port:"",
    host:"http://192.168.0.182:7001/ParametrizadorBackend/api"
  },
  //Configuración de constantes para enviar a WebService de Odi
  webService:{
    odiUser : "EQK7054A",
    odiPassword : "1234567",
    workRepository : "WRDEV_ASSURANCE1",
    contexto : "CNTX_DESARROLLO",
    stopLevel : "IMMEDIATE",
    runCount : 1,
    debug : 0
  },

  //seguridad emulada
  jwt:{
    secret: "#$%EGt2eT##$EG%Y$Y&U&/IETRH45W$%whth$Y$%YGRT"
  }
}
