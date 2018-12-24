import {
  UPDATE_USUARIOS_FORM_REQUEST,
  CARGAR_USUARIO_FORM,
  LIMPIAR_FORM_USUARIO
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  id : 0,
  usuario : '',
  email : '',
  nombreUsuario : '',
  rol : 0
}

export const usuarioFormReducer = (state = initialState,action) =>{
  switch (action.type) {
    case UPDATE_USUARIOS_FORM_REQUEST:
        return update(state,{
          [action.field] : {$set: action.value}
        })
    case CARGAR_USUARIO_FORM:
        return update(state,{
          id : {$set: action.usuario[0].id},
          usuario : {$set: action.usuario[0].usuario},
          email : {$set: action.usuario[0].email},
          nombreUsuario : {$set: action.usuario[0].nombreUsuario},
          rol : {$set: (action.usuario[0].roles.length > 0 ? action.usuario[0].roles.map(function(rol) { return rol.id; }).toString() : "0")}
        })
    case LIMPIAR_FORM_USUARIO:
        return update(state,{
          id : {$set: 0},
          usuario : {$set: ''},
          email : {$set: ''},
          nombreUsuario : {$set: ''},
          rol : {$set: 0}
        })
    default:
        return state
  }
}

export default usuarioFormReducer
