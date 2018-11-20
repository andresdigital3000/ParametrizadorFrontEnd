import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
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
    LIMPIAR_ESCENARIO_SELECCIONADO,
    CARGAR_CONCILIACIONES_QUERY,
    LIMPIAR_ESCENARIO_SELECCIONADO_EJ,
    CARGA_ESCENARIOS_EJ,
    UPDATE_VALUE_COMBO_ESCENARIOS_EJ,
    UPDATE_EJECUTAR_ESCENARIO_FORM_REQUEST,
    UPDATE_QUERYS_APROB_FORM_REQUEST,
    UPD_LINK_RESULTADOS,
    CARGAR_RESULTADOS,
    UPDATE_RESULTADOS_FORM_REQUEST,
    CARGAR_RESULTADOS_FORM,
    LIMPIAR_FORM_RESULTADO,
    UPDATE_CONCILIACION_EN_RESULTADOS,
    ACTUALIZA_PAGINADOR_RESULTADOS,
    IR_PAGINA_RESULTADOS,
    CARGAR_CONCILIACIONES_RESULTADO
} from './const'

import React from 'react'
import APIInvoker from '../utils/APIInvoker'
import {
    browserHistory
} from 'react-router'
import update from 'react-addons-update'
import config from '../../config'
import {
    ToastContainer,
    toast,
    dismiss
} from 'react-toastify';
import IMsg from '../ejecucionModule/IMsg'

var configuration = require('../../config');
const usarJsonServer = configuration.usarJsonServer

/*
 * A C C I O N E S   D E L   C O M P O N E N T E  L O G I N  F O R M  ILogin
 */
export const updateLoginForm = (field, value) => (dispatch, getState) => {
    dispatch(updateLoginFormRequest(field, value))
}

