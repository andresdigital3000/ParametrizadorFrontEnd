import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  UPDATE_LOGIN_FORM_REQUEST,
  LOGOUT_REQUEST,
  UPDATE_FINDER,
  CARGAR_POLITICAS,
  SAVE_POLITICAS,
  UPDATE_POLITICAS_FORM_REQUEST,
  CARGAR_POLITICA_FORM,
  LIMPIAR_FORM_POLITICA,
  ELIMINAR_POLITICA,
  ACTUALIZA_PAGINADOR_POLITICAS,
  IR_PAGINA_POLITICAS,
  CARGAR_CONCILIACIONES,
  UPDATE_CONCILIACIONES_FORM_REQUEST,
  CARGAR_CONCILIACION_FORM,
  LIMPIAR_FORM_CONCILIACION,
  CARGA_POLITICAS,
  ACTUALIZA_PAGINADOR_CONCILIACIONES,
  IR_PAGINA_CONCILIACIONES,
  UPDATE_POLITICA_EN_CONCILIACIONES,
  CARGAR_ESCENARIOS,
  UPDATE_ESCENARIOS_FORM_REQUEST,
  CARGAR_ESCENARIO_FORM,
  LIMPIAR_FORM_ESCENARIO,
  UPDATE_CONCILIACION_EN_ESCENARIOS,
  ACTUALIZA_PAGINADOR_ESCENARIOS,
  IR_PAGINA_ESCENARIOS,
  CARGA_CONCILIACIONES,
  UPDATE_VALUE_COMBO_CONCILIACIONES,
  CARGA_CONCILIACIONES_RESULTADO,
  UPDATE_VALUE_COMBO_CONCILIACIONES_RESULTADO,
  UPDATE_EJECUTAR_CONCILIACIONES_FORM_REQUEST
} from './const'

import React from 'react'
import APIInvoker from '../utils/APIInvoker'
import { browserHistory } from 'react-router'
import update from 'react-addons-update'
import config from '../../config'
import { ToastContainer, toast } from 'react-toastify';
import IMsg from '../ejecucionModule/IMsg'


var configuration = require('../../config')
const usarJsonServer = configuration.usarJsonServer

/*
* A C C I O N E S   D E L   C O M P O N E N T E  L O G I N  F O R M  ILogin
*/
export const updateLoginForm = (field, value) => (dispatch,getState) => {
    dispatch(updateLoginFormRequest(field,value))
}

export const loginRequest = () => (dispatch, getState) => {
  if(configuration.usarJsonServer==false){
    //Con el API REST sin modulo de logueo
    window.localStorage.setItem("token","#$%EGt2eT##$EG%Y$Y&U&/IETRH45W$%whth$Y$%YGRT")
    window.localStorage.setItem("username", "emulado")
    window.location='/';
  }else{
    //Con json server
    let usuario = getState().loginFormReducer.username
    let clave = getState().loginFormReducer.password

    APIInvoker.invokeGET('/login',response =>{
      if(usuario == response.user && clave == response.password){
        window.localStorage.setItem("token",response.token)
        window.localStorage.setItem("username", response.profile.userName)
        window.location='/';
      }else{
        dispatch(loginFailForm('Nombre de usuario o contraseña errados'))
      }
    },error =>{
      dispatch(loginFailForm('NO SE LOGUEO'))
    })
  }
}

const updateLoginFormRequest = (field,value) => ({
  type : UPDATE_LOGIN_FORM_REQUEST,
  field : field,
  value: value
})

const loginFailForm = (loginMessage) => ({
  type : LOGIN_ERROR,
  loginMessage: loginMessage
})


/*
*  A C C I O N E S   D E  R E L O G I N
*  para mantener conectado al usuario mediante token
*/
const loginSuccess = profile => ({
  type: LOGIN_SUCCESS,
  profile: profile
})

const loginFail = () => ({
  type : LOGIN_SUCCESS,
  profile : null
})

export const relogin = () => (dispatch,getState) => {
  if(configuration.usarJsonServer==false){
    //con API REST sin modulo de logueo
    let token = window.localStorage.getItem("token")
    if(token == null){
      dispatch(loginFail())
      browserHistory.push('/login');
    }else{
      window.localStorage.setItem("token","#$%EGt2eT##$EG%Y$Y&U&/IETRH45W$%whth$Y$%YGRT")
      window.localStorage.setItem("username", "emulado")
      dispatch(loginSuccess({
        "userName": "Nombre de Usuario Test"
      }))
    }
  }else{
    //con json-server
    let token = window.localStorage.getItem("token")
    if(token == null){
      dispatch(loginFail())
      browserHistory.push('/login');
    }else{
      APIInvoker.invokeGET('/login', response => {
        window.localStorage.setItem("token",response.token)
        window.localStorage.setItem("username",response.profile.userName)
        dispatch(loginSuccess(response.profile))
      },error => {
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("username")
        browserHistory.push('/login');
      })
    }
  }
}

/*
*  A C C I O N E S  D E  T O O L B A R
*  para mantener conectado al usuario mediante token
*/
export const logout = () => (dispatch, getState) => {
  dispatch(logoutRequest())
}

const logoutRequest = () => ({
  type: LOGOUT_REQUEST
})

/*
*  A C C I O N E S  D E  P O L I T I C A S
*  para realizar todas las acciones necesarias del crud de políticas
*/
//Actualizar tecla por tecla el campo de texto del buscador
export const updateTextFindPolitica = (field,value) => (dispatch,getState) =>{
  dispatch(updateTextPoliticaFindRequest(field,value))
}
//Enviar el texto del buscador al reducer store
const updateTextPoliticaFindRequest = (field,value) => ({
  type : UPDATE_FINDER,
  field : field,
  value: value
})
//Realizar la búsqueda
export const findTextPolitica = () => (dispatch,getState) => {
  if(configuration.usarJsonServer==false){
    //con API REST}
    let objetoVacio = new Object()
    let txtBuscar = getState().politicaReducer.textoBuscar
    APIInvoker.invokeGET('/politicas/findByAny?texto='+txtBuscar, response => {
      if(Array.isArray(response) == true){
        if(response[0].id!=undefined){
            dispatch(verPoliticas(response))
        }else{
            console.log("Error "+response[0].codigo+" : "+response[0].mensaje)
            toast.warn("No se encontraron registros que satisfagan el criterio de búsqueda", {
                position: toast.POSITION.BOTTOM_LEFT
            })
        }
      }else{
        if(response.id!=undefined){
            dispatch(verPoliticas(response))
        }else{
            console.log("Error "+response.codigo+" : "+response.mensaje)
            toast.warn("No se encontraron registros que satisfagan el criterio de búsqueda", {
              position: toast.POSITION.BOTTOM_LEFT
            })
            //dispatch(verPoliticas(objetoVacio))
        }
      }
    })
  }else{
    //con json-server
    let txtBuscar = getState().politicaReducer.textoBuscar
    APIInvoker.invokeGET('/politicas/'+txtBuscar, response => {
      dispatch(refreshListPolitica(response))
    })
  }
}

