import {
  UPDATE_FINDER,
  MOVE_PAGE_FIRST,
  MOVE_PAGE_PREV,
  MOVE_PAGE_NEXT,
  MOVE_PAGE_LAST,
  CARGAR_INDICADORES,
  ACTUALIZA_PAGINADOR_INDICADORES,
  IR_PAGINA_INDICADORES,
  UPDATE_ESCENARIO_EN_INDICADORES,
  CARGA_ESCENARIOS_EN_INDICADORES,
  UPDATE_RESULTADO_EN_INDICADORES,
  CARGA_RESULTADOS_EN_INDICADORES
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  paginaActual:1,
  registrosPorPagina:7,
  totalRegistros:1,
  textoBuscar:"",
  indicadores:[],
  paginador: [],
  escenario:{"id":0,"nombre":"Ningun Escenario"},
  escenarios:[],
  resultado:{"id":0,"nombre":"Ninguno","resultados":[{"variables":""}]},
  resultados:[],
  variables:[]
}

export const indicadorReducer = (state = initialState,action) =>{
  switch (action.type) {
    case UPDATE_FINDER:
        return update(state,{
          [action.field] : {$set: action.value}
        })
    case ACTUALIZA_PAGINADOR_INDICADORES:
        return update(state,{
          totalRegistros : {$set: action.lista.totalRegistros},
          registrosPorPagina : {$set: action.lista.registrosPorPagina},
          paginador : {$set: action.lista.paginador}
        })
    case IR_PAGINA_INDICADORES:
        return update(state,{
          paginaActual : {$set: action.pagina}
        })
    case CARGAR_INDICADORES:
      //console.log("Lista de indicadores: "+ JSON.stringify(action.lista))
      return update(state,{
        indicadores : {$set: action.lista}
      })
    case UPDATE_ESCENARIO_EN_INDICADORES:
      return update(state,{
        escenario: {$set: JSON.parse(action.value)}
      })
    case CARGA_ESCENARIOS_EN_INDICADORES:
      return update(state,{
        escenarios: {$set: action.lista}
      })
    case UPDATE_RESULTADO_EN_INDICADORES:
      return update(state,{
        resultado: {$set: action.value}
      })
    case CARGA_RESULTADOS_EN_INDICADORES:
      return update(state,{
        resultados: {$set: action.lista}
      })
    default:
      return state
  }
}

export default indicadorReducer
