import {
  UPDATE_FINDER,
  MOVE_PAGE_FIRST,
  MOVE_PAGE_PREV,
  MOVE_PAGE_NEXT,
  MOVE_PAGE_LAST,
  CARGAR_CONCILIACIONES
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  paginaActual:1,
  registrosPorPagina:10,
  totalRegistros:15,
  textoBuscar:"",
  conciliaciones:[]
}

export const conciliacionReducer = (state = initialState,action) =>{
  switch (action.type) {
    case UPDATE_FINDER:
        return update(state,{
          [action.field] : {$set: action.value}
        })
  /*  case MOVE_PAGE_FIRST:
      return update(state,{
        paginaActual: {$set: 1}
      })
    case MOVE_PAGE_PREV:
      return update(state,{
        if( this.paginaActual > 1 ){
          paginaActual: {$set: paginaActual - 1}
        }
      })
    case MOVE_PAGE_NEXT:
      return update(state,{
        let maxpage = int(this.totalRegistros/this.registrosPorPagina)
        if( this.paginaActual < maxpage ){
          paginaActual: {$set: paginaActual + 1}
        }
      })
    case MOVE_PAGE_LAST:
      return update(state,{
        let maxpage = int(this.totalRegistros/this.registrosPorPagina);
        paginaActual: {$set: maxpage}
      })*/
      case CARGAR_CONCILIACIONES:
        return update(state,{
          conciliaciones : {$set: action.lista}
        })
    default:
      return state
  }
}

export default conciliacionReducer