//Recalcular el paginador de politica
export const calculaPaginadorPoliticas = () => (dispatch,getState) => {
  let numregs=0
  //Obtener el numero total de registros antes de filtrar
  APIInvoker.invokeGET('/politicas/count',response =>{
    if(!isNaN(response)){
      numregs=response
      //Recalcula el paginador
      let totRegistros = numregs
      let regPagina = getState().politicaReducer.registrosPorPagina
      let totPaginas = Math.ceil(totRegistros / regPagina)
      let array_paginador = new Array()
      let offset = 0
      let regfin = 0
      //console.log("TotRegistros ==")
      //console.log(totRegistros)
      for(let i=1;i<=totPaginas;i++){
        regfin=offset+regPagina-1
        array_paginador.push({"id":i,"offset":offset})
        offset=regfin+1
      }
      //console.log("Variable de paginador ==>")
      //console.log(array_paginador)
      //preparar variable para Enviar
      let update_paginador={
        totalRegistros :  numregs,
        registrosPorPagina : regPagina,
        paginador: array_paginador
      }
      dispatch(actualizarPaginadorPoliticas(update_paginador))
    }else{
      console.log("Conteo de Registros de politica no válido")
    }
  })
}
//Envia las variables al store
const actualizarPaginadorPoliticas = (array_paginador) =>({
  type : ACTUALIZA_PAGINADOR_POLITICAS,
  lista : array_paginador
})

//Actualizar el listado de politicas
export const refreshListPolitica = (resp) =>(dispatch,getState) => {
    //Igual para jsonserver o API
    let objetoVacio = new Object()
    if(resp == null){
      let regInicial = 0
      //Todos los registros de politicas
      let pagActual = getState().politicaReducer.paginaActual
      if(getState().politicaReducer.paginador.length>0){
        regInicial = getState().politicaReducer.paginador[pagActual-1].offset
      }
      let regPagina = getState().politicaReducer.registrosPorPagina
      APIInvoker.invokeGET('/politicas?offset='+regInicial+'&limit='+regPagina, response1 => {
        if(Array.isArray(response1) == true){
          //Array con todos los registros
          if(response1[0].id!=undefined){
            dispatch(antesVerPoliticas(response1))
          }else{
            dispatch(antesVerPoliticas(objetoVacio))
            console.log("Error : "+response1[0].codigo+" Mensaje: "+response1[0].mensaje+": "+response1[0].descripcion)
            //alert("No se encuentran políticas")
          }
        }else{
          //Cuando el response no es un array, es decir, un solo registro
          if(response1.id!=undefined){
            dispatch(antesVerPoliticas([response1]))
          }else{
            dispatch(antesVerPoliticas(objetoVacio))
            console.log("Error : "+response1.codigo+" Mensaje: "+response1.mensaje+": "+response1.descripcion)
            //alert("No se encuentra la política")
          }
        }
      })
    }else{
      //Buscando un registro en especifico por id o por un response
      APIInvoker.invokeGET('/politicas/'+resp, response => {
        if(Array.isArray(response) == true){
          //si el response contiene varios registros
          if(response[0].id!=undefined){
            dispatch(antesVerPoliticas(response))
          }else{
            dispatch(antesVerPoliticas(objetoVacio))
            console.log("Error : "+response[0].codigo+" Mensaje: "+response[0].mensaje+": "+response[0].descripcion)
          }
        }else{
          //si el response es un solo registro
          if(response.id!=undefined){
            dispatch(antesVerPoliticas([response]))
          }else{
            dispatch(antesVerPoliticas(objetoVacio))
            console.log("Error : "+response.codigo+" Mensaje: "+response.mensaje+": "+response.descripcion)
          }
        }
      })
    }
}

const antesVerPoliticas = (resp) => (dispatch,getState) =>{
  dispatch(calculaPaginadorPoliticas())
  dispatch(verPoliticas(resp))
}
//Enviar la accion de ver politicas al Reducer STORE
const verPoliticas = (res) =>({
  type : CARGAR_POLITICAS,
  lista : res
})
//Actualizar tecla por tecla los campos del formulario de politicas
export const updateFormPoliticas = (field,value) => (dispatch,getState) =>{
  dispatch(updateFormPoliticasRequest(field,value))
}
//Enviar al reducer la tecla pulsada
const updateFormPoliticasRequest = (field,value) => ({
  type : UPDATE_POLITICAS_FORM_REQUEST,
  field : field,
  value: value
})
//Funcion para guardar o actualizar la politica
export const savePolitica = () => (dispatch,getState)=>{
  let id_politica = getState().politicaFormReducer.id
  //Si es un registro nuevo
  let politica_salvar = {
    id : getState().politicaFormReducer.id,
    nombre : getState().politicaFormReducer.nombre,
    descripcion : getState().politicaFormReducer.descripcion,
    objetivo : getState().politicaFormReducer.objetivo,
    fecha_creacion : '',
    fecha_actualizacion: '',
    usuario: getState().loginReducer.profile.userName
  }
  if(id_politica == 0 || id_politica == undefined){
    APIInvoker.invokePOST('/politicas',politica_salvar,response =>{
      if(response.id!=undefined){
        dispatch(limpiarFormPolitica())
        dispatch(refreshListPolitica())
        toast.success("Se grabó la política", {
          position: toast.POSITION.BOTTOM_LEFT
        })
      }else{
        //Enviar error específico a la consola
        console.log("Error : "+response.codigo+" Mensaje: "+response.mensaje+": "+response.descripcion)
        if(response.codigo==409){
          toast.error("Ya existe una política con el mismo nombre", {
            position: toast.POSITION.BOTTOM_LEFT
          })
          dispatch(refreshListPolitica())
        }else{
          //Error sin tratamiento
          toast.error("Error general al adicionar política", {
            position: toast.POSITION.BOTTOM_LEFT
          })
          dispatch(refreshListPolitica())
        }
      }
    },error =>{
      console.log("No se ha podido crear la politica con id"+id_politica)
    })
  }else{
    APIInvoker.invokePUT('/politicas',politica_salvar,response =>{
      if(response.id!=undefined){
        toast.success("Se actualizó la política", {
          position: toast.POSITION.BOTTOM_LEFT
        })
        //dispatch(limpiarFormPolitica(),browserHistory.push('/politicas'))
      }else{
        if(response.codigo==409){
          toast.error("Ya existe una política con el mismo nombre", {
            position: toast.POSITION.BOTTOM_LEFT
          })
          //dispatch(refreshListPolitica())
        }else{
          toast.error("Error general al intentar actualizar politica", {
            position: toast.POSITION.BOTTOM_LEFT
          })
        }
      }
    },error =>{
      console.log("No se ha podido actualizar la politica")
    })
  }
}

