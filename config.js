module.exports ={
  debugMode: true,
  usarJsonServer : false,
  //Api backend
  server:{
    port:"",
    host:"http://localhost:8080/ParametrizadorBackend/api"
  },
  //Servicio web para ejecución de Conciliaciones o Escenarios
  urlWebService : "http://localhost:83/odiMockup",
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
