import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LIMPIAR_FORM_LOGIN,
    SHOW_MODAL,
    HIDE_MODAL,
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
    CARGAR_CONCILIACIONES_ESCENARIO,
    CARGA_CONCILIACIONES,
    UPDATE_VALUE_COMBO_CONCILIACIONES,
    CARGA_CONCILIACIONES_RESULTADO,
    UPDATE_VALUE_COMBO_CONCILIACIONES_RESULTADO,
    UPDATE_EJECUTAR_CONCILIACIONES_FORM_REQUEST,
    ACTUALIZA_PAGINADOR_INDICADORES,
    CARGAR_INDICADORES,
    UPDATE_INDICADORES_FORM_REQUEST,
    LIMPIAR_FORM_INDICADOR,
    CARGAR_INDICADOR_FORM,
    IR_PAGINA_INDICADORES,
    UPDATE_ESCENARIO_EN_INDICADORES,
    UPDATE_ESCENARIO_EN_QUERYS,
    CARGA_ESCENARIOS_EN_INDICADORES,
    UPDATE_RESULTADO_EN_INDICADORES,
    CARGA_PARAMETROS_EN_INDICADORES,
    UPDATE_FORMULA,
    ACTUALIZA_PAGINADOR_PARAMETROS,
    CARGAR_PARAMETROS,
    UPDATE_PARAMETROS_FORM_REQUEST,
    LIMPIAR_FORM_PARAMETRO,
    CARGAR_PARAMETRO_FORM,
    IR_PAGINA_PARAMETROS,
    UPDATE_ESCENARIO_EN_PARAMETROS,
    CARGA_CONCILIACIONES_EN_PARAMETROS,
    CARGAR_COMBO_IMPACTOS,
    LIMPIAR_CONCILIACION_SELECCIONADA,
    CARGAR_QUERYS,
    UPDATE_QUERYS_FORM_REQUEST,
    CARGAR_QUERY_FORM,
    LIMPIAR_FORM_QUERY,
    UPDATE_CONCILIACION_EN_QUERYS,
    ACTUALIZA_PAGINADOR_QUERYS,
    IR_PAGINA_QUERYS,
    CARGA_ESCENARIOS_EN_QUERYS,
    ASIGNAR_ESCENARIO_SELECCIONADO,
    LIMPIAR_ESCENARIO_SELECCIONADO,
    CARGAR_CONCILIACIONES_QUERY,
    UPDATE_QUERYS_APROB_FORM_REQUEST,
    UPD_LINK_RESULTADOS,
    CARGAR_RESULTADOS,
    UPDATE_RESULTADOS_FORM_REQUEST,
    CARGAR_RESULTADOS_FORM,
    LIMPIAR_FORM_RESULTADO,
    UPDATE_CONCILIACION_EN_RESULTADOS,
    ACTUALIZA_PAGINADOR_RESULTADOS,
    IR_PAGINA_RESULTADOS,
    CARGAR_CONCILIACIONES_RESULTADO,
    CARGAR_USUARIOS,
    CARGA_ROLES,
    SAVE_USUARIOS,
    UPDATE_USUARIOS_FORM_REQUEST,
    CARGAR_USUARIO_FORM,
    LIMPIAR_FORM_USUARIO,
    ELIMINAR_USUARIO,
    ACTUALIZA_PAGINADOR_USUARIOS,
    IR_PAGINA_USUARIOS,
    UPDATE_TIPO_EN_PARAMETROS,
    CARGAR_POLITICA_EN_CONCILIACION,
    UPDATE_CONCILIACION_ESCENARIO,
    UPDATE_PARAMETROS_ESCENARIO_FORM_REQUEST,
    CARGAR_CONCILIACION_FORM_2,
    UPDATE_ESCENARIO_QUERYS_FORM_REQUEST,
    UPDATE_PARAMETROS_CONCILIACION_FORM_REQUEST,
    CARGA_ESCENARIOS_EN_PARAMETROS
} from './const'

import React from 'react'
import APIInvoker from '../utils/APIInvoker'
import { browserHistory } from 'react-router'
import update from 'react-addons-update'
import config from '../../config'
import { ToastContainer, toast, dismiss } from 'react-toastify'
import IMsg from '../ejecucionModule/IMsg'
import CryptoJS from 'crypto-js'

var configuration = require('../../config');

/*
 * A C C I O N E S   D E L   C O M P O N E N T E  L O G I N  F O R M  ILogin
 */
export const updateLoginForm = (field, value) => (dispatch, getState) => {
    dispatch(updateLoginFormRequest(field, value))
}

export const loginRequest = () => (dispatch, getState) => {
      //Con json server
      if (getState().loginFormReducer.username == "" || getState().loginFormReducer.password == "") {
        toast.error("Campos vacíos, verifique", {
            position: toast.POSITION.BOTTOM_CENTER
        })
      }else{
        dispatch(mostrarModalLoad())
        APIInvoker.invokeGET('/parametros/returnSeed', responseS => {
          window.localStorage.setItem("seed", responseS.valor)
        })

        if (getState().loginFormReducer.dominio === "Claro"){
          APIInvoker.invokeGET('/parametros/findByAny?texto=LDAPClaro', responseClaro => {
            if (Array.isArray(responseClaro) == true){
              let credentials = {
                userName : getState().loginFormReducer.username,
                passWord : getState().loginFormReducer.password,
                domain : getState().loginFormReducer.dominio,
                ip : (responseClaro[0].tipo === "SEGURIDAD" ? decryptJS(responseClaro[0].valor) : responseClaro[0].valor),
                port : (responseClaro[1].tipo === "SEGURIDAD" ? decryptJS(responseClaro[1].valor) : responseClaro[1].valor),
                commonName : (responseClaro[2].tipo === "SEGURIDAD" ? decryptJS(responseClaro[2].valor) : responseClaro[2].valor),
                domainGroup : (responseClaro[3].tipo === "SEGURIDAD" ? decryptJS(responseClaro[3].valor) : responseClaro[3].valor),
                organization : (responseClaro[4].tipo === "SEGURIDAD" ? decryptJS(responseClaro[4].valor) : responseClaro[4].valor)
              }
              APIInvoker.invokePOST_Login('/usuarios/login', credentials, response => {
                if(response.ok){
                  dispatch(cerrarModalLoad())
                  window.localStorage.setItem("token",response.headers.get("authorization"))
                  //Obtiene el valor parametrizado del tiempo para cierre de sesion automático
                  APIInvoker.invokeGET('/parametros/findByAny?texto=V_tiempoExpiraSesion', responsetime => {
                      if (Array.isArray(responsetime) == true) {
                        window.localStorage.setItem("tiempoexpirasesion", (responsetime[0].tipo === "SEGURIDAD" ? decryptJS(responsetime[0].valor) : responsetime[0].valor))
                        response.json().then(function(result) {
                          //if result.userExist
                          if (result.id != undefined){
                            window.localStorage.setItem("userid", result.id)
                            window.localStorage.setItem("username", result.usuario)
                            window.localStorage.setItem("useremail", result.email)
                            window.localStorage.setItem("nombreUsuario", result.nombreUsuario)
                            //Roles SinRol - Consultor - Ejecutor - Administrador
                            if (result.roles.length > 0) {
                              window.localStorage.setItem("userrolname", result.roles[0].nombre)
                            }else{
                              window.localStorage.setItem("userrolname", "null")
                            }

                            window.location = '/admin';
                          }else{
                            //LLama modal para registrar User
                            dispatch(mostrarModalRegisterUser())
                          }
                        });
                      }
                  })
                }else{
                  dispatch(cerrarModalLoad())
                  toast.error("Nombre de usuario o contraseña incorrectos, verifique", {
                      position: toast.POSITION.BOTTOM_CENTER
                  })
                }
              }, error => {
                  dispatch(cerrarModalLoad())
                  toast.error("NO SE LOGUEO", {
                      position: toast.POSITION.BOTTOM_CENTER
                  })
              })
            }
          })
        }else{
          APIInvoker.invokeGET('/parametros/findByAny?texto=LDAPTelmex', responseTelmex => {
            if (Array.isArray(responseTelmex) == true){
              let credentials = {
                userName : getState().loginFormReducer.username,
                passWord : getState().loginFormReducer.password,
                domain : getState().loginFormReducer.dominio,
                ip : (responseTelmex[0].tipo === "SEGURIDAD" ? decryptJS(responseTelmex[0].valor) : responseTelmex[0].valor),
                port : (responseTelmex[1].tipo === "SEGURIDAD" ? decryptJS(responseTelmex[1].valor) : responseTelmex[1].valor),
                commonName : (responseTelmex[2].tipo === "SEGURIDAD" ? decryptJS(responseTelmex[2].valor) : responseTelmex[2].valor),
                domainGroup : (responseTelmex[3].tipo === "SEGURIDAD" ? decryptJS(responseTelmex[3].valor) : responseTelmex[3].valor),
                organization : (responseTelmex[4].tipo === "SEGURIDAD" ? decryptJS(responseTelmex[4].valor) : responseTelmex[4].valor)
              }
              APIInvoker.invokePOST_Login('/usuarios/login', credentials, response => {
                if(response.ok){
                  dispatch(cerrarModalLoad())
                  window.localStorage.setItem("token",response.headers.get("authorization"))
                  //Obtiene el valor parametrizado del tiempo para cierre de sesion automático
                  APIInvoker.invokeGET('/parametros/findByAny?texto=V_tiempoExpiraSesion', responsetime => {
                      if (Array.isArray(responsetime) == true) {
                        window.localStorage.setItem("tiempoexpirasesion", (responsetime[0].tipo === "SEGURIDAD" ? decryptJS(responsetime[0].valor) : responsetime[0].valor))
                        response.json().then(function(result) {
                          //if result.userExist
                          if (result.id != undefined){
                            window.localStorage.setItem("userid", result.id)
                            window.localStorage.setItem("username", result.usuario)
                            window.localStorage.setItem("useremail", result.email)
                            window.localStorage.setItem("nombreUsuario", result.nombreUsuario)
                            //Roles SinRol - Consultor - Ejecutor - Administrador
                            if (result.roles.length > 0) {
                              window.localStorage.setItem("userrolname", result.roles[0].nombre)
                            }else{
                              window.localStorage.setItem("userrolname", "null")
                            }

                            window.location = '/admin';
                          }else{
                            //LLama modal para registrar User
                            dispatch(mostrarModalRegisterUser())
                          }
                        });
                      }
                  })
                }else{
                  dispatch(cerrarModalLoad())
                  toast.error("Nombre de usuario o contraseña incorrectos, verifique", {
                      position: toast.POSITION.BOTTOM_CENTER
                  })
                }
              }, error => {
                dispatch(cerrarModalLoad())
                toast.error("NO SE LOGUEO", {
                    position: toast.POSITION.BOTTOM_CENTER
                })
              })
            }
          })
        }
      }
}

const updateLoginFormRequest = (field, value) => ({
    type: UPDATE_LOGIN_FORM_REQUEST,
    field: field,
    value: value
})

const loginFailForm = (loginMessage) => ({
    type: LOGIN_ERROR,
    loginMessage: loginMessage
})

export const limpiarFormLogin = () => ({
  type:LIMPIAR_FORM_LOGIN
})

export const mostrarModalLoad = () => (dispatch, getState) => {
    $('#modalLoad').modal('show')
}

export const cerrarModalLoad = () => (dispatch, getState) => {
    $('#modalLoad').modal('hide')
}

export const mostrarModalRegisterUser = () => (dispatch, getState) => {
    $('#modalRegisterUser').modal('show');
    dispatch(mostrarRegisterReducer())
}

const mostrarRegisterReducer = () => ({
    type: SHOW_MODAL
})

export const mostrarModal = (tipomensaje, mensaje) => (dispatch, getState) => {
    $('#modalMsg').modal('show');
    dispatch(mostrarModalReducer(tipomensaje, mensaje))
}

const mostrarModalReducer = (tipo, mensaje) => ({
    type: SHOW_MODAL,
    tipomensaje: tipo,
    mensaje: mensaje
})

export const ocultarModal = () => ({
    type: HIDE_MODAL
})

export const getLinkResultados = () => (dispatch, getState) => {
    APIInvoker.invokeGET('/parametros/findByAny?texto=V_Link Resultados', response => {
        if (Array.isArray(response) == true) {
            dispatch(extraerLinkResultados((response[0].tipo === "SEGURIDAD" ? decryptJS(response[0].valor) : response[0].valor)))
        }
    })
}

const extraerLinkResultados = (response) => ({
    type: UPD_LINK_RESULTADOS,
    value: response
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
    type: LOGIN_SUCCESS,
    profile: null
})