//Funcion para limpiar los campos del formulario de Politicas
export const limpiarFormPolitica = () =>({
  type : LIMPIAR_FORM_POLITICA
})

//Funcion para cargar la politica en el formulario
export const cargarPolitica =(idpolitica) => (dispatch,getState) =>{
  APIInvoker.invokeGET('/politicas/'+idpolitica, response => {
    if(Array.isArray(response) == true){
      if(response[0].id!=undefined){
        dispatch(cargarPoliticaEnForm(response))
      }else{
        toast.error("No se pudo cargar la politica en el formulario", {
          position: toast.POSITION.BOTTOM_LEFT
        })
        console.log("Error "+response[0].codigo+" : "+response[0].mensaje+" "+response[0].descripcion)
      }
    }else{
      if(response.id!=undefined){
        dispatch(cargarPoliticaEnForm([response]))
      }else{
        toast.error("No se pudo cargar la politica en el formulario", {
          position: toast.POSITION.BOTTOM_LEFT
        })
        console.log("Error "+response.codigo+" : "+response.mensaje+" "+response.descripcion)
      }
    }
  },error =>{
    console.log('No se pudo actualizar los campos')
  })
}

//Enviar la acción de cargar la politica al reducer
const cargarPoliticaEnForm = (politica) => ({
  type : CARGAR_POLITICA_FORM,
  politica : politica
})

//Funcion que elimina una politica
export const borrarPolitica = () => (dispatch,getState) =>{
  let idpolitica = getState().politicaFormReducer.id
  APIInvoker.invokeDELETE('/politicas/'+idpolitica, response => {
  },error =>{
    toast.error("Se eliminó la politica", {
      position: toast.POSITION.BOTTOM_LEFT
    })
    dispatch(
      limpiarFormPolitica(),
      browserHistory.push('/politicas')
    )
  })
}

//Funcion de cambio de pagina
export const moverPaginaPoliticas = (pagina) =>(dispatch,getState) =>{
  let NumPagsTotales = getState().politicaReducer.paginador.length
  if(pagina > 0 && pagina <= NumPagsTotales){
    dispatch(irAPaginaPoliticas(pagina))
    dispatch(refreshListPolitica())
  }
}

const irAPaginaPoliticas = (pagina) =>({
  type : IR_PAGINA_POLITICAS,
  pagina : pagina
})

/*
*  A C C I O N E S  D E  C O N C I L I A C I O N E S
*  para realizar todas las acciones necesarias del crud de conciliaciones
*/

//Funcion que carga el combo de politicas
export const cargarComboPoliticas = () =>(dispatch,getState) =>{
  APIInvoker.invokeGET('/politicas/findPoliticasSinConciliacion', response => {
    if(Array.isArray(response) == true){
      if(response[0].id!=undefined){
        dispatch(cargarPoliticas(response))
      }else{
        toast.info("No se encuentran politicas sin conciliaciones asociadas", {
          position: toast.POSITION.BOTTOM_LEFT
        })
      }
    }
  })
}
//Envia resultado para llenar el combo a Reducer
const cargarPoliticas = (arrayPoliticas) => ({
  type : CARGA_POLITICAS,
  lista : arrayPoliticas
})

//Actualizar tecla por tecla el campo de texto del buscador
export const updateTextFindConciliacion = (field,value) => (dispatch,getState) =>{
  dispatch(updateTextConciliacionFindRequest(field,value))
}
//Enviar el texto del buscador al reducer store
const updateTextConciliacionFindRequest = (field,value) => ({
  type : UPDATE_FINDER,
  field : field,
  value: value
})

//Realizar la búsqueda
export const findTextConciliacion = () => (dispatch,getState) => {
  let txtBuscar = getState().conciliacionReducer.textoBuscar
  APIInvoker.invokeGET('/conciliaciones/findByAny?texto='+txtBuscar, response => {
    if(Array.isArray(response) == true){
      if(response[0].id!=undefined){
        dispatch(verConciliaciones(response))
      }else{
        console.log("Error : "+response[0].codigo+" Mensaje: "+response[0].mensaje+": "+response[0].descripcion)
        toast.warn("No se encuentran conciliaciones que satisfagan el criterio de búsqueda", {
          position: toast.POSITION.BOTTOM_LEFT
        })
      }
    }else{
      if(response.id!=undefined){
        dispatch(verConciliaciones(response))
      }else{
        console.log("Error : "+response.codigo+" Mensaje: "+response.mensaje+": "+response.descripcion)
        toast.warn("No se encuentran conciliaciones que satisfagan el criterio de búsqueda", {
          position: toast.POSITION.BOTTOM_LEFT
        })
      }
    }
  })
}

//Recalcular el paginador de conciliaciones
export const calculaPaginadorConciliaciones = () => (dispatch,getState) => {
  let numregs=0
  //Obtener el numero total de registros antes de filtrar
  APIInvoker.invokeGET('/conciliaciones/count',response =>{
    if(!isNaN(response)){
      numregs=response
      //Recalcula el paginador
      let totRegistros = numregs
      let regPagina = getState().conciliacionReducer.registrosPorPagina
      let totPaginas = Math.ceil(totRegistros / regPagina)
      let array_paginador = new Array()
      let offset = 0
      let regfin = 0
      //console.log("TotRegistros ==")
      //console.log(totRegistros)
      for(let i=1;i<=totPaginas;i++){
        regfin=offset+regPagina-1
        array_paginador.push({"id":i,"offset":offset})
        offset=regfin+1
      }
      //console.log("Variable de paginador ==>")
      //console.log(array_paginador)
      //preparar variable para Enviar
      let update_paginador={
        totalRegistros :  numregs,
        registrosPorPagina : regPagina,
        paginador: array_paginador
      }
      dispatch(actualizarPaginadorConciliaciones(update_paginador))
    }else{
      console.log("Conteo de Registros de conciliaciones no válido")
    }
  })
}
//Envia las variables al store
const actualizarPaginadorConciliaciones = (array_paginador) =>({
  type : ACTUALIZA_PAGINADOR_CONCILIACIONES,
  lista : array_paginador
})

