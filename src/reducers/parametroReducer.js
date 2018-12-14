import {
  UPDATE_FINDER,
  MOVE_PAGE_FIRST,
  MOVE_PAGE_PREV,
  MOVE_PAGE_NEXT,
  MOVE_PAGE_LAST,
  CARGAR_PARAMETROS,
  ACTUALIZA_PAGINADOR_PARAMETROS,
  IR_PAGINA_PARAMETROS,
  UPDATE_ESCENARIO_EN_PARAMETROS,
  CARGA_CONCILIACIONES_EN_PARAMETROS,
  UPDATE_TIPO_EN_PARAMETROS
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  paginaActual:1,
  registrosPorPagina:7,
  totalRegistros:1,
  textoBuscarParametro:"",
  parametros:[],
  paginador: [],
  escenario:{"id":0,"nombre":"Ningun Escenario"},
  escenarios:[],
  tipo: ""
}

export const parametroReducer = (state = initialState,action) =>{
  switch (action.type) {
    case UPDATE_FINDER:
        return update(state,{
          [action.field] : {$set: action.value}
        })
    case ACTUALIZA_PAGINADOR_PARAMETROS:
        return update(state,{
          totalRegistros : {$set: action.lista.totalRegistros},
          registrosPorPagina : {$set: action.lista.registrosPorPagina},
          paginador : {$set: action.lista.paginador}
        })
    case IR_PAGINA_PARAMETROS:
        return update(state,{
          paginaActual : {$set: action.pagina}
        })
    case CARGAR_PARAMETROS:
      //console.log("Lista de parametros: "+ JSON.stringify(action.lista))
      return update(state,{
        parametros : {$set: action.lista}
      })
    case UPDATE_ESCENARIO_EN_PARAMETROS:
      return update(state,{
        escenario: {$set: JSON.parse(action.value)}
      })
    case CARGA_CONCILIACIONES_EN_PARAMETROS:
      return update(state,{
        escenarios: {$set: action.lista}
      })
    case UPDATE_TIPO_EN_PARAMETROS:
      return update(state,{
        tipo : { $set: action.value}
      })
    default:
      return state
  }
}

export default parametroReducer
