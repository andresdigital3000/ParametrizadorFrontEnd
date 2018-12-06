import {
  UPDATE_FINDER,
  CARGAR_QUERYS,
  ACTUALIZA_PAGINADOR_QUERYS,
  IR_PAGINA_QUERYS,
  CARGA_ESCENARIOS_EN_QUERYS,
  ASIGNAR_ESCENARIO_SELECCIONADO,
  LIMPIAR_ESCENARIO_SELECCIONADO,
  UPDATE_CONCILIACION_EN_QUERYS,
  CARGAR_CONCILIACIONES_QUERY,
  UPDATE_QUERYS_APROB_FORM_REQUEST
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  paginaActual:1,
  registrosPorPagina:7,
  totalRegistros:15,
  textoBuscarQuery:"",
  querys:[],
  conciliacion:{"id":0,"queryAprobaciones":["mensaje":""]},
  conciliaciones:[{"id":0,"nombre":"Seleccione una","escenario":["queryescenario":{}]}],
  escenarios:[],
  escenario : {"id":0,"nombre":"ninguno"},
  paginador: [],
  mensaje:''
}

export const queryReducer = (state = initialState,action) =>{
  switch (action.type) {
        case UPDATE_FINDER:
          return update(state,{
            [action.field] : {$set: action.value}
          })
        case ACTUALIZA_PAGINADOR_QUERYS:
            return update(state,{
              totalRegistros : {$set: action.lista.totalRegistros},
              registrosPorPagina : {$set: action.lista.registrosPorPagina},
              paginador : {$set: action.lista.paginador}
            })
        case IR_PAGINA_QUERYS:
            return update(state,{
              paginaActual : {$set: action.pagina}
            })
        case CARGAR_QUERYS:
            return update(state,{
              querys : {$set: action.lista}
            })
        case CARGA_ESCENARIOS_EN_QUERYS:
          return update(state,{
             escenarios:{$set: action.lista}
          })
        case CARGAR_CONCILIACIONES_QUERY:
          return update(state,{
            conciliaciones: {$set: action.lista}
          })
        case ASIGNAR_ESCENARIO_SELECCIONADO:
            return update  (state,{
              escenario :{$set: action.lista}
            })
        case LIMPIAR_ESCENARIO_SELECCIONADO:
          return update  (state,{
            escenario :{$set: action.lista}
          })
        case UPDATE_CONCILIACION_EN_QUERYS:
          return update(state,{
            conciliacion : {$set: JSON.parse(action.value)}
          })
        case UPDATE_QUERYS_APROB_FORM_REQUEST:
          return update(state,{
            [action.field] : {$set: action.value}
          })
      default:
        return state
  }
}

export default queryReducer