//Actualizar el listado de conciliacion
export const refreshListConciliacion = (resp) =>(dispatch,getState) => {
  //si no existe resp
  let objetoVacio = new Object()
  if(resp == null){
    let regInicial = 0
    let pagActual = getState().conciliacionReducer.paginaActual
    if(getState().conciliacionReducer.paginador.length > 0){
      regInicial = getState().conciliacionReducer.paginador[pagActual-1].offset
    }
    let regPagina = getState().conciliacionReducer.registrosPorPagina
    APIInvoker.invokeGET('/conciliaciones?offset='+regInicial+'&limit='+regPagina, response1 => {
      if(Array.isArray(response1) == true){
        if(response1[0].id!=undefined){
          dispatch(antesVerConciliaciones(response1))
        }else{
          console.log("Error : "+response1[0].codigo+" Mensaje: "+response1[0].mensaje+": "+response1[0].descripcion)
          dispatch(antesVerConciliaciones(objetoVacio))
        }
      }else{
        console.log("Error : "+response1.codigo+" Mensaje: "+response1.mensaje+": "+response1.descripcion)
        if(response1.codigo==404){
          dispatch(antesVerConciliaciones(objetoVacio))
        }else{
          dispatch(antesVerConciliaciones(objetoVacio))
          console.log(response1)
        }
      }
    })
  }else{
    //si resp es solo un numero
    if(Number.isInteger(parseInt(resp))){
      APIInvoker.invokeGET('/conciliaciones/'+resp, response => {
        if(Array.isArray(response) == true){
          if(response[0].id!=undefined){
            dispatch(antesVerConciliaciones(response))
          }else{
            dispatch(antesVerConciliaciones(objetoVacio))
            console.log("Error : "+response.codigo+" Mensaje: "+response.mensaje+": "+response.descripcion)
          }
        }else{
          if(response.id!=undefined){
            dispatch(antesVerConciliaciones([response]))
          }else{
            dispatch(antesVerConciliaciones(objetoVacio))
            console.log("Error : "+response.codigo+" Mensaje: "+response.mensaje+": "+response.descripcion)
          }
        }
      })
    }else{
      //si resp es un response
      if(Array.isArray(resp) == true){
          if(resp[0].id!=undefined){
            dispatch(antesVerConciliaciones(resp))
          }else{
            dispatch(antesVerConciliaciones(objetoVacio))
            console.log("Error : "+resp.codigo+" Mensaje: "+resp.mensaje)
          }
      }else{
          if(resp.id!=undefined){
            dispatch(antesVerConciliaciones([resp]))
          }else{
            dispatch(antesVerConciliaciones(objetoVacio))
            console.log("Error : "+resp.codigo+" Mensaje: "+resp.mensaje)
          }
      }
    }
  }
}
//Calcular el paginador antes de mostrar el listado
const antesVerConciliaciones = (resp) => (dispatch,getState) =>{
  dispatch(calculaPaginadorConciliaciones())
  dispatch(verConciliaciones(resp))
}
//Enviar la accion de ver conciliaciones al Reducer STORE
const verConciliaciones = (res) =>({
  type : CARGAR_CONCILIACIONES,
  lista : res
})

//Cargar el id politica en reducer conciliaciones
export const updPolitica = (idpolitica) =>(dispatch,getState) =>{
  APIInvoker.invokeGET('/politicas/'+idpolitica, response => {
    if(response.id!=undefined){
      dispatch(updPoliticaReducerConciliacion(JSON.stringify(response)))
    }else{
      console.log('No se encuentra la politica')
      dispatch(updPoliticaReducerConciliacion(JSON.stringify({"id":0,"nombre":"Ninguna Politica"})))
    }
  },error =>{
    console.log('No se pudo cargar las Propiedades de la politica '+idpolitica+' en conciliaciones listar')
  })
}
const updPoliticaReducerConciliacion = (objPolitica)=>({
  type : UPDATE_POLITICA_EN_CONCILIACIONES,
  value : objPolitica
})

//Actualizar tecla por tecla los campos del formulario de conciliaciones
export const updateFormConciliaciones = (field,value) => (dispatch,getState) =>{
  dispatch(updateFormConciliacionesRequest(field,value))
}
//Enviar al reducer la tecla pulsada
const updateFormConciliacionesRequest = (field,value) => ({
  type : UPDATE_CONCILIACIONES_FORM_REQUEST,
  field : field,
  value: value
})

//Funcion para guardar o actualizar la conciliacion
export const saveConciliacion = () => (dispatch,getState)=>{
  let id_conciliacion = getState().conciliacionFormReducer.id
  if(id_conciliacion == 0 || id_conciliacion == undefined){
    //Si es un registro nuevo
    let conciliacion_salvar = {
      id : getState().conciliacionFormReducer.id,
      nombre : getState().conciliacionFormReducer.nombre,
      webservice : getState().conciliacionFormReducer.webservice,
      descripcion : getState().conciliacionFormReducer.descripcion,
      idpolitica : getState().conciliacionReducer.politica.id,
      usuario: getState().loginReducer.profile.userName
    }
    APIInvoker.invokePOST('/conciliaciones',conciliacion_salvar,response =>{
      if(response.id!=undefined){
        dispatch(antesLimpiarFormConciliacion())
        dispatch(refreshListConciliacion())
        toast.success("Se grabó una nueva conciliación", {
          position: toast.POSITION.BOTTOM_LEFT
        })
      }else{
        console.log("Error :"+response.codigo+" "+response.mensaje+", "+response.descripcion)
        if(response.codigo==409){
          toast.error("Ya existe otra conciliación con el mismo nombre ó está intentando asignar una política ya asignada", {
            position: toast.POSITION.BOTTOM_LEFT
          })
        }else{
          toast.error("Error general al adicionar conciliación", {
            position: toast.POSITION.BOTTOM_LEFT
          })
        }
        //dispatch(antesLimpiarFormConciliacion())
        //dispatch(refreshListConciliacion())
      }
    },error =>{
      console.log('No se ha podido crear la conciliacion')
    })
  }else{
    //Si es un registro existente
    let idPoliticaGrabar = 0
    let nombrePoliticaGrabar="Ninguna"
    if(getState().conciliacionReducer.politica.id==0){
      idPoliticaGrabar = getState().conciliacionFormReducer.idPolitica
      nombrePoliticaGrabar = getState().conciliacionFormReducer.nombrePolitica
    }else{
      idPoliticaGrabar = getState().conciliacionReducer.politica.id
      nombrePoliticaGrabar = getState().conciliacionReducer.politica.nombre
    }
    let conciliacion_salvar = {
      id : getState().conciliacionFormReducer.id,
      nombre : getState().conciliacionFormReducer.nombre,
      webservice : getState().conciliacionFormReducer.webservice,
      descripcion : getState().conciliacionFormReducer.descripcion,
      idPolitica : idPoliticaGrabar,
      nombrePolitica : nombrePoliticaGrabar
    }
    APIInvoker.invokePUT('/conciliaciones',conciliacion_salvar,response =>{
      if(response.id!=undefined){
        dispatch(limpiarFormConciliacion(),browserHistory.push('/conciliaciones'))
        toast.success("Se actualizó la conciliación", {
          position: toast.POSITION.BOTTOM_LEFT
        })
      }else{
        console.log("Error :"+response.codigo+" "+response.mensaje+", "+response.descripcion)
        toast.error("No se ha podido actualizar la conciliación", {
          position: toast.POSITION.BOTTOM_LEFT
        })
        //dispatch(limpiarFormConciliacion(),browserHistory.push('/conciliaciones'))
      }
    },error =>{
      console.log('No se ha podido actualizar la conciliacion')
    })
  }
}

