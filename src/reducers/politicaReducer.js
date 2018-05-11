import {
  UPDATE_FINDER,
  MOVE_PAGE_FIRST,
  MOVE_PAGE_PREV,
  MOVE_PAGE_NEXT,
  MOVE_PAGE_LAST,
  CARGAR_POLITICAS,
  ACTUALIZA_PAGINADOR_POLITICAS,
  IR_PAGINA_POLITICAS
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  paginaActual:1,
  registrosPorPagina:7,
  totalRegistros:1,
  textoBuscar:"",
  politicas:[],
  paginador: []
}

export const politicaReducer = (state = initialState,action) =>{
  switch (action.type) {
    case UPDATE_FINDER:
        return update(state,{
          [action.field] : {$set: action.value}
        })
    case ACTUALIZA_PAGINADOR_POLITICAS:
        return update(state,{
          totalRegistros : {$set: action.lista.totalRegistros},
          registrosPorPagina : {$set: action.lista.registrosPorPagina},
          paginador : {$set: action.lista.paginador}
        })
    case IR_PAGINA_POLITICAS:
        return update(state,{
          paginaActual : {$set: action.pagina}
        })
    case CARGAR_POLITICAS:
        //console.log("Lista de politicas: "+ JSON.stringify(action.lista))
        return update(state,{
          politicas : {$set: action.lista}
        })
    default:
      return state
  }
}

export default politicaReducer
