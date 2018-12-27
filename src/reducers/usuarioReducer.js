import {
  UPDATE_FINDER,
  MOVE_PAGE_FIRST,
  MOVE_PAGE_PREV,
  MOVE_PAGE_NEXT,
  MOVE_PAGE_LAST,
  CARGAR_USUARIOS,
  ACTUALIZA_PAGINADOR_USUARIOS,
  IR_PAGINA_USUARIOS,
  CARGA_ROLES
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  paginaActual:1,
  registrosPorPagina:7,
  totalRegistros:1,
  textoBuscarUsuarios:"",
  usuarios:[],
  roles:[],
  paginador: []
}

export const usuarioReducer = (state = initialState,action) =>{
  switch (action.type) {
    case UPDATE_FINDER:
        return update(state,{
          [action.field] : {$set: action.value}
        })
    case ACTUALIZA_PAGINADOR_USUARIOS:
        return update(state,{
          totalRegistros : {$set: action.lista.totalRegistros},
          registrosPorPagina : {$set: action.lista.registrosPorPagina},
          paginador : {$set: action.lista.paginador}
        })
    case IR_PAGINA_USUARIOS:
        return update(state,{
          paginaActual : {$set: action.pagina}
        })
    case CARGAR_USUARIOS:
        return update(state,{
          usuarios : {$set: action.lista}
        })
    case CARGA_ROLES:
      return update(state,{
        roles: {$set: action.lista}
      })
    default:
      return state
  }
}

export default usuarioReducer
