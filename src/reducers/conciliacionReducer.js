import {
  UPDATE_FINDER,
  CARGAR_CONCILIACIONES,
  UPDATE_POLITICA_EN_CONCILIACIONES,
  ACTUALIZA_PAGINADOR_CONCILIACIONES,
  IR_PAGINA_CONCILIACIONES,
  CARGA_POLITICAS
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  paginaActual:1,
  registrosPorPagina:7,
  totalRegistros:1,
  textoBuscar:"",
  conciliaciones:[],
  politica:{"id":0},
  politicas:[],
  paginador: []
}

export const conciliacionReducer = (state = initialState,action) =>{
  switch (action.type) {
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
    default:
      return state
  }
}

export default conciliacionReducer