export const loginRequest = () => (dispatch, getState) => {
    if (configuration.usarJsonServer == false) {
        //Con el API REST sin modulo de logueo
        window.localStorage.setItem("token", "#$%EGt2eT##$EG%Y$Y&U&/IETRH45W$%whth$Y$%YGRT")
        window.localStorage.setItem("username", "emulado")
        window.location = '/';
    } else {
        //Con json server
        let usuario = getState().loginFormReducer.username
        let clave = getState().loginFormReducer.password

        APIInvoker.invokeGET('/login', response => {
            if (usuario == response.user && clave == response.password) {
                window.localStorage.setItem("token", response.token)
                window.localStorage.setItem("username", response.profile.userName)
                window.location = '/';
            } else {
                dispatch(loginFailForm('Nombre de usuario o contraseña errados'))
            }
        }, error => {
            dispatch(loginFailForm('NO SE LOGUEO'))
        })
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
    APIInvoker.invokeGET('/parametros/findByAny?texto=Link Resultados', response => {
        if (Array.isArray(response) == true) {
            dispatch(extraerLinkResultados(response[0].valor))
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
    if (configuration.usarJsonServer == false) {
        //con API REST sin modulo de logueo
        let token = window.localStorage.getItem("token")
        if (token == null) {
            dispatch(loginFail())
            browserHistory.push('/login');
        } else {
            window.localStorage.setItem("token", "#$%EGt2eT##$EG%Y$Y&U&/IETRH45W$%whth$Y$%YGRT")
            window.localStorage.setItem("username", "emulado")
            dispatch(loginSuccess({
                "userName": "Nombre de Usuario Test"
            }))
        }
    } else {
        //con json-server
        let token = window.localStorage.getItem("token")
        if (token == null) {
            dispatch(loginFail())
            browserHistory.push('/login');
        } else {
            APIInvoker.invokeGET('/login', response => {
                window.localStorage.setItem("token", response.token)
                window.localStorage.setItem("username", response.profile.userName)
                dispatch(loginSuccess(response.profile))
            }, error => {
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
export const updateTextFindPolitica = (field, value) => (dispatch, getState) => {
    dispatch(updateTextPoliticaFindRequest(field, value))
}
//Enviar el texto del buscador al reducer store
const updateTextPoliticaFindRequest = (field, value) => ({
    type: UPDATE_FINDER,
    field: field,
    value: value
})
//Realizar la búsqueda
export const findTextPolitica = () => (dispatch, getState) => {
    if (configuration.usarJsonServer == false) {
        //con API REST}
        let objetoVacio = new Object()
        let txtBuscar = getState().politicaReducer.textoBuscar
        if (txtBuscar != '') {
            APIInvoker.invokeGET('/politicas/findByAny?texto=' + txtBuscar, response => {
                if (Array.isArray(response) == true) {
                    if (response[0].id != undefined) {
                        dispatch(verPoliticas(response))
                    } else {
                        console.log("Error " + response[0].codigo + " : " + response[0].mensaje)
                        toast.warn("No se encontraron registros que satisfagan el criterio de búsqueda", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                    }
                } else {
                    if (response.id != undefined) {
                        dispatch(verPoliticas(response))
                    } else {
                        console.log("Error " + response.codigo + " : " + response.mensaje)
                        toast.warn("No se encontraron registros que satisfagan el criterio de búsqueda", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                        //dispatch(verPoliticas(objetoVacio))
                    }
                }
            })
        } else {
            dispatch(moverPaginaPoliticas(1));
        }
    } else {
        //con json-server
        let txtBuscar = getState().politicaReducer.textoBuscar
        APIInvoker.invokeGET('/politicas/' + txtBuscar, response => {
            dispatch(refreshListPolitica(response))
        })
    }
}

//Recalcular el paginador de politica
export const calculaPaginadorPoliticas = () => (dispatch, getState) => {
    let numregs = 0
    //Obtener el numero total de registros antes de filtrar
    APIInvoker.invokeGET('/politicas/count', response => {
        if (!isNaN(response)) {
            numregs = response
            //Recalcula el paginador
            let totRegistros = numregs
            let regPagina = getState().politicaReducer.registrosPorPagina
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
            dispatch(actualizarPaginadorPoliticas(update_paginador))
        } else {
            console.log("Conteo de Registros de politica no válido")
        }
    })
}
//Envia las variables al store
const actualizarPaginadorPoliticas = (array_paginador) => ({
    type: ACTUALIZA_PAGINADOR_POLITICAS,
    lista: array_paginador
})

//Actualizar el listado de politicas
export const refreshListPolitica = (resp) => (dispatch, getState) => {
    //Igual para jsonserver o API
    let objetoVacio = new Object()
    if (resp == null) {
        let regInicial = 0
        //Todos los registros de politicas
        let pagActual = getState().politicaReducer.paginaActual
        if (getState().politicaReducer.paginador.length > 0) {
            regInicial = getState().politicaReducer.paginador[pagActual - 1].offset
        }
        let regPagina = getState().politicaReducer.registrosPorPagina
        APIInvoker.invokeGET('/politicas?offset=' + regInicial + '&limit=' + regPagina, response1 => {
            if (Array.isArray(response1) == true) {
                //Array con todos los registros
                if (response1[0].id != undefined) {
                    dispatch(antesVerPoliticas(response1))
                } else {
                    dispatch(antesVerPoliticas(objetoVacio))
                    console.log("Error : " + response1[0].codigo + " Mensaje: " + response1[0].mensaje + ": " + response1[0].descripcion)
                    //alert("No se encuentran políticas")
                }
            } else {
                //Cuando el response no es un array, es decir, un solo registro
                if (response1.id != undefined) {
                    dispatch(antesVerPoliticas([response1]))
                } else {
                    dispatch(antesVerPoliticas(objetoVacio))
                    console.log("Error : " + response1.codigo + " Mensaje: " + response1.mensaje + ": " + response1.descripcion)
                    //alert("No se encuentra la política")
                }
            }
        })
    } else {
        //Buscando un registro en especifico por id o por un response
        APIInvoker.invokeGET('/politicas/' + resp, response => {
            if (Array.isArray(response) == true) {
                //si el response contiene varios registros
                if (response[0].id != undefined) {
                    dispatch(antesVerPoliticas(response))
                } else {
                    dispatch(antesVerPoliticas(objetoVacio))
                    console.log("Error : " + response[0].codigo + " Mensaje: " + response[0].mensaje + ": " + response[0].descripcion)
                }
            } else {
                //si el response es un solo registro
                if (response.id != undefined) {
                    dispatch(antesVerPoliticas([response]))
                } else {
                    dispatch(antesVerPoliticas(objetoVacio))
                    console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                }
            }
        })
    }
}

const antesVerPoliticas = (resp) => (dispatch, getState) => {
    dispatch(calculaPaginadorPoliticas())
    dispatch(verPoliticas(resp))
}
//Enviar la accion de ver politicas al Reducer STORE
const verPoliticas = (res) => ({
    type: CARGAR_POLITICAS,
    lista: res
})
//Actualizar tecla por tecla los campos del formulario de politicas
export const updateFormPoliticas = (field, value) => (dispatch, getState) => {
    if (field == "nombre") {
        APIInvoker.invokeGET('/parametros/findByAny?texto=Prefijo para politicas', response => {
            if (response[0].valor != undefined) {
                let long_parametro = response[0].valor.length;
                let long_value = value.length;
                if (long_value == long_parametro + 1) {
                    if (long_parametro >= long_value) {
                        if (value.substr(0, long_value).toUpperCase() != response[0].valor.substr(0, long_value).toUpperCase()) {
                            //toast.error("El nombre de la política debe tener el prefijo - '" + response[0].valor.toUpperCase() + "'", {
                            //    position: toast.POSITION.BOTTOM_RIGHT
                            //})
                        }
                    } else {
                        if (value.substr(0, long_parametro).toUpperCase() != response[0].valor.substr(0, long_parametro).toUpperCase()) {
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
//Funcion para guardar o actualizar la politica
export const savePolitica = () => (dispatch, getState) => {
    let id_politica = getState().politicaFormReducer.id
    //Si es un registro nuevo
    //Verificar que el nombre tenga el prefijo para guardarlo
    APIInvoker.invokeGET('/parametros/findByAny?texto=Prefijo para politicas', responseval => {
        let politica_salvar = {
            id: getState().politicaFormReducer.id,
            nombre: responseval[0].valor.toUpperCase() + getState().politicaFormReducer.nombre,
            descripcion: getState().politicaFormReducer.descripcion,
            objetivo: getState().politicaFormReducer.objetivo,
            fecha_creacion: '',
            fecha_actualizacion: '',
            usuario: getState().loginReducer.profile.userName
        }
        if (responseval[0].valor != undefined) {
            let long_parametro = responseval[0].valor.length;
            if (id_politica == 0 || id_politica == undefined) {
                APIInvoker.invokePOST('/politicas', politica_salvar, response => {
                    if (response.id != undefined) {
                        $('#modalAdd').modal('hide');
                        dispatch(mostrarModal("alert alert-success", "Se grabó la política " + politica_salvar.nombre))
                        dispatch(limpiarFormPolitica())
                        dispatch(refreshListPolitica())

                        //toast.success("Se grabó la política", {
                        //  position: toast.POSITION.BOTTOM_RIGHT
                        //})
                    } else {
                        //Enviar error específico a la consola
                        console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                        if (response.mensaje == "CT_UQ_TBL_GAI_POLITICA_NOMBRE_POLITICA") {
                            toast.error("Ya existe una política con el mismo nombre", {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                            dispatch(refreshListPolitica())
                        } else {
                            //Error sin tratamiento
                            toast.error("Error general al adicionar política", {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                            dispatch(refreshListPolitica())
                        }
                    }
                }, error => {
                    console.log("No se ha podido crear la politica con id" + id_politica)
                })
            } else {
                if (politica_salvar.nombre.substr(0, long_parametro).toUpperCase() == responseval[0].valor.toUpperCase()) {
                    let politica_salvar = {
                        id: getState().politicaFormReducer.id,
                        nombre: getState().politicaFormReducer.nombre,
                        descripcion: getState().politicaFormReducer.descripcion,
                        objetivo: getState().politicaFormReducer.objetivo,
                        fecha_creacion: '',
                        fecha_actualizacion: '',
                        usuario: getState().loginReducer.profile.userName
                    }
                    APIInvoker.invokePUT('/politicas', politica_salvar, response => {
                        if (response.id != undefined) {
                            dispatch(mostrarModal("alert alert-success", "Se actualizó la política " + politica_salvar.nombre))
                        } else {
                            if (response.mensaje == "CT_UQ_TBL_GAI_POLITICA_NOMBRE_POLITICA") {
                                toast.error("Ya existe una política con el mismo nombre", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                                //dispatch(refreshListPolitica())
                            } else {
                                toast.error("Error general al intentar actualizar politica", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                            }
                        }
                    }, error => {
                        console.log("No se ha podido actualizar la politica")
                    })
                } else {
                    toast.error("El nombre de la politica debe tener el prefijo... " + responseval[0].valor.toUpperCase(), {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }

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
        if (Array.isArray(response) == true) {
            if (response[0].id != undefined) {
                dispatch(cargarPoliticaEnForm(response))
            } else {
                toast.error("No se pudo cargar la politica en el formulario", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log("Error " + response[0].codigo + " : " + response[0].mensaje + " " + response[0].descripcion)
            }
        } else {
            if (response.id != undefined) {
                dispatch(cargarPoliticaEnForm([response]))
            } else {
                toast.error("No se pudo cargar la politica en el formulario", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log("Error " + response.codigo + " : " + response.mensaje + " " + response.descripcion)
            }
        }
    }, error => {
        console.log('No se pudo actualizar los campos')
    })
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
    APIInvoker.invokeDELETE('/politicas/' + idpolitica, response => {}, error => {
        if (error.codigo == 200) {
            dispatch(mostrarModal("alert alert-success", "Se eliminó la política " + nompolitica))
        } else if (error.codigo == 409) {
            toast.error("No es posible eliminar la política, revise que no tenga conciliación asociada", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } else {
            toast.error("Error general al intentar eliminar una política", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
        dispatch(
            limpiarFormPolitica(),
            browserHistory.push('/politicas')
        )
    })
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

//Funcion que carga el combo de politicas
export const cargarComboPoliticas = () => (dispatch, getState) => {
    APIInvoker.invokeGET('/politicas/findPoliticasSinConciliacion', response => {
        if (Array.isArray(response) == true) {
            if (response[0].id != undefined) {
                dispatch(cargarPoliticas(response))
            } else {
                toast.info("No se encuentran politicas sin conciliaciones asociadas", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
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
    let txtBuscar = getState().conciliacionReducer.textoBuscar
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
        APIInvoker.invokeGET('/conciliaciones?offset=' + regInicial + '&limit=' + regPagina, response1 => {
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
    dispatch(calculaPaginadorConciliaciones())
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
        if (response.id != undefined) {
            dispatch(updPoliticaReducerConciliacion(response))
        } else {
            console.log('No se encuentra la politica')
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
        APIInvoker.invokeGET('/parametros/findByAny?texto=Prefijo para conciliaciones', response => {
            if (response[0].valor != undefined) {
                let long_parametro = response[0].valor.length;
                let long_value = value.length;
                if (long_value == long_parametro + 1) {
                    if (long_parametro >= long_value) {
                        if (value.substr(0, long_value).toUpperCase() != response[0].valor.substr(0, long_value).toUpperCase()) {
                            //toast.error("El nombre de la conciliación debe tener el prefijo - '" + response[0].valor.toUpperCase() + "'", {
                            //    position: toast.POSITION.BOTTOM_RIGHT
                            //})
                        }
                    } else {
                        if (value.substr(0, long_parametro).toUpperCase() != response[0].valor.substr(0, long_parametro).toUpperCase()) {
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
        APIInvoker.invokeGET('/parametros/findByAny?texto=Prefijo para conciliaciones', responseval => {
            if (responseval[0].valor != undefined) {
                let long_parametro = responseval[0].valor.length;
                if (id_conciliacion == 0 || id_conciliacion == undefined) {
                    //Si es un registro nuevo
                    let conciliacion_salvar = {
                        id: getState().conciliacionFormReducer.id,
                        nombre: responseval[0].valor.toUpperCase() + getState().conciliacionFormReducer.nombre,
                        descripcion: getState().conciliacionFormReducer.descripcion,
                        usuarioAsignado: getState().conciliacionFormReducer.emailasignado,
                        requiereAprobacion: getState().conciliacionFormReducer.requiereAprobacion,
                        idPolitica: getState().conciliacionReducer.politica.id,
                        usuario: getState().loginReducer.profile.userName,
                        paquete: getState().conciliacionFormReducer.webservice,
                        tablaDestino: getState().conciliacionFormReducer.tablaDestino
                    }
                    let id_grabado = 0
                    APIInvoker.invokePOST('/conciliaciones', conciliacion_salvar, response => {
                        if (response.id != undefined) {
                            id_grabado = response.id
                            $('#modalAdd').modal('hide');
                            dispatch(mostrarModal("alert alert-success", "Se grabó la conciliación " + conciliacion_salvar.nombre))
                            dispatch(antesLimpiarFormConciliacion())
                            dispatch(limpiarFormConciliacion())
                        } else {
                            console.log("Error :" + response.codigo + " " + response.mensaje + ", " + response.descripcion)
                            if (response.mensaje == "CT_UQ_TBL_GAI_CONCILIACION_NOMBRE_CONCILIACION") {
                                toast.error("Ya existe otra conciliación con el mismo nombre", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                            } else if (response.descripcion == "El paquete ya existe") {
                                toast.error("El paquete ya se usó con otra conciliación", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                            } else {
                                toast.error("Error general al adicionar conciliación", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                            }
                        }
                    }, error => {
                        console.log('No se ha podido crear la conciliacion')
                    })
                    //dispatch(antesLimpiarFormConciliacion())
                } else {
                    if (getState().conciliacionFormReducer.nombre.substr(0, long_parametro).toUpperCase() == responseval[0].valor.toUpperCase()) {

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
                            nombre: getState().conciliacionFormReducer.nombre,
                            descripcion: getState().conciliacionFormReducer.descripcion,
                            usuarioAsignado: getState().conciliacionFormReducer.emailasignado,
                            requiereAprobacion: getState().conciliacionFormReducer.requiereAprobacion,
                            idPolitica: idPoliticaGrabar,
                            nombrePolitica: nombrePoliticaGrabar,
                            paquete: getState().conciliacionFormReducer.webservice,
                            tablaDestino: getState().conciliacionFormReducer.tablaDestino
                        }
                        APIInvoker.invokePUT('/conciliaciones', conciliacion_salvar, response => {
                            if (response.id != undefined) {
                                dispatch(mostrarModal("alert alert-success", "Se actualizó la conciliación " + conciliacion_salvar.nombre))
                            } else if (response.mensaje == "CT_UQ_TBL_GAI_CONCILIACION_NOMBRE_CONCILIACION") {
                                toast.error("No se puede usar el nombre de otra conciliación existente", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                            }
                        }, error => {
                            console.log('No se ha podido actualizar la conciliacion')
                        })
                    } else {
                        toast.error("El nombre de la conciliación debe tener el prefijo... " + responseval[0].valor.toUpperCase(), {
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                    }
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
        } else {
            dispatch(cargarConciliacionEnForm([response]))
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
//Funcion que elimina una conciliacion
export const borrarConciliacion = () => (dispatch, getState) => {
    let idconciliacion = getState().conciliacionFormReducer.id
    let nomconciliacion = getState().conciliacionFormReducer.nombre
    APIInvoker.invokeDELETE('/conciliaciones/' + idconciliacion, response2 => {}, error2 => {
        if (error2.codigo == 200) {
            //conciliacion_eliminada = true
            dispatch(
                limpiarFormConciliacion(),
                mostrarModal("alert alert-success", "Se eliminó la conciliación " + nomconciliacion)
            )
        } else if (error2.codigo == 409) {
            toast.error("Error al intentar eliminar una conciliación asociada a uno o varios escenarios", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } else {
            toast.error("Error general al intentar eliminar una conciliación", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
        dispatch(
            moverPaginaConciliaciones(1),
            browserHistory.push('/conciliaciones')
        )
    })
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
    let txtBuscar = getState().escenarioReducer.textoBuscar
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
            APIInvoker.invokeGET('/escenarios?offset=' + regInicial + '&limit=' + regPagina, response => {
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
    dispatch(calculaPaginadorEscenarios()),
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

//Actualizar tecla por tecla los campos del formulario de escenarios
export const updateFormEscenarios = (field, value) => (dispatch, getState) => {
    if (field == "nombre") {
        APIInvoker.invokeGET('/parametros/findByAny?texto=Prefijo para escenarios', response => {
            if (response[0].valor != undefined) {
                let long_parametro = response[0].valor.length;
                let long_value = value.length;
                if (long_value == long_parametro + 1) {
                    if (long_parametro >= long_value) {
                        if (value.substr(0, long_value).toUpperCase() != response[0].valor.substr(0, long_value).toUpperCase()) {
                            //toast.error("El nombre del escenario debe tener el prefijo -'" + response[0].valor.toUpperCase() + "'", {
                            //    position: toast.POSITION.BOTTOM_RIGHT
                            //})
                        }
                    } else {
                        if (value.substr(0, long_parametro).toUpperCase() != response[0].valor.substr(0, long_parametro).toUpperCase()) {
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
    APIInvoker.invokeGET('/parametros/findByAny?texto=Prefijo para escenarios', responseval => {
        if (responseval[0].valor != undefined) {
            let long_parametro = responseval[0].valor.length;
            if (getState().escenarioFormReducer.nombre.substr(0, long_parametro).toUpperCase() == responseval[0].valor.toUpperCase()) {
                if (id_escenario == 0 || id_escenario == undefined) {
                    //Si es un escenario nuevo
                    let escenario_salvar = {
                        nombre: responseval[0].valor.toUpperCase() + getState().escenarioFormReducer.nombre,
                        impacto: getState().escenarioFormReducer.impacto,
                        usuario: getState().loginReducer.profile.userName,
                        idConciliacion: getState().escenarioFormReducer.idConciliacion,
                        descripcion: getState().escenarioFormReducer.descripcion
                    }
                    //, nombreConciliacion : getState().escenarioFormReducer.nombreConciliacion
                    APIInvoker.invokePOST('/escenarios', escenario_salvar, response => {
                        if (response.id != undefined) {
                            $('#modalAdd').modal('hide');
                            dispatch(refreshListEscenario());
                            dispatch(mostrarModal("alert alert-success", "Se grabó el escenario " + escenario_salvar.nombre))
                            dispatch(limpiarFormEscenario());
                        } else {
                            if (response.mensaje == "CT_UQ_TBL_GAI_ESCENARIO_NOMBRE_ESCENARIO") {
                                //console.log("Error :"+response.codigo+" "+response.mensaje+", "+response.descripcion)
                                toast.error("Ya existe un escenario con el mismo nombre", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                            } else {
                                toast.error("Error general al intentar grabar un nuevo escenario", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                            }
                        }
                    }, error => {
                        console.log('No se ha podido crear la escenario')
                    })
                } else {
                    //Si es actualizar un existente
                    let idConciliacionGrabar = 0
                    let nombreConciliacionGrabar = "Ninguna"
                    if (getState().escenarioReducer.conciliacion.id == 0) {
                        idConciliacionGrabar = getState().escenarioFormReducer.idConciliacion
                        nombreConciliacionGrabar = getState().escenarioFormReducer.nombreConciliacion
                    } else {
                        idConciliacionGrabar = getState().escenarioReducer.conciliacion.id
                        nombreConciliacionGrabar = getState().escenarioReducer.conciliacion.nombre
                    }
                    let escenario_salvar = {
                        id: getState().escenarioFormReducer.id,
                        nombre: getState().escenarioFormReducer.nombre,
                        impacto: getState().escenarioFormReducer.impacto,
                        usuario: getState().loginReducer.profile.userName,
                        idConciliacion: idConciliacionGrabar,
                        nombreConciliacion: nombreConciliacionGrabar,
                        descripcion: getState().escenarioFormReducer.descripcion
                    }
                    APIInvoker.invokePUT('/escenarios', escenario_salvar, response => {
                        if (response.id != undefined) {
                            dispatch(mostrarModal("alert alert-success", "Se actualizó el escenario " + escenario_salvar.nombre))
                        } else {
                            if (response.mensaje == "CT_UQ_TBL_GAI_ESCENARIO_NOMBRE_ESCENARIO") {
                                toast.error("No se ha actualizó el escenario, el nombre de escenario que intenta guardar ya ha sido asignado", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                            } else {
                                toast.error("Error general al intentar actualizar el escenario", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                            }
                            //dispatch(limpiarFormEscenario(),browserHistory.push('/escenarios'))
                        }
                    }, error => {
                        console.log('No se ha podido actualizar la escenario')
                    })
                }
            } else {
                toast.error("El nombre del escenario debe tener el prefijo... " + responseval[0].valor.toUpperCase(), {
                    position: toast.POSITION.BOTTOM_RIGHT
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
    APIInvoker.invokeDELETE('/escenarios/' + idescenario, response => {}, error => {
        if (error.codigo == 200) {
            dispatch(mostrarModal("alert alert-success", "Se eliminó el escenario " + nomescenario))
        } else if (error.codigo == 500) {
            toast.error("No es posible eliminar el escenario, revise que no tenga indicadores y/o parámetros asociados", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } else if (error.mensaje == "CT_TBL_GAI_QUERIES_ESCENARIOS_FK_ESCENARIO") {
            toast.error("No es posible eliminar el escenario, tiene queries asociados", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } else {
            toast.error("Error general al intentar eliminar un escenario", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    })
    dispatch(limpiarFormEscenario(), browserHistory.push('/escenarios'))
}

//Cargar el combo de impactos en escenarios
export const cargarImpactos = () => (dispatch, getState) => {
    APIInvoker.invokeGET('/parametros/findByAny?texto=Impacto', response => {
        let array_opciones = new Array()
        if (response[0].valor != undefined) {
            array_opciones = response[0].valor.split(';');
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
export const cargarComboConciliaciones = () => (dispatch, getState) => {
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

//Solicita el estado de ejecución de una conciliacion
export const getStatusEjecucionConciliacion = (operacion) => (dispatch, getState) => {
    //Variables necesarias para llamar el webservice
    var xmlhttp = new XMLHttpRequest();
    let odiUser = configuration.webService.user
    let pwUser = configuration.webService.pw
    let repository = configuration.webService.repository
    let loadplaninstanceid = 1
    let idConciliacionEjecucion = getState().ejecucionReducer.conciliacion.id
    let nomConciliacionEjecucion = getState().ejecucionReducer.conciliacion.nombre
    //Construir peticion SOAP que solicita el estado de la ejecución
    var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:odi="xmlns.oracle.com/odi/OdiInvoke/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<odi:OdiGetLoadPlanStatusRequest>' +
        '<Credentials>' +
        '  <!--You may enter the following 3 items in any order-->' +
        '  <!--Optional:-->' +
        '  <OdiUser>' + odiUser + '</OdiUser>' +
        '  <!--Optional:-->' +
        '  <OdiPassword>' + pwUser + '</OdiPassword>' +
        '  <WorkRepository>' + repository + '</WorkRepository>' +
        '</Credentials>' +
        '<!--Zero or more repetitions:-->' +
        '<LoadPlanInstanceId>' + loadplaninstanceid + '</LoadPlanInstanceId>' +
        '<LoadPlans>' +
        '<LoadPlanRunNumber>' + idConciliacionEjecucion + '</LoadPlanRunNumber>' +
        '</LoadPlans>' +
        '</odi:OdiGetLoadPlanStatusRequest>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>'
    if (xmlhttp) {
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    idInstance = 0
                    var XMLParser = require('react-xml-parser');
                    var xml = new XMLParser().parseFromString(xmlhttp.response);
                    if (xml.getElementsByTagName('LoadPlanStatus')[0].value == 'D') {
                        idInstance = xml.getElementsByTagName('LoadPlaninstanceId')[0].value
                    } else if (xml.getElementsByTagName('LoadPlanStatus')[0].value == 'E') {
                        toast.error("Error al ejecutar el proceso, por favorcomuniquese con el asesor", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        })
                    } else if (xml.getElementsByTagName('LoadPlanStatus')[0].value == 'M') {
                        idInstance = xml.getElementsByTagName('LoadPlaninstanceId')[0].value
                        toast.success("Se inició la ejecución con éxito pero con algunos warnings", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        })
                    } else if (xml.getElementsByTagName('LoadPlanStatus')[0].value == 'Q') {
                        idInstance = xml.getElementsByTagName('LoadPlaninstanceId')[0].value
                        toast.success("La ejecución queda en cola", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        })
                    } else if (xml.getElementsByTagName('LoadPlanStatus')[0].value == 'W') {
                        idInstance = xml.getElementsByTagName('LoadPlaninstanceId')[0].value
                        toast.success("La ejecución está en espera", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        })
                    } else if (xml.getElementsByTagName('LoadPlanStatus')[0].value == 'R') {
                        toast.warning("La ejecución ya se encuentra corriendo", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        })
                    }
                } else {
                    toast.error("No hay conexión con el servicio de ODI", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            }
        }
        xmlhttp.open('POST', configuration.webService.url, true);
        //xmlhttp.setRequestHeader('Content-Type','text/html');
        xmlhttp.send(sr);
    } else {
        alert('no existe el objeto xmlhttp');
    }
}

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
    //Si hay instancia recuperada de la ejecución
    if (idPlanInstancia == 0) {
        //Construir petición json para Backend
        let startEjecucion = {
            "odiUser": configuration.webService.odiUser,
            "odiPassword": configuration.webService.odiPassword,
            "workRepository": configuration.webService.workRepository,
            "loadPlanName": paqueteAsociado,
            "contexto": configuration.webService.contexto,
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
                    console.log("RESPUESTA START REST ==>")
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
                        }
                        APIInvoker.invokePOST('/ejecucionproceso', ejecucion_salvar, response2 => {
                            if (response2.idPlanInstance != undefined) {
                                console.log("Se almacenó la información de la ejecución")
                                dispatch(cargarComboConciliaciones())
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
            "odiUser": configuration.webService.odiUser,
            "odiPassword": configuration.webService.odiPassword,
            "workRepository": configuration.webService.workRepository,
            "loadPlans": [{
                "loadPlanInstanceId": idPlanInstancia,
                "loadPlanRunNumber": configuration.webService.runCount
            }]
        }
        if (configuration.webService.debug == 1) {
            console.log("REQUEST STATUS LOAD PLAN ===>")
            console.log(consultarEjecucion)
        }
        APIInvoker.invokePOST('/odiRest/loadPlanStatus', consultarEjecucion, response => {
            if (configuration.webService.debug == 1) {
                console.log("RESPONSE STATUS REST ==>")
                console.log(response)
            }
            if (response[0].LoadPlanStatus != undefined) {
                if (response[0].LoadPlanStatus != "R") {
                    //Construir petición json para Backend
                    let startEjecucion = {
                        "odiUser": configuration.webService.odiUser,
                        "odiPassword": configuration.webService.odiPassword,
                        "workRepository": configuration.webService.workRepository,
                        "loadPlanName": paqueteAsociado,
                        "contexto": configuration.webService.contexto,
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
                                    }
                                    APIInvoker.invokePOST('/ejecucionproceso', ejecucion_salvar, response2 => {
                                        if (response2.idPlanInstance != undefined) {
                                            console.log("Se almacenó la información de la ejecución")
                                            dispatch(cargarComboConciliaciones())
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
                    toast.error("Se encuentra en ejecución " + idPlanInstancia, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            }
        })
    }
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
    if (idPlanInstancia != 0) {
        //Construir petición json para Backend
        let consultarEjecucion = {
            "odiUser": configuration.webService.odiUser,
            "odiPassword": configuration.webService.odiPassword,
            "workRepository": configuration.webService.workRepository,
            "loadPlans": [{
                "loadPlanInstanceId": idPlanInstancia,
                "loadPlanRunNumber": configuration.webService.runCount
            }]
        }
        if (configuration.webService.debug == 1) {
            console.log("REQUEST STATUS LOAD PLAN ===>")
            console.log(consultarEjecucion)
        }
        APIInvoker.invokePOST('/odiRest/loadPlanStatus', consultarEjecucion, response => {
            if (configuration.webService.debug == 1) {
                console.log("RESPONSE STATUS REST ==>")
                console.log(response)
            }
            if (response[0].LoadPlanStatus != undefined) {
                if (response[0].LoadPlanStatus == "R") {
                    //Construir petición json para Backend
                    let stopEjecucion = {
                        "odiUser": configuration.webService.odiUser,
                        "odiPassword": configuration.webService.odiPassword,
                        "workRepository": configuration.webService.workRepository,
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
                            dispatch(cargarComboConciliaciones())
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
                    console.log("Ejecucion de conciliación id : " + idPlanInstancia + " en estado : " + response[0].LoadPlanStatus)
                    toast.error("Sólo pueden detenerse conciliaciones en estado 'R'", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                }
            } else {
                if (response[0].codigo != undefined) {
                    toast.error("Error ODI: " + response[0].descripcion, {
                        position: toast.POSITION.BOTTOM_RIGHT,
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
        fechaAgendamiento: fechaProgramada
    }

    APIInvoker.invokePOST('/conciliaciones/progEjecucion', progConciliacion, response => {
        console.log('RESPONSE:', response);
        if (response.id != undefined) {
            //   id_grabado = response.id
            $('#modalAdd').modal('hide');
            dispatch(mostrarModal("alert alert-success", "Se grabó la conciliación " + paraconciliacion))
            dispatch(antesLimpiarFormConciliacion())
            dispatch(limpiarFormConciliacion())
        } else {
            console.log("Error :" + response.codigo + " " + response.mensaje + ", " + response.descripcion)
            /*if(response.mensaje=="CT_UQ_TBL_GAI_CONCILIACION_NOMBRE_CONCILIACION"){
              toast.error("Ya existe otra conciliación con el mismo nombre", {
                position: toast.POSITION.BOTTOM_RIGHT
              })
            }else{
              toast.error("Error general al adicionar conciliación", {
                position: toast.POSITION.BOTTOM_RIGHT
              })
            }*/
        }
    }, error => {
        console.log('No se ha podido crear la conciliacion')
    })

    /* toast.warn("Grabar hora:minuto="+hora+":"+minuto+" de la fecha="+fecha+", No hay servicio de backend", {
       position: toast.POSITION.BOTTOM_RIGHT,
     })*/
}

/**
 *  E J E C U C I O N  E S C E N A R I O S
 */

//Funcion que elimina el valor ultimo seleccionado del combo
export const limpiarEscenarioSeleccionadoE = () => ({
    type: LIMPIAR_ESCENARIO_SELECCIONADO_EJ,
    lista: {
        "id": 0,
        "nombre": "Ninguno"
    }
})

//Funcion que carga el combo de conciliaciones
export const cargarComboEscenariosE = () => (dispatch, getState) => {
    APIInvoker.invokeGET('/escenarios', response => {
        if (Array.isArray(response) == true) {
            dispatch(cargarEscenariosE(response))
            dispatch(limpiarEscenarioSeleccionadoE())
        }
    })
}
//Envia resultado para llenar el combo a Reducer
const cargarEscenariosE = (arrayEscenarios) => ({
    type: CARGA_ESCENARIOS_EJ,
    lista: arrayEscenarios
})

export const updateEjecucionE = (field, value) => (dispatch, getState) => {
    dispatch(updateComboEscenariosE(field, value))
}

//Enviar el texto del buscador al reducer store
const updateComboEscenariosE = (field, value) => ({
    type: UPDATE_VALUE_COMBO_ESCENARIOS_EJ,
    field: field,
    value: value
})

//Solicita el estado de ejecución de una conciliacion
export const getStatusEjecucionEscenarios = (operacion) => (dispatch, getState) => {
    //Variables necesarias para llamar el webservice
    var xmlhttp = new XMLHttpRequest();
    let odiUser = configuration.webService.user
    let pwUser = configuration.webService.pw
    let repository = configuration.webService.repository
    let loadplaninstanceid = 1
    let idEscenarioEjecucion = getState().ejecucionReducer.escenario.id
    let nomEscenarioEjecucion = getState().ejecucionReducer.escenario.nombre
    //Construir peticion SOAP que solicita el estado de la ejecución
    var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:odi="xmlns.oracle.com/odi/OdiInvoke/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<odi:OdiGetLoadPlanStatusRequest>' +
        '<Credentials>' +
        '  <!--You may enter the following 3 items in any order-->' +
        '  <!--Optional:-->' +
        '  <OdiUser>' + odiUser + '</OdiUser>' +
        '  <!--Optional:-->' +
        '  <OdiPassword>' + pwUser + '</OdiPassword>' +
        '  <WorkRepository>' + repository + '</WorkRepository>' +
        '</Credentials>' +
        '<!--Zero or more repetitions:-->' +
        '<LoadPlanInstanceId>' + loadplaninstanceid + '</LoadPlanInstanceId>' +
        '<LoadPlans>' +
        '<LoadPlanRunNumber>' + idEscenarioEjecucion + '</LoadPlanRunNumber>' +
        '</LoadPlans>' +
        '</odi:OdiGetLoadPlanStatusRequest>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>'
    if (xmlhttp) {
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    idInstance = 0
                    var XMLParser = require('react-xml-parser');
                    var xml = new XMLParser().parseFromString(xmlhttp.response);
                    if (xml.getElementsByTagName('LoadPlanStatus')[0].value == 'D') {
                        idInstance = xml.getElementsByTagName('LoadPlaninstanceId')[0].value
                    } else if (xml.getElementsByTagName('LoadPlanStatus')[0].value == 'E') {
                        toast.error("Error al ejecutar el proceso, por favorcomuniquese con el asesor", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        })
                    } else if (xml.getElementsByTagName('LoadPlanStatus')[0].value == 'M') {
                        idInstance = xml.getElementsByTagName('LoadPlaninstanceId')[0].value
                        toast.success("Se inició la ejecución con éxito pero con algunos warnings", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        })
                    } else if (xml.getElementsByTagName('LoadPlanStatus')[0].value == 'Q') {
                        idInstance = xml.getElementsByTagName('LoadPlaninstanceId')[0].value
                        toast.success("La ejecución queda en cola", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        })
                    } else if (xml.getElementsByTagName('LoadPlanStatus')[0].value == 'W') {
                        idInstance = xml.getElementsByTagName('LoadPlaninstanceId')[0].value
                        toast.success("La ejecución está en espera", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        })
                    } else if (xml.getElementsByTagName('LoadPlanStatus')[0].value == 'R') {
                        toast.warning("La ejecución ya se encuentra corriendo", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        })
                    }
                } else {
                    toast.error("No hay conexión con el servicio de ODI", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            }
        }
        xmlhttp.open('POST', configuration.webService.url, true);
        //xmlhttp.setRequestHeader('Content-Type','text/html');
        xmlhttp.send(sr);
    } else {
        alert('no existe el objeto xmlhttp');
    }
}

export const doEjecutarEscenario = () => (dispatch, getState) => {
    //decidir si llamar el web service o no segun lo recibido
    let idEscenarioEjecucion = getState().ejecucionReducer.escenario.id
    let nomEscenarioEjecucion = getState().ejecucionReducer.escenario.nombre
    let idPlanInstancia = 0

    //Backend necesia proveerme por escenario sus ejecuciones así como lo hace con conciliaciones para saber si ya existe una ejecución
    //let numEjecuciones = getState().ejecucionReducer.escenario.ejecucionesProceso.length - 1
    //if(getState().ejecucionReducer.escenario.ejecucionesProceso.length > 0){
    //  idPlanInstancia = getState().ejecucionReducer.escenario.ejecucionesProceso[numEjecuciones].idPlanInstance
    //}
    //tener en cuenta periodicidad
    //APIInvoker.invokeGET('/parametros?findByAny=Periodicidad ws conciliacion', response => {
    //  if(Array.isArray(response) == true){
    //    dispatch(cargarConciliaciones(response))
    //  }
    //})
    //Si hay instancia recuperada de la ejecución
    if (idPlanInstancia == 0) {
        //Variables necesarias para llamar el webservice
        let odiUser = configuration.webService.user
        let pwUser = configuration.webService.pw
        let repository = configuration.webService.repository
        let context = 1
        let loglevel = 6
        //Construir peticion SOAP
        var sr = '<?xml version="1.0" encoding="UTF-8"?>' +
            '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:odi="xmlns.oracle.com/odi/OdiInvoke/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<prod:startLoadPlan>' +
            '<!--Optional:-->' +
            '<OdiUser>' + odiUser + '</OdiUser>' +
            '<!--Optional:-->' +
            '<OdiPassword>' + pwUser + '</OdiPassword>' +
            '<!--Optional:-->' +
            '<workRepository>' + repository + '</workRepository>' +
            '<!--Optional:-->' +
            '<loadPlanName>' + nomEscenarioEjecucion + '</loadPlanName>' +
            '<!--Optional:-->' +
            '<contexto>' + context + '</contexto>' +
            '</prod:startLoadPlan>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';

        var xmlhttp = new XMLHttpRequest();
        if (xmlhttp) {
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var XMLParser = require('react-xml-parser');
                        var xml = new XMLParser().parseFromString(xmlhttp.response);
                        let idInstance = 0
                        if (xml.getElementsByTagName('OdiLoadPlanInstanceId')[0].value != '') {
                            idInstance = xml.getElementsByTagName('OdiLoadPlanInstanceId')[0].value
                            dispatch(mostrarModal("alert alert-success", "Inicio de ejecución de proceso exitoso :" + idInstance))
                            //toast.success("Inicio de ejecución de proceso exitoso", {
                            //  position: toast.POSITION.BOTTOM_RIGHT,
                            //})
                        }
                        if (idInstance != 0) {
                            let ejecucion_salvar = {
                                nombre: nomEscenarioEjecucion,
                                idPlanInstance: idInstance,
                                idEscenario: idEscenarioEjecucion,
                            }
                            APIInvoker.invokePOST('/ejecucionproceso', ejecucion_salvar, response2 => {
                                if (response2.idPlanInstance != undefined) {
                                    //toast.success("...y se almacenó la información de la ejecución", {
                                    //  position: toast.POSITION.BOTTOM_RIGHT
                                    //})
                                    console.log("...y se almacenó la información de la ejecución")
                                    dispatch(cargarComboEscenarios())
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
                        toast.error("No hay conexión con el servicio de ODI", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                    }
                }
            }
            xmlhttp.open('POST', configuration.webService.url, true);
            //xmlhttp.setRequestHeader('Access-Control-Allow-Methods','*');
            //xmlhttp.setRequestHeader('Content-Type','text/xml');
            xmlhttp.send(sr);
        } else {
            toast.error("No se creó objeto xmlhttp", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    } else {
        toast.error("Ya se encuentra en ejecución id " + idPlanInstancia, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }
}

export const doCancelarEscenario = () => (dispatch, getState) => {
    //Variables necesarias para llamar el webservice
    var xmlhttp = new XMLHttpRequest();
    let idEscenarioEjecucion = getState().ejecucionReducer.escenario.id
    let nomEscenarioEjecucion = getState().ejecucionReducer.escenario.nombre
    let idPlanInstancia = 0
    //let numEjecuciones = getState().ejecucionReducer.escenario.ejecucionesProceso.length - 1
    //if(getState().ejecucionReducer.escenario.ejecucionesProceso.length > 0){
    //  idPlanInstancia = getState().ejecucionReducer.escenario.ejecucionesProceso[numEjecuciones].idPlanInstance
    //}
    if (idPlanInstancia != 0) {
        let odiUser = configuration.webService.user
        let pwUser = configuration.webService.pw
        let repository = configuration.webService.repository
        let context = 1
        let loglevel = 6
        let runcount = 0
        let stoplevel = 1
        //Construir peticion SOAP
        var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:odi="xmlns.oracle.com/odi/OdiInvoke/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<odi:OdiStopLoadPlanRequest>' +
            '   <!--You may enter the following 2 items in any order-->' +
            '   <Credentials>' +
            '      <!--You may enter the following 3 items in any order-->' +
            '      <!--Optional:-->' +
            '      <!--Optional:-->' +
            '      <OdiUser>' + odiUser + '</OdiUser>' +
            '      <OdiPassword>' + pwUser + '</OdiPassword>' +
            '      <WorkRepository>' + repository + '</WorkRepository>' +
            '   </Credentials>' +
            '   <OdiStopLoadPlanRequest>' +
            '      <LoadPlanInstanceId>' + idPlanInstancia + '</LoadPlanInstanceId>' +
            '      <LoadPlanInstanceRunCount>' + runcount + '</LoadPlanInstanceRunCount>' +
            '      <StopLevel>' + stoplevel + '</StopLevel>' +
            '   </OdiStopLoadPlanRequest>' +
            '</odi:OdiStopLoadPlanRequest>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        if (xmlhttp) {
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var XMLParser = require('react-xml-parser');
                        var xml = new XMLParser().parseFromString(xmlhttp.response);
                        console.log(getState().ejecucionReducer.escenario.id);
                        console.log(xml.getElementsByTagName('OdiLoadPlanInstanceId'));
                        if (xml.getElementsByTagName('OdiLoadPlanInstanceId')[0].value == idPlanInstancia) {
                            dispatch(mostrarModal("alert alert-success", "Se detuvo la ejecución correctamente :" + idPlanInstancia))
                            //toast.success("Se detuvo la ejecución correctamente", {
                            //  position: toast.POSITION.BOTTOM_RIGHT,
                            //})
                            dispatch(cargarComboConciliaciones())
                        } else {
                            toast.error("No se ha podido detener", {
                                position: toast.POSITION.BOTTOM_RIGHT,
                            })
                        }
                    } else {
                        toast.error("No hay conexión con el servicio de ODI", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                    }
                }
            }
            xmlhttp.open('POST', configuration.webService.url, true);
            xmlhttp.send(sr);
        } else {
            alert('no existe el objeto xmlhttp');
        }
    } else {
        toast.error("No se ha ejecutado", {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }
}


//Programar Conciliaciones
//Actualizar tecla por tecla los campos del formulario de conciliaciones
export const updateFormEjecutarEscenarios = (field, value) => (dispatch, getState) => {
    dispatch(updateFormEjecutarEscenariosRequest(field, value))
}

//Enviar al reducer la tecla pulsada
const updateFormEjecutarEscenariosRequest = (field, value) => ({
    type: UPDATE_EJECUTAR_ESCENARIO_FORM_REQUEST,
    field: field,
    value: value
})


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
    dispatch(calculaPaginadorResultados()),
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
    APIInvoker.invokeGET('/parametros/findByAny?texto=Paquete aprobado', response => {
        if (response[0].valor != undefined) {
            let paqueteAsociado = response[0].valor
            //Construir petición json para Backend


            if (paqueteAsociado != 0) {
                APIInvoker.invokeGET('/resconciliacion/' + idRenglon, responseResConciliacion => {
                    let paramCodConciliacion = responseResConciliacion.codConciliacion
                    let paramIdEjecucion = responseResConciliacion.idEjecucion
                    let startEjecucion = {
                        "odiUser": configuration.webService.odiUser,
                        "odiPassword": configuration.webService.odiPassword,
                        "workRepository": configuration.webService.workRepository,
                        "loadPlanName": paqueteAsociado,
                        "contexto": configuration.webService.contexto,
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
                        if (response.StartedRunInformation != undefined) {
                            let idInstance = 0
                            if (response.StartedRunInformation.OdiLoadPlanInstanceId != undefined) {
                                idInstance = response.StartedRunInformation.OdiLoadPlanInstanceId
                                console.log("Se recibió del WebService el idInstance : " + idInstance)
                                toast.success("Se envio la solicitud de aprobacion exitosamente")
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
                })
            }

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
    APIInvoker.invokeGET('/parametros/findByAny?texto=Paquete no aprobado', response => {
        if (response[0].valor != undefined) {
            let paqueteAsociado = response[0].valor
            //Construir petición json para Backend
            let startEjecucion = {
                "odiUser": configuration.webService.odiUser,
                "odiPassword": configuration.webService.odiPassword,
                "workRepository": configuration.webService.workRepository,
                "loadPlanName": paqueteAsociado,
                "contexto": configuration.webService.contexto
            }
            if (paqueteAsociado != 0) {
                APIInvoker.invokeGET('/resconciliacion/' + idRenglon, responseResConciliacion => {
                    let paramCodConciliacion = responseResConciliacion.codConciliacion
                    let paramIdEjecucion = responseResConciliacion.idEjecucion
                    let startEjecucion = {
                        "odiUser": configuration.webService.odiUser,
                        "odiPassword": configuration.webService.odiPassword,
                        "workRepository": configuration.webService.workRepository,
                        "loadPlanName": paqueteAsociado,
                        "contexto": configuration.webService.contexto,
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
                        if (response.StartedRunInformation != undefined) {
                            let idInstance = 0
                            if (response.StartedRunInformation.OdiLoadPlanInstanceId != undefined) {
                                idInstance = response.StartedRunInformation.OdiLoadPlanInstanceId
                                console.log("Se recibió del WebService el idInstance : " + idInstance)
                                toast.success("Se envio la solicitud de rechazo exitosamente")
                            }
                            if (idInstance != 0) {
                                let salvar_aprobado = {
                                    id: idRenglon,
                                    estado: "RECHAZADO"
                                }
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
                })
            }
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
    if (configuration.usarJsonServer == false) {
        //con API REST}
        let objetoVacio = new Object()
        let txtBuscar = getState().indicadorReducer.textoBuscar
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
    } else {
        //con json-server
        let txtBuscar = getState().indicadorReducer.textoBuscar
        APIInvoker.invokeGET('/indicadores/' + txtBuscar, response => {
            dispatch(refreshListIndicador(response))
        })
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
        APIInvoker.invokeGET('/indicadores?offset=' + regInicial + '&limit=' + regPagina, response1 => {
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
    dispatch(calculaPaginadorIndicadores())
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
            idEscenario: getState().indicadorFormReducer.escenario.id
        }
        APIInvoker.invokePOST('/indicadores', indicador_salvar, response => {
            if (response.id != undefined) {
                dispatch(limpiarFormIndicador())
                dispatch(refreshListIndicador())
                $('#modalAdd').modal('hide');
                dispatch(mostrarModal("alert alert-success", "Se grabó el indicador " + indicador_salvar.nombreFormula));
                //toast.success("Se grabó el indicador", {
                //  position: toast.POSITION.BOTTOM_RIGHT
                //})
            } else {
                //Enviar error específico a la consola
                console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                if (response.mensaje == "CT_UQ_TBL_GAI_INDICADORES_NOMBRE_FORMULA") {
                    toast.error("Ya existe un indicador con el mismo nombre", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    dispatch(refreshListIndicador())
                } else {
                    //Error sin tratamiento
                    toast.error("Error general al adicionar indicador", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    dispatch(refreshListIndicador())
                }
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
            idEscenario: getState().indicadorFormReducer.idEscenario
        }
        APIInvoker.invokePUT('/indicadores', indicador_salvar, response => {
            if (response.id != undefined) {
                dispatch(mostrarModal("alert alert-success", "Se actualizó el indicador " + indicador_salvar.nombreFormula));
                //toast.success("Se actualizó el indicador", {
                //  position: toast.POSITION.BOTTOM_RIGHT
                //})
                //dispatch(limpiarFormIndicador(),browserHistory.push('/indicadores'))
            } else {
                if (response.mensaje == "CT_UQ_TBL_GAI_INDICADORES_NOMBRE_FORMULA") {
                    toast.error("Ya existe un indicador con el mismo nombre", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    //dispatch(refreshListIndicador())
                } else {
                    toast.error("Error general al intentar actualizar indicador", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
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
                console.log("CARGAR PARAMETROS ==> de escenario" + response[0].idEscenario)
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
                    console.log("CARGAR PARAMETROS ==> de escenario" + response.idEscenario)
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
    APIInvoker.invokeDELETE('/indicadores/' + idindicador, response => {}, error => {
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
    if (configuration.usarJsonServer == false) {
        //con API REST}
        let objetoVacio = new Object()
        let txtBuscar = getState().parametroReducer.textoBuscar
        if (txtBuscar != '') {
            APIInvoker.invokeGET('/parametros/findByAny?texto=' + txtBuscar, response => {
                if (Array.isArray(response) == true) {
                    if (response[0].id != undefined) {
                        dispatch(verParametros(response))
                    } else {
                        console.log("Error " + response[0].codigo + " : " + response[0].mensaje)
                        toast.warn("No se encontraron registros que satisfagan el criterio de búsqueda", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                    }
                } else {
                    if (response.id != undefined) {
                        dispatch(verParametros(response))
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
    } else {
        //con json-server
        let txtBuscar = getState().parametroReducer.textoBuscar
        APIInvoker.invokeGET('/parametros/' + txtBuscar, response => {
            dispatch(refreshListParametro(response))
        })
    }
}

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
        APIInvoker.invokeGET('/parametros?offset=' + regInicial + '&limit=' + regPagina, response1 => {
            if (Array.isArray(response1) == true) {
                //Array con todos los registros
                if (response1[0].id != undefined) {
                    dispatch(antesVerParametros(response1))
                } else {
                    dispatch(antesVerParametros(objetoVacio))
                    console.log("Error : " + response1[0].codigo + " Mensaje: " + response1[0].mensaje + ": " + response1[0].descripcion)
                    //alert("No se encuentran parametros")
                }
            } else {
                //Cuando el response no es un array, es decir, un solo registro
                if (response1.id != undefined) {
                    dispatch(antesVerParametros([response1]))
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
            if (Array.isArray(response) == true) {
                //si el response contiene varios registros
                if (response[0].id != undefined) {
                    dispatch(verParametros(response))
                } else {
                    dispatch(verParametros(objetoVacio))
                    console.log("Error : " + response[0].codigo + " Mensaje: " + response[0].mensaje + ": " + response[0].descripcion)
                }
            } else {
                //si el response es un solo registro
                if (response.id != undefined) {
                    dispatch(verParametros([response]))
                } else {
                    dispatch(verParametros(objetoVacio))
                    console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                }
            }
        })
    }
}

const antesVerParametros = (resp) => (dispatch, getState) => {
    dispatch(calculaPaginadorParametros())
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
//Funcion para guardar o actualizar el parametro
export const saveParametro = () => (dispatch, getState) => {
    let id_parametro = getState().parametroFormReducer.id
    //Si es un registro nuevo
    let codPadre = 0
    if (getState().parametroFormReducer.tipo == "CONCILIACION") {
        codPadre = getState().parametroFormReducer.escenario
    }
    let parametro_salvar = {
        id: getState().parametroFormReducer.id,
        parametro: getState().parametroFormReducer.parametro,
        valor: getState().parametroFormReducer.valor,
        descripcion: getState().parametroFormReducer.descripcion,
        tipo: getState().parametroFormReducer.tipo,
        codPadre: codPadre
    }
    if (id_parametro == 0 || id_parametro == undefined) {
        APIInvoker.invokePOST('/parametros', parametro_salvar, response => {
            if (response.id != undefined) {
                dispatch(limpiarFormParametro())
                dispatch(refreshListParametro())
                //toast.success("Se grabó el parámetro", {
                //  position: toast.POSITION.BOTTOM_RIGHT
                //})
                $('#modalAdd').modal('hide');
                dispatch(mostrarModal("alert alert-success", "Se grabó el parámetro " + parametro_salvar.parametro))
            } else {
                //Enviar error específico a la consola
                console.log("Error : " + response.codigo + " Mensaje: " + response.mensaje + ": " + response.descripcion)
                if (response.mensaje == "CT_UQ_TBL_GAI_PARAMETROS") {
                    toast.error("Ya existe un parámetro con el mismo nombre", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    dispatch(refreshListParametro())
                } else {
                    //Error sin tratamiento
                    toast.error("Error general al adicionar parámetro", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    dispatch(refreshListParametro())
                }
            }
        }, error => {
            console.log("No se ha podido crear el parámetro con id" + id_parametro)
        })
    } else {
        APIInvoker.invokePUT('/parametros', parametro_salvar, response => {
            if (response.id != undefined) {
                dispatch(mostrarModal("alert alert-success", "Se actualizó el parámetro " + parametro_salvar.parametro))
                //dispatch(limpiarFormParametro(),browserHistory.push('/parametros'))
            } else {
                if (response.mensaje == "CT_UQ_TBL_GAI_PARAMETROS") {
                    toast.error("Ya existe un parámetro con el mismo nombre", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    //dispatch(refreshListParametro())
                } else {
                    toast.error("Error general al intentar actualizar parámetro", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            }
        }, error => {
            console.log("No se ha podido actualizar el parámetro")
        })
    }
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
                dispatch(cargarParametroEnForm(response))
            } else {
                toast.error("No se pudo cargar el parámetro en el formulario", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log("Error " + response[0].codigo + " : " + response[0].mensaje + " " + response[0].descripcion)
            }
        } else {
            if (response.id != undefined) {
                dispatch(cargarParametroEnForm([response]))
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
    APIInvoker.invokeDELETE('/parametros/' + idparametro, response => {}, error => {
        dispatch(mostrarModal("alert alert-success", "Se eliminó el parámetro " + nomparametro))
        dispatch(
            limpiarFormParametro(),
            browserHistory.push('/parametros')
        )
    })
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

//Funcion que carga el combo de escenarios
export const cargarListadoEnParametros = () => (dispatch, getState) => {
    let paramTipo = "conciliaciones" //getState().parametroFormReducer.tipo
    APIInvoker.invokeGET('/' + paramTipo, response => {
        if (Array.isArray(response) == true) {
            dispatch(cargarListadoParametros(response))
        }
    })
}
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
    let txtBuscar = getState().queryReducer.textoBuscar
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
export const refreshListQuery = () => (dispatch, getState) => {
    //console.log("EJECUTA REFRESH QUERY")
    let objetoVacio = new Object()
    let conciliacionActual = getState().queryReducer.conciliacion.id
    if (conciliacionActual != 0) {
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
    } else {
        //si no existe resp
        let regInicial = 0
        let pagActual = getState().queryReducer.paginaActual
        if (getState().queryReducer.paginador.length > 0) {
            regInicial = getState().queryReducer.paginador[pagActual - 1].offset
        }
        let regPagina = getState().queryReducer.registrosPorPagina
        APIInvoker.invokeGET('/queryescenario?offset=' + regInicial + '&limit=' + regPagina, response => {
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
    dispatch(calculaPaginadorQuerys()),
        dispatch(verQuerys(resp))
}
//Enviar la accion de ver querys al Reducer STORE
const verQuerys = (res) => ({
    type: CARGAR_QUERYS,
    lista: res
})

//Cargar el id conciliacion en el reducer de querys
export const updConciliacionQuerys = (idconciliacion) => (dispatch, getState) => {
    APIInvoker.invokeGET('/conciliaciones/' + idconciliacion, response => {
        if (response.id != undefined) {
            dispatch(updConciliacionenQuery(JSON.stringify(response)))
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
        APIInvoker.invokeGET('/parametros/findByAny?texto=Palabras restringidas en queries', response => {
            if (response[0].valor != undefined) {
                let array_restringidas = response[0].valor.split(';');
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
                    toast.error("No use : '" + response[0].valor + "'", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            }
        })
    }
    dispatch(updateFormQuerysRequest(field, value))
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
    APIInvoker.invokeGET('/parametros/findByAny?texto=Palabras restringidas en queries', response => {
        if (response[0].valor != undefined) {
            let array_restringidas = response[0].valor.split(';');
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
                toast.error("Está usando palabras prohibidas en el query : '" + response[0].valor + "'", {
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
                        usuario: getState().loginReducer.profile.userName
                    }
                    APIInvoker.invokePOST('/queryescenario', query_salvar, response => {
                        if (response.nombreQuery != undefined) {
                            $('#modalAdd').modal('hide');
                            dispatch(mostrarModal("alert alert-success", "Se grabó el query " + query_salvar.nombreQuery));
                            dispatch(limpiarFormQuery());
                            dispatch(refreshListQuery());
                        } else {
                            if (response.mensaje == "CTRAINT_UQ_TBL_GAI_QUERIES_ESCENARIOS_COD_ESCENARIO") {
                                toast.error("Ya existe un query con el mismo nombre", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                            } else {
                                toast.error("Error general al intentar grabar un nuevo query", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                            }
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
                        usuario: getState().loginReducer.profile.userName
                    }
                    APIInvoker.invokePUT('/queryescenario', query_salvar, response => {
                        if (response.id != undefined) {
                            dispatch(mostrarModal("alert alert-success", "Se actualizó el query " + query_salvar.nombreQuery))
                        } else {
                            if (response.mensaje == "CTRAINT_UQ_TBL_GAI_QUERIES_ESCENARIOS_COD_ESCENARIO") {
                                toast.error("No se ha actualizó el query, el nombre no puede asignarse", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                            } else {
                                toast.error("Error general al intentar actualizar el query", {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                            }
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
    APIInvoker.invokeDELETE('/queryescenario/' + idquery, response => {}, error => {
        if (error.codigo == 200) {
            dispatch(mostrarModal("alert alert-success", "Se eliminó el query " + nomquery))
        } else if (error.codigo == 500) {
            toast.error("No es posible eliminar el query, revise que no tenga indicadores y/o parámetros asociados", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } else {
            toast.error("Error general al intentar eliminar un query", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    })
    dispatch(limpiarFormQuery(), browserHistory.push('/querys'))
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
export const cargarComboEscenariosEnQuerys = () => (dispatch, getState) => {
    APIInvoker.invokeGET('/escenarios', response => {
        if (Array.isArray(response) == true) {
            dispatch(cargarEscenariosenQuerys(response))
        }
    })
}
//Envia resultado para llenar el combo a Reducer
const cargarEscenariosenQuerys = (arrayEscenarios) => ({
    type: CARGA_ESCENARIOS_EN_QUERYS,
    lista: arrayEscenarios
})

//Funcion que elimina el valor ultimo seleccionado del combo
export const limpiarEscenarioSeleccionado = () => ({
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
        usuario: getState().loginReducer.profile.userName
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
        usuario: getState().loginReducer.profile.userName
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