export const relogin = () => (dispatch, getState) => {
        //con json-server
        let token = window.localStorage.getItem("token")
        if (token == null) {
            dispatch(loginFail())
            localStorage.clear();
            browserHistory.push('/');
        } else {
            window.localStorage.setItem("token", window.localStorage.getItem("token"))
            window.localStorage.setItem("tiempoexpirasesion", window.localStorage.getItem("tiempoexpirasesion"))
            window.localStorage.setItem("userid", window.localStorage.getItem("userid"))
            window.localStorage.setItem("username", window.localStorage.getItem("username"))
            window.localStorage.setItem("useremail", window.localStorage.getItem("useremail"))
            window.localStorage.setItem("nombreUsuario", window.localStorage.getItem("nombreUsuario"))
            //Roles SinRol - Consultor - Ejecutor - Administrador
            //window.localStorage.setItem("userrol", window.localStorage.getItem("userrol"))
            window.localStorage.setItem("userrolname", window.localStorage.getItem("userrolname"))
            dispatch(loginSuccess({"username": window.localStorage.getItem("username")}))
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

//Funcion para encriptar dato
function encryptJS(dato) {
  let ciphertext = CryptoJS.AES.encrypt(dato, window.localStorage.getItem("seed")).toString()
  return ciphertext
}

//Funcion para desencriptar dato
function decryptJS(ciphertext) {
  let bytes = CryptoJS.AES.decrypt(ciphertext, window.localStorage.getItem("seed"))
  let dato = bytes.toString(CryptoJS.enc.Utf8)
  return dato
}

/*
 *  A C C I O N E S  D E  P O L I T I C A S
 *  para realizar todas las acciones necesarias del crud de políticas
 */
//Actualizar tecla por tecla el campo de texto del buscador
export const updateTextFindPolitica = (field, value) => (dispatch, getState) => {
    dispatch(updateTextPoliticaFindRequest(field, value))
}
//Enviar el texto del buscador al reducer store
const updateTextPoliticaFindRequest = (field, value) => ({
    type: UPDATE_FINDER,
    field: field,
    value: value
})

//Envia las variables al store
const actualizarPaginadorPoliticas = (array_paginador) => ({
    type: ACTUALIZA_PAGINADOR_POLITICAS,
    lista: array_paginador
})

//Actualizar el listado de politicas
export const refreshListPolitica = (resp) => (dispatch, getState) => {
    //Igual para jsonserver o API
    let objetoVacio = new Object()
    APIInvoker.invokeGET(`/politicas${resp ? '/'+resp : ''}`, response => {
        if(response.ok){
            dispatch(antesVerPoliticas(Array.isArray(response.body) ? response.body : [response.body]))
        }else{
            toast.error(response.description, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    })
}

const antesVerPoliticas = (resp) => (dispatch, getState) => {
    dispatch(verPoliticas(resp))
}
//Enviar la accion de ver politicas al Reducer STORE
const verPoliticas = (res) => ({
    type: CARGAR_POLITICAS,
    lista: res
})

// Una vez ingresado el nombre de la política
export const onNombreIngresado = (value) => (dispatch, getState) => {
    dispatch(updateFormPoliticasRequest("errorNombre", ''))
    //getState().politicaFormReducer.errorNombre = '';
APIInvoker.invokeGET('/politicas/findByAny?texto='+value, response => {
    if (response != undefined && response[0] != undefined && response[0].conciliaciones.length>0) {
        var existentes = response.filter((_politica)=>{
            return _politica.nombre.toUpperCase() == 'PO_'+value.toUpperCase();
        })
        if (existentes.length > 0){
            toast.error("La política que intenta crear ya existe", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            dispatch(updateFormPoliticasRequest("errorNombre", 'A'))
        } else {
            dispatch(updateFormPoliticasRequest("errorNombre", ''))
        }
    }
}, error=>{
    dispatch(updateFormPoliticasRequest("errorNombre", ''))
})
}


//Actualizar tecla por tecla los campos del formulario de politicas
export const updateFormPoliticas = (field, value) => (dispatch, getState) => {
    if (field == "nombre") {
        APIInvoker.invokeGET('/parametros/findByAny?texto=V_Prefijo para politicas', response => {
            if (response[0].valor != undefined) {
                let long_parametro = (response[0].tipo === "SEGURIDAD" ? decryptJS(response[0].valor) : response[0].valor).length;
                let long_value = value.length;
                if (long_value == long_parametro + 1) {
                    if (long_parametro >= long_value) {
                        if (value.substr(0, long_value).toUpperCase() != (response[0].tipo === "SEGURIDAD" ? decryptJS(response[0].valor) : response[0].valor).substr(0, long_value).toUpperCase()) {
                            //toast.error("El nombre de la política debe tener el prefijo - '" + response[0].valor.toUpperCase() + "'", {
                            //    position: toast.POSITION.BOTTOM_RIGHT
                            //})
                        }
                    } else {
                        if (value.substr(0, long_parametro).toUpperCase() != (response[0].tipo === "SEGURIDAD" ? decryptJS(response[0].valor) : response[0].valor).substr(0, long_parametro).toUpperCase()) {
                            //toast.error("El nombre de la política debe tener el prefijo - '" + response[0].valor.toUpperCase() + "'", {
                            //    position: toast.POSITION.BOTTOM_RIGHT
                            //})
                        }
                    }
                }
            }
        })
    }
    dispatch(updateFormPoliticasRequest(field, value))
}
//Enviar al reducer la tecla pulsada
const updateFormPoliticasRequest = (field, value) => ({
    type: UPDATE_POLITICAS_FORM_REQUEST,
    field: field,
    value: value
})

export const savePolitica = () => (dispatch, getState) => {
    let id_politica = getState().politicaFormReducer.id
    //Si es un registro nuevo
    //Verificar que el nombre tenga el prefijo para guardarlo
    APIInvoker.invokeGET('/parametros/findByAny?texto=V_Prefijo para politicas', responseval => {
        let politica_salvar = {
            id: getState().politicaFormReducer.id,
            nombre: (responseval[0].tipo === "SEGURIDAD" ? decryptJS(responseval[0].valor) : responseval[0].valor).toUpperCase() + getState().politicaFormReducer.nombre,
            descripcion: getState().politicaFormReducer.descripcion,
            objetivo: getState().politicaFormReducer.objetivo,
            fecha_creacion: '',
            fecha_actualizacion: '',
            username: window.localStorage.getItem("nombreUsuario")
        }
        if (responseval[0].valor != undefined) {
            let long_parametro = (responseval[0].tipo === "SEGURIDAD" ? decryptJS(responseval[0].valor) : responseval[0].valor).length;
            if (id_politica == 0 || id_politica == undefined) {
                APIInvoker.invokePOST('/politicas', politica_salvar, response => {
                    if (response.ok) {
                        $('#modalAdd').modal('hide');
                        dispatch(mostrarModal("alert alert-success", response.description))
                        dispatch(limpiarFormPolitica())
                        dispatch(refreshListPolitica())
                        browserHistory.push('/politicas')
                    } else {
                        toast.error(response.description, {
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                        dispatch(refreshListPolitica())
                    }
                }, error => {
                    console.log("No se ha podido crear la politica con id" + id_politica)
                })
            } else {
                    let politica_salvar = {
                        id: getState().politicaFormReducer.id,
                        nombre: (responseval[0].tipo === "SEGURIDAD" ? decryptJS(responseval[0].valor) : responseval[0].valor).toUpperCase() + getState().politicaFormReducer.nombre,
                        descripcion: getState().politicaFormReducer.descripcion,
                        objetivo: getState().politicaFormReducer.objetivo,
                        fecha_creacion: '',
                        fecha_actualizacion: '',
                        username: window.localStorage.getItem("nombreUsuario")
                    }
                    //console.log('salvando...upd',politica_salvar)
                    APIInvoker.invokePUT('/politicas', politica_salvar, response => {
                        if(response.ok){
                            dispatch(mostrarModal("alert alert-success", response.description))
                            dispatch(limpiarFormPolitica())
                            dispatch(refreshListPolitica())
                            browserHistory.push('/politicas')
                        }else{
                            toast.error(response.description, {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                        }
                    }, error => {
                        console.log("No se ha podido actualizar la politica")
                    })

            }
        }
    })
}


//Funcion para limpiar los campos del formulario de Politicas
export const limpiarFormPolitica = () => ({
    type: LIMPIAR_FORM_POLITICA
})

//Funcion para cargar la politica en el formulario
export const cargarPolitica = (idpolitica) => (dispatch, getState) => {
    APIInvoker.invokeGET('/politicas/' + idpolitica, response => {
        if(response.ok){
            if (Array.isArray(response.body) == true) {
                if (response.body[0].id != undefined) {
                    dispatch(cargarPoliticaEnForm(response.body))
                } else {
                    toast.error("No se pudo cargar la politica en el formulario", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    console.log("Error " + response.body[0].codigo + " : " + response.body[0].mensaje + " " + response.body[0].descripcion)
                }
            } else {
                if (response.body.id != undefined) {
                    dispatch(cargarPoliticaEnForm([response.body]))
                } else {
                    toast.error("No se pudo cargar la politica en el formulario", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    console.log("Error " + response.body.codigo + " : " + response.body.mensaje + " " + response.body.descripcion)
                }
            }
        }else{
            alert('d')
            toast.error(response.description, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }, error => { })
}

//Enviar la acción de cargar la politica al reducer
const cargarPoliticaEnForm = (politica) => ({
    type: CARGAR_POLITICA_FORM,
    politica: politica
})

//Funcion que elimina una politica
export const borrarPolitica = () => (dispatch, getState) => {
    let idpolitica = getState().politicaFormReducer.id
    let nompolitica = getState().politicaFormReducer.nombre
    APIInvoker.invokeDELETE('/politicas/' + idpolitica + '/' + window.localStorage.getItem("nombreUsuario"), null, response => {
        if(response.ok){
            dispatch(mostrarModal("alert alert-success", "Se eliminó la política " + nompolitica))
            dispatch(limpiarFormPolitica(),browserHistory.push('/politicas'))
        }else{
            toast.error(response.description, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }, error => {})
}

//Funcion de cambio de pagina
export const moverPaginaPoliticas = (pagina) => (dispatch, getState) => {
    let NumPagsTotales = getState().politicaReducer.paginador.length
    if (pagina > 0 && pagina <= NumPagsTotales) {
        dispatch(irAPaginaPoliticas(pagina))
        dispatch(refreshListPolitica())
    }
}

const irAPaginaPoliticas = (pagina) => ({
    type: IR_PAGINA_POLITICAS,
    pagina: pagina
})

/*
 *  A C C I O N E S  D E  C O N C I L I A C I O N E S
 *  para realizar todas las acciones necesarias del crud de conciliaciones
 */

// Cuando se modifica una política
 export const cambioPoliticaConciliacion = (_politica) => (dispatch, getState)=>{
     dispatch(updPoliticaenConciliacion(_politica))
     if (getState().conciliacionReducer.politica != "" && getState().conciliacionReducer.politica != "0"){
        APIInvoker.invokeGET('/conciliaciones/politica/' + getState().conciliacionReducer.politica, response => {
            if (Array.isArray(response) == true) {
                //if (response[0].id != undefined) {
                    dispatch(verConciliaciones(response))
                //}
                /*else {
                    console.log("Error : " + response[0].codigo + " Mensaje: " + response[0].mensaje + ": " + response[0].descripcion)
                    toast.warn("No se encuentran conciliaciones para politica"+ getState().conciliacionReducer.politica, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }*/
            } else {
                if (response.id != undefined) {
                    dispatch(verConciliaciones(response))
                } else {
                    console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                    toast.warn("No se encuentran conciliaciones para la politica", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            }
        })
      }
      else{
        dispatch(refreshListConciliacion())
      }
 }

 const updPoliticaenConciliacion = (_politica) =>({
     type: CARGAR_POLITICA_EN_CONCILIACION,
     value: _politica
 })

//Funcion que carga el combo de politicas
export const cargarComboPoliticas = (filter, callback) => (dispatch, getState) => {
    APIInvoker.invokeGET(`/politicas/findPoliticasSinConciliacion?name=${filter}`, response => {
        if (Array.isArray(response)) {
            if (response[0].id != undefined) {
                dispatch(cargarPoliticas(response))
                let options = response.map(x => {return {value: x.id, label: x.nombre} })
                console.log("options ", options)
                callback(options)
            } else {
                toast.info("No se encuentran politicas sin conciliaciones asociadas", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
        }else if(response.codigo == 404){
            callback( [])
        }
    })
}
//Envia resultado para llenar el combo a Reducer
const cargarPoliticas = (arrayPoliticas) => ({
    type: CARGA_POLITICAS,
    lista: arrayPoliticas
})


//Actualizar tecla por tecla el campo de texto del buscador
export const updateTextFindConciliacion = (field, value) => (dispatch, getState) => {
    dispatch(updateTextConciliacionFindRequest(field, value))
}
//Enviar el texto del buscador al reducer store
const updateTextConciliacionFindRequest = (field, value) => ({
    type: UPDATE_FINDER,
    field: field,
    value: value
})

//Realizar la búsqueda
export const findTextConciliacion = () => (dispatch, getState) => {
    let txtBuscar = getState().conciliacionReducer.textoBuscarConciliacion
    if (txtBuscar != '') {
        APIInvoker.invokeGET('/conciliaciones/findByAny?texto=' + txtBuscar, response => {
            if (Array.isArray(response) == true) {
                if (response[0].id != undefined) {
                    dispatch(verConciliaciones(response))
                } else {
                    console.log("Error : " + response[0].codigo + " Mensaje: " + response[0].mensaje + ": " + response[0].descripcion)
                    toast.warn("No se encuentran conciliaciones que satisfagan el criterio de búsqueda", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            } else {
                if (response.id != undefined) {
                    dispatch(verConciliaciones(response))
                } else {
                    console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                    toast.warn("No se encuentran conciliaciones que satisfagan el criterio de búsqueda", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            }
        })
    } else {
        dispatch(moverPaginaConciliaciones(1));
    }
}

//Recalcular el paginador de conciliaciones
export const calculaPaginadorConciliaciones = () => (dispatch, getState) => {
    let numregs = 0
    //Obtener el numero total de registros antes de filtrar
    APIInvoker.invokeGET('/conciliaciones/count', response => {
        if (!isNaN(response)) {
            numregs = response
            //Recalcula el paginador
            let totRegistros = numregs
            let regPagina = getState().conciliacionReducer.registrosPorPagina
            let totPaginas = Math.ceil(totRegistros / regPagina)
            let array_paginador = new Array()
            let offset = 0
            let regfin = 0
            //console.log("TotRegistros ==")
            //console.log(totRegistros)
            for (let i = 1; i <= totPaginas; i++) {
                regfin = offset + regPagina - 1
                array_paginador.push({
                    "id": i,
                    "offset": offset
                })
                offset = regfin + 1
            }
            //console.log("Variable de paginador ==>")
            //console.log(array_paginador)
            //preparar variable para Enviar
            let update_paginador = {
                totalRegistros: numregs,
                registrosPorPagina: regPagina,
                paginador: array_paginador
            }
            dispatch(actualizarPaginadorConciliaciones(update_paginador))
        } else {
            console.log("Conteo de Registros de conciliaciones no válido")
        }
    })
}
//Envia las variables al store
const actualizarPaginadorConciliaciones = (array_paginador) => ({
    type: ACTUALIZA_PAGINADOR_CONCILIACIONES,
    lista: array_paginador
})

//Actualizar el listado de conciliacion
export const refreshListConciliacion = (resp) => (dispatch, getState) => {
    //si no existe resp
    let objetoVacio = new Object()
    if (resp == null) {
        let regInicial = 0
        let pagActual = getState().conciliacionReducer.paginaActual
        if (getState().conciliacionReducer.paginador.length > 0) {
            //console.log("Pagina actual : "+pagActual)
            regInicial = getState().conciliacionReducer.paginador[pagActual - 1].offset
        }
        let regPagina = getState().conciliacionReducer.registrosPorPagina
        APIInvoker.invokeGET('/conciliaciones', response1 => {
            if (Array.isArray(response1) == true) {
                if (response1[0].id != undefined) {
                    dispatch(antesVerConciliaciones(response1))
                } else {
                    console.log("Error : " + response1[0].codigo + " Mensaje: " + response1[0].mensaje + ": " + response1[0].descripcion)
                    dispatch(antesVerConciliaciones(objetoVacio))
                }
            } else {
                console.log("Error : " + response1.codigo + " Mensaje: " + response1.mensaje + ": " + response1.descripcion)
                if (response1.codigo == 404) {
                    dispatch(antesVerConciliaciones(objetoVacio))
                } else {
                    dispatch(antesVerConciliaciones(objetoVacio))
                    console.log(response1)
                }
            }
        })
    } else {
        //si resp es solo un numero
        if (Number.isInteger(parseInt(resp))) {
            APIInvoker.invokeGET('/conciliaciones/' + resp, response => {
                if (Array.isArray(response) == true) {
                    if (response[0].id != undefined) {
                        dispatch(antesVerConciliaciones(response))
                    } else {
                        dispatch(antesVerConciliaciones(objetoVacio))
                        console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                    }
                } else {
                    if (response.id != undefined) {
                        dispatch(antesVerConciliaciones([response]))
                    } else {
                        dispatch(antesVerConciliaciones(objetoVacio))
                        console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                    }
                }
            })
        } else {
            //si resp es un response
            if (Array.isArray(resp) == true) {
                if (resp[0].id != undefined) {
                    dispatch(antesVerConciliaciones(resp))
                } else {
                    dispatch(antesVerConciliaciones(objetoVacio))
                    console.log("Error : " + resp.codigo + " Mensaje: " + resp.mensaje)
                }
            } else {
                if (resp.id != undefined) {
                    dispatch(antesVerConciliaciones([resp]))
                } else {
                    dispatch(antesVerConciliaciones(objetoVacio))
                    console.log("Error : " + resp.codigo + " Mensaje: " + resp.mensaje)
                }
            }
        }
    }
}
//Calcular el paginador antes de mostrar el listado
const antesVerConciliaciones = (resp) => (dispatch, getState) => {
    //dispatch(calculaPaginadorConciliaciones())
    dispatch(verConciliaciones(resp))
}
//Enviar la accion de ver conciliaciones al Reducer STORE
const verConciliaciones = (res) => ({
    type: CARGAR_CONCILIACIONES,
    lista: res
})

//Cargar el id politica en reducer conciliaciones
export const updPolitica = (idpolitica) => (dispatch, getState) => {
    APIInvoker.invokeGET('/politicas/' + idpolitica, response => {
        if(response.ok){
            dispatch(updPoliticaReducerConciliacion(response.body))
        }else{
            dispatch(updPoliticaReducerConciliacion({
                "id": 0
            }))
        }
    }, error => {
        console.log('No se pudo cargar las Propiedades de la politica ' + idpolitica + ' en conciliaciones listar')
    })
}
const updPoliticaReducerConciliacion = (objPolitica) => ({
    type: UPDATE_POLITICA_EN_CONCILIACIONES,
    value: objPolitica
})

//Actualizar tecla por tecla los campos del formulario de conciliaciones
export const updateFormConciliaciones = (field, value) => (dispatch, getState) => {
    if (field == "nombre") {
        APIInvoker.invokeGET('/parametros/findByAny?texto=V_Prefijo para conciliaciones', response => {
            if (response[0].valor != undefined) {
                let long_parametro = (response[0].tipo === "SEGURIDAD" ? decryptJS(response[0].valor) : response[0].valor).length;
                let long_value = value.length;
                if (long_value == long_parametro + 1) {
                    if (long_parametro >= long_value) {
                        if (value.substr(0, long_value).toUpperCase() != (response[0].tipo === "SEGURIDAD" ? decryptJS(response[0].valor) : response[0].valor).substr(0, long_value).toUpperCase()) {
                            //toast.error("El nombre de la conciliación debe tener el prefijo - '" + response[0].valor.toUpperCase() + "'", {
                            //    position: toast.POSITION.BOTTOM_RIGHT
                            //})
                        }
                    } else {
                        if (value.substr(0, long_parametro).toUpperCase() != (response[0].tipo === "SEGURIDAD" ? decryptJS(response[0].valor) : response[0].valor).substr(0, long_parametro).toUpperCase()) {
                            //toast.error("El nombre de la conciliación debe tener el prefijo - '" + response[0].valor.toUpperCase() + "'", {
                            //    position: toast.POSITION.BOTTOM_RIGHT
                            //})
                        }
                    }
                }
            }
        })
    }
    dispatch(updateFormConciliacionesRequest(field, value))
}
//Enviar al reducer la tecla pulsada
const updateFormConciliacionesRequest = (field, value) => ({
    type: UPDATE_CONCILIACIONES_FORM_REQUEST,
    field: field,
    value: value
})

//Funcion para guardar o actualizar la conciliacion
export const saveConciliacion = () => (dispatch, getState) => {
    let id_conciliacion = getState().conciliacionFormReducer.id
    let email = getState().conciliacionFormReducer.emailasignado
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(email)) {
        APIInvoker.invokeGET('/parametros/findByAny?texto=V_Prefijo para conciliaciones', responseval => {
            if (responseval[0].valor != undefined) {
                let long_parametro = decryptJS(responseval[0].valor).length;
                if (id_conciliacion == 0 || id_conciliacion == undefined) {
                    //Si es un registro nuevo
                    let conciliacion_salvar = {
                        id: getState().conciliacionFormReducer.id,
                        nombre: decryptJS(responseval[0].valor).toUpperCase() + getState().conciliacionFormReducer.nombre,
                        descripcion: getState().conciliacionFormReducer.descripcion,
                        usuarioAsignado: getState().conciliacionFormReducer.emailasignado,
                        requiereAprobacion: getState().conciliacionFormReducer.requiereAprobacion,
                        idPolitica: getState().conciliacionReducer.politica.id,
                        paquete: getState().conciliacionFormReducer.webservice,
                        tablaDestino: getState().conciliacionFormReducer.tablaDestino,
                        username: window.localStorage.getItem("nombreUsuario")
                    }
                    let id_grabado = 0
                    APIInvoker.invokePOST('/conciliaciones', conciliacion_salvar, response => {
                        if(response.ok){
                            id_grabado = response.id
                            $('#modalAdd').modal('hide');
                            dispatch(mostrarModal("alert alert-success", response.description))
                            dispatch(antesLimpiarFormConciliacion())
                            dispatch(limpiarFormConciliacion())
                        }else{
                            toast.error(response.description, {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                        }
                    }, error => {
                        console.log('No se ha podido crear la conciliacion')
                    })
                    //dispatch(antesLimpiarFormConciliacion())
                } else {
                    //Si es un registro existente
                    let idPoliticaGrabar = 0
                    let nombrePoliticaGrabar = "Ninguna"
                    if (getState().conciliacionReducer.politica.id == 0) {
                        idPoliticaGrabar = getState().conciliacionFormReducer.idPolitica
                        nombrePoliticaGrabar = getState().conciliacionFormReducer.nombrePolitica
                    } else {
                        idPoliticaGrabar = getState().conciliacionReducer.politica.id
                        nombrePoliticaGrabar = getState().conciliacionReducer.politica.nombre
                    }
                    let conciliacion_salvar = {
                        id: getState().conciliacionFormReducer.id,
                        nombre: decryptJS(responseval[0].valor).toUpperCase() + getState().conciliacionFormReducer.nombre,
                        descripcion: getState().conciliacionFormReducer.descripcion,
                        usuarioAsignado: getState().conciliacionFormReducer.emailasignado,
                        requiereAprobacion: getState().conciliacionFormReducer.requiereAprobacion,
                        idPolitica: idPoliticaGrabar,
                        nombrePolitica: nombrePoliticaGrabar,
                        paquete: getState().conciliacionFormReducer.webservice,
                        tablaDestino: getState().conciliacionFormReducer.tablaDestino,
                        username: window.localStorage.getItem("nombreUsuario")
                    }
                    APIInvoker.invokePUT('/conciliaciones', conciliacion_salvar, response => {
                        if(response.ok){
                            dispatch(limpiarFormConciliacion())
                            dispatch(refreshListConciliacion())
                            browserHistory.push('/conciliaciones')
                            dispatch(mostrarModal("alert alert-success", response.description))
                        }else{
                            toast.error(response.description, {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                        }
                    }, error => {
                        console.log('No se ha podido actualizar la conciliacion')
                    })
                }
            }
        })
    } else {
        toast.error("No ha digitado un correo válido", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }
}

//Funcion que vuelve a cargar el combo de politicas al limpiar el formulario de conciliaciones
export const antesLimpiarFormConciliacion = () => (dispatch, getState) => {
    dispatch(cargarComboPoliticas())
    dispatch(refreshListConciliacion())
    //dispatch(limpiarFormConciliacion())
}

//Funcion para limpiar los campos del formulario de Conciliaciones
export const limpiarFormConciliacion = () => ({
    type: LIMPIAR_FORM_CONCILIACION
})

//Funcion para cargar la conciliacion en el formulario
export const cargarConciliacion = (idconciliacion) => (dispatch, getState) => {
    APIInvoker.invokeGET('/conciliaciones/' + idconciliacion, response => {
        if (Array.isArray(response) == true) {
            //console.log("conciliacion traida al editar conciliaicion ===>>")
            //console.log(response)
            dispatch(cargarConciliacionEnForm(response))
            dispatch(cargarConciliacion2(response))
        } else {
            dispatch(cargarConciliacionEnForm([response]))
            dispatch(cargarConciliacion2([response]))
        }
    }, error => {
        console.log('No se pudo actualizar los campos')
    })
}
//Enviar la acción de cargar la conciliacion al reducer
const cargarConciliacionEnForm = (conciliacion) => ({
    type: CARGAR_CONCILIACION_FORM,
    conciliacion: conciliacion
})

const cargarConciliacion2 = (conciliacion) => ({
    type: CARGAR_CONCILIACION_FORM_2,
    conciliacion: conciliacion
})

//Funcion que elimina una conciliacion
export const borrarConciliacion = () => (dispatch, getState) => {
    let idconciliacion = getState().conciliacionFormReducer.id
    let nomconciliacion = getState().conciliacionFormReducer.nombre
    APIInvoker.invokeDELETE('/conciliaciones/' + idconciliacion + '/' + window.localStorage.getItem("nombreUsuario"), null, response => {
        if(response.ok){
            dispatch(
                limpiarFormConciliacion(),
                mostrarModal("alert alert-success", response.description)
            )
            dispatch(
                moverPaginaConciliaciones(1),
                browserHistory.push('/conciliaciones')
            )
        }else{
            toast.error(response.description, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }, error => {})
}

//Funcion de cambio de pagina
export const moverPaginaConciliaciones = (pagina) => (dispatch, getState) => {
    let NumPagsTotales = getState().conciliacionReducer.paginador.length
    if (pagina > 0 && pagina <= NumPagsTotales) {
        dispatch(irAPaginaConciliaciones(pagina))
        dispatch(refreshListConciliacion())
    }
}
const irAPaginaConciliaciones = (pagina) => ({
    type: IR_PAGINA_CONCILIACIONES,
    pagina: pagina
})

/*
 *  A C C I O N E S  D E  E S C E N A R I O S
 *  para realizar todas las acciones necesarias del crud de escenarios
 */

//Actualizar tecla por tecla el campo de texto del buscador
export const updateTextFindEscenario = (field, value) => (dispatch, getState) => {
    dispatch(updateTextEscenarioFindRequest(field, value))
}
//Enviar el texto del buscador al reducer store
const updateTextEscenarioFindRequest = (field, value) => ({
    type: UPDATE_FINDER,
    field: field,
    value: value
})
//Realizar la búsqueda
export const findTextEscenario = () => (dispatch, getState) => {
    let txtBuscar = getState().escenarioReducer.textoBuscarEscenario
    if (txtBuscar != '') {
        APIInvoker.invokeGET('/escenarios/findByAny?texto=' + txtBuscar, response => {
            if (Array.isArray(response) == true) {
                if (response[0].id != undefined) {
                    dispatch(verEscenarios(response))
                } else {
                    toast.warn("No se encuentran escenarios que cumplan con el criterio de búsqueda", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    console.log("Error : " + response[0].codigo + " Mensaje: " + response[0].mensaje + ": " + response[0].descripcion)
                }
            } else {
                if (response.id != undefined) {
                    dispatch(verEscenarios(response))
                } else {
                    console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                    toast.warn("No se encuentran escenarios que cumplan con el criterio de búsqueda", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            }
        })
    } else {
        dispatch(moverPaginaEscenarios(1));
    }
}

//Recalcular el paginador de escenarios
export const calculaPaginadorEscenarios = () => (dispatch, getState) => {
    let numregs = 0
    //Obtener el numero total de registros antes de filtrar
    APIInvoker.invokeGET('/escenarios/count', response => {
        if (!isNaN(response)) {
            numregs = response
            //Recalcula el paginador
            let totRegistros = numregs
            let regPagina = getState().escenarioReducer.registrosPorPagina
            let totPaginas = Math.ceil(totRegistros / regPagina)
            let array_paginador = new Array()
            let offset = 0
            let regfin = 0
            //console.log("TotRegistros ==")
            //console.log(totRegistros)
            for (let i = 1; i <= totPaginas; i++) {
                regfin = offset + regPagina - 1
                array_paginador.push({
                    "id": i,
                    "offset": offset
                })
                offset = regfin + 1
            }
            //console.log("Variable de paginador ==>")
            //console.log(array_paginador)
            //preparar variable para Enviar
            let update_paginador = {
                totalRegistros: numregs,
                registrosPorPagina: regPagina,
                paginador: array_paginador
            }
            dispatch(actualizarPaginadorEscenarios(update_paginador))
        } else {
            console.log("Conteo de Registros de escenarios no válido")
        }
    })
}
//Envia las variables al store
const actualizarPaginadorEscenarios = (array_paginador) => ({
    type: ACTUALIZA_PAGINADOR_ESCENARIOS,
    lista: array_paginador
})

//Actualizar el listado de escenario
export const refreshListEscenario = (resp) => (dispatch, getState) => {
    //console.log("EJECUTA REFRESH ESCENARIO")
    let objetoVacio = new Object()
    if (resp != undefined) {
        APIInvoker.invokeGET('/escenarios/' + resp, response => {
            if (response.id != undefined) {
                dispatch(verEscenarios([response]))
            } else {
                console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                dispatch(antesVerEscenarios(objetoVacio))
            }
        })
    } else {
        let conciliacionActual = getState().escenarioReducer.conciliacion
        if (conciliacionActual != 0) {
            APIInvoker.invokeGET('/conciliaciones/' + conciliacionActual, response => {
                if (response.id != undefined) {
                    //console.log("Detecta conciliacionActual ==>>")
                    //console.log(response.escenarios)
                    dispatch(antesVerEscenarios(response.escenarios))
                } else {
                    console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                    dispatch(antesVerEscenarios(objetoVacio))
                }
            })
        } else {
            //si no existe resp
            let regInicial = 0
            let pagActual = getState().escenarioReducer.paginaActual
            if (getState().escenarioReducer.paginador.length > 0) {
                regInicial = getState().escenarioReducer.paginador[pagActual - 1].offset
            }
            let regPagina = getState().escenarioReducer.registrosPorPagina
            APIInvoker.invokeGET('/escenarios', response => {
                if (Array.isArray(response)) {
                    if (response[0].id != undefined) {
                        dispatch(antesVerEscenarios(response))
                    } else {
                        console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                        dispatch(antesVerEscenarios(objetoVacio))
                    }
                } else {
                    //console.log("****** ******Como es el response ::")
                    //console.log(response)
                    if (response.codigo == 404) {
                        dispatch(antesVerEscenarios(objetoVacio))
                    }
                }
            })
        }
    }
}

const antesVerEscenarios = (resp) => (dispatch, getState) => {
    //dispatch(calculaPaginadorEscenarios()),
    dispatch(verEscenarios(resp))
}
//Enviar la accion de ver escenarios al Reducer STORE
const verEscenarios = (res) => ({
    type: CARGAR_ESCENARIOS,
    lista: res
})

//Cargar el id conciliacion en el reducer de escenarios
export const updConciliacion = (idconciliacion) => (dispatch, getState) => {
    APIInvoker.invokeGET('/conciliaciones/' + idconciliacion, response => {
        if (response.id != undefined) {
            dispatch(updConciliacionReducerEscenario(response.id))
        } else {
            console.log('No se encuentra la conciliacion')
            dispatch(updConciliacionReducerEscenario(0))
        }
        dispatch(refreshListEscenario())
    }, error => {
        console.log('No se pudo cargar las Propiedades de la conciliacion ' + idconciliacion + ' en escenarios listar')
    })
}

const updConciliacionReducerEscenario = (objConciliacion) => ({
    type: UPDATE_CONCILIACION_EN_ESCENARIOS,
    value: objConciliacion
})

export const updateConciliacion = (idConciliacion, nombreConciliacion) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_CONCILIACION_ESCENARIO,
        idConciliacion: idConciliacion,
        nombreConciliacion: nombreConciliacion
    })
}

//Actualizar tecla por tecla los campos del formulario de escenarios
export const updateFormEscenarios = (field, value) => (dispatch, getState) => {
    if (field == "nombre") {
        APIInvoker.invokeGET('/parametros/findByAny?texto=V_Prefijo para escenarios', response => {
            if (response[0].valor != undefined) {
                let long_parametro = (response[0].tipo === "SEGURIDAD" ? decryptJS(response[0].valor) : response[0].valor).length;
                let long_value = value.length;
                if (long_value == long_parametro + 1) {
                    if (long_parametro >= long_value) {
                        if (value.substr(0, long_value).toUpperCase() != (response[0].tipo === "SEGURIDAD" ? decryptJS(response[0].valor) : response[0].valor).substr(0, long_value).toUpperCase()) {
                            //toast.error("El nombre del escenario debe tener el prefijo -'" + response[0].valor.toUpperCase() + "'", {
                            //    position: toast.POSITION.BOTTOM_RIGHT
                            //})
                        }
                    } else {
                        if (value.substr(0, long_parametro).toUpperCase() != (response[0].tipo === "SEGURIDAD" ? decryptJS(response[0].valor) : response[0].valor).substr(0, long_parametro).toUpperCase()) {
                            //toast.error("El nombre del escenario debe tener el prefijo -'" + response[0].valor.toUpperCase() + "'", {
                            //    position: toast.POSITION.BOTTOM_RIGHT
                            //})
                        }
                    }
                }
            }
        })
    }
    dispatch(updateFormEscenariosRequest(field, value))
}
//Enviar al reducer la tecla pulsada
const updateFormEscenariosRequest = (field, value) => ({
    type: UPDATE_ESCENARIOS_FORM_REQUEST,
    field: field,
    value: value
})
//Funcion para guardar o actualizar la escenario
export const saveEscenario = () => (dispatch, getState) => {
    let id_escenario = getState().escenarioFormReducer.id
    APIInvoker.invokeGET('/parametros/findByAny?texto=V_Prefijo para escenarios', responseval => {
        if (responseval[0].valor != undefined) {
            let long_parametro = (responseval[0].tipo === "SEGURIDAD" ? decryptJS(responseval[0].valor) : responseval[0].valor).length;
                if (id_escenario == 0 || id_escenario == undefined) {
                    //Si es un escenario nuevo
                    let escenario_salvar = {
                        nombre: (responseval[0].tipo === "SEGURIDAD" ? decryptJS(responseval[0].valor) : responseval[0].valor).toUpperCase() + getState().escenarioFormReducer.nombre,
                        impacto: getState().escenarioFormReducer.impacto,
                        idConciliacion: getState().escenarioFormReducer.conciliacion,
                        descripcion: getState().escenarioFormReducer.descripcion,
                        username: window.localStorage.getItem("nombreUsuario")
                    }
                    //, nombreConciliacion : getState().escenarioFormReducer.nombreConciliacion
                    APIInvoker.invokePOST('/escenarios', escenario_salvar, response => {
                        if (response.ok) {
                            $('#modalAdd').modal('hide');
                            dispatch(mostrarModal("alert alert-success", response.description))
                            dispatch(limpiarFormEscenario())
                            dispatch(refreshListEscenario())
                        } else {
                            toast.error(response.description, {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                        }
                    }, error => {
                        console.log('No se ha podido crear la escenario')
                    })
                } else {
                    let escenario_salvar = {
                        id: getState().escenarioFormReducer.id,
                        nombre: (responseval[0].tipo === "SEGURIDAD" ? decryptJS(responseval[0].valor) : responseval[0].valor).toUpperCase() + getState().escenarioFormReducer.nombre,
                        impacto: getState().escenarioFormReducer.impacto,
                        idConciliacion: getState().escenarioFormReducer.conciliacion,
                        nombreConciliacion: getState().escenarioFormReducer.nombreConciliacion,
                        descripcion: getState().escenarioFormReducer.descripcion,
                        username: window.localStorage.getItem("nombreUsuario")
                    }
                    APIInvoker.invokePUT('/escenarios', escenario_salvar, response => {
                        if (response.ok) {
                            dispatch(limpiarFormEscenario())
                            dispatch(refreshListEscenario())
                            browserHistory.push('/escenarios')
                            dispatch(mostrarModal("alert alert-success", response.description))
                        } else {
                            toast.error(response.description, {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                        }
                    }, error => {
                        console.log('No se ha podido actualizar la escenario')
                    })
                }
        }
    })
}

//Funcion para limpiar los campos del formulario de Escenarios
export const limpiarFormEscenario = () => ({
    type: LIMPIAR_FORM_ESCENARIO
})

//Funcion para cargar la escenario en el formulario
export const cargarEscenario = (idescenario) => (dispatch, getState) => {
    APIInvoker.invokeGET('/escenarios/' + idescenario, response => {
        if (Array.isArray(response) == true) {
            dispatch(cargarEscenarioEnForm(response))
        } else {
            dispatch(cargarEscenarioEnForm([response]))
        }
    }, error => {
        console.log('No se pudo actualizar los campos')
    })
}
//Enviar la acción de cargar la escenario al reducer
const cargarEscenarioEnForm = (escenario) => ({
    type: CARGAR_ESCENARIO_FORM,
    escenario: escenario
})
//Funcion que elimina una escenario
export const borrarEscenario = () => (dispatch, getState) => {
    let idescenario = getState().escenarioFormReducer.id
    let nomescenario = getState().escenarioFormReducer.nombre
    APIInvoker.invokeDELETE('/escenarios/' + idescenario + '/' + window.localStorage.getItem("nombreUsuario"), null, response => {
        if (response.ok) {
            dispatch(mostrarModal("alert alert-success", response.description))
            dispatch(limpiarFormEscenario(), browserHistory.push('/escenarios'))
        } else {
            toast.error(response.description, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }, error => {})

}

//Cargar el combo de impactos en escenarios
export const cargarImpactos = () => (dispatch, getState) => {
    APIInvoker.invokeGET('/parametros/findByAny?texto=V_Impacto', response => {
        let array_opciones = new Array()
        if (response[0].valor != undefined) {
            array_opciones = (response[0].tipo === "SEGURIDAD" ? decryptJS(response[0].valor) : response[0].valor).split(';');
            dispatch(cargarImpactosCombo(array_opciones))
        }
    })
}
//Enviando al reducer
const cargarImpactosCombo = (array_opciones) => ({
    type: CARGAR_COMBO_IMPACTOS,
    lista: array_opciones
})

//Funcion de cambio de pagina
export const moverPaginaEscenarios = (pagina) => (dispatch, getState) => {
    let NumPagsTotales = getState().escenarioReducer.paginador.length
    if (pagina > 0 && pagina <= NumPagsTotales) {
        dispatch(irAPaginaEscenarios(pagina))
        dispatch(refreshListEscenario())
    }
}
const irAPaginaEscenarios = (pagina) => ({
    type: IR_PAGINA_ESCENARIOS,
    pagina: pagina
})

//Funcion que carga las opciones de Conciliaciones en el combo de la parte superior en querys
export const cargarConciliacionesEscenario = () => (dispatch, getState) => {
    APIInvoker.invokeGET('/conciliaciones', response => {
        if (Array.isArray(response) == true) {
            dispatch(cargarConciliacionesenEscenario(response))
        }
    })
}
const cargarConciliacionesenEscenario = (arrayConciliaciones) => ({
    type: CARGAR_CONCILIACIONES_ESCENARIO,
    lista: arrayConciliaciones
})


/*
 *  A C C I O N E S  D E  E J E C U C I O N
 *  para realizar todas las acciones necesarias modulo de ejecución
 */

//Funcion que elimina el valor ultimo seleccionado del combo
export const limpiarConciliacionSeleccionada = () => ({
    type: LIMPIAR_CONCILIACION_SELECCIONADA,
    lista: {
        "id": 0,
        "nombre": "Ninguna"
    }
})

//Funcion que carga el combo de conciliaciones
export const cargarComboConciliaciones = (filter, callback) => (dispatch, getState) => {
    APIInvoker.invokeGET(`/conciliaciones?name=${filter}`, response => {
        if (Array.isArray(response) == true) {
            dispatch(cargarConciliaciones(response))
            dispatch(limpiarConciliacionSeleccionada())
            let options = response.map(x => {return {value: x.id, label: x.nombre} })
            callback(options)
        }
    })
}

export const cargarComboConciliacionesEjecución = () => (dispatch, getState) => {
    APIInvoker.invokeGET('/conciliaciones', response => {
        if (Array.isArray(response) == true) {
            dispatch(cargarConciliaciones(response))
            dispatch(limpiarConciliacionSeleccionada())
        }
    })
}

//Envia resultado para llenar el combo a Reducer
const cargarConciliaciones = (arrayConciliaciones) => ({
    type: CARGA_CONCILIACIONES,
    lista: arrayConciliaciones
})

export const updateEjecucion = (field, value) => (dispatch, getState) => {
    //console.log(field+" "+value)
    dispatch(updateComboConciliaciones(field, value))
}

//Enviar el texto del buscador al reducer store
const updateComboConciliaciones = (field, value) => ({
    type: UPDATE_VALUE_COMBO_CONCILIACIONES,
    field: field,
    value: value
})

export const doEjecutarConciliacion = () => (dispatch, getState) => {
    //decidir si llamar el web service o no segun lo recibido
    let idConciliacionEjecucion = getState().ejecucionReducer.conciliacion.id
    let nomConciliacionEjecucion = getState().ejecucionReducer.conciliacion.nombre
    let paqueteAsociado = 0
    if (getState().ejecucionReducer.conciliacion.transformaciones.length > 0) {
        paqueteAsociado = getState().ejecucionReducer.conciliacion.transformaciones[0].paqueteWs
    }
    let idPlanInstancia = 0
    if (getState().ejecucionReducer.conciliacion.ejecucionesProceso.length > 0) {
        idPlanInstancia = getState().ejecucionReducer.conciliacion.ejecucionesProceso[0].idPlanInstance
    }
    //Obtiene los valores ODI de tabla Parametros
    APIInvoker.invokeGET('/odiRest/getOdiParametros', responseOdi => {
      //Recuperar Usuario Odi
      let odiUser = responseOdi.find(function (response) {if (response.parametro === "V_odiUsuario"){return response}});
      //console.log("odiUser: " + (odiUser.tipo === "SEGURIDAD" ? decryptJS(odiUser.valor) : odiUser.valor))
      //Recuperar Password Odi
      let odiPassword = responseOdi.find(function (response) {if (response.parametro === "V_odiPassword"){return response}});
      //console.log("odiPassword: " + (odiPassword.tipo === "SEGURIDAD" ? decryptJS(odiPassword.valor) : odiPassword.valor))
      //Recuperar WorkRepository Odi
      let odiWorkRepository = responseOdi.find(function (response) {if (response.parametro === "V_odiWorkRepository"){return response}});
      //console.log("odiWorkRepository: " + (odiWorkRepository.tipo === "SEGURIDAD" ? decryptJS(odiWorkRepository.valor) : odiWorkRepository.valor))
      //Recuperar Context Odi
      let odiContext = responseOdi.find(function (response) {if (response.parametro === "V_odiContext"){return response}});
      //console.log("odiContext: " + (odiContext.tipo === "SEGURIDAD" ? decryptJS(odiContext.valor) : odiContext.valor))
      //Si hay instancia recuperada de la ejecución
      if (idPlanInstancia == 0) {
          //Construir petición json para Backend
          let startEjecucion = {
              "odiUser": (odiUser.tipo === "SEGURIDAD" ? decryptJS(odiUser.valor) : odiUser.valor),
              "odiPassword": (odiPassword.tipo === "SEGURIDAD" ? decryptJS(odiPassword.valor) : odiPassword.valor),
              "workRepository": (odiWorkRepository.tipo === "SEGURIDAD" ? decryptJS(odiWorkRepository.valor) : odiWorkRepository.valor),
              "loadPlanName": paqueteAsociado,
              "contexto": (odiContext.tipo === "SEGURIDAD" ? decryptJS(odiContext.valor) : odiContext.valor),
              "params": [{
                      "nombre": "GLOBAL.V_CTL_PAQUETE",
                      "valor": "JP_NO_EXISTE"
                  },
                  {
                      "nombre": "GLOBAL.V_CTL_SESION",
                      "valor": "0"
                  }
              ]
          }
          if (paqueteAsociado != 0) {
              if (configuration.webService.debug == 1) {
                  console.log("REQUEST1 START LOAD PLAN ===>")
                  console.log(startEjecucion)
              }
              APIInvoker.invokePOST('/odiRest/startLoadPlan', startEjecucion, response => {
                  if (configuration.webService.debug == 1) {
                      console.log("RESPUESTA START REST 11 ==>")
                      console.log(response)
                  }
                  if (response.StartedRunInformation != undefined) {
                      let idInstance = 0
                      if (response.StartedRunInformation.OdiLoadPlanInstanceId != undefined) {
                          idInstance = response.StartedRunInformation.OdiLoadPlanInstanceId
                          dispatch(mostrarModal("alert alert-success", "Inicio de ejecución de proceso exitoso :" + idInstance))
                      }
                      if (idInstance != 0) {
                          let ejecucion_salvar = {
                              nombre: nomConciliacionEjecucion,
                              idPlanInstance: idInstance,
                              idConciliacion: idConciliacionEjecucion,
                              username: window.localStorage.getItem("nombreUsuario")
                          }
                          APIInvoker.invokePOST('/ejecucionproceso', ejecucion_salvar, response2 => {
                              if (response2.idPlanInstance != undefined) {
                                  console.log("Se almacenó la información de la ejecución")
                                  //dispatch(cargarComboConciliaciones())
                              } else {
                                  toast.error("No fue posible almacenar la información de la ejecución", {
                                      position: toast.POSITION.BOTTOM_RIGHT
                                  })
                              }
                          }, error => {
                              console.log('No almacenó la información de la ejecución')
                          })
                      } else {
                          toast.error("No se pudo obtener un id de ejecución desde ODI", {
                              position: toast.POSITION.BOTTOM_RIGHT
                          })
                      }
                  } else {
                      if (response.codigo != undefined) {
                          toast.error("Error ODI: " + response.descripcion, {
                              position: toast.POSITION.BOTTOM_RIGHT
                          })
                      } else {
                          toast.error("Error General", {
                              position: toast.POSITION.BOTTOM_RIGHT
                          })
                          console.log(response)
                      }
                  }
              })
          } else {
              toast.error("Esta conciliación no tiene paquete asociado", {
                  position: toast.POSITION.BOTTOM_RIGHT
              })
          }
      } else {
          //Consultar ejecución actual
          let consultarEjecucion = {
            "odiUser": (odiUser.tipo === "SEGURIDAD" ? decryptJS(odiUser.valor) : odiUser.valor),
            "odiPassword": (odiPassword.tipo === "SEGURIDAD" ? decryptJS(odiPassword.valor) : odiPassword.valor),
            "workRepository": (odiWorkRepository.tipo === "SEGURIDAD" ? decryptJS(odiWorkRepository.valor) : odiWorkRepository.valor),
              "loadPlans": [{
                  "loadPlanInstanceId": idPlanInstancia,
                  "loadPlanRunNumber": configuration.webService.runCount
              }]
          }
          if (configuration.webService.debug == 1) {
              console.log("REQUEST STATUS LOAD PLAN 2 ===>")
              console.log(consultarEjecucion)
          }
          APIInvoker.invokePOST('/odiRest/loadPlanStatus', consultarEjecucion, response => {
              if (response.ok) {
                  if (response.body[0].LoadPlanStatus != "R") {
                      //Construir petición json para Backend
                      let startEjecucion = {
                          "odiUser": (odiUser.tipo === "SEGURIDAD" ? decryptJS(odiUser.valor) : odiUser.valor),
                          "odiPassword": (odiPassword.tipo === "SEGURIDAD" ? decryptJS(odiPassword.valor) : odiPassword.valor),
                          "workRepository": (odiWorkRepository.tipo === "SEGURIDAD" ? decryptJS(odiWorkRepository.valor) : odiWorkRepository.valor),
                          "loadPlanName": paqueteAsociado,
                          "contexto": (odiContext.tipo === "SEGURIDAD" ? decryptJS(odiContext.valor) : odiContext.valor),
                          "params": [{
                                  "nombre": "GLOBAL.V_CTL_PAQUETE",
                                  "valor": "JP_NO_EXISTE"
                              },
                              {
                                  "nombre": "GLOBAL.V_CTL_SESION",
                                  "valor": "0"
                              }
                          ]
                      }
                      if (paqueteAsociado != 0) {
                          if (configuration.webService.debug == 1) {
                              console.log("REQUEST2 START LOAD PLAN ===>")
                              console.log(startEjecucion)
                          }
                          APIInvoker.invokePOST('/odiRest/startLoadPlan', startEjecucion, response => {
                              if (configuration.webService.debug == 1) {
                                  console.log("RESPUESTA START REST ==>")
                                  console.log(response)
                              }
                              if(response.ok){
                                if (response.body.startedRunInformation != undefined) {
                                    let idInstance = 0
                                    if (response.body.startedRunInformation.odiLoadPlanInstanceId != undefined) {
                                        idInstance = response.body.startedRunInformation.odiLoadPlanInstanceId
                                        dispatch(mostrarModal("alert alert-success", "Inicio de ejecución de proceso exitoso :" + idInstance))
                                    }
                                    if (idInstance != 0) {
                                        let ejecucion_salvar = {
                                            nombre: nomConciliacionEjecucion,
                                            idPlanInstance: idInstance,
                                            idConciliacion: idConciliacionEjecucion,
                                            username: window.localStorage.getItem("nombreUsuario")
                                        }
                                        APIInvoker.invokePOST('/ejecucionproceso', ejecucion_salvar, response2 => {
                                            if (response2.idPlanInstance != undefined) {
                                                console.log("Se almacenó la información de la ejecución")
                                                //dispatch(cargarComboConciliaciones())
                                            } else {
                                                toast.error("No fue posible almacenar la información de la ejecución", {
                                                    position: toast.POSITION.BOTTOM_RIGHT
                                                })
                                            }
                                        }, error => {
                                            toast.error("No almacenó la información de la ejecución", {
                                                position: toast.POSITION.BOTTOM_RIGHT
                                            })
                                        })
                                    } else {
                                        toast.error("No se pudo obtener un id de ejecución desde ODI", {
                                            position: toast.POSITION.BOTTOM_RIGHT
                                        })
                                    }
                                } else {
                                    if (response.body.codigo != undefined) {
                                        toast.error("Error ODI: " + response.descripcion, {
                                            position: toast.POSITION.BOTTOM_RIGHT
                                        })
                                    } else {
                                        toast.error(response.descripcion, {
                                            position: toast.POSITION.BOTTOM_RIGHT
                                        })
                                        console.log(response)
                                    }
                                }
                              }else{
                                toast.error(response.description, {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                              }
                              
                          })
                      } else {
                          toast.error("Esta conciliación no tiene paquete asociado", {
                              position: toast.POSITION.BOTTOM_RIGHT
                          })
                      }
                  } else {
                      alert('2')
                      toast.error("Se encuentra en ejecución " + idPlanInstancia, {
                          position: toast.POSITION.BOTTOM_RIGHT
                      })
                  }
              }else{
                toast.error(response.description, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
              }
          })
      }
    })
}

export const doCancelarConciliacion = () => (dispatch, getState) => {
    //Variables necesarias para llamar el webservice
    let idConciliacionEjecucion = getState().ejecucionReducer.conciliacion.id
    let nomConciliacionEjecucion = getState().ejecucionReducer.conciliacion.nombre
    let paqueteAsociado = 0
    if (getState().ejecucionReducer.conciliacion.transformaciones.length > 0) {
        paqueteAsociado = getState().ejecucionReducer.conciliacion.transformaciones[0].paqueteWs
    }
    let idPlanInstancia = 0
    if (getState().ejecucionReducer.conciliacion.ejecucionesProceso.length > 0) {
        idPlanInstancia = getState().ejecucionReducer.conciliacion.ejecucionesProceso[0].idPlanInstance
    }
    console.log('idPlanInstancia', idPlanInstancia)
    if (idPlanInstancia && idPlanInstancia != 0) {
      //Obtiene los valores ODI de tabla Parametros
      APIInvoker.invokeGET('/odiRest/getOdiParametros', responseOdi => {
        //Recuperar Usuario Odi
        let odiUser = responseOdi.find(function (response) {if (response.parametro === "V_odiUsuario"){return response}});
        //Recuperar Password Odi
        let odiPassword = responseOdi.find(function (response) {if (response.parametro === "V_odiPassword"){return response}});
        //Recuperar WorkRepository Odi
        let odiWorkRepository = responseOdi.find(function (response) {if (response.parametro === "V_odiWorkRepository"){return response}});
        //Construir petición json para Backend
        let consultarEjecucion = {
            "odiUser": (odiUser.tipo === "SEGURIDAD" ? decryptJS(odiUser.valor) : odiUser.valor),
            "odiPassword": (odiPassword.tipo === "SEGURIDAD" ? decryptJS(odiPassword.valor) : odiPassword.valor),
            "workRepository": (odiWorkRepository.tipo === "SEGURIDAD" ? decryptJS(odiWorkRepository.valor) : odiWorkRepository.valor),
            "loadPlans": [{
                "loadPlanInstanceId": idPlanInstancia,
                "loadPlanRunNumber": configuration.webService.runCount
            }]
        }
        if (configuration.webService.debug == 1) {
            console.log("REQUEST STATUS LOAD PLAN  1===>")
            console.log(consultarEjecucion)
        }
        APIInvoker.invokePOST('/odiRest/loadPlanStatus', consultarEjecucion, response => {
            if (configuration.webService.debug == 1) {
                console.log("RESPONSE STATUS REST ==>")
                console.log(response)
            }
            if (response.ok) {
                if (response.body[0].loadPlanStatus == "R") {
                    //Construir petición json para Backend
                    let stopEjecucion = {
                        "odiUser": (odiUser.tipo === "SEGURIDAD" ? decryptJS(odiUser.valor) : odiUser.valor),
                        "odiPassword": (odiPassword.tipo === "SEGURIDAD" ? decryptJS(odiPassword.valor) : odiPassword.valor),
                        "workRepository": (odiWorkRepository.tipo === "SEGURIDAD" ? decryptJS(odiWorkRepository.valor) : odiWorkRepository.valor),
                        "loadPlanInstance": idPlanInstancia,
                        "stopLevel": configuration.webService.stopLevel
                    }
                    if (configuration.webService.debug == 1) {
                        console.log("REQUEST STOP LOAD PLAN ===>")
                        console.log(stopEjecucion)
                    }
                    APIInvoker.invokePOST('/odiRest/stopLoadPlan', stopEjecucion, response1 => {
                        if (configuration.webService.debug == 1) {
                            console.log("RESPUESTA STOP REST ==>")
                            console.log(response1)
                        }
                        if (response1.StoppedRunInformation != undefined) {
                            //dispatch(cargarComboConciliaciones())
                            dispatch(mostrarModal("alert alert-success", "Se detuvo la ejecución :" + response1.StoppedRunInformation.OdiLoadPlanInstanceId))
                        } else {
                            if (response1.codigo != undefined) {
                                toast.error("Error ODI: " + response1.descripcion, {
                                    position: toast.POSITION.BOTTOM_RIGHT,
                                })
                            } else {
                                toast.error("Error General", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                                console.log(response1)
                            }
                        }
                    })
                } else {
                    console.log("Ejecucion de conciliación id : " + idPlanInstancia + " en estado : " + response.body[0].loadPlanStatus)
                    toast.error("Sólo pueden detenerse conciliaciones en estado 'R'", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                }
            } else {
                if (response.body[0].codigo != undefined) {
                    toast.error("Error ODI: " + response.body[0].descripcion, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                } else {
                    toast.error("Error General", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            }
        })
      })
    } else {
        toast.error("No hay ejecuciones en ODI para esta conciliación", {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }
}

//Programar Conciliaciones
//Actualizar tecla por tecla los campos del formulario de conciliaciones
export const updateFormEjecutarConciliaciones = (field, value) => (dispatch, getState) => {
    dispatch(updateFormEjecutarConciliacionesRequest(field, value))
}

//Enviar al reducer la tecla pulsada
const updateFormEjecutarConciliacionesRequest = (field, value) => ({
    type: UPDATE_EJECUTAR_CONCILIACIONES_FORM_REQUEST,
    field: field,
    value: value
})

//Salvar la programación del Formulario
export const salvarProgramacion = () => (dispatch, getState) => {
    let hora = getState().ejecucionReducer.hora
    let minuto = getState().ejecucionReducer.minuto
    let fecha = getState().ejecucionReducer.fecha
    let paraconciliacion = getState().ejecucionReducer.conciliacion.nombre

    let fechaProgramada = new Date(getState().ejecucionReducer.fecha);
    fechaProgramada = new Date(fechaProgramada.setDate(fechaProgramada.getDate() + 1));
    fechaProgramada.setHours(hora);
    fechaProgramada.setMinutes(minuto);

    let idTransformacion = getState().ejecucionReducer.conciliacion.transformaciones[getState().ejecucionReducer.conciliacion.transformaciones.length - 1].id;
    let progConciliacion = {
        id: idTransformacion,
        fechaAgendamiento: fechaProgramada,
        username: window.localStorage.getItem("nombreUsuario")
    }

    APIInvoker.invokePOST('/conciliaciones/progEjecucion', progConciliacion, response => {
        if (response.ok) {
            //   id_grabado = response.id
            $('#modalAdd').modal('hide');
            dispatch(mostrarModal("alert alert-success", response.description))
            dispatch(antesLimpiarFormConciliacion())
            dispatch(limpiarFormConciliacion())
        } else {
            toast.error(response.description, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }, error => {
        console.log('No se ha podido crear la conciliacion')
    })
}


/*
 *  A C C I O N E S  D E  R E S U L T A D O S
 *  para realizar todas las acciones necesarias del crud de resultados
 */

//Actualizar tecla por tecla el campo de texto del buscador
export const updateTextFindResultado = (field, value) => (dispatch, getState) => {
    dispatch(updateTextResultadoFindRequest(field, value))
}
//Enviar el texto del buscador al reducer store
const updateTextResultadoFindRequest = (field, value) => ({
    type: UPDATE_FINDER,
    field: field,
    value: value
})
//Realizar la búsqueda
export const findTextResultado = () => (dispatch, getState) => {
    let txtBuscar = getState().resultadoReducer.textoBuscar
    if (txtBuscar != '') {
        APIInvoker.invokeGET('/resconciliacion/findByAny?texto=' + txtBuscar, response => {
            if (Array.isArray(response) == true) {
                if (response[0].id != undefined) {
                    dispatch(verResultados(response))
                } else {
                    toast.warn("No se encuentran resultados que cumplan con el criterio de búsqueda", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    console.log("Error : " + response[0].codigo + " Mensaje: " + response[0].mensaje + ": " + response[0].descripcion)
                }
            } else {
                if (response.id != undefined) {
                    dispatch(verResultados(response))
                } else {
                    console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                    toast.warn("No se encuentran resultados que cumplan con el criterio de búsqueda", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            }
        })
    } else {
        dispatch(moverPaginaResultados(1));
    }
}

//Recalcular el paginador de resultados
export const calculaPaginadorResultados = () => (dispatch, getState) => {
    let numregs = 0
    //Obtener el numero total de registros antes de filtrar
    APIInvoker.invokeGET('/resconciliacion/count', response => {
        if (!isNaN(response)) {
            numregs = response
            //Recalcula el paginador
            let totRegistros = numregs
            let regPagina = getState().resultadoReducer.registrosPorPagina
            let totPaginas = Math.ceil(totRegistros / regPagina)
            let array_paginador = new Array()
            let offset = 0
            let regfin = 0
            for (let i = 1; i <= totPaginas; i++) {
                regfin = offset + regPagina - 1
                array_paginador.push({
                    "id": i,
                    "offset": offset
                })
                offset = regfin + 1
            }
            let update_paginador = {
                totalRegistros: numregs,
                registrosPorPagina: regPagina,
                paginador: array_paginador
            }
            dispatch(actualizarPaginadorResultados(update_paginador))
        } else {
            console.log("Conteo de Registros de resultados no válido")
        }
    })
}

//Envia las variables al store
const actualizarPaginadorResultados = (array_paginador) => ({
    type: ACTUALIZA_PAGINADOR_RESULTADOS,
    lista: array_paginador
})

//Actualizar el listado de resultado
export const refreshListResultado = () => (dispatch, getState) => {
    let objetoVacio = new Object()
    APIInvoker.invokeGET('/resconciliacion?estado=POR APROBAR', response => {
        if (Array.isArray(response) == true) {
            if (response[0].id != undefined) {
                dispatch(verResultados(response))
            } else {
                console.log("Error : " + response[0].codigo + " Mensaje: " + response[0].mensaje + ": " + response[0].descripcion)
                dispatch(antesVerResultados(objetoVacio))
            }
        } else {
            console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
            dispatch(antesVerResultados(objetoVacio))
        }
    })
}

const antesVerResultados = (resp) => (dispatch, getState) => {
    //dispatch(calculaPaginadorResultados()),
    dispatch(verResultados(resp))
}
//Enviar la accion de ver resultados al Reducer STORE
const verResultados = (res) => ({
    type: CARGAR_RESULTADOS,
    lista: res
})

//Funcion de cambio de pagina
export const moverPaginaResultados = (pagina) => (dispatch, getState) => {
    let NumPagsTotales = getState().resultadoReducer.paginador.length
    if (pagina > 0 && pagina <= NumPagsTotales) {
        dispatch(irAPaginaResultados(pagina))
        dispatch(refreshListResultado())
    }
}
const irAPaginaResultados = (pagina) => ({
    type: IR_PAGINA_RESULTADOS,
    pagina: pagina
})

//Funcion que carga las opciones de Conciliaciones en el combo de la parte superior en querys
export const cargarConciliacionesResultado = () => (dispatch, getState) => {
    APIInvoker.invokeGET('/conciliaciones', response => {
        if (Array.isArray(response) == true) {
            dispatch(cargarConciliacionesenResultado(response))
        }
    })
}
const cargarConciliacionesenResultado = (arrayConciliaciones) => ({
    type: CARGAR_CONCILIACIONES_RESULTADO,
    lista: arrayConciliaciones
})

export const aprobarRenglonResultado = (idRenglon) => (dispatch, getState) => {
    //Paquete asociado al aprobar
    let paqueteAsociado = 0
    APIInvoker.invokeGET('/parametros/findByAny?texto=V_Paquete aprobado', response => {
        if (response[0].valor != undefined) {
            let paqueteAsociado = (response[0].tipo === "SEGURIDAD" ? decryptJS(response[0].valor) : response[0].valor)

            //Obtiene los valores ODI de tabla Parametros
            APIInvoker.invokeGET('/odiRest/getOdiParametros', responseOdi => {
              //Recuperar Usuario Odi
              let odiUser = responseOdi.find(function (response) {if (response.parametro === "V_odiUsuario"){return response}});
              //Recuperar Password Odi
              let odiPassword = responseOdi.find(function (response) {if (response.parametro === "V_odiPassword"){return response}});
              //Recuperar WorkRepository Odi
              let odiWorkRepository = responseOdi.find(function (response) {if (response.parametro === "V_odiWorkRepository"){return response}});
              //Recuperar Context Odi
              let odiContext = responseOdi.find(function (response) {if (response.parametro === "V_odiContext"){return response}});
              //Construir petición json para Backend
              if (paqueteAsociado != 0) {
                  APIInvoker.invokeGET('/resconciliacion/' + idRenglon, responseResConciliacion => {
                      let paramCodConciliacion = responseResConciliacion.codConciliacion
                      let paramIdEjecucion = responseResConciliacion.idEjecucion
                      let startEjecucion = {
                          "odiUser": (odiUser.tipo === "SEGURIDAD" ? decryptJS(odiUser.valor) : odiUser.valor),
                          "odiPassword": (odiPassword.tipo === "SEGURIDAD" ? decryptJS(odiPassword.valor) : odiPassword.valor),
                          "workRepository": (odiWorkRepository.tipo === "SEGURIDAD" ? decryptJS(odiWorkRepository.valor) : odiWorkRepository.valor),
                          "loadPlanName": paqueteAsociado,
                          "contexto": (odiContext.tipo === "SEGURIDAD" ? decryptJS(odiContext.valor) : odiContext.valor),
                          "params": [{
                                  "nombre": "PRY_GAI.V_0553_COD_CONCILIACION",
                                  "valor": paramCodConciliacion
                              },
                              {
                                  "nombre": "PRY_GAI.V_0553_SESION",
                                  "valor": paramIdEjecucion
                              },
                              {
                                  "nombre": "PRY_GAI.V_0553_ESTADO",
                                  "valor": "1"
                              }
                          ]
                      }
                      if (configuration.webService.debug == 1) {
                          console.log("REQUEST START LOAD PLAN ===>")
                          console.log(startEjecucion)
                      }
                      APIInvoker.invokePOST('/odiRest/startLoadPlan', startEjecucion, response => {
                          if (configuration.webService.debug == 1) {
                              console.log("RESPUESTA START REST ==>")
                              console.log(response)
                          }
                          if (response.ok) {
                              let idInstance = 0
                              if (response.StartedRunInformation.OdiLoadPlanInstanceId != undefined) {
                                  idInstance = response.StartedRunInformation.OdiLoadPlanInstanceId
                                  console.log("Se recibió del WebService el idInstance : " + idInstance)
                                  toast.success(response.description)
                              }
                              if (idInstance != 0) {
                                  let salvar_aprobado = {
                                      id: idRenglon,
                                      estado: "APROBADO"
                                  }
                              } else {
                                  toast.error("No se pudo obtener un id de ejecución desde ODI", {
                                      position: toast.POSITION.BOTTOM_RIGHT
                                  })
                              }
                          } else {
                            toast.error(response.description, {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                          }
                      })
                  })
              }
            })
        } else {
            toast.error("Debe parametrizar el paquete a ejecutar al aprobar", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    })
}

export const rechazarRenglonResultado = (idRenglon) => (dispatch, getState) => {
    //Paquete asociado al aprobar
    let paqueteAsociado = 0
    APIInvoker.invokeGET('/parametros/findByAny?texto=V_Paquete no aprobado', response => {
        if (response[0].valor != undefined) {
            let paqueteAsociado = (response[0].tipo === "SEGURIDAD" ? decryptJS(response[0].valor) : response[0].valor)
            //Obtiene los valores ODI de tabla Parametros
            APIInvoker.invokeGET('/odiRest/getOdiParametros', responseOdi => {
              //Recuperar Usuario Odi
              let odiUser = responseOdi.find(function (response) {if (response.parametro === "V_odiUsuario"){return response}});
              //Recuperar Password Odi
              let odiPassword = responseOdi.find(function (response) {if (response.parametro === "V_odiPassword"){return response}});
              //Recuperar WorkRepository Odi
              let odiWorkRepository = responseOdi.find(function (response) {if (response.parametro === "V_odiWorkRepository"){return response}});
              //Recuperar Context Odi
              let odiContext = responseOdi.find(function (response) {if (response.parametro === "V_odiContext"){return response}});
              //Construir petición json para Backend
              let startEjecucion = {
                  "odiUser": (odiUser.tipo === "SEGURIDAD" ? decryptJS(odiUser.valor) : odiUser.valor),
                  "odiPassword": (odiPassword.tipo === "SEGURIDAD" ? decryptJS(odiPassword.valor) : odiPassword.valor),
                  "workRepository": (odiWorkRepository.tipo === "SEGURIDAD" ? decryptJS(odiWorkRepository.valor) : odiWorkRepository.valor),
                  "loadPlanName": paqueteAsociado,
                  "contexto": (odiContext.tipo === "SEGURIDAD" ? decryptJS(odiContext.valor) : odiContext.valor)
              }
              if (paqueteAsociado != 0) {
                  APIInvoker.invokeGET('/resconciliacion/' + idRenglon, responseResConciliacion => {
                      let paramCodConciliacion = responseResConciliacion.codConciliacion
                      let paramIdEjecucion = responseResConciliacion.idEjecucion
                      let startEjecucion = {
                          "odiUser": (odiUser.tipo === "SEGURIDAD" ? decryptJS(odiUser.valor) : odiUser.valor),
                          "odiPassword": (odiPassword.tipo === "SEGURIDAD" ? decryptJS(odiPassword.valor) : odiPassword.valor),
                          "workRepository": (odiWorkRepository.tipo === "SEGURIDAD" ? decryptJS(odiWorkRepository.valor) : odiWorkRepository.valor),
                          "loadPlanName": paqueteAsociado,
                          "contexto": (odiContext.tipo === "SEGURIDAD" ? decryptJS(odiContext.valor) : odiContext.valor),
                          "params": [{
                                  "nombre": "PRY_GAI.V_0553_COD_CONCILIACION",
                                  "valor": paramCodConciliacion
                              },
                              {
                                  "nombre": "PRY_GAI.V_0553_SESION",
                                  "valor": paramIdEjecucion
                              },
                              {
                                  "nombre": "PRY_GAI.V_0553_ESTADO",
                                  "valor": "0"
                              }
                          ]
                      }
                      if (configuration.webService.debug == 1) {
                          console.log("REQUEST START LOAD PLAN ===>")
                          console.log(startEjecucion)
                      }
                      APIInvoker.invokePOST('/odiRest/startLoadPlan', startEjecucion, response => {
                          if (configuration.webService.debug == 1) {
                              console.log("RESPUESTA START REST ==>")
                              console.log(response)
                          }
                          if (response.ok) {
                              let idInstance = 0
                              if (response.StartedRunInformation.OdiLoadPlanInstanceId != undefined) {
                                  idInstance = response.StartedRunInformation.OdiLoadPlanInstanceId
                                  toast.success(response.description)
                              }
                              if (idInstance != 0) {
                                  let salvar_aprobado = {
                                      id: idRenglon,
                                      estado: "RECHAZADO"
                                  }
                              }
                          } else {
                            toast.error(response.description, {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                          }
                      })
                  })
              }
            })
        } else {
            toast.error("Debe parametrizar el paquete a ejecutar al aprobar", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    })
}

/*
 *  A C C I O N E S  D E  I N D I C A D O R E S
 *  para realizar todas las acciones necesarias del crud de indicadores
 */

//Actualizar tecla por tecla el campo de texto del buscador
export const updateTextFindIndicador = (field, value) => (dispatch, getState) => {
    dispatch(updateTextIndicadorFindRequest(field, value))
}
//Enviar el texto del buscador al reducer store
const updateTextIndicadorFindRequest = (field, value) => ({
    type: UPDATE_FINDER,
    field: field,
    value: value
})
//Realizar la búsqueda
export const findTextIndicador = () => (dispatch, getState) => {
  let objetoVacio = new Object()
  let txtBuscar = getState().indicadorReducer.textoBuscarIndicador
  if (txtBuscar != '') {
      APIInvoker.invokeGET('/indicadores/findByAny?texto=' + txtBuscar, response => {
          if (Array.isArray(response) == true) {
              if (response[0].id != undefined) {
                  dispatch(verIndicadores(response))
              } else {
                  console.log("Error " + response[0].codigo + " : " + response[0].mensaje)
                  toast.warn("No se encontraron registros que satisfagan el criterio de búsqueda", {
                      position: toast.POSITION.BOTTOM_RIGHT
                  })
              }
          } else {
              if (response.id != undefined) {
                  dispatch(verIndicadores(response))
              } else {
                  console.log("Error " + response.codigo + " : " + response.mensaje)
                  toast.warn("No se encontraron registros que satisfagan el criterio de búsqueda", {
                      position: toast.POSITION.BOTTOM_RIGHT
                  })
                  //dispatch(verIndicadores(objetoVacio))
              }
          }
      })
  } else {
      dispatch(moverPaginaIndicadores(1));
  }
}

//Recalcular el paginador de indicador
export const calculaPaginadorIndicadores = () => (dispatch, getState) => {
    let numregs = 0
    //Obtener el numero total de registros antes de filtrar
    APIInvoker.invokeGET('/indicadores/count', response => {
        if (!isNaN(response)) {
            numregs = response
            //Recalcula el paginador
            let totRegistros = numregs
            let regPagina = getState().indicadorReducer.registrosPorPagina
            let totPaginas = Math.ceil(totRegistros / regPagina)
            let array_paginador = new Array()
            let offset = 0
            let regfin = 0
            //console.log("TotRegistros ==")
            //console.log(totRegistros)
            for (let i = 1; i <= totPaginas; i++) {
                regfin = offset + regPagina - 1
                array_paginador.push({
                    "id": i,
                    "offset": offset
                })
                offset = regfin + 1
            }
            //console.log("Variable de paginador ==>")
            //console.log(array_paginador)
            //preparar variable para Enviar
            let update_paginador = {
                totalRegistros: numregs,
                registrosPorPagina: regPagina,
                paginador: array_paginador
            }
            dispatch(actualizarPaginadorIndicadores(update_paginador))
        } else {
            console.log("Conteo de Registros de indicador no válido")
        }
    })
}
//Envia las variables al store
const actualizarPaginadorIndicadores = (array_paginador) => ({
    type: ACTUALIZA_PAGINADOR_INDICADORES,
    lista: array_paginador
})

//Actualizar el listado de indicadores
export const refreshListIndicador = (resp) => (dispatch, getState) => {
    //Igual para jsonserver o API
    let objetoVacio = new Object()
    if (resp == null) {
        let regInicial = 0
        //Todos los registros de indicadores
        let pagActual = getState().indicadorReducer.paginaActual
        if (getState().indicadorReducer.paginador.length > 0) {
            regInicial = getState().indicadorReducer.paginador[pagActual - 1].offset
        }
        let regPagina = getState().indicadorReducer.registrosPorPagina
        APIInvoker.invokeGET('/indicadores', response1 => {
            if (Array.isArray(response1) == true) {
                //Array con todos los registros
                if (response1[0].id != undefined) {
                    dispatch(antesVerIndicadores(response1))
                } else {
                    dispatch(antesVerIndicadores(objetoVacio))
                    console.log("Error : " + response1[0].codigo + " Mensaje: " + response1[0].mensaje + ": " + response1[0].descripcion)
                    //alert("No se encuentran indicadores")
                }
            } else {
                //Cuando el response no es un array, es decir, un solo registro
                if (response1.id != undefined) {
                    dispatch(antesVerIndicadores([response1]))
                } else {
                    dispatch(antesVerIndicadores(objetoVacio))
                    console.log("Error : " + response1.codigo + " Mensaje: " + response1.mensaje + ": " + response1.descripcion)
                    //alert("No se encuentra el indicador")
                }
            }
        })
    } else {
        //Buscando un registro en especifico por id o por un response
        APIInvoker.invokeGET('/indicadores/' + resp, response => {
            if (Array.isArray(response) == true) {
                //si el response contiene varios registros
                if (response[0].id != undefined) {
                    dispatch(antesVerIndicadores(response))
                } else {
                    dispatch(antesVerIndicadores(objetoVacio))
                    console.log("Error : " + response[0].codigo + " Mensaje: " + response[0].mensaje + ": " + response[0].descripcion)
                }
            } else {
                //si el response es un solo registro
                if (response.id != undefined) {
                    dispatch(antesVerIndicadores([response]))
                } else {
                    dispatch(antesVerIndicadores(objetoVacio))
                    console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                }
            }
        })
    }
}

const antesVerIndicadores = (resp) => (dispatch, getState) => {
    //dispatch(calculaPaginadorIndicadores())
    dispatch(verIndicadores(resp))
}
//Enviar la accion de ver indicadores al Reducer STORE
const verIndicadores = (res) => ({
    type: CARGAR_INDICADORES,
    lista: res
})
//Actualizar tecla por tecla los campos del formulario de indicadores
export const updateFormIndicadores = (field, value) => (dispatch, getState) => {
    dispatch(updateFormIndicadoresRequest(field, value))
}
//Enviar al reducer la tecla pulsada
const updateFormIndicadoresRequest = (field, value) => ({
    type: UPDATE_INDICADORES_FORM_REQUEST,
    field: field,
    value: value
})
//Funcion para guardar o actualizar el indicador
export const saveIndicador = () => (dispatch, getState) => {
    let id_indicador = getState().indicadorFormReducer.id

    if (id_indicador == 0 || id_indicador == undefined) {
        //Si es un registro nuevo
        let indicador_salvar = {
            id: getState().indicadorFormReducer.id,
            nombreFormula: getState().indicadorFormReducer.nombre,
            descripcion: getState().indicadorFormReducer.descripcion,
            textoFormula: getState().indicadorFormReducer.formula,
            idEscenario: getState().indicadorFormReducer.escenario.id,
            username: window.localStorage.getItem("nombreUsuario")
        }
        APIInvoker.invokePOST('/indicadores', indicador_salvar, response => {
            if (response.ok) {
                $('#modalAdd').modal('hide');
                dispatch(mostrarModal("alert alert-success", response.description));
                dispatch(limpiarFormIndicador())
                dispatch(refreshListIndicador())
            } else {
                toast.error(response.description, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                dispatch(refreshListIndicador())
            }
        }, error => {
            console.log("No se ha podido crear el indicador con id" + id_indicador)
        })
    } else {
        //Si es un registro existente
        let indicador_salvar = {
            id: getState().indicadorFormReducer.id,
            nombreFormula: getState().indicadorFormReducer.nombre,
            descripcion: getState().indicadorFormReducer.descripcion,
            textoFormula: getState().indicadorFormReducer.formula,
            idEscenario: getState().indicadorFormReducer.idEscenario,
            username: window.localStorage.getItem("nombreUsuario")
        }
        APIInvoker.invokePUT('/indicadores', indicador_salvar, response => {
            if (response.ok) {
                dispatch(limpiarFormIndicador())
                dispatch(refreshListIndicador())
                browserHistory.push('/indicadores')
                dispatch(mostrarModal("alert alert-success", response.description));
            } else {
                toast.error(response.description, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
        }, error => {
            console.log("No se ha podido actualizar el indicador")
        })
    }
}

//Funcion para limpiar los campos del formulario de Indicadores
export const limpiarFormIndicador = () => ({
    type: LIMPIAR_FORM_INDICADOR
})

//Funcion para cargar el indicador en el formulario
export const cargarIndicador = (idindicador) => (dispatch, getState) => {
    APIInvoker.invokeGET('/indicadores/' + idindicador, response => {
        if (Array.isArray(response) == true) {
            if (response[0].id != undefined) {
                //if(response[0].idEscenario!=undefined){
                dispatch(cargarComboParametros(response[0].idEscenario))
                //}
                dispatch(cargarIndicadorEnForm(response[0]))
            } else {
                toast.error("No se pudo cargar el indicador en el formulario", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log("Error " + response[0].codigo + " : " + response[0].mensaje + " " + response[0].descripcion)
            }
        } else {
            if (response.id != undefined) {
                if (response.idEscenario != undefined) {
                    dispatch(cargarComboParametros(response.idEscenario))
                }
                dispatch(cargarIndicadorEnForm([response]))
            } else {
                toast.error("No se pudo cargar el indicador en el formulario", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log("Error " + response.codigo + " : " + response.mensaje + " " + response.descripcion)
            }
        }
    }, error => {
        console.log('No se pudo actualizar los campos')
    })
}

//Enviar la acción de cargar el indicador al reducer
const cargarIndicadorEnForm = (indicador) => ({
    type: CARGAR_INDICADOR_FORM,
    indicador: indicador
})

//Funcion que elimina un indicador
export const borrarIndicador = () => (dispatch, getState) => {
    let idindicador = getState().indicadorFormReducer.id
    let nomindicador = getState().indicadorFormReducer.nombre
    APIInvoker.invokeDELETE('/indicadores/' + idindicador + '/' + window.localStorage.getItem("nombreUsuario"), response => {}, error => {
        if (error.codigo == 200) {
            dispatch(mostrarModal("alert alert-success", "Se eliminó el indicador " + nomindicador));
        } else if (error.codigo == 500) {
            toast.error("No es posible eliminar el inidicador", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } else {
            toast.error("Error general al intentar eliminar un indicador", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
        dispatch(limpiarFormIndicador(), browserHistory.push('/indicadores'))
    })
}

//Funcion de cambio de pagina
export const moverPaginaIndicadores = (pagina) => (dispatch, getState) => {
    let NumPagsTotales = getState().indicadorReducer.paginador.length
    if (pagina > 0 && pagina <= NumPagsTotales) {
        dispatch(irAPaginaIndicadores(pagina))
        dispatch(refreshListIndicador())
    }
}

const irAPaginaIndicadores = (pagina) => ({
    type: IR_PAGINA_INDICADORES,
    pagina: pagina
})

//Cargar el id escenario en el reducer de indicadores
export const updEscenario = (idescenario) => (dispatch, getState) => {
    APIInvoker.invokeGET('/escenarios/' + idescenario, response => {
        if (response.id != undefined) {
            dispatch(updEscenarioReducerIndicadores(response))
        } else {
            console.log('No se encuentra el escenario')
            dispatch(updEscenarioReducerIndicadores({
                "id": 0,
                "nombre": "Ninguna conciliacion",
                "escenarios": []
            }))
        }
        dispatch(refreshListIndicador())
    }, error => {
        console.log('No se pudo cargar las Propiedades del escenario ' + idconciliacion + ' en indicadores listar')
    })
}
//Actualiza el escenario en modulo de indicadores
const updEscenarioReducerIndicadores = (objEscenario) => ({
    type: UPDATE_ESCENARIO_EN_INDICADORES,
    value: objEscenario
})

//Funcion que carga el combo de escenarios
export const cargarComboEscenarios = () => (dispatch, getState) => {
    APIInvoker.invokeGET('/escenarios', response => {
        if (Array.isArray(response) == true) {
            dispatch(cargarEscenarios(response))
        }
    })
}
//Envia resultado para llenar el combo a Reducer
const cargarEscenarios = (arrayEscenarios) => ({
    type: CARGA_ESCENARIOS_EN_INDICADORES,
    lista: arrayEscenarios
})

//Funcion que carga el combo de parametros
export const cargarComboParametros = (idEscenario) => (dispatch, getState) => {
    APIInvoker.invokeGET('/parametros/padre?tipo=conciliaciones&codpadre=' + idEscenario, response => {
        if (Array.isArray(response) == true) {
            dispatch(cargarParametros(response))
        }
    })
}
//Envia parametros para llenar el combo a Reducer en indicadores
const cargarParametros = (arrayResultados) => ({
    type: CARGA_PARAMETROS_EN_INDICADORES,
    lista: arrayResultados
})

//Añade a la formula la variable
export const updFormula = (variable) => ({
    type: UPDATE_FORMULA,
    value: variable
})


/*
 *  A C C I O N E S  D E  P A R A M E T R O S
 *  para realizar todas las acciones necesarias del crud de parametros
 */

//Actualizar tecla por tecla el campo de texto del buscador
export const updateTextFindParametro = (field, value) => (dispatch, getState) => {
    dispatch(updateTextParametroFindRequest(field, value))
}
//Enviar el texto del buscador al reducer store
const updateTextParametroFindRequest = (field, value) => ({
    type: UPDATE_FINDER,
    field: field,
    value: value
})
//Realizar la búsqueda
export const findTextParametro = () => (dispatch, getState) => {
  let objetoVacio = new Object()
  let txtBuscar = getState().parametroReducer.textoBuscarParametro
  if (txtBuscar != '') {
      APIInvoker.invokeGET('/parametros/findByAny?texto=' + txtBuscar, response => {
          if (Array.isArray(response) == true) {
              if (response[0].id != undefined) {
                let responseDecrypt = response.map(function (responseI, index, array) {
                    let devolver = {
                      codPadre: responseI.codPadre,
                      descripcion: responseI.descripcion,
                      fechaActualizacion: responseI.fechaActualizacion,
                      fechaCreacion: responseI.fechaCreacion,
                      id: responseI.id,
                      parametro: responseI.parametro,
                      tipo: responseI.tipo,
                      valor: (responseI.tipo === "SEGURIDAD" ? decryptJS(responseI.valor) : responseI.valor)
                    }
                    return devolver;
                });
                dispatch(verParametros(responseDecrypt))
              } else {
                  console.log("Error " + response[0].codigo + " : " + response[0].mensaje)
                  toast.warn("No se encontraron registros que satisfagan el criterio de búsqueda", {
                      position: toast.POSITION.BOTTOM_RIGHT
                  })
              }
          } else {
              if (response.id != undefined) {
                  let responseDecrypt = {
                    codPadre: response.codPadre,
                    descripcion: response.descripcion,
                    fechaActualizacion: response.fechaActualizacion,
                    fechaCreacion: response.fechaCreacion,
                    id: response.id,
                    parametro: response.parametro,
                    tipo: response.tipo,
                    valor: (response.tipo === "SEGURIDAD" ? decryptJS(response.valor) : response.valor)
                  }
                  dispatch(verParametros(responseDecrypt))
              } else {
                  console.log("Error " + response.codigo + " : " + response.mensaje)
                  toast.warn("No se encontraron registros que satisfagan el criterio de búsqueda", {
                      position: toast.POSITION.BOTTOM_RIGHT
                  })
                  //dispatch(verParametros(objetoVacio))
              }
          }
      })
  } else {
      dispatch(moverPaginaParametros(1));
  }
}


//Cargar el filtro de tipo de parámetro en el reducer de parámetros
export const updTipoParametros = (_tipo) => (dispatch, getState) => {
    dispatch(updTipoenParametros(_tipo))
    if (_tipo != "")
    {
        APIInvoker.invokeGET('/parametros/padre?tipo='+_tipo, response => {
            if (Array.isArray(response) == true) {
                dispatch(verParametros(response))
            }
        })
    } else{
        dispatch(refreshListParametro(null))
    }
}

const updTipoenParametros = (tipo) => ({
    type: UPDATE_TIPO_EN_PARAMETROS,
    value: tipo
})

//Recalcular el paginador de parametro
export const calculaPaginadorParametros = () => (dispatch, getState) => {
    let numregs = 0
    //Obtener el numero total de registros antes de filtrar
    APIInvoker.invokeGET('/parametros/count', response => {
        if (!isNaN(response)) {
            numregs = response
            //Recalcula el paginador
            let totRegistros = numregs
            let regPagina = getState().parametroReducer.registrosPorPagina
            let totPaginas = Math.ceil(totRegistros / regPagina)
            let array_paginador = new Array()
            let offset = 0
            let regfin = 0
            //console.log("TotRegistros ==")
            //console.log(totRegistros)
            for (let i = 1; i <= totPaginas; i++) {
                regfin = offset + regPagina - 1
                array_paginador.push({
                    "id": i,
                    "offset": offset
                })
                offset = regfin + 1
            }
            //console.log("Variable de paginador ==>")
            //console.log(array_paginador)
            //preparar variable para Enviar
            let update_paginador = {
                totalRegistros: numregs,
                registrosPorPagina: regPagina,
                paginador: array_paginador
            }
            dispatch(actualizarPaginadorParametros(update_paginador))
        } else {
            console.log("Conteo de Registros de parametro no válido")
        }
    })
}

//Envia las variables al store
const actualizarPaginadorParametros = (array_paginador) => ({
    type: ACTUALIZA_PAGINADOR_PARAMETROS,
    lista: array_paginador
})

//Actualizar el listado de parametros
export const refreshListParametro = (resp) => (dispatch, getState) => {
    //Igual para jsonserver o API
    let objetoVacio = new Object()
    if (resp == null) {
        let regInicial = 0
        //Todos los registros de parametros
        let pagActual = getState().parametroReducer.paginaActual
        //let tipo = getState().parametroReducer.
        if (getState().parametroReducer.paginador.length > 0) {
            regInicial = getState().parametroReducer.paginador[pagActual - 1].offset
        }
        let regPagina = getState().parametroReducer.registrosPorPagina
        APIInvoker.invokeGET('/parametros', response1 => {
            if (Array.isArray(response1) == true) {
                //Array con todos los registros
                if (response1[0].id != undefined) {
                    let response1Decrypt = response1.map(function (response, index, array) {
                        let devolver = {
                          codPadre: response.codPadre,
                          descripcion: response.descripcion,
                          fechaActualizacion: response.fechaActualizacion,
                          fechaCreacion: response.fechaCreacion,
                          id: response.id,
                          parametro: response.parametro,
                          tipo: response.tipo,
                          valor: (response.tipo === "SEGURIDAD" ? decryptJS(response.valor) : response.valor)
                        }
                        return devolver;
                    });
                    dispatch(antesVerParametros(response1Decrypt))
                } else {
                    dispatch(antesVerParametros(objetoVacio))
                    console.log("Error : " + response1[0].codigo + " Mensaje: " + response1[0].mensaje + ": " + response1[0].descripcion)
                    //alert("No se encuentran parametros")
                }
            } else {
                //Cuando el response no es un array, es decir, un solo registro
                if (response1.id != undefined) {
                    let response1Decrypt = {
                      codPadre: response1.codPadre,
                      descripcion: response1.descripcion,
                      fechaActualizacion: response1.fechaActualizacion,
                      fechaCreacion: response1.fechaCreacion,
                      id: response1.id,
                      parametro: response1.parametro,
                      tipo: response1.tipo,
                      valor: (response1.tipo === "SEGURIDAD" ? decryptJS(response1.valor) : response1.valor)
                    }
                    dispatch(antesVerParametros([response1Decrypt]))
                } else {
                    dispatch(antesVerParametros(objetoVacio))
                    console.log("Error : " + response1.codigo + " Mensaje: " + response1.mensaje + ": " + response1.descripcion)
                    //alert("No se encuentra el parámetro")
                }
            }
        })
    } else {
        //Buscando un registro en especifico por id o por un response
        APIInvoker.invokeGET('/parametros/padre?tipo=escenario&codpadre=' + resp, response => {
            if (Array.isArray(response)) {
                //si el response contiene varios registros
                if (response.length > 0 && response[0].id != undefined) {
                    let responseDecrypt = response.map(function (responseI, index, array) {
                        let devolver = {
                          codPadre: responseI.codPadre,
                          descripcion: responseI.descripcion,
                          fechaActualizacion: responseI.fechaActualizacion,
                          fechaCreacion: responseI.fechaCreacion,
                          id: responseI.id,
                          parametro: responseI.parametro,
                          tipo: responseI.tipo,
                          valor: (responseI.tipo === "SEGURIDAD" ? decryptJS(responseI.valor) : responseI.valor)
                        }
                        return devolver;
                    });
                    dispatch(verParametros(responseDecrypt))
                } else {
                    dispatch(verParametros([]))
                }
            } else {
                //si el response es un solo registro
                if (response.id != undefined) {
                    let responseDecrypt = {
                      codPadre: response.codPadre,
                      descripcion: response.descripcion,
                      fechaActualizacion: response.fechaActualizacion,
                      fechaCreacion: response.fechaCreacion,
                      id: response.id,
                      parametro: response.parametro,
                      tipo: response.tipo,
                      valor: (response.tipo === "SEGURIDAD" ? decryptJS(response.valor) : response.valor)
                    }
                    dispatch(verParametros([responseDecrypt]))
                } else {
                    dispatch(verParametros(objetoVacio))
                    console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                }
            }
        })
    }
}

const antesVerParametros = (resp) => (dispatch, getState) => {
    //dispatch(calculaPaginadorParametros())
    dispatch(verParametros(resp))
}
//Enviar la accion de ver parametros al Reducer STORE
const verParametros = (res) => ({
    type: CARGAR_PARAMETROS,
    lista: res
})
//Actualizar tecla por tecla los campos del formulario de parametros
export const updateFormParametros = (field, value) => (dispatch, getState) => {
    dispatch(updateFormParametrosRequest(field, value))
}
//Enviar al reducer la tecla pulsada
const updateFormParametrosRequest = (field, value) => ({
    type: UPDATE_PARAMETROS_FORM_REQUEST,
    field: field,
    value: value
})



export const updateFormConciliacionParametros = (idConciliacion, descConciliacion) => (dispatch, getState) => {
    console.log('dispatch', idConciliacion, descConciliacion)
    dispatch({
        type: UPDATE_PARAMETROS_CONCILIACION_FORM_REQUEST,
        idConciliacion,
        descConciliacion
    })
}

export const updateFormEscenarioParametros = (idEscenario, descEscenario) => (dispatch, getState) => {
    console.log('dispatch', idEscenario, descEscenario)
    dispatch({
        type: UPDATE_PARAMETROS_ESCENARIO_FORM_REQUEST,
        idEscenario,
        descEscenario
    })
}

//Funcion para guardar o actualizar el parametro
export const saveParametro = () => (dispatch, getState) => {
    let id_parametro = getState().parametroFormReducer.id
    //Si es un registro nuevo
    let codPadre = 0
    if (getState().parametroFormReducer.tipo == "CONCILIACION") {
        codPadre = getState().parametroFormReducer.conciliacion
    }else if(getState().parametroFormReducer.tipo == "ESCENARIO"){
        codPadre = getState().parametroFormReducer.escenario
    }
    APIInvoker.invokeGET('/parametros/findByAny?texto=V_Prefijo para parametros', responseval => {
        let parametro_salvar = {
            id: getState().parametroFormReducer.id,
            parametro: (responseval[0].tipo === "SEGURIDAD" ? decryptJS(responseval[0].valor) : responseval[0].valor).toUpperCase() + getState().parametroFormReducer.parametro,
            valor: (getState().parametroFormReducer.tipo === "SEGURIDAD" ? encryptJS(getState().parametroFormReducer.valor) : getState().parametroFormReducer.valor),
            descripcion: getState().parametroFormReducer.descripcion,
            tipo: getState().parametroFormReducer.tipo,
            codPadre: codPadre,
            username: window.localStorage.getItem("nombreUsuario")
        }
        if (id_parametro == 0 || id_parametro == undefined) {
            APIInvoker.invokePOST('/parametros', parametro_salvar, response => {
                if (response.ok) {
                    $('#modalAdd').modal('hide');
                    dispatch(mostrarModal("alert alert-success", response.description))
                    dispatch(limpiarFormParametro())
                    dispatch(refreshListParametro())
                } else {
                    toast.error(response.description, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    dispatch(refreshListParametro())
                }
            }, error => {
                console.log("No se ha podido crear el parámetro con id" + id_parametro)
            })
        } else {
            APIInvoker.invokePUT('/parametros', parametro_salvar, response => {
                if (response.ok) {
                    dispatch(refreshListParametro())
                    dispatch(limpiarFormParametro())
                    browserHistory.push('/parametros')
                    dispatch(mostrarModal("alert alert-success", response.description))
                } else {
                    toast.error(response.description, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            }, error => {
                console.log("No se ha podido actualizar el parámetro")
            })
        }
    })
}

//Funcion para limpiar los campos del formulario de Parametros
export const limpiarFormParametro = () => ({
    type: LIMPIAR_FORM_PARAMETRO
})

//Funcion para cargar el parametro en el formulario
export const cargarParametro = (idparametro) => (dispatch, getState) => {
    APIInvoker.invokeGET('/parametros/' + idparametro, response => {
        if (Array.isArray(response) == true) {
            if (response[0].id != undefined) {
                let responseDecrypt = response.map(function (responseI, index, array) {
                    let devolver = {
                      codPadre: responseI.codPadre,
                      codPadreDesc: responseI.codPadreDesc,
                      descripcion: responseI.descripcion,
                      fechaActualizacion: responseI.fechaActualizacion,
                      fechaCreacion: responseI.fechaCreacion,
                      id: responseI.id,
                      parametro: responseI.parametro,
                      tipo: responseI.tipo,
                      valor: (responseI.tipo === "SEGURIDAD" ? decryptJS(responseI.valor) : responseI.valor)
                    }
                    return devolver;
                });
                dispatch(cargarParametroEnForm(responseDecrypt))
            } else {
                toast.error("No se pudo cargar el parámetro en el formulario", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log("Error " + response[0].codigo + " : " + response[0].mensaje + " " + response[0].descripcion)
            }
        } else {
            if (response.id != undefined) {
                let responseDecrypt = {
                  codPadre: response.codPadre,
                  codPadreDesc: response.codPadreDesc,
                  descripcion: response.descripcion,
                  fechaActualizacion: response.fechaActualizacion,
                  fechaCreacion: response.fechaCreacion,
                  id: response.id,
                  parametro: response.parametro,
                  tipo: response.tipo,
                  valor: (response.tipo === "SEGURIDAD" ? decryptJS(response.valor) : response.valor)
                }
                dispatch(cargarParametroEnForm([responseDecrypt]))
            } else {
                toast.error("No se pudo cargar el parámetro en el formulario", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log("Error " + response.codigo + " : " + response.mensaje + " " + response.descripcion)
            }
        }
    }, error => {
        console.log('No se pudo actualizar los campos')
    })
}

//Enviar la acción de cargar el parametro al reducer
const cargarParametroEnForm = (parametro) => ({
    type: CARGAR_PARAMETRO_FORM,
    parametro: parametro
})

//Funcion que elimina un parametro
export const borrarParametro = () => (dispatch, getState) => {
    let idparametro = getState().parametroFormReducer.id
    let nomparametro = getState().parametroFormReducer.parametro
    APIInvoker.invokeDELETE('/parametros/' + idparametro + '/' + window.localStorage.getItem("nombreUsuario"), null,  response => {
        if(response.ok){
            dispatch(mostrarModal("alert alert-success", "Se eliminó el parámetro " + nomparametro))
            dispatch(
                limpiarFormParametro(),
                browserHistory.push('/parametros')
            )
        }else{
            toast.error(response.description, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }, error => {})
}

//Funcion de cambio de pagina
export const moverPaginaParametros = (pagina) => (dispatch, getState) => {
    let NumPagsTotales = getState().parametroReducer.paginador.length
    if (pagina > 0 && pagina <= NumPagsTotales) {
        dispatch(irAPaginaParametros(pagina))
        dispatch(refreshListParametro())
    }
}

const irAPaginaParametros = (pagina) => ({
    type: IR_PAGINA_PARAMETROS,
    pagina: pagina
})

export const cargarParametrosAVencer = () => (dispatch, getState)=>{
    APIInvoker.invokeGET('/parametros/findAVencer', response => {
        if (Array.isArray(response) == true) {
           // dispatch(cargarListadoParametros(response))
           console.log("a vencer",response);
           dispatch(mostrarModal("alert alert-warning", "Tiene parámetros por vencer: " + response.map(function(e){ return e.parametro })))
        }
    })
}


//Funcion que carga el combo de escenarios
export const cargarListadoEscenarioEnParametros = (filter, callback) => (dispatch, getState) => {
    APIInvoker.invokeGET(`/escenarios?name=${filter}`, response => {
        if (Array.isArray(response) == true) {
            dispatch(cargarListadoParametrosEscenarios(response))
            let options = response.map(x => {return {value: x.id, label: x.nombre} })
            callback(options)
        }
    })
}

//Funcion que carga el combo de conciliaciones
export const cargarListadoConciliacionEnParametros = (filter, callback) => (dispatch, getState) => {
    APIInvoker.invokeGET(`/conciliaciones?name=${filter}`, response => {
        if (Array.isArray(response) == true) {
            dispatch(cargarListadoParametros(response))
            let options = response.map(x => {return {value: x.id, label: x.nombre} })
            callback(options)
        }
    })
}

//Envia resultado para llenar el combo a Reducer
const cargarListadoParametrosEscenarios = (arrayEscenarios) => ({
    type: CARGA_ESCENARIOS_EN_PARAMETROS,
    lista: arrayEscenarios
})

//Envia resultado para llenar el combo a Reducer
const cargarListadoParametros = (arrayEscenarios) => ({
    type: CARGA_CONCILIACIONES_EN_PARAMETROS,
    lista: arrayEscenarios
})

/*
 *  A C C I O N E S  D E  Q U E R I E S
 *  para realizar todas las acciones necesarias del crud de querys
 */

//Actualizar tecla por tecla el campo de texto del buscador
export const updateTextFindQuery = (field, value) => (dispatch, getState) => {
    dispatch(updateTextQueryFindRequest(field, value))
}
//Enviar el texto del buscador al reducer store
const updateTextQueryFindRequest = (field, value) => ({
    type: UPDATE_FINDER,
    field: field,
    value: value
})
//Realizar la búsqueda
export const findTextQuery = () => (dispatch, getState) => {
    let txtBuscar = getState().queryReducer.textoBuscarQuery
    if (txtBuscar != '') {
        APIInvoker.invokeGET('/queryescenario?texto=' + txtBuscar, response => {
            if (Array.isArray(response) == true) {
                if (response[0].id != undefined) {
                    dispatch(verQuerys(response))
                } else {
                    toast.warn("No se encuentran querys que cumplan con el criterio de búsqueda", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    console.log("Error : " + response[0].codigo + " Mensaje: " + response[0].mensaje + ": " + response[0].descripcion)
                }
            } else {
                if (response.id != undefined) {
                    dispatch(verQuerys(response))
                } else {
                    console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                    toast.warn("No se encuentran querys que cumplan con el criterio de búsqueda", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            }
        })
    } else {
        dispatch(moverPaginaQuerys(1));
    }
}

//Recalcular el paginador de querys
export const calculaPaginadorQuerys = () => (dispatch, getState) => {
    let numregs = 0
    //Obtener el numero total de registros antes de filtrar
    APIInvoker.invokeGET('/queryescenario/count', response => {
        if (!isNaN(response)) {
            numregs = response
            //Recalcula el paginador
            let totRegistros = numregs
            let regPagina = getState().queryReducer.registrosPorPagina
            let totPaginas = Math.ceil(totRegistros / regPagina)
            let array_paginador = new Array()
            let offset = 0
            let regfin = 0
            //console.log("TotRegistros ==")
            //console.log(totRegistros)
            for (let i = 1; i <= totPaginas; i++) {
                regfin = offset + regPagina - 1
                array_paginador.push({
                    "id": i,
                    "offset": offset
                })
                offset = regfin + 1
            }
            //console.log("Variable de paginador ==>")
            //console.log(array_paginador)
            //preparar variable para Enviar
            let update_paginador = {
                totalRegistros: numregs,
                registrosPorPagina: regPagina,
                paginador: array_paginador
            }
            dispatch(actualizarPaginadorQuerys(update_paginador))
        } else {
            console.log("Conteo de Registros de querys no válido")
        }
    })
}
//Envia las variables al store
const actualizarPaginadorQuerys = (array_paginador) => ({
    type: ACTUALIZA_PAGINADOR_QUERYS,
    lista: array_paginador
})

//Actualizar el listado de query
export const refreshListQuery = (idescenario) => (dispatch, getState) => {
    //console.log("EJECUTA REFRESH QUERY")
    let objetoVacio = new Object()
    //let escenarioActual = getState().queryReducer.escenario
    let conciliacionActual = getState().queryReducer.conciliacion.id
    let escenarioActual = getState().queryReducer.escenario.id || idescenario || ''
    if (escenarioActual != 0) {
        APIInvoker.invokeGET('/queryescenario/escenario/' + escenarioActual, response => {
            if (Array.isArray(response)) {
                if (response[0].id != undefined) {
                    dispatch(antesVerQuerys(response))
                } else {
                    console.log("Error : " + response[0].codigo + " Mensaje: " + response[0].mensaje + ": " + response[0].descripcion)
                    dispatch(antesVerQuerys(objetoVacio))
                }
            } else {
                console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                dispatch(antesVerQuerys([]))
            }
        })
    } else if (conciliacionActual != 0){
        APIInvoker.invokeGET('/queryescenario/conciliacion/' + conciliacionActual, response => {
            if (Array.isArray(response)) {
                if (response[0].id != undefined) {
                    console.log("Detecta conciliacionActual ==>>" + conciliacionActual)
                    console.log(response)
                    dispatch(antesVerQuerys(response))
                } else {
                    console.log("Error : " + response[0].codigo + " Mensaje: " + response[0].mensaje + ": " + response[0].descripcion)
                    dispatch(antesVerQuerys(objetoVacio))
                }
            } else {
                console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                dispatch(antesVerQuerys(objetoVacio))
            }
        })
    } else
    {
        //si no existe resp
        let regInicial = 0
        let pagActual = getState().queryReducer.paginaActual
        if (getState().queryReducer.paginador.length > 0) {
            regInicial = getState().queryReducer.paginador[pagActual - 1].offset
        }
        let regPagina = getState().queryReducer.registrosPorPagina
        APIInvoker.invokeGET('/queryescenario', response => {
            if (Array.isArray(response)) {
                if (response[0].id != undefined) {
                    dispatch(antesVerQuerys(response))
                } else {
                    console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                    dispatch(antesVerQuerys(objetoVacio))
                }
            } else {
                //console.log("****** ******Como es el response ::")
                //console.log(response)
                if (response.codigo == 404) {
                    dispatch(antesVerQuerys(objetoVacio))
                }
            }
        })
    }
}

const antesVerQuerys = (resp) => (dispatch, getState) => {
    //dispatch(calculaPaginadorQuerys()),
    dispatch(verQuerys(resp))
}
//Enviar la accion de ver querys al Reducer STORE
const verQuerys = (res) => ({
    type: CARGAR_QUERYS,
    lista: res
})

export const updEscenariosQuerys = (idescenario) => (dispatch, getState)=>{
    APIInvoker.invokeGET('/escenarios/' + idescenario, response => {
        if (response.id != undefined) {
            console.log(JSON.stringify(response));
            dispatch(updEscenariosenQuery(JSON.stringify(response)))
        } else {
            console.log('No se encuentra el escenario')
            dispatch(updEscenariosenQuery(JSON.stringify({
                "id": 0,
                "nombre": "Ningún escenario",
               // "queryAprobaciones": ["mensaje": ""]
            })))
        }
        dispatch(refreshListQuery())
    }, error => {
        console.log('No se pudo cargar las Propiedades del escenario ' + idconciliacion + ' en querys listar')
    })
}

const updEscenariosenQuery = (objEscenario) => ({
    type: UPDATE_ESCENARIO_EN_QUERYS,
    value: objEscenario
})

//Cargar el id conciliacion en el reducer de querys
export const updConciliacionQuerys = (idconciliacion) => (dispatch, getState) => {
    APIInvoker.invokeGET('/conciliaciones/' + idconciliacion, response => {
        if (response.id != undefined) {
            dispatch(updConciliacionenQuery(JSON.stringify(response)))
            dispatch(cargarComboEscenariosEnQuerys(idconciliacion))
        } else {
            console.log('No se encuentra la conciliacion')
            dispatch(updConciliacionenQuery(JSON.stringify({
                "id": 0,
                "nombre": "Ninguna conciliacion",
                "queryAprobaciones": ["mensaje": ""]
            })))

        }
        dispatch(refreshListQuery())
    }, error => {
        console.log('No se pudo cargar las Propiedades de la conciliacion ' + idconciliacion + ' en querys listar')
    })
}

const updConciliacionenQuery = (objConciliacion) => ({
    type: UPDATE_CONCILIACION_EN_QUERYS,
    value: objConciliacion
})

//Actualizar tecla por tecla los campos del formulario de querys
export const updateFormQuerys = (field, value) => (dispatch, getState) => {
    if (field == "query") {
        APIInvoker.invokeGET('/parametros/findByAny?texto=V_Palabras restringidas en queries', response => {
            if (response[0].valor != undefined) {
                let array_restringidas = (response[0].tipo === "SEGURIDAD" ? decryptJS(response[0].valor) : response[0].valor).split(';');
                let palabras_usadas = value.split(' ');
                let palabras_prohibidas = 0;
                for (var i = 0; i < array_restringidas.length; i++) {
                    for (var j = 0; j < palabras_usadas.length; j++) {
                        if (array_restringidas[i].toLowerCase() == palabras_usadas[j].toLowerCase()) {
                            palabras_prohibidas++;
                        }
                    }
                }
                if (palabras_prohibidas > 0) {
                    toast.dismiss()
                    toast.error("No use : '" + (response[0].tipo === "SEGURIDAD" ? decryptJS(response[0].valor) : response[0].valor) + "'", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            }
        })
    }
    dispatch(updateFormQuerysRequest(field, value))
}

export const updateEscenarioFormQuerys = (idEscenario, descEscenario) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_ESCENARIO_QUERYS_FORM_REQUEST,
        idEscenario,
        descEscenario
    })
}

//Enviar al reducer la tecla pulsada
const updateFormQuerysRequest = (field, value) => ({
    type: UPDATE_QUERYS_FORM_REQUEST,
    field: field,
    value: value
})
//Funcion para guardar o actualizar la query
export const saveQuery = () => (dispatch, getState) => {
    let id_query = getState().queryFormReducer.id
    APIInvoker.invokeGET('/parametros/findByAny?texto=V_Palabras restringidas en queries', response => {
        if (response[0].valor != undefined) {
            let array_restringidas = (response[0].tipo === "SEGURIDAD" ? decryptJS(response[0].valor) : response[0].valor).split(';');
            let palabras_usadas = getState().queryFormReducer.query.split(' ');
            let palabras_prohibidas = 0;
            for (var i = 0; i < array_restringidas.length; i++) {
                for (var j = 0; j < palabras_usadas.length; j++) {
                    if (array_restringidas[i].toLowerCase() == palabras_usadas[j].toLowerCase()) {
                        palabras_prohibidas++;
                    }
                }
            }
            if (palabras_prohibidas > 0) {
                toast.error("Está usando palabras prohibidas en el query : '" + (response[0].tipo === "SEGURIDAD" ? decryptJS(response[0].valor) : response[0].valor) + "'", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            } else {
                if (id_query == 0 || id_query == undefined) {
                    //Si es un query nuevo
                    let query_salvar = {
                        nombreQuery: getState().queryFormReducer.nombre,
                        query: getState().queryFormReducer.query,
                        orden: getState().queryFormReducer.orden,
                        idEscenario: getState().queryFormReducer.idEscenario,
                        username: window.localStorage.getItem("nombreUsuario")
                    }
                    APIInvoker.invokePOST('/queryescenario', query_salvar, response => {
                        if (response.ok) {
                            $('#modalAdd').modal('hide');
                            dispatch(mostrarModal("alert alert-success", response.description));
                            dispatch(limpiarFormQuery());
                            dispatch(refreshListQuery());
                        } else {
                            toast.error(response.description, {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                        }
                    }, error => {
                        console.log('No se ha podido crear la query')
                    })
                } else {
                    //Si es actualizar un existente
                    let idConciliacionGrabar = 0
                    let nombreConciliacionGrabar = "Ninguna"
                    if (getState().queryReducer.conciliacion.id == 0) {
                        idConciliacionGrabar = getState().queryFormReducer.idConciliacion
                        nombreConciliacionGrabar = getState().queryFormReducer.nombreConciliacion
                    } else {
                        idConciliacionGrabar = getState().queryReducer.conciliacion.id
                        nombreConciliacionGrabar = getState().queryReducer.conciliacion.nombre
                    }
                    let query_salvar = {
                        id: getState().queryFormReducer.id,
                        nombreQuery: getState().queryFormReducer.nombre,
                        query: getState().queryFormReducer.query,
                        orden: getState().queryFormReducer.orden,
                        idEscenario: getState().queryFormReducer.idEscenario,
                        username: window.localStorage.getItem("nombreUsuario")
                    }
                    APIInvoker.invokePUT('/queryescenario', query_salvar, response => {
                        if (response.ok) {
                            dispatch(limpiarFormQuery())
                            dispatch(refreshListQuery())
                            browserHistory.push('/querys')
                            dispatch(mostrarModal("alert alert-success", response.description))
                        } else {
                            toast.error(response.description, {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                        }
                    }, error => {
                        console.log('No se ha podido actualizar la query')
                    })
                }
            }
        }
    })
}
//Funcion para limpiar los campos del formulario de Querys
export const limpiarFormQuery = () => ({
    type: LIMPIAR_FORM_QUERY
})
//Funcion para cargar la query en el formulario
export const cargarQuery = (idquery) => (dispatch, getState) => {
    APIInvoker.invokeGET('/queryescenario/' + idquery, response => {
        if (Array.isArray(response) == true) {
            dispatch(cargarQueryEnForm(response))
        } else {
            dispatch(cargarQueryEnForm([response]))
        }
    }, error => {
        console.log('No se pudo actualizar los campos')
    })
}
//Enviar la acción de cargar la query al reducer
const cargarQueryEnForm = (query) => ({
    type: CARGAR_QUERY_FORM,
    query: query
})
//Funcion que elimina una query
export const borrarQuery = () => (dispatch, getState) => {
    let idquery = getState().queryFormReducer.id
    let nomquery = getState().queryFormReducer.nombre
    APIInvoker.invokeDELETE('/queryescenario/' + idquery + '/' + window.localStorage.getItem("nombreUsuario"), null, response => {
        if (response.ok) {
            dispatch(mostrarModal("alert alert-success", response.description))
            dispatch(limpiarFormQuery(), browserHistory.push('/querys'))
        } else {
            toast.error(response.description, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }, error => {})

}

//Funcion de cambio de pagina
export const moverPaginaQuerys = (pagina) => (dispatch, getState) => {
    let NumPagsTotales = getState().queryReducer.paginador.length
    if (pagina > 0 && pagina <= NumPagsTotales) {
        dispatch(irAPaginaQuerys(pagina))
        dispatch(refreshListQuery())
    }
}
const irAPaginaQuerys = (pagina) => ({
    type: IR_PAGINA_QUERYS,
    pagina: pagina
})

//Funcion que carga el combo de escenarios
export const cargarComboEscenariosEnQuerys = (idConciliacion) => (dispatch, getState) => {
    let conciliacion = idConciliacion ? `/conciliacion/${idConciliacion}` : ''
    APIInvoker.invokeGET(`/escenarios${conciliacion}`, response => {
        if (Array.isArray(response) == true) {
            dispatch(cargarEscenariosenQuerys(response))
        }
    })
}

//Funcion que carga el combo de escenarios
export const cargarComboEscenariosEnQuerysByName = (filter, callback) => (dispatch, getState) => {
    APIInvoker.invokeGET(`/escenarios?name=${filter}`, response => {
        if (Array.isArray(response) == true) {
            dispatch(cargarEscenariosenQuerys(response))
            let options = response.map(x => {return {value: x.id, label: x.nombre} })
            callback(options)
        }
    })
}

//Envia resultado para llenar el combo a Reducer
const cargarEscenariosenQuerys = (arrayEscenarios) => (
    {
    type: CARGA_ESCENARIOS_EN_QUERYS,
    lista: arrayEscenarios
})

//Funcion que actualiza el escenario seleccionado en queries
export const updEscenarioQuerys = (idescenario) => (dispatch,getState) => {
    APIInvoker.invokeGET(`/escenarios${idescenario ? '/' + idescenario : ''}`, response => {
        if (response.id != undefined) {
            dispatch(asignarEscenarioSeleccionado(response))
        } else {
            console.log('No se encuentra el escenario')
            dispatch(limpiarEscenarioSeleccionado())
        }
        dispatch(refreshListQuery(idescenario))
    }, error => {
        console.log('No se pudo cargar las Propiedades del escenario ' + idescenario + ' en querys listar')
    })
}
//Funcion que elimina el valor ultimo seleccionado del combo
const asignarEscenarioSeleccionado = (listado) => ({
    type: ASIGNAR_ESCENARIO_SELECCIONADO,
    lista: listado
})

//Funcion que elimina el valor ultimo seleccionado del combo
const limpiarEscenarioSeleccionado = () => ({
    type: LIMPIAR_ESCENARIO_SELECCIONADO,
    lista: {
        "id": 0,
        "nombre": "Ninguno"
    }
})

//Funcion que carga las opciones de Conciliaciones en el combo de la parte superior en querys
export const cargarConciliacionesQuery = () => (dispatch, getState) => {
    APIInvoker.invokeGET('/conciliaciones', response => {
        if (Array.isArray(response) == true) {
            dispatch(cargarConciliacionesenQuery(response))
        }
    })
}
const cargarConciliacionesenQuery = (arrayConciliaciones) => ({
    type: CARGAR_CONCILIACIONES_QUERY,
    lista: arrayConciliaciones
})

//Funcion que graba cuando se rechazan los query de una conciliacion
export const rechazarConciliacion = () => (dispatch, getState) => {
    let aprobacion_salvar = {
        idConciliacion: getState().queryReducer.conciliacion.id,
        mensaje: getState().queryReducer.mensaje,
        estadoAprobacion: '0',
        username: window.localStorage.getItem("nombreUsuario")
    }
    APIInvoker.invokePOST('/queryaprobacion', aprobacion_salvar, response => {
        if (response.nombreConciliacion != undefined) {
            dispatch(mostrarModal("alert alert-success", "Se rechazaron los querys de la conciliación " + aprobacion_salvar.idConciliacion), browserHistory.push('/querys'));
        } else {
            if (response.mensaje == "CTRAINT_UQ_TBL_GAI_QUERIES_ESCENARIOS_COD_ESCENARIO") {
                //console.log("Error :"+response.codigo+" "+response.mensaje+", "+response.descripcion)
                toast.error("Ya existe una aprobación igual", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            } else {
                toast.error("Error general al intentar rechazar queries de una conciliación", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
        }
    }, error => {
        console.log('No se ha podido crear el rechazo de queries para una conciliación')
    })
}

//Funcion que graba cuando se aprueban los query de una conciliacion
export const aprobarConciliacion = () => (dispatch, getState) => {
    let aprobacion_salvar = {
        idConciliacion: getState().queryReducer.conciliacion.id,
        mensaje: getState().queryReducer.mensaje,
        estadoAprobacion: '1',
        username: window.localStorage.getItem("nombreUsuario")
    }
    APIInvoker.invokePOST('/queryaprobacion', aprobacion_salvar, response => {
        if (response.nombreConciliacion != undefined) {
            dispatch(mostrarModal("alert alert-success", "Se aprobaron los querys de la conciliación " + aprobacion_salvar.idConciliacion), browserHistory.push('/querys'));
        } else {
            if (response.mensaje == "CTRAINT_UQ_TBL_GAI_QUERIES_ESCENARIOS_COD_ESCENARIO") {
                //console.log("Error :"+response.codigo+" "+response.mensaje+", "+response.descripcion)
                toast.error("Ya existe una aprobación igual", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            } else {
                toast.error("Error general al intentar aprobar queries de una conciliación", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
        }
    }, error => {
        console.log('No se ha podido crear la aprobación de queries para una conciliación')
    })
}

//Actualizar tecla por tecla los campos del formulario de querys
export const updateFormAprobQuerys = (field, value) => (dispatch, getState) => {
    dispatch(updateFormAprobQuerysRequest(field, value))
}
//Enviar al reducer la tecla pulsada
const updateFormAprobQuerysRequest = (field, value) => ({
    type: UPDATE_QUERYS_APROB_FORM_REQUEST,
    field: field,
    value: value
})

/*
 *  A C C I O N E S  D E  U S U A R I O S
 *  para realizar todas las acciones necesarias del crud de usuarios
 */
//Actualizar tecla por tecla el campo de texto del buscador
export const updateTextFindUsuario = (field, value) => (dispatch, getState) => {
    dispatch(updateTextUsuarioFindRequest(field, value))
}
//Enviar el texto del buscador al reducer store
const updateTextUsuarioFindRequest = (field, value) => ({
    type: UPDATE_FINDER,
    field: field,
    value: value
})
//Realizar la búsqueda
export const findTextUsuario = () => (dispatch, getState) => {
  let objetoVacio = new Object()
  let txtBuscar = getState().usuarioReducer.textoBuscarUsuarios
  if (txtBuscar != '') {
      APIInvoker.invokeGET('/usuarios/findByAny?texto=' + txtBuscar, response => {
          if (Array.isArray(response) == true) {
              if (response[0].id != undefined) {
                  dispatch(verUsuarios(response))
              } else {
                  console.log("Error " + response[0].codigo + " : " + response[0].mensaje)
                  toast.warn("No se encontraron registros que satisfagan el criterio de búsqueda", {
                      position: toast.POSITION.BOTTOM_RIGHT
                  })
              }
          } else {
              if (response.id != undefined) {
                  dispatch(verUsuarios(response))
              } else {
                  console.log("Error " + response.codigo + " : " + response.mensaje)
                  toast.warn("No se encontraron registros que satisfagan el criterio de búsqueda", {
                      position: toast.POSITION.BOTTOM_RIGHT
                  })
              }
          }
      })
  } else {
      dispatch(moverPaginaUsuarios(1));
  }
}

//Funcion que carga el combo de roles
export const cargarComboRoles = () => (dispatch, getState) => {
    APIInvoker.invokeGET('/usuarios/getRoles', response => {
        if (Array.isArray(response) == true) {
            if (response[0].id != undefined) {
                dispatch(cargarRoles(response))
            } else {
                toast.info("No se encuentran Roles", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
        }
    })
}
//Envia resultado para llenar el combo a UsuarioReducer
const cargarRoles = (arrayRoles) => ({
    type: CARGA_ROLES,
    lista: arrayRoles
})

//Recalcular el paginador de usuario
export const calculaPaginadorUsuarios = () => (dispatch, getState) => {
    let numregs = 0
    //Obtener el numero total de registros antes de filtrar
    APIInvoker.invokeGET('/usuarios/count', response => {
        if (!isNaN(response)) {
            numregs = response
            //Recalcula el paginador
            let totRegistros = numregs
            let regPagina = getState().usuarioReducer.registrosPorPagina
            let totPaginas = Math.ceil(totRegistros / regPagina)
            let array_paginador = new Array()
            let offset = 0
            let regfin = 0
            //console.log("TotRegistros ==")
            //console.log(totRegistros)
            for (let i = 1; i <= totPaginas; i++) {
                regfin = offset + regPagina - 1
                array_paginador.push({
                    "id": i,
                    "offset": offset
                })
                offset = regfin + 1
            }
            //preparar variable para Enviar
            let update_paginador = {
                totalRegistros: numregs,
                registrosPorPagina: regPagina,
                paginador: array_paginador
            }
            dispatch(actualizarPaginadorUsuarios(update_paginador))
        } else {
            console.log("Conteo de Registros de usuario no válido")
        }
    })
}
//Envia las variables al store
const actualizarPaginadorUsuarios = (array_paginador) => ({
    type: ACTUALIZA_PAGINADOR_USUARIOS,
    lista: array_paginador
})

//Actualizar el listado de usuarios
export const refreshListUsuario = (resp) => (dispatch, getState) => {
  dispatch(cargarComboRoles())
    //Igual para jsonserver o API
    let objetoVacio = new Object()
    if (resp == null) {
        let regInicial = 0
        //Todos los registros de usuarios
        let pagActual = getState().usuarioReducer.paginaActual
        if (getState().usuarioReducer.paginador.length > 0) {
            regInicial = getState().usuarioReducer.paginador[pagActual - 1].offset
        }
        let regPagina = getState().usuarioReducer.registrosPorPagina
        APIInvoker.invokeGET('/usuarios?offset=' + regInicial + '&limit=' + regPagina, response1 => {
            if (Array.isArray(response1) == true) {
                //Array con todos los registros
                if (response1[0].id != undefined) {
                    dispatch(antesVerUsuarios(response1))
                } else {
                    dispatch(antesVerUsuarios(objetoVacio))
                    console.log("Error : " + response1[0].codigo + " Mensaje: " + response1[0].mensaje + ": " + response1[0].descripcion)
                }
            } else {
                //Cuando el response no es un array, es decir, un solo registro
                if (response1.id != undefined) {
                    dispatch(antesVerUsuarios([response1]))
                } else {
                    dispatch(antesVerUsuarios(objetoVacio))
                    console.log("Error : " + response1.codigo + " Mensaje: " + response1.mensaje + ": " + response1.descripcion)
                }
            }
        })
    } else {
        //Buscando un registro en especifico por id o por un response
        APIInvoker.invokeGET('/usuarios/' + resp, response => {
            if (Array.isArray(response) == true) {
                //si el response contiene varios registros
                if (response[0].id != undefined) {
                    dispatch(antesVerUsuarios(response))
                } else {
                    dispatch(antesVerUsuarios(objetoVacio))
                    console.log("Error : " + response[0].codigo + " Mensaje: " + response[0].mensaje + ": " + response[0].descripcion)
                }
            } else {
                //si el response es un solo registro
                if (response.id != undefined) {
                    dispatch(antesVerUsuarios([response]))
                } else {
                    dispatch(antesVerUsuarios(objetoVacio))
                    console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                }
            }
        })
    }
}

const antesVerUsuarios = (resp) => (dispatch, getState) => {
    dispatch(calculaPaginadorUsuarios())
    dispatch(verUsuarios(resp))
}
//Enviar la accion de ver usuarios al Reducer STORE
const verUsuarios = (res) => ({
    type: CARGAR_USUARIOS,
    lista: res
})
//Actualizar tecla por tecla los campos del formulario de usuarios
export const updateFormUsuarios = (field, value) => (dispatch, getState) => {
    dispatch(updateFormUsuariosRequest(field, value))
}
//Enviar al reducer la tecla pulsada
const updateFormUsuariosRequest = (field, value) => ({
    type: UPDATE_USUARIOS_FORM_REQUEST,
    field: field,
    value: value
})
//Funcion para guardar o actualizar el usuario
export const saveUsuario = () => (dispatch, getState) => {
  let id_usuario = getState().usuarioFormReducer.id
  if (id_usuario == 0 || id_usuario == undefined){
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(getState().usuarioFormReducer.email)){
      let usuario_salvar = {
          usuario: getState().loginFormReducer.username,
          email: getState().usuarioFormReducer.email,
          nombreUsuario: getState().usuarioFormReducer.nombreUsuario,
          fecha_creacion: '',
          fecha_actualizacion: '',
          username: getState().loginFormReducer.username
      }
      APIInvoker.invokePOST('/usuarios', usuario_salvar, response => {
          if (response.fechaCreacion != undefined) {
              $('#modalRegisterUser').modal('hide')
              $('#modalLoad').modal('hide')
              dispatch(limpiarFormUsuario())
              dispatch(limpiarFormLogin())
              localStorage.clear();
              browserHistory.push('/admin')
              dispatch(mostrarModal("alert alert-success", "Registro Exitoso. Bienvenido Usuario " + usuario_salvar.usuario + ". Por favor solicite asignación de rol a un administrador y vuelva a ingresar "))
          } else {
              //Enviar error específico a la consola
              console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
              if (response.mensaje == "CT_UQ_TBL_GAI_USUARIO_NOMBRE_USUARIO") {
                  toast.error("Ya existe un usuario con el mismo nombre", {
                      position: toast.POSITION.BOTTOM_RIGHT
                  })
              } else {
                  //Error sin tratamiento
                  toast.error("Error general al adicionar el Usuario", {
                      position: toast.POSITION.BOTTOM_RIGHT
                  })
              }
          }
      }, error => {
          console.log("No se ha podido crear el usuario")
      })
    }else {
        toast.error("No ha digitado un email válido", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }
  }else{
    let usuario_salvar = {
        id: getState().usuarioFormReducer.id,
        usuario: getState().usuarioFormReducer.usuario,
        email: getState().usuarioFormReducer.email,
        nombreUsuario: getState().usuarioFormReducer.nombreUsuario,
        idrol: getState().usuarioFormReducer.rol,
        username: window.localStorage.getItem("nombreUsuario")
    }
    APIInvoker.invokePUT('/usuarios', usuario_salvar, response => {
      if (response.id != undefined) {
        dispatch(mostrarModal("alert alert-success", "Se actualizó el usuario " + usuario_salvar.nombreUsuario))
        dispatch(limpiarFormUsuario())
        dispatch(refreshListUsuario())
        browserHistory.push('/usuarios')
      } else {
        if (response.mensaje == "CT_UQ_TBL_GAI_USUARIO_NOMBRE_USUARIO") {
          toast.error("Ya existe un usuario con el mismo nombre", {
            position: toast.POSITION.BOTTOM_RIGHT
          })
        } else {
          toast.error("Error general al intentar actualizar usuario", {
            position: toast.POSITION.BOTTOM_RIGHT
          })
          }
      }
    }, error => {
      console.log("No se ha podido actualizar el usuario")
    })
  }
}

//Funcion para limpiar los campos del formulario de Usuarios
export const limpiarFormUsuario = () => ({
    type: LIMPIAR_FORM_USUARIO
})

//Funcion para cargar el usuario en el formulario
export const cargarUsuario = (idusuario) => (dispatch, getState) => {
    APIInvoker.invokeGET('/usuarios/' + idusuario, response => {
        if (Array.isArray(response) == true) {
            if (response[0].id != undefined) {
                dispatch(cargarUsuarioEnForm(response))
            } else {
                toast.error("No se pudo cargar el usuario en el formulario", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log("Error " + response[0].codigo + " : " + response[0].mensaje + " " + response[0].descripcion)
            }
        } else {
            if (response.id != undefined) {
                dispatch(cargarUsuarioEnForm([response]))
            } else {
                toast.error("No se pudo cargar el usuario en el formulario", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log("Error " + response.codigo + " : " + response.mensaje + " " + response.descripcion)
            }
        }
    }, error => {
        console.log('No se pudo actualizar los campos')
    })
}

//Enviar la acción de cargar el usuario al reducer
const cargarUsuarioEnForm = (usuario) => ({
    type: CARGAR_USUARIO_FORM,
    usuario: usuario
})

//Funcion que elimina un Usuario
export const borrarUsuario = () => (dispatch, getState) => {
    let idusuario = getState().usuarioFormReducer.id
    let nombreUsuario = getState().usuarioFormReducer.nombreUsuario
    APIInvoker.invokeDELETE('/usuarios/' + idusuario + '/' + window.localStorage.getItem("nombreUsuario"), response => {}, error => {
        if (error.codigo == 200) {
            dispatch(mostrarModal("alert alert-success", "Se eliminó el Usuario " + nombreUsuario))
        } else if (error.codigo == 409) {
            toast.error("No es posible eliminar el Usuario, revise que no tenga rol asignado", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } else {
            toast.error("Error general al intentar eliminar un usuario", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
        dispatch(
            limpiarFormUsuario(),
            browserHistory.push('/usuarios')
        )
    })
}

//Funcion de cambio de pagina
export const moverPaginaUsuarios = (pagina) => (dispatch, getState) => {
    let NumPagsTotales = getState().usuarioReducer.paginador.length
    if (pagina > 0 && pagina <= NumPagsTotales) {
        dispatch(irAPaginaUsuarios(pagina))
        dispatch(refreshListUsuario())
    }
}

const irAPaginaUsuarios = (pagina) => ({
    type: IR_PAGINA_USUARIOS,
    pagina: pagina
})
