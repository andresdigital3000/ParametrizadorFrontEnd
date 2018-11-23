import {
  UPDATE_FINDER,
  CARGAR_ESCENARIOS,
  ACTUALIZA_PAGINADOR_ESCENARIOS,
  UPDATE_CONCILIACION_EN_ESCENARIOS,
  CARGAR_CONCILIACIONES_ESCENARIO,
  IR_PAGINA_ESCENARIOS,
  CARGAR_COMBO_IMPACTOS
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  paginaActual:1,
  registrosPorPagina:7,
  totalRegistros:15,
  textoBuscarEscenario:"",
  escenarios:[],
  conciliacion : 0,
  paginador: [],
  conciliaciones : [],
  impactos : []
}

export const escenarioReducer = (state = initialState,action) =>{
  switch (action.type) {
        case UPDATE_FINDER:
          return update(state,{
            [action.field] : {$set: action.value}
          })
        case ACTUALIZA_PAGINADOR_ESCENARIOS:
            return update(state,{
              totalRegistros : {$set: action.lista.totalRegistros},
              registrosPorPagina : {$set: action.lista.registrosPorPagina},
              paginador : {$set: action.lista.paginador}
            })
        case IR_PAGINA_ESCENARIOS:
            return update(state,{
              paginaActual : {$set: action.pagina}
            })
        case CARGAR_ESCENARIOS:
            return update(state,{
              escenarios : {$set: action.lista}
            })
        case UPDATE_CONCILIACION_EN_ESCENARIOS:
            return update(state,{
              conciliacion: {$set: action.value}
           })
        case CARGAR_CONCILIACIONES_ESCENARIO:
            return update(state,{
               conciliaciones: {$set: action.lista}
            })
        case CARGAR_COMBO_IMPACTOS:
            return update(state,{
               impactos: {$set: action.lista}
            })
      default:
        return state
  }
}

export default escenarioReducer
