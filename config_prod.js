module.exports ={
  debugMode: false,
  usarJsonServer : false,
i  //Api backend
  server:{
    port:"",
    host:"http://localhost:8080/ParametrizadorBackend/api"
  },
  //Servicio web para ejecución de Conciliaciones o Escenarios
  webService:{
    url : "http://localhost:83/odiMockup",
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