//Funcion que vuelve a cargar el combo de politicas al limpiar el formulario de conciliaciones
export const antesLimpiarFormConciliacion = () => (dispatch,getState) => {
  dispatch(cargarComboPoliticas(),limpiarFormConciliacion())
}

//Funcion para limpiar los campos del formulario de Conciliaciones
export const limpiarFormConciliacion = () =>({
    type : LIMPIAR_FORM_CONCILIACION
})

//Funcion para cargar la conciliacion en el formulario
export const cargarConciliacion =(idconciliacion) => (dispatch,getState) =>{
  APIInvoker.invokeGET('/conciliaciones/'+idconciliacion, response => {
    if(Array.isArray(response) == true){
      dispatch(cargarConciliacionEnForm(response))
    }else{
      dispatch(cargarConciliacionEnForm([response]))
    }
  },error =>{
    console.log('No se pudo actualizar los campos')
  })
}
//Enviar la acción de cargar la conciliacion al reducer
const cargarConciliacionEnForm = (conciliacion) => ({
  type : CARGAR_CONCILIACION_FORM,
  conciliacion : conciliacion
})
//Funcion que elimina una conciliacion
export const borrarConciliacion = () => (dispatch,getState) =>{
  let idconciliacion = getState().conciliacionFormReducer.id
  APIInvoker.invokeDELETE('/conciliaciones/'+idconciliacion, response => {
  },error =>{
      console.log(error)
      toast.success("Se eliminó la conciliación", {
        position: toast.POSITION.BOTTOM_LEFT
      })
      dispatch(
        limpiarFormConciliacion(),
        browserHistory.push('/conciliaciones')
      )
  })
}

//Funcion de cambio de pagina
export const moverPaginaConciliaciones = (pagina) =>(dispatch,getState) =>{
  let NumPagsTotales = getState().conciliacionReducer.paginador.length
  if(pagina > 0 && pagina <= NumPagsTotales){
    dispatch(irAPaginaConciliaciones(pagina))
    dispatch(refreshListConciliacion())
  }
}
const irAPaginaConciliaciones = (pagina) =>({
  type : IR_PAGINA_CONCILIACIONES,
  pagina : pagina
})

/*
*  A C C I O N E S  D E  E S C E N A R I O S
*  para realizar todas las acciones necesarias del crud de escenarios
*/

//Actualizar tecla por tecla el campo de texto del buscador
export const updateTextFindEscenario = (field,value) => (dispatch,getState) =>{
  dispatch(updateTextEscenarioFindRequest(field,value))
}
//Enviar el texto del buscador al reducer store
const updateTextEscenarioFindRequest = (field,value) => ({
  type : UPDATE_FINDER,
  field : field,
  value: value
})
//Realizar la búsqueda
export const findTextEscenario = () => (dispatch,getState) => {
  let txtBuscar = getState().escenarioReducer.textoBuscar
  APIInvoker.invokeGET('/escenarios/findByAny?texto='+txtBuscar, response => {
    if(Array.isArray(response) == true){
      if(response[0].id!=undefined){
        dispatch(verEscenarios(response))
      }else{
        toast.warn("No se encuentran escenarios que cumplan con el criterio de búsqueda", {
          position: toast.POSITION.BOTTOM_LEFT
        })
        console.log("Error : "+response[0].codigo+" Mensaje: "+response[0].mensaje+": "+response[0].descripcion)
      }
    }else{
      if(response.id!=undefined){
        dispatch(verEscenarios(response))
      }else{
        console.log("Error : "+response.codigo+" Mensaje: "+response.mensaje+": "+response.descripcion)
        toast.warn("No se encuentran escenarios que cumplan con el criterio de búsqueda", {
          position: toast.POSITION.BOTTOM_LEFT
        })
      }
    }
  })
}

//Recalcular el paginador de escenarios
export const calculaPaginadorEscenarios = () => (dispatch,getState) => {
  let numregs=0
  //Obtener el numero total de registros antes de filtrar
  APIInvoker.invokeGET('/escenarios/count',response =>{
    if(!isNaN(response)){
      numregs=response
      //Recalcula el paginador
      let totRegistros = numregs
      let regPagina = getState().escenarioReducer.registrosPorPagina
      let totPaginas = Math.ceil(totRegistros / regPagina)
      let array_paginador = new Array()
      let offset = 0
      let regfin = 0
      //console.log("TotRegistros ==")
      //console.log(totRegistros)
      for(let i=1;i<=totPaginas;i++){
        regfin=offset+regPagina-1
        array_paginador.push({"id":i,"offset":offset})
        offset=regfin+1
      }
      //console.log("Variable de paginador ==>")
      //console.log(array_paginador)
      //preparar variable para Enviar
      let update_paginador={
        totalRegistros :  numregs,
        registrosPorPagina : regPagina,
        paginador: array_paginador
      }
      dispatch(actualizarPaginadorEscenarios(update_paginador))
    }else{
      console.log("Conteo de Registros de escenarios no válido")
    }
  })
}
//Envia las variables al store
const actualizarPaginadorEscenarios = (array_paginador) =>({
  type : ACTUALIZA_PAGINADOR_ESCENARIOS,
  lista : array_paginador
})

