import {
  UPDATE_FINDER,
  CARGAR_CONCILIACIONES,
  UPDATE_POLITICA_EN_CONCILIACIONES,
  ACTUALIZA_PAGINADOR_CONCILIACIONES,
  IR_PAGINA_CONCILIACIONES,
  CARGA_POLITICAS,
  CARGAR_POLITICA_EN_CONCILIACION,
  CARGAR_CONCILIACION_FORM_2
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  paginaActual:1,
  registrosPorPagina:7,
  totalRegistros:1,
  textoBuscarConciliacion:"",
  conciliaciones:[],
  politica:{"id":0},
  politicas:[],
  paginador: []
}

export const conciliacionReducer = (state = initialState,action) =>{
  switch (action.type) {
      case CARGAR_CONCILIACION_FORM_2:
      return update(state,{
          politica: {
            id: {$set: action.conciliacion[0].idPolitica},
            nombre: {$set: action.conciliacion[0].nombrePolitica}
          }
        })
      case UPDATE_FINDER:
        return update(state,{
          [action.field] : {$set: action.value}
        })
      case ACTUALIZA_PAGINADOR_CONCILIACIONES:
          return update(state,{
            totalRegistros : {$set: action.lista.totalRegistros},
            registrosPorPagina : {$set: action.lista.registrosPorPagina},
            paginador : {$set: action.lista.paginador}
          })
      case IR_PAGINA_CONCILIACIONES:
          return update(state,{
            paginaActual : {$set: action.pagina}
          })
      case CARGAR_CONCILIACIONES:
        return update(state,{
          conciliaciones : {$set: action.lista}
        })
      case UPDATE_POLITICA_EN_CONCILIACIONES:
        return update(state,{
          politica: {$set: action.value}
        })
      case CARGA_POLITICAS:
        return update(state,{
          politicas: {$set: action.lista}
        })
      case CARGAR_POLITICA_EN_CONCILIACION:
        return update(state,{
          politica:{$set: action.value}
        })
    default:
      return state
  }
}

export default conciliacionReducer
