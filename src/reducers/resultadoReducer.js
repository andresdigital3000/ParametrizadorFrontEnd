import {
  UPDATE_FINDER,
  CARGAR_RESULTADOS,
  ACTUALIZA_PAGINADOR_RESULTADOS,
  UPDATE_CONCILIACION_EN_RESULTADOS,
  CARGAR_CONCILIACIONES_RESULTADO,
  IR_PAGINA_RESULTADOS
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  paginaActual:1,
  registrosPorPagina:7,
  totalRegistros:15,
  textoBuscar:"",
  resultados:[],
  conciliacion : 0,
  paginador: [],
  conciliaciones : []
}

export const resultadoReducer = (state = initialState,action) =>{
  switch (action.type) {
        case UPDATE_FINDER:
          return update(state,{
            [action.field] : {$set: action.value}
          })
        case ACTUALIZA_PAGINADOR_RESULTADOS:
            return update(state,{
              totalRegistros : {$set: action.lista.totalRegistros},
              registrosPorPagina : {$set: action.lista.registrosPorPagina},
              paginador : {$set: action.lista.paginador}
            })
        case IR_PAGINA_RESULTADOS:
            return update(state,{
              paginaActual : {$set: action.pagina}
            })
        case CARGAR_RESULTADOS:
            return update(state,{
              resultados : {$set: action.lista}
            })
        case UPDATE_CONCILIACION_EN_RESULTADOS:
            return update(state,{
              conciliacion: {$set: action.value}
           })
        case CARGAR_CONCILIACIONES_RESULTADO:
            return update(state,{
               conciliaciones: {$set: action.lista}
            })
      default:
        return state
  }
}

export default resultadoReducer