//Actualizar el listado de escenario
export const refreshListEscenario = () =>(dispatch,getState) => {
  //console.log("EJECUTA REFRESH ESCENARIO")
  let objetoVacio = new Object()
  let conciliacionActual = getState().escenarioReducer.conciliacion.id
  if(conciliacionActual!=0){
    APIInvoker.invokeGET('/conciliaciones/'+conciliacionActual, response => {
      if(response.id!=undefined){
        //console.log("Detecta conciliacionActual ==>>")
        //console.log(response.escenarios)
        dispatch(antesVerEscenarios(response.escenarios))
      }else{
        console.log("Error : "+response.codigo+" Mensaje: "+response.mensaje+": "+response.descripcion)
        dispatch(antesVerEscenarios(objetoVacio))
      }
    })
  }else{
    //si no existe resp
    let regInicial = 0
    let pagActual = getState().escenarioReducer.paginaActual
    if(getState().escenarioReducer.paginador.length > 0){
      regInicial = getState().escenarioReducer.paginador[pagActual-1].offset
    }
    let regPagina = getState().escenarioReducer.registrosPorPagina
    APIInvoker.invokeGET('/escenarios?offset='+regInicial+'&limit='+regPagina, response => {
      if(Array.isArray(response)){
        if(response[0].id!=undefined){
          dispatch(antesVerEscenarios(response))
        }else{
          console.log("Error : "+response.codigo+" Mensaje: "+response.mensaje+": "+response.descripcion)
          dispatch(antesVerEscenarios(objetoVacio))
        }
      }else{
        //console.log("****** ******Como es el response ::")
        //console.log(response)
        if(response.codigo==404){
          dispatch(antesVerEscenarios(objetoVacio))
        }
      }
    })
  }
}

const antesVerEscenarios = (resp) => (dispatch,getState) =>{
  dispatch(calculaPaginadorEscenarios()),
  dispatch(verEscenarios(resp))
}
//Enviar la accion de ver escenarios al Reducer STORE
const verEscenarios = (res) =>({
  type : CARGAR_ESCENARIOS,
  lista : res
})

//Cargar el id conciliacion en el reducer de escenarios
export const updConciliacion = (idconciliacion) => (dispatch,getState) =>{
  APIInvoker.invokeGET('/conciliaciones/'+idconciliacion, response => {
    if(response.id!=undefined){
      dispatch(updConciliacionReducerEscenario(JSON.stringify(response)))
    }else{
      console.log('No se encuentra la conciliacion')
      dispatch(updConciliacionReducerEscenario(JSON.stringify({"id":0,"nombre":"Ninguna conciliacion","escenarios":[]})))
    }
    dispatch(refreshListEscenario())
  },error =>{
    console.log('No se pudo cargar las Propiedades de la conciliacion '+idconciliacion+' en escenarios listar')
  })
}

const updConciliacionReducerEscenario = (objConciliacion)=>({
  type : UPDATE_CONCILIACION_EN_ESCENARIOS,
  value : objConciliacion
})
//Actualizar tecla por tecla los campos del formulario de escenarios
export const updateFormEscenarios = (field,value) => (dispatch,getState) =>{
  dispatch(updateFormEscenariosRequest(field,value))
}
//Enviar al reducer la tecla pulsada
const updateFormEscenariosRequest = (field,value) => ({
  type : UPDATE_ESCENARIOS_FORM_REQUEST,
  field : field,
  value: value
})
//Funcion para guardar o actualizar la escenario
export const saveEscenario = () => (dispatch,getState)=>{
  let id_escenario = getState().escenarioFormReducer.id
  if(id_escenario == 0 || id_escenario == undefined){
    //Si es un escenario nuevo
    let escenario_salvar = {
      nombre : getState().escenarioFormReducer.nombre,
      impacto : getState().escenarioFormReducer.impacto,
      usuario : getState().loginReducer.profile.userName,
      idConciliacion : getState().escenarioReducer.conciliacion.id,
      nombreConciliacion : getState().escenarioReducer.conciliacion.nombre
    }
    APIInvoker.invokePOST('/escenarios',escenario_salvar,response =>{
      if(response.id!=undefined){
        toast.success("Se grabó un nuevo escenario", {
          position: toast.POSITION.BOTTOM_LEFT
        })
        //dispatch(limpiarFormEscenario())
        //dispatch(updConciliacion(getState().escenarioReducer.conciliacion.id))
      }else{
        console.log("Error :"+response.codigo+" "+response.mensaje+", "+response.descripcion)
        toast.error("Ya existe un escenario con el mismo nombre", {
          position: toast.POSITION.BOTTOM_LEFT
        })
        //dispatch(limpiarFormEscenario())
        //dispatch(updConciliacion(getState().escenarioReducer.conciliacion.id))
      }
    },error =>{
      console.log('No se ha podido crear la escenario')
    })
  }else{
    //Si es actualizar un existente
    let idConciliacionGrabar = 0
    let nombreConciliacionGrabar="Ninguna"
    if(getState().escenarioReducer.conciliacion.id==0){
      idConciliacionGrabar = getState().escenarioFormReducer.idConciliacion
      nombreConciliacionGrabar = getState().escenarioFormReducer.nombreConciliacion
    }else{
      idConciliacionGrabar = getState().escenarioReducer.conciliacion.id
      nombreConciliacionGrabar = getState().escenarioReducer.conciliacion.nombre
    }
    let escenario_salvar = {
      id :  getState().escenarioFormReducer.id,
      nombre : getState().escenarioFormReducer.nombre,
      impacto : getState().escenarioFormReducer.impacto,
      usuario : getState().loginReducer.profile.userName,
      idConciliacion : idConciliacionGrabar,
      nombreConciliacion : nombreConciliacionGrabar
    }
    APIInvoker.invokePUT('/escenarios',escenario_salvar,response =>{
      if(response.id!=undefined){
        toast.error("Se actualizó el escenario", {
          position: toast.POSITION.BOTTOM_LEFT
        })
        //dispatch(limpiarFormEscenario(),browserHistory.push('/escenarios'))
      }else{
        console.log("Error :"+response.codigo+" "+response.mensaje+", "+response.descripcion)
        toast.error("No se ha actualizado el escenario", {
          position: toast.POSITION.BOTTOM_LEFT
        })
        //dispatch(limpiarFormEscenario(),browserHistory.push('/escenarios'))
      }
    },error =>{
      console.log('No se ha podido actualizar la escenario')
    })
  }
}
//Funcion para limpiar los campos del formulario de Escenarios
export const limpiarFormEscenario = () =>({
  type : LIMPIAR_FORM_ESCENARIO
})
//Funcion para cargar la escenario en el formulario
export const cargarEscenario =(idescenario) => (dispatch,getState) =>{
  APIInvoker.invokeGET('/escenarios/'+idescenario, response => {
    if(Array.isArray(response) == true){
      dispatch(cargarEscenarioEnForm(response))
    }else{
      dispatch(cargarEscenarioEnForm([response]))
    }
  },error =>{
    console.log('No se pudo actualizar los campos')
  })
}
//Enviar la acción de cargar la escenario al reducer
const cargarEscenarioEnForm = (escenario) => ({
  type : CARGAR_ESCENARIO_FORM,
  escenario : escenario
})
//Funcion que elimina una escenario
export const borrarEscenario = () => (dispatch,getState) =>{
  let idescenario = getState().escenarioFormReducer.id
  APIInvoker.invokeDELETE('/escenarios/'+idescenario, response => {
  },error =>{
    toast.success("Se eliminó el escenario", {
      position: toast.POSITION.BOTTOM_LEFT
    })
    dispatch(limpiarFormEscenario(),browserHistory.push('/escenarios'))
  })
}

