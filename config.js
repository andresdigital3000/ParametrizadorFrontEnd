module.exports ={
  debugMode: true,
  usarJsonServer : false,
  //Api backend
  server:{
    port:"",
    host:"http://localhost:8080/ParametrizadorBackend/api"
  },
  //Servicio web para ejecución de Conciliaciones o Escenarios
  //http://ultrabook:8080/WebServiceODIdService/WebServiceODIPortType
  //http://localhost:83/odiMockup
  webService:{
    user : "test",
    pw : "test",
    workSpace : "",
    repository : "LOCAL"
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
