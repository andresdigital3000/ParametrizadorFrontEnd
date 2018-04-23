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
  CARGAR_CONCILIACIONES,
  UPDATE_CONCILIACIONES_FORM_REQUEST,
  CARGAR_CONCILIACION_FORM,
  LIMPIAR_FORM_CONCILIACION,
  CARGAR_ESCENARIOS,
  UPDATE_ESCENARIOS_FORM_REQUEST,
  CARGAR_ESCENARIO_FORM,
  LIMPIAR_FORM_ESCENARIO,
} from './const'

import APIInvoker from '../utils/APIInvoker'
import { browserHistory } from 'react-router'
import update from 'react-addons-update'
import config from '../../config'

/*
* A C C I O N E S   D E L   C O M P O N E N T E  L O G I N  F O R M  ILogin
*/
export const updateLoginForm = (field, value) => (dispatch,getState) => {
    dispatch(updateLoginFormRequest(field,value))
}

export const loginRequest = () => (dispatch, getState) => {
    //Con el API REST sin modulo de logueo
    window.localStorage.setItem("token","#$%EGt2eT##$EG%Y$Y&U&/IETRH45W$%whth$Y$%YGRT")
    window.localStorage.setItem("username", "emulado")
    window.location='/';
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
    //con API REST
    let txtBuscar = getState().politicaReducer.textoBuscar
    APIInvoker.invokeGET('/politicas/findAnyColumn?texto='+txtBuscar, response => {
      dispatch(refreshListPolitica(response))
    })
}
//Actualizar el listado de politicas
export const refreshListPolitica = (resp) =>(dispatch,getState) => {
    //Usando la Api
    let pagActual = getState().politicaReducer.paginaActual
    let regPagina = getState().politicaReducer.registrosPorPagina
    let totRegistros = getState().politicaReducer.totalRegistros
    let totPaginas = Math.ceil(totRegistros / regPagina)
    if(resp == null){
      APIInvoker.invokeGET('/politicas/?_page'+pagActual+'&_limit'+regPagina, response => {
        if(Array.isArray(response) == true){
          dispatch(verPoliticas(response))
        }else{
          dispatch(verPoliticas([response]))
        }
      })
    }else{
      APIInvoker.invokeGET('/politicas/'+resp+'?_page'+pagActual+'&_limit'+regPagina, response => {
        if(Array.isArray(response) == true){
          dispatch(verPoliticas(response))
        }else{
          dispatch(verPoliticas([response]))
        }
      })
    }
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
  let id_politica = getState().politicaFormReducer.codigo
    let politica_salvar = {
      codigo : getState().politicaFormReducer.codigo,
      nombre : getState().politicaFormReducer.nombre,
      descripcion : getState().politicaFormReducer.descripcion,
      objetivo : getState().politicaFormReducer.objetivo,
      fecha_creacion : '',
      fecha_actualizacion : '',
      usuario : getState().loginReducer.profile.userName
    }
    if(id_politica == 0){
      //Si es un registro nuevo
      APIInvoker.invokePOST('/politicas',politica_salvar,response =>{
        dispatch(refreshListPolitica(),limpiarFormPolitica())
      },error =>{
        console.log('No se ha podido crear la politica')
      })
    }else{
      //Si es actualizar un existente
      APIInvoker.invokePUT('/politicas',politica_salvar,response =>{
        dispatch(limpiarFormPolitica(),browserHistory.push('/politicas'))
      },error =>{
        console.log('No se ha podido actualizar la politica')
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
      dispatch(cargarPoliticaEnForm(response))
    }else{
      dispatch(cargarPoliticaEnForm([response]))
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
  let idpolitica = getState().politicaFormReducer.codigo
  APIInvoker.invokeDELETE('/politicas/'+idpolitica, response => {
    if(response.status == 200){
      dispatch(limpiarFormPolitica(),browserHistory.push('/politicas'))
    }
  },error =>{
    dispatch(limpiarFormPolitica(),browserHistory.push('/politicas'))
  })
}


/*
*  A C C I O N E S  D E  C O N C I L I A C I O N E S
*  para realizar todas las acciones necesarias del crud de conciliaciones
*/

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
  APIInvoker.invokeGET('/conciliaciones/'+txtBuscar, response => {
    dispatch(refreshListConciliacion(response))
  })
}
//Actualizar el listado de conciliacion
export const refreshListConciliacion = (resp) =>(dispatch,getState) => {
  //si no existe resp
  if(resp == null){
    APIInvoker.invokeGET('/conciliaciones', response => {
      console.log("en actions status ==>"+response.codigo)
      if(response.codigo==404){
        alert(response.mensaje)
      }else{
        if(Array.isArray(response) == true){
          dispatch(verConciliaciones(response))
        }else{
          dispatch(verConciliaciones([response]))
        }
      }
    })
  }else{
    //si resp es solo un numero
    if(Number.isInteger(parseInt(resp))){
      APIInvoker.invokeGET('/conciliaciones/'+resp, response => {
        if(Array.isArray(response) == true){
          dispatch(verConciliaciones(response))
        }else{
          dispatch(verConciliaciones([response]))
        }
      })
    }else{
      //si resp es un response
      if(Array.isArray(resp) == true){
        dispatch(verConciliaciones(resp))
      }else{
        dispatch(verConciliaciones([resp]))
      }
    }
  }
}
//Enviar la accion de ver conciliaciones al Reducer STORE
const verConciliaciones = (res) =>({
  type : CARGAR_CONCILIACIONES,
  lista : res
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
  let id_conciliacion = getState().conciliacionFormReducer.codigo
  let conciliacion_salvar = {
    codigo :  getState().conciliacionFormReducer.codigo,
    nombre : getState().conciliacionFormReducer.nombre,
    shell : getState().conciliacionFormReducer.shell,
    descripcion : getState().conciliacionFormReducer.descripcion
  }
  if(id_conciliacion == 0 || id_conciliacion == undefined){
    //Si es un registro nuevo
    APIInvoker.invokePOST('/conciliaciones',conciliacion_salvar,response =>{
      dispatch(refreshListConciliacion(),limpiarFormConciliacion())
    },error =>{
      console.log('No se ha podido crear la conciliacion')
    })
  }else{
    //Si es actualizar un existente
    APIInvoker.invokePUT('/conciliaciones',conciliacion_salvar,response =>{
      dispatch(limpiarFormConciliacion(),browserHistory.push('/conciliaciones'))
    },error =>{
      console.log('No se ha podido actualizar la conciliacion')
    })
  }
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
  let idconciliacion = getState().conciliacionFormReducer.codigo
  APIInvoker.invokeDELETE('/conciliaciones/'+idconciliacion, response => {
    if(response.status == 200){
      dispatch(limpiarFormConciliacion(),browserHistory.push('/conciliaciones'))
    }
  },error =>{
    dispatch(limpiarFormConciliacion(),browserHistory.push('/conciliaciones'))
  })
}


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
  APIInvoker.invokeGET('/escenarios/'+txtBuscar, response => {
    dispatch(refreshListEscenario(response))
  })
}
//Actualizar el listado de escenario
export const refreshListEscenario = (resp) =>(dispatch,getState) => {
  //si no existe resp
  if(resp == null){
    APIInvoker.invokeGET('/escenarios', response => {
      if(Array.isArray(response) == true){
        dispatch(verEscenarios(response))
      }else{
        dispatch(verEscenarios([response]))
      }
    })
  }else{
    //si resp es solo un numero
    if(Number.isInteger(parseInt(resp))){
      APIInvoker.invokeGET('/escenarios/'+resp, response => {
        if(Array.isArray(response) == true){
          dispatch(verEscenarios(response))
        }else{
          dispatch(verEscenarios([response]))
        }
      })
    }else{
      //si resp es un response
      if(Array.isArray(resp) == true){
        dispatch(verEscenarios(resp))
      }else{
        dispatch(verEscenarios([resp]))
      }
    }
  }
}
//Enviar la accion de ver escenarios al Reducer STORE
const verEscenarios = (res) =>({
  type : CARGAR_ESCENARIOS,
  lista : res
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
    //Si es un registro nuevo
    let escenario_salvar = {
      nombre : getState().escenarioFormReducer.nombre,
      impacto : getState().escenarioFormReducer.impacto
    }
    APIInvoker.invokePOST('/escenarios',escenario_salvar,response =>{
      dispatch(refreshListEscenario(),limpiarFormEscenario())
    },error =>{
      console.log('No se ha podido crear la escenario')
    })
  }else{
    //Si es actualizar un existente
    let escenario_salvar = {
      id :  getState().escenarioFormReducer.id,
      nombre : getState().escenarioFormReducer.nombre,
      impacto : getState().escenarioFormReducer.impacto
    }
    APIInvoker.invokePUT('/escenarios/'+id_escenario,escenario_salvar,response =>{
      dispatch(limpiarFormEscenario(),browserHistory.push('/politicas'))
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
    if(response.status == 200){
      dispatch(limpiarFormEscenario(),browserHistory.push('/escenarios'))
    }
  },error =>{
    dispatch(limpiarFormEscenario(),browserHistory.push('/escenarios'))
  })
}