//Funcion de cambio de pagina
export const moverPaginaEscenarios = (pagina) =>(dispatch,getState) =>{
  let NumPagsTotales = getState().escenarioReducer.paginador.length
  if(pagina > 0 && pagina <= NumPagsTotales){
    dispatch(irAPaginaEscenarios(pagina))
    dispatch(refreshListEscenario())
  }
}
const irAPaginaEscenarios = (pagina) =>({
  type : IR_PAGINA_ESCENARIOS,
  pagina : pagina
})


/*
*  A C C I O N E S  D E  E J E C U C I O N
*  para realizar todas las acciones necesarias modulo de ejecución
*/

//Funcion que carga el combo de conciliaciones
export const cargarComboConciliaciones = () =>(dispatch,getState) =>{
  APIInvoker.invokeGET('/conciliaciones', response => {
    if(Array.isArray(response) == true){
      dispatch(cargarConciliaciones(response))
    }
  })
}
//Envia resultado para llenar el combo a Reducer
const cargarConciliaciones = (arrayConciliaciones) => ({
  type : CARGA_CONCILIACIONES,
  lista : arrayConciliaciones
})

export const updateEjecucion = (field,value) => (dispatch,getState) =>{
  dispatch(updateComboConciliaciones(field,value))
}

//Enviar el texto del buscador al reducer store
const updateComboConciliaciones = (field,value) => ({
  type : UPDATE_VALUE_COMBO_CONCILIACIONES,
  field : field,
  value: value
})


/*
*  A C C I O N E S  D E  R E S U L T A D O S
*  para realizar todas las acciones necesarias modulo de resultados
*/

//Funcion que carga el combo de conciliaciones
export const cargarComboConciliacionesResultados = () =>(dispatch,getState) =>{
  APIInvoker.invokeGET('/conciliaciones', response => {
    if(Array.isArray(response) == true){
      dispatch(cargarConciliacionesResultados(response))
    }
  })
}
//Envia resultado para llenar el combo a Reducer
const cargarConciliacionesResultados = (arrayConciliaciones) => ({
  type : CARGA_CONCILIACIONES_RESULTADO,
  lista : arrayConciliaciones
})

export const updateResultados = (field,value) => (dispatch,getState) =>{
  dispatch(updateComboConciliacionesResultados(field,value))
}

//Enviar el texto del buscador al reducer store
const updateComboConciliacionesResultados = (field,value) => ({
  type : UPDATE_VALUE_COMBO_CONCILIACIONES_RESULTADO,
  field : field,
  value: value
})

//Solicita el estado de ejecución de una conciliacion
export const getStatusEjecucionConciliacion = (operacion) => (dispatch,getState) => {
  //Variables necesarias para llamar el webservice
  var xmlhttp = new XMLHttpRequest();
  let odiUser = "test"
  let pwUser = "test"
  let repository = "LOCAL"
  let loadplaninstanceid = 1
  let idConciliacionEjecucion = getState().ejecucionReducer.conciliacion.id
  let nomConciliacionEjecucion = getState().ejecucionReducer.conciliacion.nombre
  //Construir peticion SOAP que solicita el estado de la ejecución
  var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:odi="xmlns.oracle.com/odi/OdiInvoke/">'+
             '<soapenv:Header/>'+
             '<soapenv:Body>'+
                '<odi:OdiGetLoadPlanStatusRequest>'+
                   '<Credentials>'+
                    '  <!--You may enter the following 3 items in any order-->'+
                    '  <!--Optional:-->'+
                    '  <OdiUser>'+odiUser+'</OdiUser>'+
                    '  <!--Optional:-->'+
                    '  <OdiPassword>'+pwUser+'</OdiPassword>'+
                    '  <WorkRepository>'+repository+'</WorkRepository>'+
                   '</Credentials>'+
                   '<!--Zero or more repetitions:-->'+
                   '<LoadPlanInstanceId>'+loadplaninstanceid+'</LoadPlanInstanceId>'+
                      '<LoadPlans>'+
                      '<LoadPlanRunNumber>'+idConciliacionEjecucion+'</LoadPlanRunNumber>'+
                   '</LoadPlans>'+
                '</odi:OdiGetLoadPlanStatusRequest>'+
             '</soapenv:Body>'+
          '</soapenv:Envelope>'
  if(xmlhttp){
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
        if(xmlhttp.status == 200) {
          var XMLParser = require('react-xml-parser');
          var xml = new XMLParser().parseFromString(xmlhttp.response);
          //console.log("Id de la conciliacion a ejecutar...")
          //console.log(getState().ejecucionReducer.conciliacion.id);
          //console.log("el ws contesta...")
          //console.log(xml.getElementsByTagName('LoadPlanStatus')[0].value);
          //console.log("Operacion....")
          //console.log(operacion)
          //Si no hay problema en ejecutarlo
          if(nomConciliacionEjecucion!=undefined){
            if(operacion=='ejecutar'){
              if(xml.getElementsByTagName('LoadPlanStatus')[0].value==1){ //Para mi 1 es que ese está ejecutando
                toast.error("La conciliación "+nomConciliacionEjecucion+" ya se encuentra en ejecución", {
                  position: toast.POSITION.BOTTOM_CENTER,
                })
              }else{
                //console.log("Se debe ejecutar la funcion que inicia la conciliacion")
                dispatch(doEjecutarConciliacion())
              }
            }else if(operacion=='cancelar') {
              if(xml.getElementsByTagName('LoadPlanStatus')[0].value==0){ //Para mi 0 es que ese no se está ejecutando
                toast.error("La conciliación "+nomConciliacionEjecucion+" no se está ejecutando", {
                  position: toast.POSITION.BOTTOM_CENTER,
                })
              }else{
                dispatch(doCancelarConciliacion())
              }
            }
          }else{
            toast.error("Debe Seleccionar alguna de las conciliaciones", {
              position: toast.POSITION.BOTTOM_CENTER,
            })
          }
        }
      }
    }
    xmlhttp.open('POST',configuration.urlWebService,true);
    //xmlhttp.setRequestHeader('Content-Type','text/html');
    xmlhttp.send(sr);
  }else{
    alert('no existe el objeto xmlhttp');
  }
}

export const doEjecutarConciliacion = () => (dispatch,getState) => {
  //Variables necesarias para llamar el webservice
  var xmlhttp = new XMLHttpRequest();
  let odiUser = "test"
  let pwUser = "test"
  let repository = "LOCAL"
  let context = 1
  let loglevel = 6
  let idConciliacionEjecucion = getState().ejecucionReducer.conciliacion.id
  let nomConciliacionEjecucion = getState().ejecucionReducer.conciliacion.nombre
  //Construir peticion SOAP
  var sr = '<?xml version="1.0" encoding="utf-8"?>'+
            '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:odi="xmlns.oracle.com/odi/OdiInvoke/">'+
             '<soapenv:Header/>'+
             '<soapenv:Body>'+
                '<odi:OdiStartLoadPlanRequest>'+
                   '<!--You may enter the following 2 items in any order-->'+
                   '<Credentials>'+
                      '<!--You may enter the following 3 items in any order-->'+
                      '<!--Optional:-->'+
                      '<OdiUser>'+odiUser+'</OdiUser>'+
                      '<!--Optional:-->'+
                      '<OdiPassword>'+pwUser+'</OdiPassword>'+
                      '<WorkRepository>'+repository+'</WorkRepository>'+
                   '</Credentials>'+
                   '<StartLoadPlanRequest>'+
                      '<LoadPlanName>'+nomConciliacionEjecucion+'</LoadPlanName>'+
                      '<Context>'+context+'</Context>'+
                      '<!--Optional:-->'+
                      '<Keywords></Keywords>'+
                      '<!--Optional:-->'+
                      '<LogLevel>'+loglevel+'</LogLevel>'+
                      '<!--Zero or more repetitions:-->'+
                      '<LoadPlanStartupParameters>'+
                         '<!--You may enter the following 2 items in any order-->'+
                         '<Name></Name>'+
                         '<Value></Value>'+
                      '</LoadPlanStartupParameters>'+
                   '</StartLoadPlanRequest>'+
                '</odi:OdiStartLoadPlanRequest>'+
             '</soapenv:Body>'+
          '</soapenv:Envelope>';
  if(xmlhttp){
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
        if(xmlhttp.status == 200) {
          var XMLParser = require('react-xml-parser');
          var xml = new XMLParser().parseFromString(xmlhttp.response);
          console.log(getState().ejecucionReducer.conciliacion.id);
          console.log(xml.getElementsByTagName('RunCount')[0].value);
          if(xml.getElementsByTagName('RunCount')[0].value==1){
            toast.success("Se inició la ejecución correctamente", {
              position: toast.POSITION.BOTTOM_CENTER,
            })
          }else{
            toast.error("No se ha podido ejecutar", {
              position: toast.POSITION.BOTTOM_CENTER,
            })
          }
        }
      }
    }
    xmlhttp.open('POST',configuration.urlWebService,true);
    xmlhttp.send(sr);
  }else{
    alert('no existe el objeto xmlhttp');
  }
}

export const doCancelarConciliacion = () => (dispatch,getState) => {
  //Variables necesarias para llamar el webservice
  var xmlhttp = new XMLHttpRequest();
  let odiUser = "test"
  let pwUser = "test"
  let repository = "LOCAL"
  let context = 1
  let loglevel = 6
  let runcount = 0
  let stoplevel = 1
  let idConciliacionEjecucion = getState().ejecucionReducer.conciliacion.id
  let nomConciliacionEjecucion = getState().ejecucionReducer.conciliacion.nombre
  //Construir peticion SOAP
  var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:odi="xmlns.oracle.com/odi/OdiInvoke/">'+
             '<soapenv:Header/>'+
             '<soapenv:Body>'+
                '<odi:OdiStopLoadPlanRequest>'+
                '   <!--You may enter the following 2 items in any order-->'+
                '   <Credentials>'+
                '      <!--You may enter the following 3 items in any order-->'+
                '      <!--Optional:-->'+
                '      <!--Optional:-->'+
                '      <OdiUser>'+odiUser+'</OdiUser>'+
                '      <OdiPassword>'+pwUser+'</OdiPassword>'+
                '      <WorkRepository>'+repository+'</WorkRepository>'+
                '   </Credentials>'+
                '   <OdiStopLoadPlanRequest>'+
                '      <LoadPlanInstanceId>'+idConciliacionEjecucion+'</LoadPlanInstanceId>'+
                '      <LoadPlanInstanceRunCount>'+runcount+'</LoadPlanInstanceRunCount>'+
                '      <StopLevel>'+stoplevel+'</StopLevel>'+
                '   </OdiStopLoadPlanRequest>'+
                '</odi:OdiStopLoadPlanRequest>'+
             '</soapenv:Body>'+
          '</soapenv:Envelope>';
  if(xmlhttp){
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
        if(xmlhttp.status == 200) {
          var XMLParser = require('react-xml-parser');
          var xml = new XMLParser().parseFromString(xmlhttp.response);
          console.log(getState().ejecucionReducer.conciliacion.id);
          console.log(xml.getElementsByTagName('RunCount')[0].value);
          if(xml.getElementsByTagName('RunCount')[0].value==1){
            toast.success("Se detuvo la ejecución correctamente", {
              position: toast.POSITION.BOTTOM_CENTER,
            })
          }else{
            toast.error("No se ha podido ejecutar", {
              position: toast.POSITION.BOTTOM_CENTER,
            })
          }
        }
      }
    }
    xmlhttp.open('POST',configuration.urlWebService,true);
    xmlhttp.send(sr);
  }else{
    alert('no existe el objeto xmlhttp');
  }
}


//Programar Conciliaciones
//Actualizar tecla por tecla los campos del formulario de conciliaciones
export const updateFormEjecutarConciliaciones = (field,value) => (dispatch,getState) =>{
  dispatch(updateFormEjecutarConciliacionesRequest(field,value))
}

//Enviar al reducer la tecla pulsada
const updateFormEjecutarConciliacionesRequest = (field,value) => ({
  type : UPDATE_EJECUTAR_CONCILIACIONES_FORM_REQUEST,
  field : field,
  value: value
})

//Salvar la programación del Formulario
export const salvarProgramacion = () => (dispatch,getState) => {
  let hora = getState().ejecucionReducer.hora
  let minuto = getState().ejecucionReducer.minuto
  let fecha = getState().ejecucionReducer.fecha
  let paraconciliacion = getState().ejecucionReducer.conciliacion.nombre
  toast.warn("Grabar hora:minuto="+hora+":"+minuto+" de la fecha="+fecha+", No hay servicio de backend", {
    position: toast.POSITION.BOTTOM_CENTER,
  })
}
